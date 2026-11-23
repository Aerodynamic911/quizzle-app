// Contenus publies par le serveur : l'appli les telecharge au demarrage, sans mise a jour sur les magasins.
// Pour ajouter un evenement : ajouter un objet a EVENEMENTS_SERVEUR, puis pousser sur la branche de production (deploiement automatique).
// Regles : `id` unique et jamais reutilise (la progression des joueurs y est rattachee), 20 etapes exactement,
// 6 indices par etape, `debut` et `fin` au format AAAA-MM-JJ (inclus, heure de l'appareil du joueur).
// Ne jamais retirer un evenement termine : les joueurs gardent leur progression et leur carte de collection.

/** Une etape d'evenement en francais (meme forme que `Mystere` dans l'appli). */
export interface EtapeFr {
  id: string;
  categorie: string;
  reponse: string;
  alias: string[];
  indices: [string, string, string, string, string, string];
  anecdote: string;
}

/** Sa traduction anglaise (meme forme que `MystereEn` dans l'appli). */
export interface EtapeEn {
  c: string;
  r: string;
  a: string[];
  i: [string, string, string, string, string, string];
  n: string;
}

export interface EvenementServeur {
  id: string;
  debut: string;
  fin: string;
  emoji: string;
  /** Couleur du titre, au format #RRGGBB. */
  couleur: string;
  titre: { fr: string; en: string };
  description: { fr: string; en: string };
  etapes: { fr: EtapeFr; en: EtapeEn }[];
}

export const EVENEMENTS_SERVEUR: EvenementServeur[] = [];
