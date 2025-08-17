import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useAnimation, PanInfo } from "framer-motion";

type Choice = "Köp" | "Sälj";

type Card = {
  id: number;
  title: string;
  text: string;
};

const initialCards: Card[] = [
  { id: 1, title: "Bitcoin (BTC)", text: "Vill du köpa eller sälja?" },
  { id: 2, title: "Ethereum (ETH)", text: "Vill du köpa eller sälja?" },
  { id: 3, title: "Solana (SOL)", text: "Vill du köpa eller sälja?" },
  { id: 4, title: "Arbitrum (ARB)", text: "Vill du köpa eller sälja?" },
];

export default function SwipeCards() {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const removeTop = () =>
    setCards((prev) => {
      const [, ...rest] = prev;
      return rest;
    });

  // För stack-effekten: visa översta + två bakom
  const visible = useMemo(() => cards.slice(0, 3), [cards]);

  return (
    <div className="relative w-full">
      <div className="relative mx-auto h-[540px] w-full max-w-sm">
        <AnimatePresence initial={false}>
          {visible.map((card, idx) => {
            const depth = idx;
            const scale = 1 - depth * 0.05;
            const y = depth * 14;
            const opacity = depth === 0 ? 1 : 0.9 - depth * 0.15;
            const zIndex = 10 - depth;

            return depth === 0 ? (
              <TopSwipeCard
                key={card.id}
                card={card}
                style={{ zIndex }}
                onDone={removeTop}
                backgroundStyle={{ scale, y, opacity }}
              />
            ) : (
              <motion.div
                key={card.id}
                className="absolute inset-0"
                style={{ zIndex }}
                initial={{ scale: scale - 0.05, y: y + 10, opacity: 0 }}
                animate={{ scale, y, opacity }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <CardShell title={card.title} text={card.text} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {cards.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-center">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-xl font-semibold">Alla kort är slut 🎉</h3>
              <p className="mt-1 opacity-80">Ladda om sidan för att börja om.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Översta kortet – swipebart och har knappar */
function TopSwipeCard({
  card,
  onDone,
  style,
  backgroundStyle,
}: {
  card: Card;
  onDone: () => void;
  style?: React.CSSProperties;
  backgroundStyle?: { scale: number; y: number; opacity: number };
}) {
  const controls = useAnimation();

  const fling = async (choice: Choice) => {
    const x = choice === "Köp" ? 520 : -520;
    await controls.start({
      x,
      rotate: choice === "Köp" ? 12 : -12,
      opacity: 0,
      transition: { duration: 0.28 },
    });
    onDone();
  };

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const goRight = offset.x > 140 || velocity.x > 800;
    const goLeft = offset.x < -140 || velocity.x < -800;

    if (goRight) return void fling("Köp");
    if (goLeft) return void fling("Sälj");

    controls.start({ x: 0, y: 0, rotate: 0, transition: { type: "spring", stiffness: 500, damping: 32 } });
  };

  return (
    <motion.div
      className="absolute inset-0"
      style={style}
      initial={{ scale: (backgroundStyle?.scale ?? 1) - 0.05, y: (backgroundStyle?.y ?? 0) + 10, opacity: 0 }}
      animate={{ scale: backgroundStyle?.scale ?? 1, y: backgroundStyle?.y ?? 0, opacity: backgroundStyle?.opacity ?? 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <motion.div
        className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl backdrop-blur"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={onDragEnd}
        animate={controls}
        whileTap={{ cursor: "grabbing" }}
      >
        <CardInner title={card.title} text={card.text} />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => fling("Sälj")}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Sälj
          </button>
          <button
            onClick={() => fling("Köp")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Köp
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CardShell({ title, text }: { title: string; text: string }) {
  return (
    <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-xl backdrop-blur">
      <CardInner title={title} text={text} muted />
    </div>
  );
}

function CardInner({ title, text, muted = false }: { title: string; text: string; muted?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
          Säker verifiering
        </span>
      </div>
      <div className="mt-auto">
        <h3 className={`text-2xl font-semibold ${muted ? "opacity-80" : ""}`}>{title}</h3>
        <p className={`mt-1 text-sm ${muted ? "opacity-60" : "opacity-80"}`}>{text}</p>
      </div>
    </div>
  );
}
