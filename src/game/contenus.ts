import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_SERVEUR } from '../config';
import { Evenement, NB_ETAPES, enregistrerEvenementServeur } from '../data/evenements';
import { Mystere } from '../data/mysteres';
import { MYSTERES_EN, MystereEn } from '../data/mysteres_en';
import { tr } from '../i18n';

/** Contenus publiés par le serveur (GET /v1/contenus) : aujourd'hui, les événements. Gardés sur le téléphone pour jouer hors ligne. */

interface EvenementRecu {
  id: string;
  debut: string;
  fin: string;
  emoji: string;
  couleur: string;
  titre: { fr: string; en: string };
  description: { fr: string; en: string };
  etapes: { fr: Mystere; en: MystereEn }[];
}

const CLE = 'quizzle.contenus.v1';
const DELAI_MS = 8000;

/** Les événements connus, par identifiant. On ne retire jamais un événement : la progression et la carte de collection en dépendent. */
let connus: Record<string, EvenementRecu> = {};

function valide(e: any): e is EvenementRecu {
  if (!e || typeof e.id !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(e.debut) || !/^\d{4}-\d{2}-\d{2}$/.test(e.fin)) return false;
  if (typeof e.emoji !== 'string' || typeof e.couleur !== 'string' || !e.titre?.fr || !e.titre?.en || !e.description?.fr || !e.description?.en) return false;
  if (!Array.isArray(e.etapes) || e.etapes.length !== NB_ETAPES) return false;
  return e.etapes.every(
    (x: any) =>
      typeof x?.fr?.id === 'string' &&
      typeof x.fr.reponse === 'string' &&
      Array.isArray(x.fr.indices) &&
      x.fr.indices.length === 6 &&
      Array.isArray(x.en?.i) &&
      x.en.i.length === 6 &&
      typeof x.en.r === 'string',
  );
}

function enregistrer(e: EvenementRecu): void {
  const evenement: Evenement = {
    id: e.id,
    get titre() {
      return tr(e.titre.fr, e.titre.en);
    },
    emoji: e.emoji,
    get description() {
      return tr(e.description.fr, e.description.en);
    },
    couleur: e.couleur,
    etapes: e.etapes.map((x) => x.fr),
  };
  for (const x of e.etapes) MYSTERES_EN[x.fr.id] = x.en;
  enregistrerEvenementServeur(evenement, e.debut, e.fin);
}

/** À appeler avant de lire la progression : remet en place les événements déjà téléchargés. */
export async function chargerContenusLocaux(): Promise<void> {
  try {
    const brut = await AsyncStorage.getItem(CLE);
    if (!brut) return;
    const lu = JSON.parse(brut) as { evenements?: unknown[] };
    for (const e of lu.evenements ?? []) {
      if (valide(e)) {
        connus[e.id] = e;
        enregistrer(e);
      }
    }
  } catch {
    // Pas de copie utilisable : les événements livrés avec l'appli suffisent.
  }
}

/** Télécharge les contenus du serveur. Renvoie true si quelque chose de nouveau est arrivé (l'appli doit alors se rafraîchir). */
export async function rafraichirContenus(): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const minuteur = setTimeout(() => ctrl.abort(), DELAI_MS);
    const r = await fetch(`${URL_SERVEUR}/v1/contenus`, { signal: ctrl.signal });
    clearTimeout(minuteur);
    if (!r.ok) return false;
    const donnees = (await r.json()) as { evenements?: unknown[] };
    let change = false;
    for (const e of donnees.evenements ?? []) {
      if (!valide(e)) continue;
      if (JSON.stringify(connus[e.id]) !== JSON.stringify(e)) {
        connus[e.id] = e;
        enregistrer(e);
        change = true;
      }
    }
    if (change) await AsyncStorage.setItem(CLE, JSON.stringify({ evenements: Object.values(connus) }));
    return change;
  } catch {
    return false;
  }
}
