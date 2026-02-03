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
                "border border-[#A0A0A0] bg-[#F8F8F8]",
                "text-[16px] font-normal",
                "text-[#4A4A4A]",
                "shadow-[0_2px_0_0_rgba(0,0,0,0.18)]",
                "active:translate-y-px active:shadow-[0_1px_0_0_rgba(0,0,0,0.18)]",
                selected ? "border-[#000000] bg-[#E5E5E5] font-medium" : ""

            ].join(" ")}
        >
            {label}
        </button>
    );
}
