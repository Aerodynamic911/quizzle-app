#!/usr/bin/env python3
"""Génère les pages statiques du site Quizzle (français à la racine, anglais dans /en/).

Usage : python3 build.py
Les liens des boutiques sont à renseigner ci-dessous dès que l'appli est publiée.
"""
import json
import math
import os

# ── À renseigner à la publication ────────────────────────────────────────────
LIEN_APP_STORE = 'https://apps.apple.com/fr/app/quizzle/id6826238020'
LIEN_GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.occitangames.quizzle'    # ex. https://play.google.com/store/apps/details?id=com.occitangames.quizzle
SITE = 'https://occitangames.com'
CONTACT = 'contact@occitangames.com'
# ─────────────────────────────────────────────────────────────────────────────

ICI = os.path.dirname(os.path.abspath(__file__))
PALETTE = ['#F5B942', '#FF8A5B', '#FF6B9D', '#B58CFF', '#6CB4FF', '#3DDC97', '#F5B942']


def assombrir(hexa, f):
    f = max(0, min(1, f))
    return '#' + ''.join('%02x' % round(int(hexa[i:i + 2], 16) * f) for i in (1, 3, 5))


def mot_marque(texte='QUIZZLE'):
    """Logo : lettres sur un arc, épaisseur extrudée, contour sombre, couleurs de l'arc-en-ciel."""
    lettres = list(texte)
    n = len(lettres)
    taille = 112
    emplacement = taille * 0.84
    R = 720
    cx, cy = 320, 112 + R
    corps = []
    for i, l in enumerate(lettres):
        th = (i - (n - 1) / 2) * emplacement / R
        x = cx + R * math.sin(th)
        y = cy - R * math.cos(th)
        deg = math.degrees(th)
        couleur = PALETTE[i % len(PALETTE)]
        calques = []
        for dy in range(10, 0, -1):
            calques.append('<text y="%d" fill="%s" stroke="%s" stroke-width="7" stroke-linejoin="round">%s</text>' % (dy, assombrir(couleur, 0.62 - dy * 0.012), '#1A0F4A', l))
        calques.append('<text fill="%s" stroke="#1A0F4A" stroke-width="7" stroke-linejoin="round" paint-order="stroke">%s</text>' % (couleur, l))
        calques.append('<text fill="%s" stroke="none">%s</text>' % (couleur, l))
        corps.append(
            '<g transform="translate(%.1f %.1f) rotate(%.2f)"><g class="lettre" style="--i:%d" text-anchor="middle" font-family="Lilita One, sans-serif" font-size="%d">%s</g></g>'
            % (x, y, deg, i, taille, ''.join(calques)))
    return ('<svg class="mot-marque" viewBox="-24 0 688 190" role="img" aria-label="Quizzle">%s</svg>' % ''.join(corps))


def boutiques(t):
    def un(lien, nom, sous):
        if lien:
            return '<a class="boutique" href="%s" rel="noopener"><small>%s</small><strong>%s</strong></a>' % (lien, sous, nom)
        return '<span class="boutique" aria-disabled="true"><small>%s</small><strong>%s</strong></span>' % (t['bientot'], nom)
    return '<div class="boutiques">%s%s</div>' % (
        un(LIEN_APP_STORE, 'App Store', t['dispo_ios']),
        un(LIEN_GOOGLE_PLAY, 'Google Play', t['dispo_android']))


TEXTES = {
    'fr': dict(
        lang='fr', racine='', autre_lang='en/', autre_nom='EN', autre_label='English version',
        titre='Quizzle, le jeu des mystères : devinez à partir d’indices',
        description='Quizzle : six indices, une réponse. Un mystère par jour, une aventure sans fin, des événements mensuels, un mode Image, un Sprint et plus de 300 énigmes pour tous les âges. Gratuit sur iPhone et Android.',
        aller='Aller au contenu', nav_jouer='Essayer', nav_modes='Modes de jeu', nav_dl='Télécharger',
        h1='Six indices. Une seule réponse.',
        chapeau='Chaque énigme commence vague et devient de plus en plus précise. Moins vous demandez d’indices, plus votre score monte. Un mystère par jour, une aventure sans fin et plus de 300 énigmes.',
        bientot='Bientôt', dispo_ios='Télécharger sur l’', dispo_android='Disponible sur',
        note_bientot='Quizzle arrive bientôt sur iPhone et Android. Les liens de téléchargement apparaîtront ici dès la publication.',
        note_dispo='Gratuit à télécharger sur iPhone et Android.',
        essai_intro='Une vraie énigme du jeu. Tapez votre réponse, ou demandez un indice.',
        modes_h='Trois façons de jouer… et plus encore',
        modes_p='Quelques minutes suffisent. Revenez chaque jour, ou enchaînez les niveaux. Il y a aussi le mode Image, le Sprint, Vrai ou Faux et les parties entre amis.',
        m1_h='Le mystère du jour', m1_p='Un mystère par jour, le même pour tout le monde. Trouvez-le trois jours de suite pour gagner un joker, puis la série continue de grandir.',
        m1_visuel='Mystère du jour', m1_n='n°',
        m2_h='L’aventure', m2_p='Une carte au trésor, huit décors et des niveaux sans fin. Tous les 30 niveaux, vous gagnez un nouveau titre.', m2_t='Nouveau titre',
        m3_h='Les événements', m3_p='Chaque mois, une aventure à thème en 20 étapes, avec une carte à collectionner à la clé.', m3_t='20 étapes',
        ages_h='Des énigmes pour chaque génération',
        nouv_tag='Nouveau', nouv_ban='Version 1.4 : amis, clans, sauvegarde et événements à thème', nouv_h='Nouveau dans la version 1.4', nouv_p='Jouez entre amis, créez votre clan, sauvegardez votre progression et profitez d’un événement à thème chaque mois.',
        n1_t='Un pseudo, un code ami', n1_p='Créez votre pseudo (facultatif) et partagez votre code ami. Ajoutez vos amis en quelques secondes.',
        n2_t='Le résultat du jour de vos amis', n2_p='Voyez qui a trouvé le mystère du jour, en combien d’essais, et réagissez avec un emoji.',
        n3_t='Défis, revanches et notifications', n3_p='Lancez un défi à un ami. En cas de revanche, vous jouez une autre énigme que celle que vous connaissez déjà. Des notifications vous préviennent d’une demande d’ami ou d’un défi ; vous les désactivez quand vous voulez.',
        n4_t='Les clans', n4_p='Réunissez votre famille, vos amis ou vos collègues dans un clan, partagez un code et comparez vos résultats du jour, de la semaine et du mois.',
        n5_t='Sauvegardez votre progression', n5_p='Liez votre compte Google ou Apple pour retrouver vos pièces, costumes, séries et collection si vous changez de téléphone, même d’Android à iPhone. C’est facultatif.',
        n6_t='Un événement à thème chaque mois', n6_p='De nouveaux événements arrivent sans mise à jour de l’application. Premier rendez-vous : « Noël autour du monde », dès le 1er décembre.',
        ages_p='Plus de 300 énigmes, de la tour Eiffel à Minecraft. Choisissez votre tranche d’âge dans les préférences : vous recevez les énigmes que tout le monde connaît, plus celles qui parlent à votre époque.',
        ages=[
            ('Tous publics', ['Tour Eiffel', 'Panda', 'Imprimerie', 'Cléopâtre']),
            ('Ados, 13 à 17 ans', ['Minecraft', 'Pokémon', 'Naruto', 'Usain Bolt']),
            ('18 à 30 ans', ['ChatGPT', 'Netflix', 'Daft Punk', 'Inception']),
            ('30 à 50 ans', ['Tamagotchi', 'Nokia 3310', 'France 98', 'Minitel']),
            ('50 ans et plus', ['Apollo 11', 'Édith Piaf', '2CV', 'Tintin']),
        ],
        ages_note='Le jeu est conçu pour les 13 ans et plus.',
        amis_h='Défiez vos amis',
        amis_p='Après chaque partie, envoyez un code à un ami : il joue la même énigme que vous et voit s’il fait mieux. Avec un pseudo (facultatif), retrouvez vos amis, comparez vos résultats du jour et lancez-vous des défis.',
        bulle1='🎯 Défi Quizzle ! J’ai trouvé en 3 essais. Saurez-vous faire mieux ?', bulle2='Code du défi :',
        p1_t='Une série à protéger', p1_p='Les victoires d’affilée rapportent des jokers.',
        p2_t='Des jokers', p2_p='Un indice offert, sans compter comme un essai.',
        p3_t='Des glaçons', p3_p='Ils gardent votre série au frais si vous manquez un jour.',
        p4_t='Des cartes à collectionner', p4_p='Elles récompensent votre progression.',
        fin_h='Prêt à deviner ?', fin_p='Quizzle est disponible sur iPhone et sur Android. Aucun compte n’est nécessaire pour jouer : le pseudo et la sauvegarde avec Google ou Apple sont facultatifs.',
        pied_pub='Quizzle est un jeu édité par Occitan Games.', conf='Confidentialité', ment='Mentions légales', contact='Contact',
        url_conf='confidentialite.html', url_ment='mentions-legales.html', url_home='',
        indice='Indice',
    ),
    'en': dict(
        lang='en', racine='../', autre_lang='../', autre_nom='FR', autre_label='Version française',
        titre='Quizzle, the mystery game: guess from the clues',
        description='Quizzle: six clues, one answer. A daily mystery, an endless adventure, monthly events, a Picture mode, a Sprint and over 300 riddles for every age. Free on iPhone and Android.',
        aller='Skip to content', nav_jouer='Try it', nav_modes='Ways to play', nav_dl='Download',
        h1='Six clues. One answer.',
        chapeau='Every riddle starts vague and gets sharper with each clue. The fewer clues you ask for, the higher your score. A mystery every day, an endless adventure and over 300 riddles.',
        bientot='Coming soon', dispo_ios='Download on the ', dispo_android='Get it on',
        note_bientot='Quizzle is coming soon to iPhone and Android. Download links will appear here as soon as it is published.',
        note_dispo='Free to download on iPhone and Android.',
        essai_intro='A real riddle from the game. Type your answer, or ask for a clue.',
        modes_h='Three ways to play… and more',
        modes_p='A few minutes is all it takes. Come back every day, or chain levels together. There is also Picture mode, Sprint, True or False and games with friends.',
        m1_h='The daily mystery', m1_p='One mystery a day, the same for everyone. Solve it three days in a row to earn a joker, then your streak keeps growing.',
        m1_visuel='Daily mystery', m1_n='No.',
        m2_h='The adventure', m2_p='A treasure map, eight settings and endless levels. Every 30 levels, you earn a new title.', m2_t='New title',
        m3_h='The events', m3_p='Every month, a themed adventure in 20 steps, with a collectible card at the end.', m3_t='20 steps',
        ages_h='Riddles for every generation',
        nouv_tag='New', nouv_ban='Version 1.4: friends, clans, backup and themed events', nouv_h='New in version 1.4', nouv_p='Play with friends, create your clan, back up your progress and enjoy a themed event every month.',
        n1_t='A nickname, a friend code', n1_p='Create your nickname (optional) and share your friend code. Add your friends in a few seconds.',
        n2_t='Your friends’ daily results', n2_p='See who solved the daily mystery, in how many attempts, and react with an emoji.',
        n3_t='Challenges, rematches and notifications', n3_p='Challenge a friend. For a rematch, you get a different riddle from the one you already know. Notifications tell you about a friend request or a challenge; you can turn them off at any time.',
        n4_t='Clans', n4_p='Bring your family, friends or coworkers together in a clan, share a code and compare your results for the day, the week and the month.',
        n5_t='Back up your progress', n5_p='Link your Google or Apple account to get your coins, outfits, streaks and collection back if you change phones, even from Android to iPhone. It is optional.',
        n6_t='A themed event every month', n6_p='New events arrive without an app update. First up: “Christmas Around the World”, starting 1 December.',
        ages_p='Over 300 riddles, from the Eiffel Tower to Minecraft. Pick your age group in the settings: you get the riddles everyone knows, plus the ones that speak to your era.',
        ages=[
            ('All ages', ['Eiffel Tower', 'Panda', 'Printing press', 'Cleopatra']),
            ('Teens, 13 to 17', ['Minecraft', 'Pokémon', 'Naruto', 'Usain Bolt']),
            ('18 to 30', ['ChatGPT', 'Netflix', 'Daft Punk', 'Inception']),
            ('30 to 50', ['Tamagotchi', 'Nokia 3310', 'France 98', 'Minitel']),
            ('50 and over', ['Apollo 11', 'Édith Piaf', '2CV', 'Tintin']),
        ],
        ages_note='The game is designed for ages 13 and over.',
        amis_h='Challenge your friends',
        amis_p='After each game, send a code to a friend: they play the same riddle as you and see if they do better. With a nickname (optional), find your friends, compare your daily results and challenge each other.',
        bulle1='🎯 Quizzle challenge! I found it in 3 attempts. Can you do better?', bulle2='Challenge code:',
        p1_t='A streak to protect', p1_p='Winning in a row earns you jokers.',
        p2_t='Jokers', p2_p='A free clue that does not count as an attempt.',
        p3_t='Ice cubes', p3_p='They keep your streak on ice if you miss a day.',
        p4_t='Collectible cards', p4_p='They reward your progress.',
        fin_h='Ready to guess?', fin_p='Quizzle is available on iPhone and Android. No account is needed to play: the nickname and the backup with Google or Apple are optional.',
        pied_pub='Quizzle is a game published by Occitan Games.', conf='Privacy', ment='Legal notice', contact='Contact',
        url_conf='privacy.html', url_ment='legal.html', url_home='',
        indice='Clue',
    ),
}


def ouverture_page(t, titre, description, chemin_autre, canon, noindex=False):
    r = t['racine']
    autre = 'fr' if t['lang'] == 'en' else 'en'
    robots = '<meta name="robots" content="noindex">' if noindex else ''
    return f'''<!doctype html>
<html lang="{t['lang']}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{titre}</title>
<meta name="description" content="{description}">
<meta name="theme-color" content="#0F1224">
{robots}
<link rel="canonical" href="{SITE}/{canon}">
<link rel="alternate" hreflang="fr" href="{SITE}/{canon if t['lang'] == 'fr' else chemin_autre}">
<link rel="alternate" hreflang="en" href="{SITE}/{canon if t['lang'] == 'en' else chemin_autre}">
<meta property="og:type" content="website">
<meta property="og:title" content="{titre}">
<meta property="og:description" content="{description}">
<meta property="og:image" content="{SITE}/img/og.png">
<meta property="og:url" content="{SITE}/{canon}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="{r}img/favicon.png">
<link rel="apple-touch-icon" href="{r}img/apple-touch-icon.png">
<link rel="preload" href="{r}fonts/lilita-one-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{r}assets/style.css">
</head>
<body>
<a class="saut" href="#contenu">{t['aller']}</a>
'''


def entete(t, url_autre, accueil=True):
    r = t['racine']
    nav = ''
    if accueil:
        nav = f'<a class="lien-nav" href="#essai">{t["nav_jouer"]}</a><a class="lien-nav" href="#modes">{t["nav_modes"]}</a><a class="lien-nav" href="#telecharger">{t["nav_dl"]}</a>'
    return f'''<header class="entete"><div class="conteneur">
<a class="marque" href="./"><img src="{r}img/favicon.png" alt="" width="34" height="34">Quizzle</a>
<nav class="nav" aria-label="Navigation">{nav}<a class="langue" href="{url_autre}" hreflang="{'fr' if t['lang'] == 'en' else 'en'}" lang="{'fr' if t['lang'] == 'en' else 'en'}" aria-label="{t['autre_label']}">{t['autre_nom']}</a></nav>
</div></header>
'''


def pied(t):
    r = t['racine']
    return f'''<footer class="pied"><div class="conteneur">
<p>© 2026 Occitan Games · {t['pied_pub']}</p>
<nav aria-label="{t['conf']}"><a href="{t['url_conf']}">{t['conf']}</a><a href="{t['url_ment']}">{t['ment']}</a><a href="mailto:{CONTACT}">{t['contact']}</a></nav>
</div></footer>
</body>
</html>
'''


def page_accueil(t):
    r = t['racine']
    n_sub = 'en/' if t['lang'] == 'en' else ''
    canon = 'en/' if t['lang'] == 'en' else ''
    autre = '' if t['lang'] == 'en' else 'en/'
    html = ouverture_page(t, t['titre'], t['description'], autre, canon)
    html += entete(t, t['autre_lang'])
    liens_dispo = bool(LIEN_APP_STORE or LIEN_GOOGLE_PLAY)
    note = t['note_dispo'] if liens_dispo else t['note_bientot']
    ages = ''.join(
        '<li><h3>%s</h3><p class="sujets">%s</p></li>' % (nom, '<span aria-hidden="true">/</span>'.join(s for s in [' ' + x + ' ' for x in sujets]))
        for nom, sujets in t['ages'])
    html += f'''<main id="contenu">
<a class="bandeau-nouv" href="#nouveautes"><span class="pastille-nouv">{t['nouv_tag']}</span><span>{t['nouv_ban']}</span><span aria-hidden="true">↓</span></a>
<section class="heros"><div class="conteneur">
<div>
{mot_marque()}
<h1>{t['h1']}</h1>
<p class="chapeau">{t['chapeau']}</p>
{boutiques(t)}
<p class="note-bientot">{note}</p>
</div>
<div class="essai" id="essai">
<img class="mascotte-coin" src="{r}img/mascotte.svg" alt="" width="132" height="123">
<p class="essai-intro">{t['essai_intro']}</p>
<div class="enigme" id="enigme">
<p class="enigme-cat"></p>
<ol class="indices" aria-live="polite"></ol>
<div class="pastilles"></div>
<form class="saisie" autocomplete="off"><label class="sr-only" for="reponse">{t['essai_intro']}</label><input id="reponse" name="reponse" type="text" enterkeyhint="send" autocapitalize="words" spellcheck="false"><button class="btn" type="submit"></button></form>
<div class="actions"><button class="btn btn-2" type="button" data-suivant></button></div>
<p class="message" role="status"></p>
<div class="resultat-zone"></div>
</div>
</div>
</div></section>

<section id="modes"><div class="conteneur">
<div class="intro-section"><h2>{t['modes_h']}</h2><p>{t['modes_p']}</p></div>
<div class="modes">
<article class="mode">
<div class="visuel"><div class="ticket"><div class="ticket-corps"><small>{t['m1_visuel']}</small><strong>{t['m1_n']}<span data-numero>1</span></strong><div class="ticket-pips" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div></div>
<h3>{t['m1_h']}</h3><p>{t['m1_p']}</p>
</article>
<article class="mode">
<div class="visuel">{svg_carte(t['m2_t'])}</div>
<h3>{t['m2_h']}</h3><p>{t['m2_p']}</p>
</article>
<article class="mode">
<div class="visuel">{svg_evenement(t['m3_t'])}</div>
<h3>{t['m3_h']}</h3><p>{t['m3_p']}</p>
</article>
</div>
</div></section>

<section id="nouveautes"><div class="conteneur">
<div class="intro-section"><h2>{t['nouv_h']}</h2><p>{t['nouv_p']}</p></div>
<div class="petits">
<div class="petit"><span class="emoji" aria-hidden="true">👥</span><div><strong>{t['n1_t']}</strong><span>{t['n1_p']}</span></div></div>
<div class="petit"><span class="emoji" aria-hidden="true">📅</span><div><strong>{t['n2_t']}</strong><span>{t['n2_p']}</span></div></div>
<div class="petit"><span class="emoji" aria-hidden="true">⚔️</span><div><strong>{t['n3_t']}</strong><span>{t['n3_p']}</span></div></div>
<div class="petit"><span class="emoji" aria-hidden="true">🛡️</span><div><strong>{t['n4_t']}</strong><span>{t['n4_p']}</span></div></div>
<div class="petit"><span class="emoji" aria-hidden="true">☁️</span><div><strong>{t['n5_t']}</strong><span>{t['n5_p']}</span></div></div>
<div class="petit"><span class="emoji" aria-hidden="true">🎄</span><div><strong>{t['n6_t']}</strong><span>{t['n6_p']}</span></div></div>
</div>
</div></section>

<section class="ages-fond"><div class="conteneur">
<div class="intro-section"><h2>{t['ages_h']}</h2><p>{t['ages_p']}</p></div>
<ul class="ages">{ages}</ul>
<p class="ages-note">{t['ages_note']}</p>
</div></section>

<section><div class="conteneur amis">
<div>
<h2>{t['amis_h']}</h2>
<p class="intro-section" style="color:var(--texte-2);margin-top:14px;font-size:1.1rem">{t['amis_p']}</p>
<div class="petits">
<div class="petit"><span class="emoji" aria-hidden="true">🔥</span><div><strong>{t['p1_t']}</strong><span>{t['p1_p']}</span></div></div>
<div class="petit"><span class="emoji" aria-hidden="true">✨</span><div><strong>{t['p2_t']}</strong><span>{t['p2_p']}</span></div></div>
<div class="petit"><span class="emoji" aria-hidden="true">🧊</span><div><strong>{t['p3_t']}</strong><span>{t['p3_p']}</span></div></div>
<div class="petit"><span class="emoji" aria-hidden="true">🃏</span><div><strong>{t['p4_t']}</strong><span>{t['p4_p']}</span></div></div>
</div>
</div>
<div class="bulle"><p>{t['bulle1']}</p><p>{t['bulle2']}</p><p><span class="code">485-194</span></p></div>
</div></section>

<section class="final" id="telecharger"><div class="conteneur"><div class="final-corps">
<div>
<h2>{t['fin_h']}</h2>
<p>{t['fin_p']}</p>
{boutiques(t)}
</div>
<img class="final-mascotte" src="{r}img/mascotte.svg" alt="" width="300" height="279" loading="lazy">
</div></div></section>
</main>
<script src="{r}assets/app.js" defer></script>
'''
    html += pied(t)
    return html


def svg_carte(titre):
    """Carte au trésor : un chemin sinueux, des niveaux, un trophée au niveau 30."""
    return f'''<svg viewBox="0 0 320 170" role="img" aria-label="{titre}" width="100%" height="170">
<path d="M18 138 C70 138 70 92 118 92 S170 132 214 108 S262 44 296 40" fill="none" stroke="#3DDC97" stroke-opacity=".55" stroke-width="5" stroke-dasharray="2 11" stroke-linecap="round"/>
<g font-family="Lilita One, sans-serif" font-size="15" text-anchor="middle" fill="#0F1224">
<circle cx="18" cy="138" r="14" fill="#3DDC97"/><text x="18" y="143">1</text>
<circle cx="118" cy="92" r="14" fill="#3DDC97"/><text x="118" y="97">12</text>
<circle cx="214" cy="108" r="14" fill="#3DDC97"/><text x="214" y="113">21</text>
<circle cx="296" cy="40" r="19" fill="#F5B942" stroke="#FFE08A" stroke-width="3"/><text x="296" y="46" font-size="17">30</text>
</g>
<text x="270" y="78" text-anchor="middle" fill="#F5B942" font-family="DM Sans, sans-serif" font-weight="700" font-size="13">{titre}</text>
</svg>'''


def svg_evenement(titre):
    """20 étapes : une grille de pastilles dont les premières sont gagnées."""
    pts = []
    for i in range(20):
        col, lig = i % 5, i // 5
        x, y = 34 + col * 62, 24 + lig * 36
        if i < 12:
            pts.append(f'<circle cx="{x}" cy="{y}" r="13" fill="#B58CFF"/><path d="M{x-5} {y} l4 4 l7 -8" fill="none" stroke="#0F1224" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
        elif i == 12:
            pts.append(f'<circle cx="{x}" cy="{y}" r="13" fill="#0F1224" stroke="#F5B942" stroke-width="3"/>')
        else:
            pts.append(f'<circle cx="{x}" cy="{y}" r="13" fill="none" stroke="#323963" stroke-width="3"/>')
    return f'<svg viewBox="0 0 320 170" role="img" aria-label="{titre}" width="100%" height="170">{"".join(pts)}<text x="160" y="166" text-anchor="middle" fill="#B58CFF" font-family="DM Sans, sans-serif" font-weight="700" font-size="13">{titre}</text></svg>'


PRIVACY = {
    'fr': dict(
        titre='Politique de confidentialité — Quizzle', desc='Comment Quizzle traite vos données : sur votre appareil, et sur nos serveurs uniquement si vous créez un profil en ligne.',
        h1='Politique de confidentialité', maj='Dernière mise à jour : 23 novembre 2026',
        corps="""
<p>Quizzle est un jeu mobile édité par Occitan Games. Cette page explique, simplement, ce que l’application fait de vos données.</p>

<h2>En résumé</h2>
<p>Vous pouvez jouer à Quizzle sans compte : dans ce cas, rien n’est envoyé à un serveur et votre progression reste sur votre téléphone. Si vous choisissez un pseudo pour jouer avec des amis, un profil en ligne anonyme est créé et certaines données sont alors enregistrées sur nos serveurs, comme décrit ci-dessous. Vous pouvez aussi, si vous le souhaitez, lier votre compte Google ou Apple pour sauvegarder votre progression et la retrouver sur un nouveau téléphone. Il n’y a ni publicité, ni suivi publicitaire, ni vente de données.</p>

<h2>Ce qui est enregistré sur votre appareil</h2>
<ul>
<li>votre progression (niveaux, étapes d’événements, cartes, jokers, glaçons, pièces) ;</li>
<li>vos statistiques de jeu (parties, victoires, séries) ;</li>
<li>vos préférences (langue, difficulté, tranche d’âge) ;</li>
<li>les événements à thème téléchargés depuis notre serveur, pour pouvoir jouer sans connexion.</li>
</ul>
<p>Ces informations sont stockées dans la mémoire de l’application, sur votre téléphone. Elles disparaissent si vous désinstallez l’application ou effacez ses données.</p>

<h2>Le profil en ligne (facultatif)</h2>
<p>Le profil en ligne est créé uniquement lorsque vous choisissez un pseudo dans l’écran « Mon profil ». Il n’y a ni adresse e-mail, ni numéro de téléphone, ni nom réel : un identifiant aléatoire est généré sur votre téléphone. Le serveur ne conserve de votre code secret qu’une empreinte (hachage). Sont alors enregistrés :</p>
<ul>
<li>votre pseudo, et un code ami à partager si vous le souhaitez ;</li>
<li>votre résultat au mystère du jour (nombre d’essais, réussite, score), visible de vos amis et des membres de vos clans ;</li>
<li>vos demandes d’amis, vos amis, vos clans, vos défis et vos réactions, ainsi que les personnes que vous bloquez ou signalez ;</li>
<li>si vous activez les notifications : un jeton de notification propre à votre téléphone et votre langue.</li>
</ul>
<p>Ces données servent uniquement à faire fonctionner ces fonctionnalités (voir vos amis, les défis, les classements, les notifications) et à modérer les pseudos : les pseudos peuvent être vérifiés par l’éditeur, et un pseudo signalé par plusieurs joueurs est masqué. Elles sont conservées tant que votre profil existe.</p>

<h2>Sauvegarde avec votre compte Google ou Apple (facultatif)</h2>
<p>Dans « Préférences », vous pouvez lier votre compte Google (Android et iPhone) ou Apple (iPhone) pour sauvegarder votre progression et la retrouver si vous changez de téléphone, même d’Android à iPhone. Cette fonction est facultative : sans elle, rien n’est sauvegardé en ligne.</p>
<p>Lorsque vous liez un compte, notre serveur reçoit de Google ou d’Apple un identifiant anonyme propre à Quizzle. Nous ne recevons ni votre adresse e-mail, ni votre nom, ni votre photo. Nous enregistrons cet identifiant, ainsi qu’une copie de votre progression (niveaux, étapes d’événements, collection, pièces, jokers, costumes, statistiques, quêtes et préférences de jeu), mise à jour automatiquement.</p>
<p>Lorsque vous restaurez votre progression sur un nouveau téléphone, ce téléphone devient le seul à pouvoir mettre à jour la sauvegarde ; l’ancien perd cet accès.</p>
<p>Ces données servent uniquement à la sauvegarde et à la restauration. Elles sont conservées tant que votre profil existe et sont effacées par le bouton « Supprimer mes données en ligne ».</p>

<h2>Événements à thème</h2>
<p>L’application télécharge les événements à thème depuis notre serveur à l’ouverture. Cette requête ne contient aucune donnée personnelle ; comme pour toute connexion, l’adresse IP est traitée techniquement par l’hébergeur.</p>

<h2>Notifications</h2>
<p>Les notifications (demande d’ami reçue, demande acceptée, défi reçu) sont facultatives : l’application demande votre autorisation et vous pouvez les couper à tout moment depuis « Mon profil » ou depuis les réglages de votre téléphone. Elles sont acheminées par le service de notifications d’Expo puis par les services de notification d’Apple (iPhone) ou de Google (Android).</p>

<h2>Supprimer vos données en ligne</h2>
<p>Le bouton « Supprimer mes données en ligne » de l’écran « Mon profil » efface immédiatement votre profil et toutes les données associées sur nos serveurs (pseudo, résultats, amis, clans, défis, réactions, jeton de notification, compte lié et sauvegarde). Vous pouvez aussi écrire à <a href="mailto:contact@occitangames.com">contact@occitangames.com</a>.</p>

<h2>Prestataires techniques</h2>
<ul>
<li>Cloudflare (hébergement du serveur et de la base de données, et de ce site) : comme tout hébergeur, il traite techniquement les adresses IP des connexions ;</li>
<li>Expo, Apple et Google, pour l’acheminement des notifications ;</li>
<li>Apple et Google, uniquement si vous choisissez de lier votre compte (connexion).</li>
</ul>
<p>Aucune donnée n’est vendue ni utilisée à des fins publicitaires.</p>

<h2>Ce que nous ne faisons pas</h2>
<ul>
<li>aucune publicité et aucun suivi publicitaire ;</li>
<li>aucun outil de mesure d’audience dans l’application ;</li>
<li>aucune lecture de votre carnet d’adresses, de votre position ou de vos photos.</li>
</ul>

<h2>Partage et notation</h2>
<p>Les boutons de partage ouvrent le menu de partage de votre téléphone : le message n’est envoyé que si vous choisissez une application et un destinataire. L’éventuelle invitation à noter l’application utilise la fenêtre fournie par l’App Store ou Google Play ; l’éditeur ne reçoit pas votre note comme donnée personnelle.</p>

<h2>Publicité et achats</h2>
<p>La version actuelle ne contient ni publicité ni achat avec de l’argent réel. Si cela change, cette politique sera mise à jour avant la mise en ligne de la nouvelle version, et les paiements passeront par l’App Store ou Google Play, qui gèrent eux-mêmes les informations de paiement.</p>

<h2>Âge minimum</h2>
<p>Quizzle s’adresse aux personnes de 13 ans et plus.</p>

<h2>Ce site</h2>
<p>Ce site n’utilise aucun cookie de suivi ni outil de mesure d’audience. Les polices de caractères sont hébergées sur le site lui-même.</p>

<h2>Vos droits</h2>
<p>Vous pouvez accéder à vos données, les corriger ou les supprimer : le pseudo se modifie dans l’application, et la suppression se fait depuis « Mon profil » ou en écrivant à <a href="mailto:contact@occitangames.com">contact@occitangames.com</a>. Vous pouvez aussi saisir la CNIL (<a href="https://www.cnil.fr">cnil.fr</a>).</p>

<h2>Modifications</h2>
<p>Cette politique peut évoluer avec l’application. La date de mise à jour figure en haut de cette page.</p>
"""),
    'en': dict(
        titre='Privacy policy — Quizzle', desc='How Quizzle handles your data: on your device, and on our servers only if you create an online profile.',
        h1='Privacy policy', maj='Last updated: 23 November 2026',
        corps="""
<p>Quizzle is a mobile game published by Occitan Games. This page explains, simply, what the app does with your data.</p>

<h2>In short</h2>
<p>You can play Quizzle without an account: in that case nothing is sent to a server and your progress stays on your phone. If you choose a nickname to play with friends, an anonymous online profile is created and some data is then stored on our servers, as described below. You can also, if you wish, link your Google or Apple account to back up your progress and get it back on a new phone. There are no ads, no advertising tracking and no sale of data.</p>

<h2>What is stored on your device</h2>
<ul>
<li>your progress (levels, event steps, cards, jokers, ice cubes, coins);</li>
<li>your game statistics (games, wins, streaks);</li>
<li>your preferences (language, difficulty, age group);</li>
<li>themed events downloaded from our server, so you can play offline.</li>
</ul>
<p>This information is stored in the app’s storage, on your phone. It disappears if you uninstall the app or clear its data.</p>

<h2>The online profile (optional)</h2>
<p>The online profile is created only when you choose a nickname in the “My profile” screen. There is no e-mail address, phone number or real name: a random identifier is generated on your phone. The server keeps only a hash of your secret code. The following is then stored:</p>
<ul>
<li>your nickname, and a friend code you may share;</li>
<li>your result for the daily mystery (number of tries, success, score), visible to your friends and to the members of your clans;</li>
<li>your friend requests, friends, clans, challenges and reactions, and the players you block or report;</li>
<li>if you turn on notifications: a notification token specific to your phone, and your language.</li>
</ul>
<p>This data is used only to make these features work (seeing your friends, challenges, leaderboards, notifications) and to moderate nicknames: nicknames may be reviewed by the publisher, and a nickname reported by several players is hidden. It is kept as long as your profile exists.</p>

<h2>Backup with your Google or Apple account (optional)</h2>
<p>In “Settings”, you can link your Google account (Android and iPhone) or Apple account (iPhone) to back up your progress and get it back if you change phones, even from Android to iPhone. This is optional: without it, nothing is backed up online.</p>
<p>When you link an account, our server receives from Google or Apple an anonymous identifier specific to Quizzle. We do not receive your e-mail address, your name or your photo. We store this identifier and a copy of your progress (levels, event steps, collection, coins, jokers, outfits, statistics, quests and game settings), updated automatically.</p>
<p>When you restore your progress on a new phone, that phone becomes the only one able to update the backup; the old one loses this access.</p>
<p>This data is used only for backup and restore. It is kept as long as your profile exists and is erased by the “Delete my online data” button.</p>

<h2>Themed events</h2>
<p>The app downloads themed events from our server when it opens. This request contains no personal data; as with any connection, the IP address is technically processed by the host.</p>

<h2>Notifications</h2>
<p>Notifications (friend request received, request accepted, challenge received) are optional: the app asks for your permission and you can turn them off at any time from “My profile” or from your phone’s settings. They are delivered through Expo’s notification service and then through Apple’s (iPhone) or Google’s (Android) notification services.</p>

<h2>Deleting your online data</h2>
<p>The “Delete my online data” button in the “My profile” screen immediately erases your profile and all associated data on our servers (nickname, results, friends, clans, challenges, reactions, notification token, linked account and backup). You can also write to <a href="mailto:contact@occitangames.com">contact@occitangames.com</a>.</p>

<h2>Technical providers</h2>
<ul>
<li>Cloudflare (hosting of the server, the database and this website): like any host, it technically processes connection IP addresses;</li>
<li>Expo, Apple and Google, to deliver notifications;</li>
<li>Apple and Google, only if you choose to link your account (sign-in).</li>
</ul>
<p>No data is sold or used for advertising.</p>

<h2>What we do not do</h2>
<ul>
<li>no ads and no advertising tracking;</li>
<li>no analytics tool in the app;</li>
<li>no reading of your address book, your location or your photos.</li>
</ul>

<h2>Sharing and rating</h2>
<p>The share buttons open your phone’s share menu: a message is sent only if you choose an app and a recipient. The optional prompt to rate the app uses the window provided by the App Store or Google Play; the publisher does not receive your rating as personal data.</p>

<h2>Ads and purchases</h2>
<p>The current version contains no ads and no purchases with real money. If this changes, this policy will be updated before the new version is released, and payments will go through the App Store or Google Play, which handle payment information themselves.</p>

<h2>Minimum age</h2>
<p>Quizzle is intended for people aged 13 and over.</p>

<h2>This website</h2>
<p>This website uses no tracking cookies and no analytics. Fonts are hosted on the site itself.</p>

<h2>Your rights</h2>
<p>You can access, correct or delete your data: the nickname can be changed in the app, and deletion is done from “My profile” or by writing to <a href="mailto:contact@occitangames.com">contact@occitangames.com</a>. You may also contact the French data protection authority, the CNIL (<a href="https://www.cnil.fr/en">cnil.fr</a>).</p>

<h2>Changes</h2>
<p>This policy may change as the app evolves. The update date is shown at the top of this page.</p>
"""),
}

LEGAL = {
    'fr': dict(
        titre='Mentions légales — Quizzle', desc='Mentions légales du site Quizzle / Occitan Games.',
        h1='Mentions légales',
        corps=f'''
<h2>Éditeur du site</h2>
<p>Le jeu Quizzle est édité sous la marque Occitan Games par <strong>Solauw Sound</strong>, entrepreneur individuel.<br>
Entrepreneur individuel : Julien Benichou<br>
SIRET : 452 394 174 00034<br>
Adresse : Limoux (Aude), France<br>
Contact : <a href="mailto:{CONTACT}">{CONTACT}</a></p>
<p>Directeur de la publication : Julien Benichou.</p>

<h2>Hébergeur</h2>
<p>Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis — <a href="https://www.cloudflare.com">cloudflare.com</a></p>

<h2>Propriété intellectuelle</h2>
<p>Le jeu Quizzle, son nom, son logo, sa mascotte et les contenus de ce site sont la propriété d’Occitan Games. Toute reproduction sans autorisation est interdite.</p>

<h2>Données personnelles</h2>
<p>Voir la <a href="confidentialite.html">politique de confidentialité</a>.</p>
'''),
    'en': dict(
        titre='Legal notice — Quizzle', desc='Legal notice for the Quizzle / Occitan Games website.',
        h1='Legal notice',
        corps=f'''
<h2>Publisher</h2>
<p>The game Quizzle is published under the Occitan Games brand by <strong>Solauw Sound</strong>, sole proprietor (France).<br>
Sole proprietor: Julien Benichou<br>
SIRET: 452 394 174 00034<br>
Address: Limoux (Aude), France<br>
Contact: <a href="mailto:{CONTACT}">{CONTACT}</a></p>
<p>Publication director: Julien Benichou.</p>

<h2>Hosting</h2>
<p>Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, USA — <a href="https://www.cloudflare.com">cloudflare.com</a></p>

<h2>Intellectual property</h2>
<p>The game Quizzle, its name, logo, mascot and the content of this site are the property of Occitan Games. Reproduction without permission is prohibited.</p>

<h2>Personal data</h2>
<p>See the <a href="privacy.html">privacy policy</a>.</p>
'''),
}


def page_texte(t, contenu, canon, chemin_autre):
    html = ouverture_page(t, contenu['titre'], contenu['desc'], chemin_autre, canon, noindex=False)
    html += entete(t, ('../' + chemin_autre) if t['lang'] == 'en' else chemin_autre, accueil=False)
    maj = f'<p class="maj">{contenu["maj"]}</p>' if 'maj' in contenu else ''
    html += f'<main id="contenu" class="page"><div class="conteneur"><h1>{contenu["h1"]}</h1>{maj}{contenu["corps"]}</div></main>\n'
    html += pied(t)
    return html


def page_lien():
    """Lien universel /quizzle : envoie chacun vers son store (iPhone, Android) ; sinon, page avec les deux boutons.
    C'est cette adresse que l'appli met dans ses messages de partage : elle ne change jamais, seule cette page évolue."""
    t = dict(TEXTES['fr'], racine='../', url_conf='../confidentialite.html', url_ment='../mentions-legales.html')
    t_en = TEXTES['en']
    titre = 'Quizzle : télécharge le jeu des mystères, gratuit'
    desc = 'Six indices, une seule réponse. Quizzle est gratuit, sans pub, et créé en famille. Télécharge-le sur iPhone et Android.'
    html = ouverture_page(t, titre, desc, 'en/', 'quizzle')
    html += entete(t, '../en/', accueil=False)
    html += f'''<main id="contenu" class="page lien"><div class="conteneur" style="text-align:center">
{mot_marque()}
<h1><span data-l="fr">Télécharge Quizzle</span><span data-l="en" hidden>Download Quizzle</span></h1>
<p class="chapeau" style="margin:14px auto 22px"><span data-l="fr">Six indices, une seule réponse. Gratuit, sans pub, créé en famille.</span><span data-l="en" hidden>Six clues, one answer. Free, no ads, made by a family.</span></p>
<div id="telecharger">{boutiques(t)}</div>
<p class="note" style="margin-top:16px"><span data-l="fr">{t['note_dispo'] if (LIEN_APP_STORE or LIEN_GOOGLE_PLAY) else t['note_bientot']}</span><span data-l="en" hidden>{t_en['note_dispo'] if (LIEN_APP_STORE or LIEN_GOOGLE_PLAY) else t_en['note_bientot']}</span></p>
</div></main>
<script>
(function () {{
  var ua = navigator.userAgent || '';
  var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var android = /Android/.test(ua);
  var langue = ((navigator.language || 'fr') + '').slice(0, 2) === 'fr' ? 'fr' : 'en';
  var nodes = document.querySelectorAll('[data-l]');
  for (var i = 0; i < nodes.length; i++) nodes[i].hidden = nodes[i].getAttribute('data-l') !== langue;
  var apple = {json.dumps(LIEN_APP_STORE)}, play = {json.dumps(LIEN_GOOGLE_PLAY)};
  var cible = ios && apple ? apple : (android && play ? play : '');
  if (cible) location.replace(cible);
}})();
</script>
'''
    html += pied(t)
    return html


def page_jouer(source=''):
    """Pages « /jouer » pour les réseaux sociaux (vouvoiement) : même logique que /quizzle (iPhone -> App Store,
    Android -> Google Play, sinon boutons), mais une adresse par réseau (/jouer/facebook/, etc.) afin de mesurer
    d'où viennent les visiteurs dans le tableau de bord (qui compte les pages vues par chemin)."""
    prof = 2 if source else 1
    racine = '../' * prof
    t = dict(TEXTES['fr'], racine=racine, url_conf=racine + 'confidentialite.html', url_ment=racine + 'mentions-legales.html')
    t_en = TEXTES['en']
    chemin = 'jouer/' + (source + '/' if source else '')
    titre = 'Quizzle : téléchargez le jeu des mystères, gratuit'
    desc = 'Six indices, une seule réponse. Quizzle est gratuit, sans pub, et créé en famille. Téléchargez-le sur iPhone et Android.'
    html = ouverture_page(t, titre, desc, 'en/', chemin, noindex=True)
    html += entete(t, racine + 'en/', accueil=False)
    html += f'''<main id="contenu" class="page lien"><div class="conteneur" style="text-align:center">
{mot_marque()}
<h1><span data-l="fr">Téléchargez Quizzle</span><span data-l="en" hidden>Download Quizzle</span></h1>
<p class="chapeau" style="margin:14px auto 22px"><span data-l="fr">Six indices, une seule réponse. Gratuit, sans pub, créé en famille.</span><span data-l="en" hidden>Six clues, one answer. Free, no ads, made by a family.</span></p>
<div id="telecharger" style="display:flex;justify-content:center">{boutiques(t)}</div>
<p class="note" style="margin-top:16px"><span data-l="fr">{t['note_dispo']}</span><span data-l="en" hidden>{t_en['note_dispo']}</span></p>
</div></main>
<script>
(function () {{
  var ua = navigator.userAgent || '';
  var ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var android = /Android/.test(ua);
  var langue = ((navigator.language || 'fr') + '').slice(0, 2) === 'fr' ? 'fr' : 'en';
  var nodes = document.querySelectorAll('[data-l]');
  for (var i = 0; i < nodes.length; i++) nodes[i].hidden = nodes[i].getAttribute('data-l') !== langue;
  var apple = {json.dumps(LIEN_APP_STORE)}, play = {json.dumps(LIEN_GOOGLE_PLAY)};
  var cible = ios && apple ? apple : (android && play ? play : '');
  if (cible) location.replace(cible);
}})();
</script>
'''
    html += pied(t)
    return html


def ecrire(chemin, contenu):
    complet = os.path.join(ICI, chemin)
    os.makedirs(os.path.dirname(complet), exist_ok=True)
    with open(complet, 'w', encoding='utf-8') as f:
        f.write(contenu)


if __name__ == '__main__':
    fr, en = TEXTES['fr'], TEXTES['en']
    ecrire('index.html', page_accueil(fr))
    ecrire('en/index.html', page_accueil(en))
    ecrire('quizzle/index.html', page_lien())
    ecrire('jouer/index.html', page_jouer())
    for _src in ('facebook', 'instagram', 'tiktok', 'youtube'):
        ecrire(f'jouer/{_src}/index.html', page_jouer(_src))
    ecrire('confidentialite.html', page_texte(fr, PRIVACY['fr'], 'confidentialite.html', 'en/privacy.html'))
    ecrire('en/privacy.html', page_texte(en, PRIVACY['en'], 'en/privacy.html', 'confidentialite.html'))
    ecrire('mentions-legales.html', page_texte(fr, LEGAL['fr'], 'mentions-legales.html', 'en/legal.html'))
    ecrire('en/legal.html', page_texte(en, LEGAL['en'], 'en/legal.html', 'mentions-legales.html'))
    # sitemap et robots
    urls = ['', 'en/', 'confidentialite.html', 'en/privacy.html', 'mentions-legales.html', 'en/legal.html']
    ecrire('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + ''.join(f'<url><loc>{SITE}/{u}</loc></url>\n' for u in urls) + '</urlset>\n')
    ecrire('robots.txt', f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n')
    print('Site généré.')
