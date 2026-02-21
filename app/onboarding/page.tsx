"use client";

import { useMemo, useState } from "react";
import type { Question, Option } from "./questions";
import { QUESTIONS } from "./questions";

type Answers = Record<string, string | string[]>;

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const q = QUESTIONS[step];

  const value = answers[q.id];

  const isAnswered = useMemo(() => {
    if (!q.required) return true;
    if (q.type === "single_select")
      return typeof value === "string" && value.length > 0;
    if (q.type === "multi_select")
      return Array.isArray(value) && value.length > 0;
    return true;
  }, [q.required, q.type, value]);

  const onChange = (next: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [q.id]: next }));
  };

  const canGoNext = useMemo(() => {
    return isAnswered;
  }, [isAnswered]);

  const next = () => {
    if (!canGoNext) return;
    setStep((s) => Math.min(s + 1, QUESTIONS.length - 1));
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  const isLast = step === QUESTIONS.length - 1;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-0px)] w-full max-w-xl flex-col justify-center px-6 py-10">
      <div className="mb-2">
        <div className="mb-2 flex items-center justify-between text-xs text-zinc-700">
          <span>
            Question {step + 1} of {QUESTIONS.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full bg-orange-600 transition-all"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div className="p-6">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold leading-snug">{q.prompt}</h1>
          {q.helpText ? (
            <p className="text-sm text-zinc-600">{q.helpText}</p>
          ) : null}
        </div>

        <div className="pt-5">
          <QuestionRenderer question={q} value={value} onChange={onChange} />
        </div>

        {/* Nav */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="rounded-sm border border-zinc-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          <button
            type="button"
            onClick={() => {
              if (isLast) {
                // submit
                console.log("answers", answers);
                // e.g. await fetch("/api/onboarding", { method: "POST", body: JSON.stringify(answers) })
              } else {
                next();
              }
            }}
            disabled={!canGoNext}
            className="rounded-sm bg-orange-600 hover:bg-orange-500 transition-colors duration-200 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLast ? "Finish" : "Next"}
          </button>
        </div>
      </div>

      {/* Dev-only: remove in production */}
      {/* <pre className="mt-6 max-h-56 overflow-auto rounded-xl border bg-zinc-50 p-3 text-xs text-zinc-700">
        {JSON.stringify(answers, null, 2)}
      </pre> */}
    </div>
  );
}

function QuestionRenderer({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
}) {
  if (question.type === "single_select") {
    return (
      <SingleSelect
        options={question.options ?? []}
        value={typeof value === "string" ? value : undefined}
        onChange={onChange}
      />
    );
  }

  // multi_select
  return (
    <MultiSelect
      options={question.options ?? []}
      value={Array.isArray(value) ? value : []}
      maxSelections={question.maxSelections}
      onChange={onChange}
    />
  );
}

function SingleSelect({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-2">
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={[
              "flex w-full items-start justify-between rounded-sm border border-zinc-300 px-4 py-3 text-left transition",
              selected ? "bg-orange-50" : "hover:bg-orange-50",
            ].join(" ")}
          >
            <div className="pr-3">
              <div className="text-sm font-medium">{opt.label}</div>
              {opt.description ? (
                <div className="text-xs text-zinc-600">{opt.description}</div>
              ) : null}
            </div>

            <span
              className={[
                "mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                selected
                  ? "border-orange-600 bg-orange-600"
                  : "border-zinc-300",
              ].join(" ")}
            />
          </button>
        );
      })}
    </div>
  );
}

function MultiSelect({
  options,
  value,
  maxSelections,
  onChange,
}: {
  options: Option[];
  value: string[];
  maxSelections?: number;
  onChange: (v: string[]) => void;
}) {
  const atMax = maxSelections != null && value.length >= maxSelections;

  const toggle = (id: string) => {
    const has = value.includes(id);
    if (has) return onChange(value.filter((x) => x !== id));
    if (maxSelections != null && value.length >= maxSelections) return;
    onChange([...value, id]);
  };

  return (
    <div className="grid gap-2">
      {options.map((opt) => {
        const selected = value.includes(opt.id);
        const disabled = !selected && atMax;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            disabled={disabled}
            className={[
              "flex w-full items-start justify-between rounded-sm border border-zinc-300 px-4 py-3 text-left transition",
              selected ? "bg-orange-50" : disabled ? "" : "hover:bg-orange-50",
              disabled ? "cursor-not-allowed opacity-50" : "",
            ].join(" ")}
          >
            <div className="pr-3">
              <div className="text-sm font-medium">{opt.label}</div>
              {opt.description ? (
                <div className="text-xs text-zinc-600">{opt.description}</div>
              ) : null}
            </div>

            <span
              className={[
                "mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                selected
                  ? "border-orange-600 bg-orange-600"
                  : "border-zinc-300",
              ].join(" ")}
            />
          </button>
        );
      })}

      {maxSelections != null ? (
        <div className="pt-1 text-xs text-zinc-600">
          Selected {value.length}/{maxSelections}
          {atMax ? " (max reached)" : ""}
        </div>
      ) : null}
    </div>
  );
}
