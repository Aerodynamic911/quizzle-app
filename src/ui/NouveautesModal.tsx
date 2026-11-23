import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { tr } from '../i18n';
import { couleurs, rayon } from '../theme';

interface Props {
  visible: boolean;
  /** « Compris » : on ferme, l'écran ne reviendra plus. */
  onCompris: () => void;
  /** Ouvre les Préférences, où se trouve la sauvegarde de la progression. */
  onSauvegarde: () => void;
}

/** Écran affiché à l'ouverture après une mise à jour : présente les nouveautés (amis, notifications, sauvegarde). */
export default function NouveautesModal({ visible, onCompris, onSauvegarde }: Props) {
  const lignes: { emoji: string; titre: string; texte: string }[] = [
    {
      emoji: '👥',
      titre: tr('Jouez entre amis', 'Play with friends'),
      texte: tr(
        'Choisissez un pseudo, partagez votre code ami, comparez votre résultat du jour avec celui de vos amis, lancez des défis et des revanches. Tout se passe dans « Profil ».',
        'Pick a nickname, share your friend code, compare today’s result with your friends, send challenges and rematches. It all happens in “Profile”.',
      ),
    },
    {
      emoji: '🔔',
      titre: tr('Des notifications utiles', 'Useful notifications'),
      texte: tr(
        'Soyez prévenu d’une demande d’ami ou d’un défi. Vous pouvez les désactiver à tout moment dans « Profil ».',
        'Get notified of a friend request or a challenge. You can turn them off anytime in “Profile”.',
      ),
    },
    {
      emoji: '☁️',
      titre: tr('Sauvegardez votre progression', 'Back up your progress'),
      texte: tr(
        'Liez votre compte Google ou Apple : si vous changez de téléphone, même d’Android à iPhone, vous retrouvez vos pièces, costumes, séries et collection. À activer dans « Préférences ».',
        'Link your Google or Apple account: if you change phones, even from Android to iPhone, you get your coins, outfits, streaks and collection back. Turn it on in “Settings”.',
      ),
    },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCompris}>
      <View style={styles.voile}>
        <View style={styles.carte}>
          <Text style={styles.titre}>🎉 {tr('Quizzle a de nouvelles fonctions !', 'Quizzle has new features!')}</Text>
          <ScrollView style={styles.liste} contentContainerStyle={{ paddingBottom: 4 }}>
            {lignes.map((l) => (
              <View key={l.titre} style={styles.ligne}>
                <Text style={styles.emoji}>{l.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.ligneTitre}>{l.titre}</Text>
                  <Text style={styles.ligneTexte}>{l.texte}</Text>
                </View>
              </View>
            ))}
            <Text style={styles.note}>
              {tr('Aucun compte n’est nécessaire pour jouer.', 'No account is needed to play.')}
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.bouton} onPress={onSauvegarde} activeOpacity={0.85} accessibilityRole="button">
            <Text style={styles.boutonTexte}>☁️ {tr('Sauvegarder ma progression', 'Back up my progress')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lien} onPress={onCompris} accessibilityRole="button">
            <Text style={styles.lienTexte}>{tr('Compris', 'Got it')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  voile: { flex: 1, backgroundColor: 'rgba(10,12,28,0.92)', alignItems: 'center', justifyContent: 'center', padding: 20 },
  carte: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    backgroundColor: couleurs.carte,
    borderRadius: rayon,
    borderWidth: 2,
    borderColor: couleurs.accent,
    padding: 20,
  },
  titre: { color: couleurs.accent, fontSize: 21, fontWeight: '900', textAlign: 'center', marginBottom: 14 },
  liste: { flexGrow: 0 },
  ligne: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  emoji: { fontSize: 28, width: 36, textAlign: 'center' },
  ligneTitre: { color: couleurs.texte, fontSize: 16, fontWeight: '800', marginBottom: 2 },
  ligneTexte: { color: couleurs.texteSecondaire, fontSize: 14, lineHeight: 20 },
  note: { color: couleurs.texteSecondaire, fontSize: 13, textAlign: 'center', marginTop: 2 },
  bouton: { backgroundColor: couleurs.accent, borderRadius: rayon, paddingVertical: 14, alignItems: 'center', marginTop: 14 },
  boutonTexte: { color: '#1B1B1B', fontSize: 16, fontWeight: '800' },
  lien: { alignItems: 'center', paddingVertical: 12 },
  lienTexte: { color: couleurs.texte, fontSize: 15, fontWeight: '700' },
});
