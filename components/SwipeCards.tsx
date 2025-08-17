"use client";
import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Shield, Zap, Coins, Lock, Star } from "lucide-react";

function SwipeCard({ i, onRemove }: { i: number; onRemove: (dir: "left" | "right") => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const opacity = useTransform(x, [-200, 0, 200], [0.4, 1, 0.4]);
  const likeOpacity = useTransform(x, [80, 160], [0, 1]);
  const nopeOpacity = useTransform(x, [-160, -80], [1, 0]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={(e, info) => {
        if (info.offset.x > 160 || info.velocity.x > 800) onRemove("right");
        if (info.offset.x < -160 || info.velocity.x < -800) onRemove("left");
      }}
    >
      <div className="h-full rounded-3xl overflow-hidden shadow-2xl">
        {/* 🔥 Bakgrund + gradient */}
        <div className="h-full relative text-white bg-gradient-to-br from-slate-900 via-indigo-900 to-fuchsia-700">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),transparent_60%)]" />

          <div className="p-6 flex items-start justify-between">
            <span className="inline-flex items-center gap-2 text-xs bg-white/10 px-3 py-1 rounded-full">
              <Shield size={14}/> Säker verifiering
            </span>
            <Star className="opacity-70" size={18} />
          </div>

          <div className="px-6 pb-6 flex flex-col h-full justify-end">
            <h3 className="text-2xl font-semibold">Token #{i + 1}</h3>
            <p className="text-sm opacity-90">
              Snabbt val med höger/vänster-swipe. Bygg din korg på sekunder.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Zap size={14}/> Snabb</span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Lock size={14}/> Icke-förvar</span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full"><Coins size={14}/> Låga avgifter</span>
            </div>
          </div>

          {/* Swipe labels */}
          <motion.div style={{ opacity: likeOpacity }} className="absolute top-5 left-5">
            <div className="uppercase tracking-widest text-xs bg-emerald-400 text-slate-900 px-3 py-1 rounded-full">Köp</div>
          </motion.div>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute top-5 right-5">
            <div className="uppercase tracking-widest text-xs bg-rose-400 text-slate-900 px-3 py-1 rounded-full">Sälj</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SwipeCards() {
  const [cards, setCards] = useState([0, 1, 2, 3]);
  const removeTop = (dir: "left" | "right") => {
    console.log("Swiped", dir);
    setCards((c) => c.slice(0, -1));
  };

  return (
    <div className="relative h-[520px] w-full max-w-sm mx-auto">
      <AnimatePresence>
        {cards.map((c) => (
          <SwipeCard key={c} i={c} onRemove={removeTop} />
        ))}
      </AnimatePresence>
      {cards.length === 0 && (
        <div className="absolute inset-0 grid place-items-center text-center text-slate-800 bg-white rounded-3xl shadow-lg">
          <div>
            <h4 className="font-semibold">Klart! 🎉</h4>
            <p className="text-sm opacity-70">
              Du har byggt din korg. Tryck på "Köp" för att slutföra.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

