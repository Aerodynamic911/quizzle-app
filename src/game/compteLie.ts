import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native';
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '../config';
import { Fournisseur, appliquerInstantane, ecrireEtat, sauvegarderMaintenant } from './sauvegarde';
import { appeler, compteLocal, creerCompte } from './serveur';

/** Connexion au compte Apple (iPhone) ou Google (Android et iPhone) pour sauvegarder et restaurer la progression. */

/** Comptes proposés sur cet appareil : Apple et Google sur iPhone, Google sur Android. */
export const FOURNISSEURS: Fournisseur[] = Platform.OS === 'ios' ? ['apple', 'google'] : ['google'];
/** Compte proposé par défaut. */
export const FOURNISSEUR: Fournisseur = FOURNISSEURS[0];

export type ErreurCompte = 'annule' | 'indisponible' | 'deja_lie' | 'aucune_sauvegarde' | 'sauvegarde_vide' | 'reseau' | 'inconnue';
export type ResultatCompte = { ok: true } | { ok: false; erreur: ErreurCompte };

/** Vrai quand la connexion est possible sur cet appareil. */
export async function sauvegardeDisponible(): Promise<boolean> {
  try {
    if (GOOGLE_WEB_CLIENT_ID !== '') return true;
    return Platform.OS === 'ios' && (await AppleAuthentication.isAvailableAsync());
  } catch {
    return false;
  }
}

/** Ouvre la fenêtre de connexion du système et renvoie le jeton d'identité ; `'annule'` si le joueur la ferme. */
async function obtenirJeton(fournisseur: Fournisseur): Promise<string | 'annule' | null> {
  try {
    if (fournisseur === 'apple') {
      const r = await AppleAuthentication.signInAsync({ requestedScopes: [] });
      return r.identityToken ?? null;
    }
    GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID, ...(Platform.OS === 'ios' ? { iosClientId: GOOGLE_IOS_CLIENT_ID } : {}) });
    if (Platform.OS === 'android') await GoogleSignin.hasPlayServices();
    const r = await GoogleSignin.signIn();
    if (r.type !== 'success') return 'annule';
    return r.data.idToken ?? null;
  } catch (e: any) {
    if (e?.code === 'ERR_REQUEST_CANCELED' || e?.code === 'SIGN_IN_CANCELLED' || e?.code === '12501') return 'annule';
    return null;
  }
}

/** Lie le compte Apple/Google à ce joueur et envoie une première sauvegarde. */
export async function lierCompte(fournisseur: Fournisseur = FOURNISSEUR): Promise<ResultatCompte> {
  const jeton = await obtenirJeton(fournisseur);
  if (jeton === 'annule') return { ok: false, erreur: 'annule' };
  if (!jeton) return { ok: false, erreur: 'indisponible' };
  try {
    // Le compte en ligne anonyme est créé ici si le joueur n'a pas encore choisi de pseudo.
    const compte = (await compteLocal()) ?? (await creerCompte());
    if (!compte) return { ok: false, erreur: 'reseau' };
    const r = await appeler('/v1/compte/lier', 'POST', compte, { fournisseur, jeton });
    if (r.status === 409) return { ok: false, erreur: 'deja_lie' };
    if (r.status !== 200 && r.status !== 201) return { ok: false, erreur: 'inconnue' };
    await ecrireEtat({ fournisseur, derniere: null });
    await sauvegarderMaintenant();
    return { ok: true };
  } catch {
    return { ok: false, erreur: 'reseau' };
  }
}

/** Nouveau téléphone : retrouve le joueur et sa progression grâce à son compte Apple/Google. */
export async function restaurerProgression(fournisseur: Fournisseur = FOURNISSEUR): Promise<ResultatCompte> {
  const jeton = await obtenirJeton(fournisseur);
  if (jeton === 'annule') return { ok: false, erreur: 'annule' };
  if (!jeton) return { ok: false, erreur: 'indisponible' };
  try {
    const r = await appeler('/v1/compte/restaurer', 'POST', null, { fournisseur, jeton });
    if (r.status === 404) return { ok: false, erreur: 'aucune_sauvegarde' };
    if (r.status !== 200 || !r.donnees?.id || !r.donnees?.secret) return { ok: false, erreur: 'inconnue' };
    // On ne remplace rien tant que la sauvegarde n'est pas valide.
    if (r.donnees.sauvegarde && !(await appliquerInstantane(r.donnees.sauvegarde))) {
      // Le compte est reconnu mais la sauvegarde ne contient aucune donnée de jeu (envoyée avant la première partie).
      const vide = Object.keys((r.donnees.sauvegarde as { cles?: object }).cles ?? {}).length === 0;
      return { ok: false, erreur: vide ? 'sauvegarde_vide' : 'inconnue' };
    }
    await AsyncStorage.setItem(
      'quizzle.profil-en-ligne.v1',
      JSON.stringify({ id: r.donnees.id, secret: r.donnees.secret, codeAmi: r.donnees.code_ami }),
    );
    await ecrireEtat({ fournisseur, derniere: new Date().toISOString() });
    return { ok: true };
  } catch {
    return { ok: false, erreur: 'reseau' };
  }
}
