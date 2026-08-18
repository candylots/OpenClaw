"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, RotateCcw, Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "menu" | "vocab" | "math" | "result";
type Feedback = "correct" | "wrong" | null;

const QUESTIONS_PER_ROUND = 10;

// 英文生字庫：emoji 當圖片，小朋友睇圖揀正確英文字
const VOCAB: { emoji: string; word: string }[] = [
  { emoji: "🐱", word: "cat" },
  { emoji: "🐶", word: "dog" },
  { emoji: "🦆", word: "duck" },
  { emoji: "🐟", word: "fish" },
  { emoji: "🐦", word: "bird" },
  { emoji: "🍎", word: "apple" },
  { emoji: "🍌", word: "banana" },
  { emoji: "🍦", word: "ice cream" },
  { emoji: "🎂", word: "cake" },
  { emoji: "🚗", word: "car" },
  { emoji: "🚂", word: "train" },
  { emoji: "✈️", word: "plane" },
  { emoji: "☀️", word: "sun" },
  { emoji: "🌙", word: "moon" },
  { emoji: "⭐", word: "star" },
  { emoji: "🌈", word: "rainbow" },
  { emoji: "🌳", word: "tree" },
  { emoji: "🌸", word: "flower" },
  { emoji: "📖", word: "book" },
  { emoji: "⚽", word: "ball" },
];

type Question = {
  prompt: string; // 題目顯示（emoji 或算式）
  display: React.ReactNode;
  options: string[];
  answer: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeVocabQuestion(): Question {
  const correct = VOCAB[Math.floor(Math.random() * VOCAB.length)];
  const wrongs = shuffle(VOCAB.filter((v) => v.word !== correct.word))
    .slice(0, 3)
    .map((v) => v.word);
  return {
    prompt: correct.emoji,
    display: null,
    options: shuffle([correct.word, ...wrongs]),
    answer: correct.word,
  };
}

function makeMathQuestion(): Question {
  const isAdd = Math.random() < 0.5;
  let a: number, b: number, answer: number;
  if (isAdd) {
    a = 1 + Math.floor(Math.random() * 20);
    b = 1 + Math.floor(Math.random() * 20);
    answer = a + b;
  } else {
    a = 2 + Math.floor(Math.random() * 19);
    b = 1 + Math.floor(Math.random() * (a - 1));
    answer = a - b;
  }
  const sign = isAdd ? "+" : "−";
  const wrongs = new Set<number>();
  while (wrongs.size < 2) {
    const delta = 1 + Math.floor(Math.random() * 5) * (Math.random() < 0.5 ? -1 : 1);
    const w = answer + delta;
    if (w >= 0 && w !== answer) wrongs.add(w);
  }
  return {
    prompt: `${a} ${sign} ${b}`,
    display: null,
    options: shuffle([String(answer), ...[...wrongs].map(String)]),
    answer: String(answer),
  };
}

const CONFETTI = ["🎉", "⭐", "✨", "🎊", "🌈"];

export function GameApp() {
  const [mode, setMode] = React.useState<Mode>("menu");
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [index, setIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [streak, setStreak] = React.useState(0);
  const [feedback, setFeedback] = React.useState<Feedback>(null);
  const [selected, setSelected] = React.useState<string | null>(null);
  const [confetti, setConfetti] = React.useState<number[]>([]);
  const [lastGain, setLastGain] = React.useState(0);

  const question = questions[index];
  const isLast = index === QUESTIONS_PER_ROUND - 1;

  function startMode(next: "vocab" | "math") {
    const make = next === "vocab" ? makeVocabQuestion : makeMathQuestion;
    setQuestions(Array.from({ length: QUESTIONS_PER_ROUND }, make));
    setIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setSelected(null);
    setConfetti([]);
    setMode(next);
  }

  function handleAnswer(option: string) {
    if (feedback || !question) return;
    setSelected(option);
    const correct = option === question.answer;

    if (correct) {
      const newStreak = streak + 1;
      const bonus = newStreak % 3 === 0 ? 5 : 0;
      const gain = 10 + bonus;
      setScore((s) => s + gain);
      setStreak(newStreak);
      setLastGain(gain);
      setFeedback("correct");
      setConfetti(Array.from({ length: 12 }, (_, i) => (i * Date.now()) % 997));
    } else {
      setStreak(0);
      setFeedback("wrong");
      setLastGain(0);
    }

    window.setTimeout(() => {
      if (isLast) {
        setMode("result");
      } else {
        setIndex((i) => i + 1);
      }
      setFeedback(null);
      setSelected(null);
      setConfetti([]);
    }, 1000);
  }

  function starsFor(score: number): number {
    const max = QUESTIONS_PER_ROUND * 10 + 15; // 含 bonus 上限
    if (score >= Math.round(max * 0.8)) return 3;
    if (score >= Math.round(max * 0.5)) return 2;
    return 1;
  }

  // ---- 選單畫面 ----
  if (mode === "menu") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <div className="text-center">
          <p className="animate-float text-6xl">🎮</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            小小學習樂園
          </h1>
          <p className="mt-2 text-slate-500">
            揀一個遊戲開始玩啦！答啱有星星⭐，仲有分數鬥高分！
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <button
            onClick={() => startMode("vocab")}
            className="group rounded-[2rem] bg-gradient-to-br from-sky-400 to-indigo-500 p-7 text-left text-white shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="animate-float text-5xl">🦁</p>
            <h2 className="mt-3 text-2xl font-extrabold">英文生字</h2>
            <p className="mt-1 text-sm text-indigo-100">
              睇圖片，揀正確嘅英文字！學動物、水果、車車…
            </p>
            <span className="mt-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur transition-colors group-hover:bg-white/30">
              開始玩 ▶
            </span>
          </button>

          <button
            onClick={() => startMode("math")}
            className="group rounded-[2rem] bg-gradient-to-br from-amber-400 to-orange-500 p-7 text-left text-white shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <p className="animate-float text-5xl" style={{ animationDelay: "0.3s" }}>
              🔢
            </p>
            <h2 className="mt-3 text-2xl font-extrabold">數學挑戰</h2>
            <p className="mt-1 text-sm text-amber-100">
              加加減減，揀出正確答案，做個計數小天才！
            </p>
            <span className="mt-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur transition-colors group-hover:bg-white/30">
              開始玩 ▶
            </span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5">
            <Trophy className="size-3.5" /> 每題 +10 分
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5">
            <Star className="size-3.5" /> 連中 3 題有獎分 +5
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5">
            <Heart className="size-3.5" /> 錯咗唔緊要，睇答案再嚟
          </span>
        </div>

        <p className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600"
          >
            <ArrowLeft className="size-4" />
            返回首頁
          </Link>
        </p>
      </div>
    );
  }

  // ---- 結果畫面 ----
  if (mode === "result") {
    const stars = starsFor(score);
    const message =
      stars === 3
        ? "嘩！你係超級小天才！🏆"
        : stars === 2
          ? "好叻呀！再玩多次挑戰 3 星！💪"
          : "唔緊要，練習多啲就會進步！🌟";
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="animate-pop rounded-[2rem] bg-white p-8 shadow-lg ring-1 ring-slate-100">
          <p className="text-6xl">
            {stars === 3 ? "🏆" : stars === 2 ? "🎖️" : "🌟"}
          </p>
          <div className="mt-3 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <Star
                key={i}
                className={cn(
                  "size-9",
                  i < stars ? "fill-amber-400 text-amber-400" : "text-slate-200"
                )}
              />
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-slate-900">
            {score} 分！
          </h1>
          <p className="mt-2 font-semibold text-slate-600">{message}</p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => startMode(mode === "result" ? "vocab" : "vocab")}
              className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 py-3.5 font-extrabold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:scale-[1.02]"
            >
              🦁 再玩英文生字
            </button>
            <button
              onClick={() => startMode("math")}
              className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 py-3.5 font-extrabold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-[1.02]"
            >
              🔢 再玩數學挑戰
            </button>
            <button
              onClick={() => setMode("menu")}
              className="rounded-full bg-white py-3.5 font-bold text-slate-600 ring-1 ring-slate-200 transition-colors hover:ring-indigo-300"
            >
              🏠 返去選單
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- 遊戲畫面 ----
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      {/* 頂部：分數 + 進度 */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          onClick={() => setMode("menu")}
          aria-label="返回選單"
          className="rounded-full bg-white p-2.5 shadow-sm ring-1 ring-slate-200 transition-colors hover:ring-indigo-300"
        >
          <ArrowLeft className="size-5 text-slate-500" />
        </button>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1.5 text-sm font-extrabold text-amber-700">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {score}
          </span>
          {streak >= 2 && (
            <span className="animate-pop inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1.5 text-sm font-extrabold text-rose-600">
              🔥 {streak} 連中
            </span>
          )}
        </div>
      </div>

      {/* 進度條 */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>
            {mode === "vocab" ? "🦁 英文生字" : "🔢 數學挑戰"}
          </span>
          <span>
            第 {index + 1} / {QUESTIONS_PER_ROUND} 題
          </span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-500 transition-all duration-500"
            style={{ width: `${((index + (feedback ? 1 : 0)) / QUESTIONS_PER_ROUND) * 100}%` }}
          />
        </div>
      </div>

      {/* 題目卡片 */}
      <div
        key={index}
        className={cn(
          "relative animate-pop rounded-[2rem] bg-white p-8 text-center shadow-lg ring-1 transition-all sm:p-12",
          feedback === "correct" && "ring-4 ring-emerald-400",
          feedback === "wrong" && "animate-shake ring-4 ring-rose-400"
        )}
      >
        {mode === "vocab" ? (
          <p className="animate-float text-[7rem] leading-none drop-shadow-sm sm:text-[9rem]">
            {question.prompt}
          </p>
        ) : (
          <p className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            {question.prompt} <span className="text-indigo-500">=</span>{" "}
            <span className="text-indigo-600">?</span>
          </p>
        )}

        {/* 回饋 overlay */}
        {feedback && (
          <div className="pointer-events-none absolute inset-x-0 top-4">
            {feedback === "correct" ? (
              <>
                <p className="animate-pop text-2xl font-extrabold text-emerald-500">
                  ✅ 好叻！+{lastGain}
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {confetti.map((c, i) => (
                    <span
                      key={c}
                      className="animate-confetti text-2xl"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {CONFETTI[i % CONFETTI.length]}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <p className="animate-pop text-2xl font-extrabold text-rose-500">
                ❌ 答案係「{question.answer}」
              </p>
            )}
          </div>
        )}
      </div>

      {/* 選項按鈕 */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const isCorrectOption = option === question.answer;
          const isSelected = option === selected;
          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!feedback}
              className={cn(
                "rounded-3xl border-b-4 bg-white py-5 text-xl font-extrabold text-slate-800 shadow-sm transition-all",
                "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:border-b-2",
                !feedback && "border-slate-200 hover:border-indigo-300",
                feedback === "correct" &&
                  isCorrectOption &&
                  "animate-pop border-emerald-400 bg-emerald-50 text-emerald-700",
                feedback === "wrong" &&
                  isSelected &&
                  "border-rose-400 bg-rose-50 text-rose-600",
                feedback === "wrong" &&
                  !isSelected &&
                  isCorrectOption &&
                  "border-emerald-400 bg-emerald-50 text-emerald-700",
                feedback && !isSelected && !isCorrectOption && "opacity-40"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* 底部提示 */}
      <p className="mt-8 text-center text-xs text-slate-400">
        {mode === "vocab"
          ? "睇住幅圖，揀出正確嘅英文字 👀"
          : "計一計，揀出正確答案 🧮"}
      </p>

      {/* 重玩 */}
      <p className="mt-2 text-center">
        <button
          onClick={() => startMode(mode)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-600"
        >
          <RotateCcw className="size-3.5" />
          重新開始
        </button>
      </p>
    </div>
  );
}
