    "use client";

    import { useUserStore } from "@/stores/user-store";
    import { useCreateMealFrequency } from "@/hooks/features/meal-frequency";
    import { useEffect, useMemo, useState } from "react";
    import { useParams, useRouter } from "next/navigation";
    import { ChevronLeft } from "lucide-react";

    import { ProgressBar } from "@/components/features/onboarding/progress-bar";
    import { ButtonWithOption } from "@/components/features/onboarding/button-with-option";
    import { ButtonWithToNext } from "@/components/features/onboarding/button-with-to-next";

    import { STEPS } from "@/data/onboarding-steps";

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
    const { setMealFrequency } = useUserStore();
    const { mutate } = useCreateMealFrequency();

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
    const [selected, setSelected] = useState<number | null>(() => {
        const saved = readAnswers();
        const savedValue = saved[step.id];
        return savedValue !== undefined ? Number(savedValue) : null;
    });

    const goPrev = () => {
        if (isFirst) return;
        router.push(`/onboarding/${stepIndex}`); // 1個前（index+1なので stepIndex）
    };

    const goNext = () => {
        if (!selected) return;

        // ✅ 保存（9問の答えとして使えるように）
        const saved = readAnswers();
        writeAnswers({ ...saved, [step.id]: String(selected) });

        if (isLast) {
            // とりあえずトップへ(ここを後で「部屋ページ」に変える)
            router.push("/");
            return;
        }

        router.push(`/onboarding/${stepIndex + 2}`);
    };

    useEffect(() => {
        if (isFirst && selected !== null) {
            mutate({
                meal_frequency: selected, // TODO: バックエンド側でcamelCaseを受け入れるように
            });

            setMealFrequency(selected);
        }
    }, [isFirst, selected, setMealFrequency]);

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
                <ChevronLeft className="w-5 h-5" />
            </button>
            )}
        </div>

        {/* 質問文：進捗バーから90px（進捗バーは上なので、ここは見た目合わせ） */}
        <div className="mt-22.5 text-center whitespace-pre-line text-[18px] font-normal leading-[1.8] text-[#000000]">
            {step.question}
        </div>

        {/* 選択肢：進捗バーから199px → 質問の後に見た目で合わせる */}
        <div className="mt-27.25 flex flex-col gap-4.75">
            {step.options.map((opt, i) => (
            <ButtonWithOption
                key={opt}
                label={opt}
                selected={selected === step.optionNums[i]}
                onClick={() => setSelected(step.optionNums[i])}
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
