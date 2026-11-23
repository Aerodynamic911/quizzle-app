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

// Noël autour du monde (décembre 2026)
const NOEL_2026 = {
  "id": "noel-2026",
  "debut": "2026-12-01",
  "fin": "2026-12-31",
  "emoji": "🎄",
  "couleur": "#E5484D",
  "titre": {
    "fr": "Noël autour du monde",
    "en": "Christmas Around the World"
  },
  "description": {
    "fr": "20 traditions, plats, personnages et lieux de Noël à deviner, de la Provence au Japon.",
    "en": "20 Christmas traditions, dishes, characters and places to guess, from Provence to Japan."
  },
  "etapes": [
    {
      "fr": {
        "id": "noel26-pere-noel",
        "categorie": "Personnage",
        "reponse": "Le Père Noël",
        "alias": [
          "Père Noël",
          "Pere Noel",
          "Santa Claus",
          "Santa"
        ],
        "indices": [
          "On me connaît sous des noms différents selon les pays.",
          "Je voyage une seule nuit par an, et je suis très pressé.",
          "Des rennes tirent mon traîneau.",
          "On dit que je passe par les cheminées.",
          "Mon habit est rouge, bordé de fourrure blanche.",
          "Je dépose des cadeaux au pied du sapin en riant « Ho ! Ho ! Ho ! »."
        ],
        "anecdote": "Le personnage s'inspire de saint Nicolas. Dans les années 1930, des publicités américaines ont beaucoup contribué à fixer son habit rouge et blanc."
      },
      "en": {
        "c": "Character",
        "r": "Santa Claus",
        "a": [
          "Father Christmas",
          "Santa",
          "Saint Nick",
          "Père Noël"
        ],
        "i": [
          "I go by many different names depending on the country.",
          "I travel for just one night a year, and I'm in a big hurry.",
          "Reindeer pull my sleigh.",
          "They say I come down the chimney.",
          "My outfit is red, trimmed with white fur.",
          "I leave gifts under the tree with a hearty “Ho! Ho! Ho!”."
        ],
        "n": "The character is inspired by Saint Nicholas. In the 1930s, American advertising did a lot to fix his red-and-white outfit in people's minds."
      }
    },
    {
      "fr": {
        "id": "noel26-sapin",
        "categorie": "Objet",
        "reponse": "Le sapin de Noël",
        "alias": [
          "Sapin",
          "Sapin de Noel",
          "Arbre de Noël",
          "Épicéa"
        ],
        "indices": [
          "Je viens de la forêt, mais on m'installe dans le salon.",
          "Je reste vert même en plein hiver.",
          "Mon usage dans les maisons vient d'Europe centrale, il y a plusieurs siècles.",
          "On me couvre de boules, de guirlandes et de petites lumières.",
          "Une étoile ou un ange brille tout en haut de moi.",
          "Les cadeaux s'entassent à mes pieds."
        ],
        "anecdote": "La plus ancienne mention écrite connue d'un sapin de Noël date de 1521, à Sélestat, en Alsace."
      },
      "en": {
        "c": "Object",
        "r": "The Christmas tree",
        "a": [
          "Christmas tree",
          "Tree",
          "Fir tree",
          "Fir"
        ],
        "i": [
          "I come from the forest, yet I stand in the living room.",
          "I stay green even in the depths of winter.",
          "My place in people's homes comes from central Europe, several centuries ago.",
          "I'm covered in baubles, garlands and tiny lights.",
          "A star or an angel shines at my very top.",
          "Presents pile up at my feet."
        ],
        "n": "The oldest known written mention of a Christmas tree dates from 1521, in Sélestat, Alsace."
      }
    },
    {
      "fr": {
        "id": "noel26-buche",
        "categorie": "Plat",
        "reponse": "La bûche de Noël",
        "alias": [
          "Bûche",
          "Buche",
          "Buche de Noel",
          "Bûche pâtissière"
        ],
        "indices": [
          "À l'origine, j'étais vraiment un morceau de bois.",
          "On me faisait brûler dans la cheminée pendant la veillée.",
          "Aujourd'hui, je suis un dessert que l'on mange à la fin du repas.",
          "Je suis roulée, comme un biscuit enroulé sur une crème.",
          "On me décore avec des champignons en meringue ou du houx en sucre.",
          "Mon nom désigne un gros morceau de bois qu'on jette au feu."
        ],
        "anecdote": "La bûche pâtissière en forme de tronc est apparue au XIXᵉ siècle, en souvenir de la vraie bûche que l'on brûlait à Noël."
      },
      "en": {
        "c": "Dish",
        "r": "Yule log",
        "a": [
          "Bûche de Noël",
          "Buche de Noel",
          "Yule log cake",
          "Christmas log",
          "Log cake"
        ],
        "i": [
          "Originally, I was really a piece of wood.",
          "I was burned in the fireplace during the evening gathering.",
          "Today I'm a dessert eaten at the end of the meal.",
          "I'm rolled up, like a sponge wrapped around cream.",
          "I'm decorated with meringue mushrooms or sugar holly.",
          "I'm named after a big chunk of wood that goes on the fire."
        ],
        "n": "The cake shaped like a log appeared in the 19th century, in memory of the real log once burned at Christmas."
      }
    },
    {
      "fr": {
        "id": "noel26-strasbourg",
        "categorie": "Lieu",
        "reponse": "Le marché de Noël de Strasbourg",
        "alias": [
          "Strasbourg",
          "Marché de Noël de Strasbourg",
          "Christkindelsmärik",
          "Christkindelsmaerik"
        ],
        "indices": [
          "Je suis installé dans une ville qui se dit « Capitale de Noël ».",
          "Mon nom en dialecte local évoque l'Enfant Jésus.",
          "J'existe depuis 1570, ce qui fait de moi l'un des plus anciens d'Europe.",
          "Je me tiens autour d'une cathédrale gothique à la flèche rose.",
          "On y boit du vin chaud et on y mange des bredele.",
          "Ma ville est la capitale de l'Alsace."
        ],
        "anecdote": "Le Christkindelsmärik de Strasbourg est organisé depuis 1570. Selon les organisateurs, il accueille environ deux millions de visiteurs chaque année."
      },
      "en": {
        "c": "Place",
        "r": "Strasbourg Christmas Market",
        "a": [
          "Strasbourg",
          "Christkindelsmärik",
          "Christkindelsmaerik",
          "Strasbourg market"
        ],
        "i": [
          "I'm set up in a city that calls itself the “Capital of Christmas”.",
          "My name in the local dialect refers to the Christ Child.",
          "I've existed since 1570, making me one of the oldest in Europe.",
          "I stand around a Gothic cathedral with a pink sandstone spire.",
          "People drink mulled wine and eat bredele biscuits here.",
          "My city is the capital of Alsace."
        ],
        "n": "Strasbourg's Christkindelsmärik has been held since 1570. According to its organisers, it welcomes around two million visitors every year."
      }
    },
    {
      "fr": {
        "id": "noel26-santons",
        "categorie": "Tradition",
        "reponse": "Les santons de Provence",
        "alias": [
          "Santons",
          "Santon",
          "Santons de Provence",
          "Crèche provençale"
        ],
        "indices": [
          "Nous sommes très petits, mais nous formons tout un village.",
          "On nous fabrique en argile, puis on nous peint à la main.",
          "Nous représentons un boulanger, un meunier, une lavandière, un berger…",
          "Notre nom vient du provençal et veut dire « petits saints ».",
          "Marseille nous consacre une grande foire chaque année depuis 1803.",
          "Nous entourons l'Enfant Jésus dans la crèche de Provence."
        ],
        "anecdote": "Les premiers santons d'argile sont attribués à Jean-Louis Lagnel, à Marseille, à la fin du XVIIIᵉ siècle."
      },
      "en": {
        "c": "Tradition",
        "r": "Provençal santons",
        "a": [
          "Santons",
          "Santon",
          "Provence nativity figurines",
          "Nativity figurines"
        ],
        "i": [
          "We are tiny, yet together we make up a whole village.",
          "We are made of clay, then painted by hand.",
          "We play the baker, the miller, the washerwoman, the shepherd…",
          "Our name comes from Provençal and means “little saints”.",
          "Marseille has held a big fair for us every year since 1803.",
          "We stand around the Baby Jesus in the Provençal nativity scene."
        ],
        "n": "The first clay santons are credited to Jean-Louis Lagnel, in Marseille, at the end of the 18th century."
      }
    },
    {
      "fr": {
        "id": "noel26-panettone",
        "categorie": "Plat",
        "reponse": "Le panettone",
        "alias": [
          "Panettone",
          "Panetone",
          "Pain de Milan"
        ],
        "indices": [
          "Je viens d'Italie, plus précisément du nord du pays.",
          "Selon une légende, je viendrais du « pain de Toni ».",
          "Je suis une brioche haute et moelleuse, en forme de dôme.",
          "Je suis garni de raisins secs et d'écorces d'orange et de cédrat confites.",
          "On me coupe en parts, souvent avec un vin doux ou de la crème mascarpone.",
          "Ma ville d'origine est Milan, et j'orne les tables italiennes à Noël."
        ],
        "anecdote": "Selon une légende milanaise, le panettone serait né du « pan de Toni », le pain de Toni, un marmiton du XVᵉ siècle."
      },
      "en": {
        "c": "Dish",
        "r": "Panettone",
        "a": [
          "Panetone",
          "Milanese Christmas bread"
        ],
        "i": [
          "I come from Italy, more precisely from the north of the country.",
          "According to a legend, my name comes from “Toni's bread”.",
          "I'm a tall, soft brioche shaped like a dome.",
          "I'm studded with raisins and candied orange and citron peel.",
          "I'm cut into slices, often served with sweet wine or mascarpone cream.",
          "My home city is Milan, and I decorate Italian tables at Christmas."
        ],
        "n": "According to a Milanese legend, panettone was born from “pan de Toni”, the bread of a kitchen boy named Toni in the 15th century."
      }
    },
    {
      "fr": {
        "id": "noel26-saint-nicolas",
        "categorie": "Personnage",
        "reponse": "Saint Nicolas",
        "alias": [
          "Nicolas",
          "Saint-Nicolas",
          "St Nicolas",
          "Sinterklaas"
        ],
        "indices": [
          "Je suis né il y a environ 1 700 ans, dans l'actuelle Turquie.",
          "J'étais évêque d'une ville nommée Myre.",
          "On raconte que je donnais en secret de l'argent aux familles pauvres.",
          "On me fête le 6 décembre, notamment en Lorraine et aux Pays-Bas.",
          "Mon compagnon, le Père Fouettard, punit les enfants désobéissants.",
          "On dit que je suis l'ancêtre du Père Noël, avec ma mitre, ma crosse et ma longue barbe."
        ],
        "anecdote": "Saint Nicolas est le patron des enfants, mais aussi de la Lorraine. Aux Pays-Bas, Sinterklaas a donné, par déformation, le nom « Santa Claus »."
      },
      "en": {
        "c": "Character",
        "r": "Saint Nicholas",
        "a": [
          "Nicholas",
          "St Nicholas",
          "Sinterklaas"
        ],
        "i": [
          "I was born around 1,700 years ago, in what is now Turkey.",
          "I was the bishop of a city called Myra.",
          "The story goes that I secretly gave money to poor families.",
          "I'm celebrated on 6 December, notably in Lorraine and the Netherlands.",
          "My companion, Black Peter or Père Fouettard, punishes naughty children.",
          "They say I'm the ancestor of Santa Claus, with my mitre, my crozier and my long beard."
        ],
        "n": "Saint Nicholas is the patron saint of children. In the Netherlands, Sinterklaas is the origin, through gradual alteration, of the name “Santa Claus”."
      }
    },
    {
      "fr": {
        "id": "noel26-befana",
        "categorie": "Personnage",
        "reponse": "La Befana",
        "alias": [
          "Befana",
          "La Befana",
          "Sorcière Befana"
        ],
        "indices": [
          "Je suis une vieille femme, et je ne suis pas très belle.",
          "Je voyage dans la nuit du 5 au 6 janvier.",
          "Je vole sur un balai, mais je ne suis pas vraiment méchante.",
          "Je remplis des chaussettes de bonbons pour les enfants sages.",
          "Pour les enfants pas sages, je laisse du charbon, en sucre ou non.",
          "Je suis une sorcière bienveillante, célèbre en Italie."
        ],
        "anecdote": "Selon la légende, la Befana a refusé de suivre les Rois mages vers Bethléem. Elle l'a regretté et cherche depuis l'Enfant Jésus en laissant des cadeaux."
      },
      "en": {
        "c": "Character",
        "r": "La Befana",
        "a": [
          "Befana"
        ],
        "i": [
          "I'm an old woman, and not a very pretty one.",
          "I travel in the night between 5 and 6 January.",
          "I fly on a broomstick, but I'm not really wicked.",
          "I fill stockings with sweets for good children.",
          "For naughty children, I leave coal, made of sugar or not.",
          "I'm a kind-hearted witch, famous in Italy."
        ],
        "n": "According to legend, the Befana refused to follow the Three Wise Men to Bethlehem. She regretted it and has been searching for the Christ Child ever since, leaving gifts along the way."
      }
    },
    {
      "fr": {
        "id": "noel26-posadas",
        "categorie": "Tradition",
        "reponse": "Les Posadas",
        "alias": [
          "Posadas",
          "Las Posadas",
          "Posada"
        ],
        "indices": [
          "Je dure neuf soirs, du 16 au 24 décembre.",
          "Je suis très célèbre au Mexique.",
          "On rejoue la recherche d'un logement par Marie et Joseph à Bethléem.",
          "Mon nom veut dire « auberges » en espagnol.",
          "On marche en procession avec des bougies et on chante devant les portes.",
          "Une piñata remplie de bonbons est cassée à la fin."
        ],
        "anecdote": "Chaque soir, la procession demande l'hospitalité à une maison, puis tout le monde fait la fête. La piñata traditionnelle a sept pointes."
      },
      "en": {
        "c": "Tradition",
        "r": "Las Posadas",
        "a": [
          "Posadas",
          "Posada"
        ],
        "i": [
          "I last nine evenings, from 16 to 24 December.",
          "I'm very famous in Mexico.",
          "People re-enact Mary and Joseph's search for lodging in Bethlehem.",
          "My name means “inns” in Spanish.",
          "People walk in procession with candles and sing at doors.",
          "A piñata filled with sweets is broken at the end."
        ],
        "n": "Each evening, the procession asks a house for shelter, then everyone celebrates. The traditional piñata has seven points."
      }
    },
    {
      "fr": {
        "id": "noel26-rockefeller",
        "categorie": "Lieu",
        "reponse": "Le sapin du Rockefeller Center",
        "alias": [
          "Rockefeller Center",
          "Rockefeller",
          "Sapin de New York",
          "Sapin de Rockefeller"
        ],
        "indices": [
          "Je suis un sapin immense, coupé et transporté chaque année.",
          "Je suis allumé lors d'une cérémonie retransmise à la télévision.",
          "Mon histoire commence en 1931, quand des ouvriers de chantier ont dressé un petit arbre.",
          "Je suis couvert de dizaines de milliers de lumières.",
          "Une étoile de cristal brille sur ma pointe.",
          "Je me dresse au pied d'un gratte-ciel de Manhattan, près d'une patinoire célèbre."
        ],
        "anecdote": "Le premier sapin a été dressé en 1931 par les ouvriers du chantier. La cérémonie officielle d'illumination date de 1933."
      },
      "en": {
        "c": "Place",
        "r": "The Rockefeller Center Christmas Tree",
        "a": [
          "Rockefeller Center",
          "Rockefeller",
          "New York Christmas tree",
          "Rockefeller tree"
        ],
        "i": [
          "I'm a huge fir tree, cut down and transported every year.",
          "I'm lit up during a ceremony shown on television.",
          "My story begins in 1931, when construction workers put up a small tree.",
          "I'm covered in tens of thousands of lights.",
          "A crystal star shines at my tip.",
          "I stand at the foot of a Manhattan skyscraper, beside a famous ice rink."
        ],
        "n": "The first tree was put up in 1931 by construction workers. The official lighting ceremony dates from 1933."
      }
    },
    {
      "fr": {
        "id": "noel26-poulet-japon",
        "categorie": "Tradition",
        "reponse": "Le poulet frit de Noël au Japon",
        "alias": [
          "Kentucky Fried Chicken",
          "KFC",
          "Poulet frit",
          "Poulet KFC",
          "Noël au Japon"
        ],
        "indices": [
          "Je suis une tradition de Noël assez inattendue, née dans les années 1970.",
          "Au Japon, Noël est surtout une fête entre amis ou en amoureux.",
          "Une campagne publicitaire de 1974 m'a lancée.",
          "Certaines familles me réservent des semaines à l'avance.",
          "Je suis servi dans un seau en carton.",
          "Je suis du poulet frit, et je viens d'une chaîne de restauration rapide américaine."
        ],
        "anecdote": "Au Japon, le poulet frit de Noël est devenu une habitude nationale après une campagne lancée en 1974. Beaucoup de familles le commandent longtemps à l'avance."
      },
      "en": {
        "c": "Tradition",
        "r": "Fried chicken at Christmas in Japan",
        "a": [
          "KFC",
          "Kentucky Fried Chicken",
          "Fried chicken",
          "Christmas in Japan"
        ],
        "i": [
          "I'm a rather unexpected Christmas tradition, born in the 1970s.",
          "In Japan, Christmas is mostly a celebration among friends or couples.",
          "An advertising campaign in 1974 launched me.",
          "Some families reserve me weeks in advance.",
          "I'm served in a cardboard bucket.",
          "I'm fried chicken, and I come from an American fast-food chain."
        ],
        "n": "In Japan, Christmas fried chicken became a national habit after a campaign launched in 1974. Many families order it long in advance."
      }
    },
    {
      "fr": {
        "id": "noel26-sainte-lucie",
        "categorie": "Fête",
        "reponse": "La fête de Sainte-Lucie",
        "alias": [
          "Sainte Lucie",
          "Sainte-Lucie",
          "Lucia",
          "Sankta Lucia",
          "Fête de la Sainte-Lucie"
        ],
        "indices": [
          "Je suis célébrée le 13 décembre.",
          "Je viens de Scandinavie, surtout de Suède.",
          "Je fête la lumière au cœur de l'hiver.",
          "Une jeune fille en robe blanche mène un cortège en chantant.",
          "Elle porte sur la tête une couronne de bougies.",
          "On mange des petits pains au safran en forme de S."
        ],
        "anecdote": "Les petits pains au safran s'appellent « lussekatter », les chats de Lucie. La fête honore sainte Lucie, dont le nom évoque la lumière."
      },
      "en": {
        "c": "Festival",
        "r": "Saint Lucia's Day",
        "a": [
          "Saint Lucia",
          "St Lucia",
          "Lucia",
          "Santa Lucia",
          "Lucia Day"
        ],
        "i": [
          "I'm celebrated on 13 December.",
          "I come from Scandinavia, especially Sweden.",
          "I celebrate light in the heart of winter.",
          "A young girl in a white gown leads a procession, singing.",
          "She wears a crown of candles on her head.",
          "People eat saffron buns shaped like an S."
        ],
        "n": "The saffron buns are called “lussekatter”, Lucia's cats. The festival honours Saint Lucy, whose name evokes light."
      }
    },
    {
      "fr": {
        "id": "noel26-christmas-pudding",
        "categorie": "Plat",
        "reponse": "Le Christmas pudding",
        "alias": [
          "Pudding de Noël",
          "Pudding",
          "Plum pudding",
          "Christmas pudding"
        ],
        "indices": [
          "Je suis un dessert britannique, sombre et très riche.",
          "On me prépare des semaines avant Noël, souvent le dernier dimanche avant l'Avent.",
          "Chaque membre de la famille me remue en faisant un vœu.",
          "Je suis plein de raisins secs, d'épices et de fruits confits.",
          "On cache parfois une pièce de monnaie dans ma pâte, pour porter chance.",
          "On m'arrose d'alcool et on me flambe, avec une branche de houx plantée dessus."
        ],
        "anecdote": "Le pudding de Noël se prépare traditionnellement plusieurs semaines à l'avance et se conserve très bien. Le remuer en famille fait partie de la tradition."
      },
      "en": {
        "c": "Dish",
        "r": "Christmas pudding",
        "a": [
          "Plum pudding",
          "Figgy pudding",
          "Pudding"
        ],
        "i": [
          "I'm a British dessert, dark and very rich.",
          "I'm made weeks before Christmas, often on the last Sunday before Advent.",
          "Every family member stirs me while making a wish.",
          "I'm full of raisins, spices and candied fruit.",
          "Sometimes a coin is hidden in my mixture, for good luck.",
          "I'm doused in spirits and set alight, with a sprig of holly on top."
        ],
        "n": "Christmas pudding is traditionally made several weeks ahead and keeps very well. Stirring it together as a family is part of the tradition."
      }
    },
    {
      "fr": {
        "id": "noel26-rovaniemi",
        "categorie": "Lieu",
        "reponse": "Rovaniemi",
        "alias": [
          "Village du Père Noël",
          "Laponie finlandaise",
          "Rovaniemi en Laponie"
        ],
        "indices": [
          "Je suis une ville du Grand Nord, en Europe.",
          "Je me trouve en Finlande, en Laponie.",
          "Une ligne imaginaire me traverse : le cercle polaire arctique.",
          "L'hiver, on peut m'admirer sous des aurores boréales.",
          "On y fait des balades en traîneau tiré par des rennes ou des chiens huskies.",
          "Un village y accueille le Père Noël toute l'année."
        ],
        "anecdote": "Le village du Père Noël de Rovaniemi est situé sur le cercle polaire arctique, qu'une ligne tracée au sol permet de franchir en un pas."
      },
      "en": {
        "c": "Place",
        "r": "Rovaniemi",
        "a": [
          "Santa Claus Village",
          "Lapland",
          "Finnish Lapland"
        ],
        "i": [
          "I'm a city in the far north of Europe.",
          "I'm in Finland, in Lapland.",
          "An imaginary line runs through me: the Arctic Circle.",
          "In winter, you can admire me under the northern lights.",
          "Visitors go on sleigh rides pulled by reindeer or huskies.",
          "A village here welcomes Santa Claus all year round."
        ],
        "n": "Rovaniemi's Santa Claus Village sits on the Arctic Circle, which a line marked on the ground lets visitors cross in a single step."
      }
    },
    {
      "fr": {
        "id": "noel26-douce-nuit",
        "categorie": "Chanson",
        "reponse": "Douce nuit",
        "alias": [
          "Douce Nuit",
          "Stille Nacht",
          "Silent Night",
          "Sainte nuit"
        ],
        "indices": [
          "Je suis un chant de Noël né dans un petit village autrichien.",
          "On m'a chantée pour la première fois en 1818, pendant la messe de minuit.",
          "Selon la légende, l'orgue de l'église était en panne ce soir-là.",
          "Un prêtre a écrit mes paroles, un instituteur ma musique.",
          "Je suis chantée dans plus de 300 langues et dialectes.",
          "Mon titre évoque le calme d'une nuit paisible."
        ],
        "anecdote": "Composé par Franz Xaver Gruber sur des paroles de Joseph Mohr, ce chant est inscrit au patrimoine culturel immatériel de l'UNESCO en Autriche depuis 2011."
      },
      "en": {
        "c": "Song",
        "r": "Silent Night",
        "a": [
          "Stille Nacht",
          "Douce nuit"
        ],
        "i": [
          "I'm a carol born in a small Austrian village.",
          "I was first sung in 1818, during midnight Mass.",
          "According to legend, the church organ was broken that evening.",
          "A priest wrote my words, a schoolteacher my music.",
          "I'm sung in over 300 languages and dialects.",
          "My title evokes the calm of a peaceful night."
        ],
        "n": "Composed by Franz Xaver Gruber to words by Joseph Mohr, this carol has been on UNESCO's intangible cultural heritage list in Austria since 2011."
      }
    },
    {
      "fr": {
        "id": "noel26-couronne-avent",
        "categorie": "Objet",
        "reponse": "La couronne de l'Avent",
        "alias": [
          "Couronne de l'Avent",
          "Couronne de l'avent",
          "Couronne d'Avent"
        ],
        "indices": [
          "Je suis un cercle de branches, posé sur une table ou suspendu.",
          "Je viens d'Allemagne et j'ai été imaginée en 1839.",
          "Un pasteur de Hambourg m'a créée pour des enfants impatients.",
          "Quatre bougies m'entourent.",
          "On en allume une de plus chaque dimanche.",
          "Je compte les quatre semaines avant Noël."
        ],
        "anecdote": "Johann Hinrich Wichern a imaginé la première couronne à Hambourg en 1839 : une grande roue de bois portant une bougie pour chaque jour de l'Avent."
      },
      "en": {
        "c": "Object",
        "r": "Advent wreath",
        "a": [
          "Advent crown",
          "Wreath"
        ],
        "i": [
          "I'm a circle of branches, placed on a table or hung up.",
          "I come from Germany and I was dreamed up in 1839.",
          "A pastor in Hamburg created me for impatient children.",
          "Four candles surround me.",
          "One more is lit each Sunday.",
          "I count the four weeks before Christmas."
        ],
        "n": "Johann Hinrich Wichern created the first wreath in Hamburg in 1839: a large wooden wheel carrying a candle for every day of Advent."
      }
    },
    {
      "fr": {
        "id": "noel26-calendrier-avent",
        "categorie": "Objet",
        "reponse": "Le calendrier de l'Avent",
        "alias": [
          "Calendrier de l'avent",
          "Calendrier de l'Avent",
          "Calendrier avent"
        ],
        "indices": [
          "Je suis né en Allemagne, au XIXᵉ siècle, d'abord sous forme de traits à la craie.",
          "Les premières versions imprimées datent du début du XXᵉ siècle.",
          "Je compte les jours qui séparent le 1er décembre de Noël.",
          "Je comporte 24 petites cases.",
          "Chaque jour, on ouvre une porte cachant parfois un chocolat.",
          "Les enfants m'adorent pour patienter jusqu'à Noël."
        ],
        "anecdote": "Le premier calendrier imprimé est attribué à Gerhard Lang, un imprimeur de Munich, vers 1908."
      },
      "en": {
        "c": "Object",
        "r": "Advent calendar",
        "a": [
          "The Advent calendar",
          "Calendar"
        ],
        "i": [
          "I was born in Germany in the 19th century, at first as chalk marks on a wall.",
          "The first printed versions date from the early 20th century.",
          "I count the days from 1 December to Christmas.",
          "I have 24 little doors.",
          "Each day, one door opens, sometimes hiding a chocolate.",
          "Children love me for waiting until Christmas."
        ],
        "n": "The first printed calendar is credited to Gerhard Lang, a Munich printer, around 1908."
      }
    },
    {
      "fr": {
        "id": "noel26-13-desserts",
        "categorie": "Tradition",
        "reponse": "Les 13 desserts de Provence",
        "alias": [
          "13 desserts",
          "Treize desserts",
          "Les treize desserts",
          "Les 13 desserts"
        ],
        "indices": [
          "Je me sers après le gros souper du 24 décembre.",
          "Je suis une tradition du sud de la France.",
          "On y trouve des fruits secs, appelés « les quatre mendiants ».",
          "Il y a aussi des nougats blanc et noir, de la pompe à l'huile et des fruits frais ou confits.",
          "Mon nombre fait penser à Jésus et ses douze apôtres.",
          "Mon nom donne le nombre de mes desserts : treize."
        ],
        "anecdote": "Le nombre treize évoque Jésus et les douze apôtres. Les quatre mendiants (amandes, noix, figues sèches, raisins secs) rappellent les ordres religieux mendiants."
      },
      "en": {
        "c": "Tradition",
        "r": "The 13 Desserts of Provence",
        "a": [
          "13 desserts",
          "Thirteen desserts",
          "The thirteen desserts"
        ],
        "i": [
          "I'm served after the big supper on 24 December.",
          "I'm a tradition from the south of France.",
          "I include dried fruits and nuts known as “the four beggars”.",
          "I also include white and black nougat, olive-oil flatbread, and fresh or candied fruit.",
          "My number recalls Jesus and his twelve apostles.",
          "My name tells you how many desserts I have: thirteen."
        ],
        "n": "The number thirteen evokes Jesus and the twelve apostles. The four beggars (almonds, walnuts, dried figs, raisins) recall the mendicant religious orders."
      }
    },
    {
      "fr": {
        "id": "noel26-krampus",
        "categorie": "Personnage",
        "reponse": "Le Krampus",
        "alias": [
          "Krampus"
        ],
        "indices": [
          "Je suis une créature de légende des régions alpines.",
          "Je sors de l'ombre dans la nuit du 5 décembre.",
          "J'ai des cornes, une longue langue rouge et une fourrure sombre.",
          "Je secoue des chaînes et des cloches pour faire peur.",
          "Je punis les enfants désobéissants, à l'inverse de celui qui offre des cadeaux.",
          "Je suis le compagnon sinistre de saint Nicolas."
        ],
        "anecdote": "Dans les villages alpins, des défilés de Krampus ont lieu début décembre : des gens en costumes effrayants courent dans les rues en agitant des cloches."
      },
      "en": {
        "c": "Character",
        "r": "Krampus",
        "a": [
          "The Krampus"
        ],
        "i": [
          "I'm a legendary creature from the Alpine regions.",
          "I come out of the shadows on the night of 5 December.",
          "I have horns, a long red tongue and dark fur.",
          "I rattle chains and bells to scare people.",
          "I punish naughty children, unlike the one who gives presents.",
          "I'm the sinister companion of Saint Nicholas."
        ],
        "n": "In Alpine villages, Krampus parades take place in early December: people in frightening costumes run through the streets ringing bells."
      }
    },
    {
      "fr": {
        "id": "noel26-gui",
        "categorie": "Objet",
        "reponse": "Le gui",
        "alias": [
          "Gui",
          "Branche de gui",
          "Boule de gui"
        ],
        "indices": [
          "Je suis une plante, mais je ne pousse pas dans le sol.",
          "Je vis accroché aux arbres, comme les pommiers ou les peupliers.",
          "Mes baies sont blanches et toxiques.",
          "Les druides gaulois me jugeaient sacré.",
          "On me suspend à Noël pour porter chance pendant l'année.",
          "Un baiser sous mon feuillage porte chance aux amoureux."
        ],
        "anecdote": "Le gui est une plante semi-parasite : il puise l'eau de son arbre hôte. Le cri « Au gui l'an neuf » est une très ancienne tradition du Nouvel An."
      },
      "en": {
        "c": "Object",
        "r": "Mistletoe",
        "a": [
          "Mistletoe branch",
          "A sprig of mistletoe"
        ],
        "i": [
          "I'm a plant, but I don't grow in the ground.",
          "I live attached to trees, such as apple trees or poplars.",
          "My berries are white and poisonous.",
          "The Gaulish druids considered me sacred.",
          "I'm hung up at Christmas to bring luck for the year.",
          "A kiss under my leaves brings lovers good luck."
        ],
        "n": "Mistletoe is a semi-parasitic plant: it draws water from its host tree. The French cry “Au gui l'an neuf” is a very old New Year tradition."
      }
    }
  ]
};

export const EVENEMENTS_SERVEUR: EvenementServeur[] = [NOEL_2026 as unknown as EvenementServeur];
