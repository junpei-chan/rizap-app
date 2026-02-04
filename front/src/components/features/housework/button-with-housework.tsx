import { Button } from "@/components/ui";
import { Play, X } from "lucide-react";
import { getHouseworkGradient, getHouseworkShadow } from "@/lib/utils/";

interface Props {
  isRunning: boolean;
  homeworkId: number;
  onStart?: () => void;
  onEnd?: () => void;
}

export function ButtonWithHousework({
  isRunning,
  homeworkId,
  onStart,
  onEnd,
}: Props) {
  const gradient = getHouseworkGradient(homeworkId);
  const shadow = getHouseworkShadow(homeworkId)

  return (
    !isRunning ? (
      <Button 
        className={`
          flex gap-2 items-center w-81 h-18 text-white text-lg font-light 
          ${gradient} ${shadow}
        `}
        onClick={onStart}
      >
        <Play 
          className="size-6"
          color="white"
        />
        作業開始
      </Button>
    ) : (
      <Button 
        className={`
          flex gap-2 items-center w-81 h-18 text-white text-lg font-light 
          ${gradient} ${shadow}
        `}
        onClick={onEnd}
      >
        <X 
          className="size-6"
          color="white"
        />
        作業終了
      </Button>
    )
  )
}