"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const WORDS = [
  "career fair",
  "hackathon",
  "research talk",
  "game jam",
  "movie night",
  "tournament",
];
const TYPE_SPEED = 70; // per character
const DELETE_SPEED = 45; // per character
const HOLD_AFTER_TYPE = 900; // pause when fully typed
const HOLD_AFTER_DELETE = 250; // pause when fully deleted

export default function Header() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const currentWord = WORDS[wordIndex] ?? "";

    const clear = () => {
      if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };

    clear();

    if (phase === "typing") {
      if (text.length < currentWord.length) {
        timeoutRef.current = window.setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, TYPE_SPEED);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          setPhase("holding");
        }, HOLD_AFTER_TYPE);
      }
    } else if (phase === "holding") {
      timeoutRef.current = window.setTimeout(() => {
        setPhase("deleting");
      }, HOLD_AFTER_TYPE);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setText((t) => t.slice(0, Math.max(0, t.length - 1)));
        }, DELETE_SPEED);
      } else {
        timeoutRef.current = window.setTimeout(() => {
          setWordIndex((i) => (i + 1) % Math.max(1, WORDS.length));
          setPhase("typing");
        }, HOLD_AFTER_DELETE);
      }
    }

    return clear;
  }, [phase, text, wordIndex]);

  return (
    <header>
      <motion.h1
        className="text-2xl font-medium"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        Find your next{" "}
        <span className="relative font-semibold italic text-orange-600">
          <span>{text}</span>
          <motion.span
            className="ml-0.5 inline-block align-baseline"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          >
            |
          </motion.span>
        </span>
      </motion.h1>
    </header>
  );
}
