export type TarotCard = {
  id: number;
  name: string;
  keywords: string[];
};

type Spread = {
  key: string;
  name: string;
  positions: string[];
};

const MAJOR_ARCANA: Omit<TarotCard, "id">[] = [
  { name: "Le Mat", keywords: ["voyage", "liberté", "spontanéité"] },
  { name: "Le Bateleur", keywords: ["initiative", "potentiel", "action"] },
  { name: "La Papesse", keywords: ["intuition", "mystère", "savoir"] },
  { name: "L'Impératrice", keywords: ["créativité", "abondance", "nurture"] },
  { name: "L'Empereur", keywords: ["structure", "autorité", "stabilité"] },
  { name: "Le Pape", keywords: ["tradition", "enseignement", "foi"] },
  { name: "L'Amoureux", keywords: ["choix", "relations", "engagement"] },
  { name: "Le Chariot", keywords: ["volonté", "victoire", "direction"] },
  { name: "La Justice", keywords: ["équilibre", "vérité", "responsabilité"] },
  { name: "L'Hermite", keywords: ["recherche", "introspection", "isolement"] },
  { name: "La Roue de Fortune", keywords: ["cycle", "destin", "mutation"] },
  { name: "La Force", keywords: ["courage", "maîtrise", "résilience"] },
  { name: "Le Pendu", keywords: ["lâcher-prise", "perspective", "sacrifice"] },
  { name: "Arcane Sans Nom", keywords: ["transformation", "renouveau", "fin"] },
  { name: "Tempérance", keywords: ["harmonie", "patience", "alchimie"] },
  { name: "Le Diable", keywords: ["attachement", "tentation", "plein pouvoir"] },
  { name: "La Maison Dieu", keywords: ["révélation", "rupture", "libération"] },
  { name: "L'Étoile", keywords: ["espoir", "guidance", "inspiration"] },
  { name: "La Lune", keywords: ["rêves", "intuition", "mystères"] },
  { name: "Le Soleil", keywords: ["joie", "succès", "clarté"] },
  { name: "Le Jugement", keywords: ["appel", "réveil", "absolution"] },
  { name: "Le Monde", keywords: ["accomplissement", "unité", "plénitude"] }
];

const SUITS = [
  {
    name: "Bâtons",
    baseKeywords: ["créativité", "action"],
    cards: [
      { name: "As de Bâtons", keywords: ["nouveau départ", "énergie brute"] },
      { name: "Deux de Bâtons", keywords: ["projection", "décision"] },
      { name: "Trois de Bâtons", keywords: ["élan", "exploration"] },
      { name: "Quatre de Bâtons", keywords: ["célébration", "fondations"] },
      { name: "Cinq de Bâtons", keywords: ["compétition", "challenge"] },
      { name: "Six de Bâtons", keywords: ["reconnaissance", "avancée"] },
      { name: "Sept de Bâtons", keywords: ["défense", "conviction"] },
      { name: "Huit de Bâtons", keywords: ["rapidité", "mouvement"] },
      { name: "Neuf de Bâtons", keywords: ["persévérance", "vigilance"] },
      { name: "Dix de Bâtons", keywords: ["fardeau", "responsabilité"] },
      { name: "Valet de Bâtons", keywords: ["créativité", "messager"] },
      { name: "Cavalier de Bâtons", keywords: ["impulsion", "aventures"] },
      { name: "Reine de Bâtons", keywords: ["charisme", "intuition"] },
      { name: "Roi de Bâtons", keywords: ["leadership", "vision"] }
    ]
  },
  {
    name: "Coupes",
    baseKeywords: ["émotions", "relations"],
    cards: [
      { name: "As de Coupes", keywords: ["ouverture du cœur", "abondance"] },
      { name: "Deux de Coupes", keywords: ["union", "harmonie"] },
      { name: "Trois de Coupes", keywords: ["amitié", "communauté"] },
      { name: "Quatre de Coupes", keywords: ["apathie", "réflexion"] },
      { name: "Cinq de Coupes", keywords: ["deuil", "libération"] },
      { name: "Six de Coupes", keywords: ["souvenir", "innocence"] },
      { name: "Sept de Coupes", keywords: ["fantaisie", "choix"] },
      { name: "Huit de Coupes", keywords: ["retraite", "quête"] },
      { name: "Neuf de Coupes", keywords: ["satisfaction", "gratitude"] },
      { name: "Dix de Coupes", keywords: ["plénitude", "famille"] },
      { name: "Valet de Coupes", keywords: ["sensibilité", "messages"] },
      { name: "Cavalier de Coupes", keywords: ["romance", "quête"] },
      { name: "Reine de Coupes", keywords: ["empathie", "intuition"] },
      { name: "Roi de Coupes", keywords: ["équilibre émotionnel", "sagesse"] }
    ]
  },
  {
    name: "Épées",
    baseKeywords: ["pensée", "clarité"],
    cards: [
      { name: "As d'Épées", keywords: ["vérité", "lucidité"] },
      { name: "Deux d'Épées", keywords: ["blocage", "décision"] },
      { name: "Trois d'Épées", keywords: ["douleur", "révélation"] },
      { name: "Quatre d'Épées", keywords: ["repos", "retrait"] },
      { name: "Cinq d'Épées", keywords: ["tension", "conflit"] },
      { name: "Six d'Épées", keywords: ["transition", "déplacement"] },
      { name: "Sept d'Épées", keywords: ["stratégie", "discrétion"] },
      { name: "Huit d'Épées", keywords: ["limitation", "perception"] },
      { name: "Neuf d'Épées", keywords: ["anxiété", "cauchemar"] },
      { name: "Dix d'Épées", keywords: ["libération", "fin"] },
      { name: "Valet d'Épées", keywords: ["curiosité", "surveillance"] },
      { name: "Cavalier d'Épées", keywords: ["hâte", "courage"] },
      { name: "Reine d'Épées", keywords: ["lucidité", "indépendance"] },
      { name: "Roi d'Épées", keywords: ["raison", "autorité"] }
    ]
  },
  {
    name: "Deniers",
    baseKeywords: ["matière", "sécurité"],
    cards: [
      { name: "As de Deniers", keywords: ["opportunité", "prospérité"] },
      { name: "Deux de Deniers", keywords: ["équilibre", "adaptabilité"] },
      { name: "Trois de Deniers", keywords: ["collaboration", "artisanat"] },
      { name: "Quatre de Deniers", keywords: ["stabilité", "attachement"] },
      { name: "Cinq de Deniers", keywords: ["privation", "entraide"] },
      { name: "Six de Deniers", keywords: ["générosité", "soutien"] },
      { name: "Sept de Deniers", keywords: ["patience", "croissance"] },
      { name: "Huit de Deniers", keywords: ["apprentissage", "maîtrise"] },
      { name: "Neuf de Deniers", keywords: ["autonomie", "réussite"] },
      { name: "Dix de Deniers", keywords: ["héritage", "solidité"] },
      { name: "Valet de Deniers", keywords: ["étude", "pragmatisme"] },
      { name: "Cavalier de Deniers", keywords: ["constance", "responsabilité"] },
      { name: "Reine de Deniers", keywords: ["soin", "abondance"] },
      { name: "Roi de Deniers", keywords: ["gestion", "prosperité"] }
    ]
  }
];

export const TAROT_CARDS: TarotCard[] = [
  ...MAJOR_ARCANA.map((card, index) => ({
    id: index,
    ...card
  })),
  ...SUITS.flatMap((suit, suitIndex) =>
    suit.cards.map((card, cardIndex) => ({
      id: MAJOR_ARCANA.length + suitIndex * suit.cards.length + cardIndex,
      name: card.name,
      keywords: [...card.keywords, ...suit.baseKeywords]
    }))
  )
];

export const SPREADS: Spread[] = [
  {
    key: "three_card",
    name: "Tirage en Trois Cartes",
    positions: ["Passé", "Présent", "Futur"]
  },
  {
    key: "cross",
    name: "Croix celtique rapide",
    positions: ["Situation", "Défi", "Conseil", "Influences", "Synthèse"]
  },
  {
    key: "daily",
    name: "Énergie du jour",
    positions: ["Énergie", "Obstacle", "Conseil"]
  },
  {
    key: "relationship",
    name: "Relationnel",
    positions: ["Moi", "L'autre", "Relation", "Conseil"]
  }
];
