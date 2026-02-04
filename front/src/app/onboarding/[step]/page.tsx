"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import { ProgressBar } from "@/components/features/onboarding/progress-bar";
import { ButtonWithOption } from "@/components/features/onboarding/button-with-option";
import { ButtonWithToNext } from "@/components/features/onboarding/button-with-to-next";

type StepDef = {
    id: string;
    question: string;
    options: string[];
    nextLabel?: string;
};

const STEPS: StepDef[] = [
    {
        id: "meal_frequency",
        question: "普段、週にどれくらいの頻度で\n家でご飯を食べますか？",
        options: ["0回", "1~2回", "3~4回", "5~6回", "7回"],
    },
    {
        id: "dishwashing_last",
        question: "洗い物は最後にいつしましたか？",
        options: ["今日", "昨日", "2日前", "1週間以上前"],
    },
    {
        id: "laundry_last",
        question: "洗濯は最後にいつしましたか？",
        options: ["今日", "昨日", "2日~3日前", "4日~6日前", "1週間以上前"],
    },
    {
        id: "trash_last",
        question: "ゴミ捨ては最後にいつしましたか？",
        options: ["今週", "先週", "もっと前"],
    },
    {
        id: "vacuum_last",
        question: "床掃除は最後にいつしましたか？\n（掃除機など）",
        options: ["今日", "2日~3日前", "4日~6日前", "1週間以上前"],
    },
    {
        id: "mop_last",
        question: "床掃除は最後にいつしましたか？\n（雑巾など）",
        options: ["今日", "2日~3日前", "4日~6日前", "1週間以上前"],
    },
    {
        id: "tidy_last",
        question: "整理整頓は最後にいつしましたか？",
        options: ["今日", "~1週間前", "~3週間前", "1ヶ月以上前"],
    },
    {
        id: "bath_last",
        question: "風呂掃除は最後にいつしましたか？",
        options: ["今日", "2~3日前", "4~6日前", "1週間以上前"],
    },
    {
        id: "toilet_last",
        question: "トイレ掃除は最後にいつしましたか？",
        options: ["今日", "2~3日前", "4~6日前", "1週間以上前"],
        nextLabel: "はじめる",
    },
];

function readAnswers(): Record<string, string> {
    if (typeof window === "undefined") return {};
    try {
        const raw = sessionStorage.getItem("onboarding_answers");
        return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
        return {};
    }
}

function writeAnswers(next: Record<string, string>) {
    if (typeof window === "undefined") return;
    sessionStorage.setItem("onboarding_answers", JSON.stringify(next));
}

export default function OnboardingStepPage() {
    const router = useRouter();
    const params = useParams<{ step: string }>();

    const stepIndex = useMemo(() => {
        const n = Number(params.step);
        if (!Number.isFinite(n)) return 0;
        return Math.min(Math.max(n - 1, 0), STEPS.length - 1);
    }, [params.step]);

    const step = STEPS[stepIndex];

    // step1: 0% , step9: 100% にする
    const progress = useMemo(() => {
        if (STEPS.length <= 1) return 0;
        return stepIndex / (STEPS.length - 1);
    }, [stepIndex]);

    const isFirst = stepIndex === 0;
    const isLast = stepIndex === STEPS.length - 1;

    // 既存回答があれば復元（戻った時に選択残す）
    const [selected, setSelected] = useState<string | null>(() => {
        const saved = readAnswers();
        return saved[step.id] ?? null;
    });

    const goPrev = () => {
        if (isFirst) return;
        router.push(`/onboarding/${stepIndex}`); // 1個前（index+1なので stepIndex）
    };

    const goNext = () => {
        if (!selected) return;

        // ✅ 保存（9問の答えとして使えるように）
        const saved = readAnswers();
        writeAnswers({ ...saved, [step.id]: selected });

        if (isLast) {
            // とりあえずトップへ（ここを後で「部屋ページ」に変える）
            router.push("/");
            return;
        }

        router.push(`/onboarding/${stepIndex + 2}`);
    };

    return (
        // 下から54px固定：pb-[54px]
        <div className="min-h-screen flex flex-col pt-10 pb-13.5">
            {/* 進捗バー（上部） */}
            <ProgressBar value={progress} />

            {/* 戻るボタン：進捗バーの下 */}
            <div className="mt-3.5 h-11 flex items-center">
                {!isFirst && (
                    <button
                        type="button"
                        onClick={goPrev}
                        className="w-9 h-9 rounded-full bg-white
                        shadow-[0_2px_6px_rgba(0,0,0,0.20)]
                        flex items-center justify-center"
                        aria-label="戻る"
                    >
                        <ChevronLeft className="w-5 h-5 text-[#4A4A4A]" />
                    </button>
                )}
            </div>

            {/* 質問文：進捗バーから90px（進捗バーは上なので、ここは見た目合わせ） */}
            <div className="mt-22.5 text-center whitespace-pre-line text-[18px] font-normal leading-[1.8] text-[#000000]">
                {step.question}
            </div>

            {/* 選択肢：進捗バーから199px → 質問の後に見た目で合わせる */}
            <div className="mt-27.25 flex flex-col gap-4.75">
                {step.options.map((opt) => (
                    <ButtonWithOption
                        key={opt}
                        label={opt}
                        selected={selected === opt}
                        onClick={() => setSelected(opt)}
                    />
                ))}
            </div>

            {/* 次へ：下から54px固定（親のpbで担保） */}
            <div className="mt-auto">
                <ButtonWithToNext
                    label={isLast ? step.nextLabel ?? "はじめる" : "次へ"}
                    disabled={!selected}
                    onClick={goNext}
                />
            </div>
        </div>
    );
}
