    type Props = {
    label: string;
    disabled?: boolean;
    onClick: () => void;
    };

    export function ButtonWithToNext({ label, disabled, onClick }: Props) {
    return (
        <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={[
            "w-full h-13 rounded-sm",
            "text-white text-[16px] font-normal",
            "shadow-[0_4px_0_0_rgba(0,0,0,0.20)]",
            disabled ? "bg-[#FF754F]/50" : "bg-[#FF754F] active:translate-y-px",
        ].join(" ")}
        >
        {label}
        </button>
    );
    }
