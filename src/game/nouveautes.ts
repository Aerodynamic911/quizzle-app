import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stats } from './storage';
import { partiesJouees } from './avis';

/** Version dont l'écran de nouveautés est affiché. À changer à chaque version qui a des nouveautés à annoncer. */
export const VERSION_NOUVEAUTES = '1.4.0';
/** Nombre maximum d'ouvertures de l'appli pendant lesquelles l'écran apparaît. */
export const MAX_AFFICHAGES_NOUVEAUTES = 3;

const CLE = 'quizzle.nouveautes.v1';

interface Etat {
  version: string;
  vues: number;
  ferme: boolean;
}

async function lire(): Promise<Etat | null> {
  try {
    const brut = await AsyncStorage.getItem(CLE);
    if (!brut) return null;
    const e = JSON.parse(brut) as Partial<Etat>;
    return typeof e.version === 'string' ? { version: e.version, vues: e.vues ?? 0, ferme: !!e.ferme } : null;
  } catch {
    return null;
  }
}

async function ecrire(e: Etat): Promise<void> {
  try {
    await AsyncStorage.setItem(CLE, JSON.stringify(e));
  } catch {
    // Au pire l'écran se réaffichera : il reste limité par le nombre d'ouvertures et par le bouton « Compris ».
  }
}

/**
 * Faut-il montrer l'écran de nouveautés à cette ouverture de l'appli ? Appelé une fois par ouverture, quand les données sont chargées.
 * Un nouveau joueur (aucune partie jouée) ne le voit pas : il découvre tout. Un joueur qui met à jour le voit au plus
 * MAX_AFFICHAGES_NOUVEAUTES fois, et plus du tout une fois qu'il a touché « Compris ».
 */
export async function nouveautesAAfficher(stats: Stats): Promise<boolean> {
  let etat = await lire();
  if (!etat || etat.version !== VERSION_NOUVEAUTES) {
    etat = { version: VERSION_NOUVEAUTES, vues: 0, ferme: partiesJouees(stats) === 0 };
  }
  if (etat.ferme || etat.vues >= MAX_AFFICHAGES_NOUVEAUTES) {
    await ecrire(etat);
    return false;
  }
  await ecrire({ ...etat, vues: etat.vues + 1 });
  return true;
}

/** Le joueur a touché « Compris » (ou est allé voir la sauvegarde) : l'écran ne reviendra plus pour cette version. */
export async function fermerNouveautes(): Promise<void> {
  const etat = (await lire()) ?? { version: VERSION_NOUVEAUTES, vues: 1, ferme: false };
  await ecrire({ ...etat, version: VERSION_NOUVEAUTES, ferme: true });
}
