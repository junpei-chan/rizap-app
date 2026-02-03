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
            "border border-[#BDBDBD] bg-white",
            "text-[16px] font-normal",
            "text-[#000000]",
            "shadow-[0_2px_0_0_rgba(0,0,0,0.18)]",
            "active:translate-y-px active:shadow-[0_1px_0_0_rgba(0,0,0,0.18)]",
            selected ? "border-[#777777] bg-[#FAFAFA]" : "",
        ].join(" ")}
        >
        {label}
        </button>
    );
    }
