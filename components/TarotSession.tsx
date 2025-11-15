"use client";

import { useMemo, useState } from "react";
import { SPREADS, TAROT_CARDS, type TarotCard } from "@/data/tarot";

type SelectedCard = {
  card: TarotCard;
  positionIndex: number;
};

const CARD_WIDTH = 160;
const CARD_HEIGHT = 240;

const shuffleCards = (cards: TarotCard[], seed: number) => {
  const rng = mulberry32(seed);
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const useDeck = (seed: number) =>
  useMemo(() => shuffleCards(TAROT_CARDS, seed), [seed]);

const isCardSelected = (selected: SelectedCard[], id: number) =>
  selected.some((item) => item.card.id === id);

const positionsToArray = (positions: number) =>
  Array.from({ length: positions }, () => undefined) as (TarotCard | undefined)[];

export const TarotSession: React.FC = () => {
  const [spreadKey, setSpreadKey] = useState(SPREADS[0]!.key);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1_000_000));
  const deck = useDeck(seed);
  const spread = SPREADS.find((item) => item.key === spreadKey) ?? SPREADS[0]!;
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [slots, setSlots] = useState<(TarotCard | undefined)[]>(() =>
    positionsToArray(spread.positions.length)
  );

  const handleSpreadChange = (key: string) => {
    setSpreadKey(key);
    const nextSpread = SPREADS.find((item) => item.key === key) ?? SPREADS[0]!;
    setSelectedCards([]);
    setSlots(positionsToArray(nextSpread.positions.length));
    setSeed(Math.floor(Math.random() * 1_000_000));
  };

  const revealCard = (card: TarotCard) => {
    if (isCardSelected(selectedCards, card.id)) return;

    const nextIndex = slots.findIndex((slot) => slot === undefined);
    if (nextIndex === -1) return;

    const updatedSlots = [...slots];
    updatedSlots[nextIndex] = card;
    setSlots(updatedSlots);
    setSelectedCards((prev) => [...prev, { card, positionIndex: nextIndex }]);
  };

  const resetSession = () => {
    setSelectedCards([]);
    setSlots(positionsToArray(spread.positions.length));
    setSeed(Math.floor(Math.random() * 1_000_000));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "2rem 1.5rem"
      }}
    >
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem"
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.75rem", letterSpacing: "0.05em" }}>
          Séance de Tarot de Marseille
        </h1>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <label htmlFor="spread-select" style={{ fontWeight: 600 }}>
            Tirage :
          </label>
          <select
            id="spread-select"
            value={spread.key}
            onChange={(event) => handleSpreadChange(event.target.value)}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              border: "1px solid rgba(0,0,0,0.2)",
              backgroundColor: "rgba(255,255,255,0.8)",
              color: "#1c1a19"
            }}
          >
            {SPREADS.map((option) => (
              <option key={option.key} value={option.key}>
                {option.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={resetSession}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#2f2a69",
              color: "white",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Nouvelle séance
          </button>
        </div>
      </header>

      <section
        aria-label="Paquet de cartes"
        style={{
          position: "relative",
          display: "flex",
          padding: "1.5rem",
          borderRadius: "1.25rem",
          background: "rgba(255,255,255,0.6)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          overflowX: "auto"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            minWidth: "100%"
          }}
        >
          {deck.map((card, index) => {
            const reveal = isCardSelected(selectedCards, card.id);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => revealCard(card)}
                disabled={reveal || slots.every((slot) => slot !== undefined)}
                style={{
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  borderRadius: "1rem",
                  border: "1px solid rgba(0,0,0,0.2)",
                  background: reveal ? "#fff8f0" : "#1c1a19",
                  color: reveal ? "#1c1a19" : "#f6e7cf",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "1rem",
                  position: "relative",
                  boxShadow: reveal
                    ? "0 20px 30px rgba(139, 91, 66, 0.3)"
                    : "0 12px 18px rgba(0,0,0,0.25)",
                  marginLeft: index === 0 ? 0 : -CARD_WIDTH / 5,
                  opacity: reveal ? 0.7 : 1,
                  cursor:
                    reveal || slots.every((slot) => slot !== undefined)
                      ? "not-allowed"
                      : "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}
                onMouseEnter={(event) => {
                  if (
                    reveal ||
                    slots.every((slot) => slot !== undefined) ||
                    event.currentTarget.disabled
                  )
                    return;
                  event.currentTarget.style.transform = "translateY(-8px)";
                  event.currentTarget.style.boxShadow =
                    "0 28px 45px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                  event.currentTarget.style.boxShadow = reveal
                    ? "0 20px 30px rgba(139, 91, 66, 0.3)"
                    : "0 12px 18px rgba(0,0,0,0.25)";
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
                    {reveal ? `#${card.id}` : "Dos de carte"}
                  </div>
                  <div style={{ fontSize: "0.95rem" }}>
                    {reveal ? card.name : ""}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          paddingBottom: "2rem"
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>
          {spread.name} — {spread.positions.length} cartes
        </h2>
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
          }}
        >
          {spread.positions.map((position, index) => {
            const card = slots[index];
            return (
              <article
                key={position}
                style={{
                  minHeight: "260px",
                  padding: "1.25rem",
                  borderRadius: "1.25rem",
                  border: "1px solid rgba(0,0,0,0.1)",
                  background: "rgba(255,255,255,0.8)",
                  boxShadow: "0 18px 30px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem"
                }}
              >
                <header>
                  <div style={{ fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7 }}>
                    Position {index + 1}
                  </div>
                  <h3 style={{ margin: "0.25rem 0 0", fontSize: "1.15rem" }}>
                    {position}
                  </h3>
                </header>
                {card ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <strong style={{ fontSize: "1.1rem" }}>
                      #{card.id} — {card.name}
                    </strong>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "1.1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.35rem",
                        color: "#433f3e",
                        fontSize: "0.95rem"
                      }}
                    >
                      {card.keywords.map((keyword) => (
                        <li key={keyword}>{keyword}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div
                    style={{
                      flexGrow: 1,
                      borderRadius: "0.75rem",
                      border: "2px dashed rgba(44,37,34,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontStyle: "italic",
                      color: "rgba(44,37,34,0.6)"
                    }}
                  >
                    En attente…
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default TarotSession;
