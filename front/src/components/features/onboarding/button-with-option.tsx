type Props = {
    label: string;
    selected: boolean;
    onClick: () => void;
};

export function ButtonWithOption({ label, selected, onClick }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "w-full h-12 rounded-sm",
                "border text-[16px]",
                "transition-all duration-120",
                "ease-[cubic-bezier(0.34,1.56,0.64,1)]",

                // 通常状態
                !selected && [
                    "border-[#A0A0A0]",
                    "bg-[#F8F8F8]",
                    "text-[#4A4A4A]",
                    "shadow-[0_3px_0_0_rgba(0,0,0,0.18)]",
                    "active:translate-y-0.5",
                    "active:scale-[0.97]",
                    "active:shadow-none",
                ].join(" "),

                // 選択中（押されたまま）
                selected && [
                    "border-[#FF754F]",
                    "font-medium",
                    "text-[#4A4A4A]",
                    "shadow-[0_2px_0_0_rgba(0,0,0,0.18)]",
                    "active:translate-y-px active:shadow-[0_1px_0_0_rgba(0,0,0,0.18)]",
                    "scale-[0.97]",
                ].join(" "),
            ].join(" ")}
        >
            {label}
        </button>
    );
}


