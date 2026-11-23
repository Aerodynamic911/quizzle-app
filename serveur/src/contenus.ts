// GET /v1/contenus : contenus publies par le serveur (evenements pour l'instant). Route publique, sans compte.

import { type Env, erreur, json } from './commun';
import { EVENEMENTS_SERVEUR, type EvenementServeur } from './contenusDonnees';

const NB_ETAPES = 20;
const FORME_DATE = /^\d{4}-\d{2}-\d{2}$/;
const FORME_COULEUR = /^#[0-9A-Fa-f]{6}$/;
/** On envoie les evenements termines depuis moins de 100 jours et ceux qui commencent dans les 60 prochains jours. */
const JOURS_PASSES = 100;
const JOURS_A_VENIR = 60;

/** Controle de forme d'un evenement ; renvoie la liste des problemes (vide si tout va bien). Utilise par le test du depot. */
export function problemesEvenement(e: EvenementServeur): string[] {
  const p: string[] = [];
  if (!/^[a-z0-9-]{3,40}$/.test(e.id)) p.push('id');
  if (!FORME_DATE.test(e.debut) || !FORME_DATE.test(e.fin) || e.fin < e.debut) p.push('dates');
  if (!FORME_COULEUR.test(e.couleur)) p.push('couleur');
  if (!e.titre?.fr || !e.titre?.en || !e.description?.fr || !e.description?.en || !e.emoji) p.push('textes');
  if (!Array.isArray(e.etapes) || e.etapes.length !== NB_ETAPES) p.push(`etapes (${e.etapes?.length ?? 0} au lieu de ${NB_ETAPES})`);
  const ids = new Set<string>();
  for (const [k, et] of (e.etapes ?? []).entries()) {
    const n = k + 1;
    if (!et.fr?.id || ids.has(et.fr.id)) p.push(`etape ${n} : id manquant ou en double`);
    ids.add(et.fr?.id);
    if (!et.fr?.reponse || et.fr.indices?.length !== 6 || et.fr.indices.some((x) => !x)) p.push(`etape ${n} : texte francais incomplet`);
    if (!et.en?.r || et.en.i?.length !== 6 || et.en.i.some((x) => !x)) p.push(`etape ${n} : texte anglais incomplet`);
  }
  return p;
}

function decaler(jour: string, jours: number): string {
  const d = new Date(jour + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + jours);
  return d.toISOString().slice(0, 10);
}

export function contenusPublics(aujourdhui: string) {
  const de = decaler(aujourdhui, -JOURS_PASSES);
  const a = decaler(aujourdhui, JOURS_A_VENIR);
  const evenements = EVENEMENTS_SERVEUR.filter((e) => problemesEvenement(e).length === 0 && e.fin >= de && e.debut <= a);
  return { jour: aujourdhui, evenements };
}

export function routeContenus(requete: Request, _env: Env, aujourdhui: string): Response {
  if (requete.method !== 'GET') return erreur(405, 'methode');
  const reponse = json(contenusPublics(aujourdhui));
  // Peu de contenu et il change rarement : le cache de Cloudflare et celui de l'appli suffisent.
  reponse.headers.set('Cache-Control', 'public, max-age=300');
  return reponse;
}
