// Effacement complet d'un joueur et de tout ce qui le concerne (droit a l'effacement).
// Utilise par l'appli (DELETE /v1/joueurs/moi) et par le BackOffice.

import type { Env } from './commun';

export async function effacerJoueur(env: Env, id: string): Promise<void> {
  await env.DB.batch([
    env.DB.prepare('DELETE FROM reactions WHERE de_joueur = ? OR joueur_cible = ?').bind(id, id),
    env.DB.prepare('DELETE FROM defis WHERE de_joueur = ? OR a_joueur = ?').bind(id, id),
    env.DB.prepare('DELETE FROM membres WHERE joueur_id = ?').bind(id),
    env.DB.prepare('UPDATE groupes SET createur = NULL WHERE createur = ?').bind(id),
    env.DB.prepare('DELETE FROM groupes WHERE id NOT IN (SELECT groupe_id FROM membres)'),
    env.DB.prepare('DELETE FROM amities WHERE joueur_a = ? OR joueur_b = ?').bind(id, id),
    env.DB.prepare('DELETE FROM blocages WHERE joueur_id = ? OR joueur_bloque = ?').bind(id, id),
    env.DB.prepare('DELETE FROM signalements WHERE joueur_signale = ? OR joueur_signalant = ?').bind(id, id),
    env.DB.prepare('DELETE FROM resultats WHERE joueur_id = ?').bind(id),
    env.DB.prepare('DELETE FROM notifications_jetons WHERE joueur_id = ?').bind(id),
    env.DB.prepare('DELETE FROM joueurs WHERE id = ?').bind(id),
  ]);
}
