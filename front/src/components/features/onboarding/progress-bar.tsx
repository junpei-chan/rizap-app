        // type Props = {
        // /** 0-based: 0..8（= step1..9） */
        // stepIndex: number;
        // totalSteps: number; // 9
        //     };

        // export function ProgressBar({ stepIndex, totalSteps }: Props) {
        // // step1(0) => 0%
        // // step9(8) => 100%
        // const denom = Math.max(1, totalSteps - 1);
        // const ratio = Math.min(Math.max(stepIndex / denom, 0), 1);

        // return (
        //     <div className="w-full flex justify-center">
        //     <div className="w-full max-w-83.25">
        //         <div className="h-1.25 w-full rounded-full bg-[#D9D9D9] overflow-hidden">
        //         {/* step1 は 0%なので見えない */}
        //         <div
        //             className="h-full bg-[#66E08B] transition-[width] duration-300"
        //             style={{ width: `${ratio * 100}%` }}
        //         />
        //         </div>
        //     </div>
        //     </div>
        // );
        // }

    type Props = {
    /** 0〜1 */
    value: number;
    };

    export function ProgressBar({ value }: Props) {
    const pct = Math.max(0, Math.min(1, value));

    return (
        <div className="w-full flex justify-center">
        <div className="w-83.25 h-1.25 rounded-full bg-[#D9D9D9] overflow-hidden">
            <div
            className="h-full rounded-full transition-[width] duration-300"
            style={{
                width: `${pct * 100}%`,
                background: "#66E08B",
            }}
            />
        </div>
        </div>
    );
    }
