import { Button } from "@/components/ui";
import { Play, X } from "lucide-react";
import { getHouseworkGradient, getHouseworkShadow } from "@/lib/utils/";
import { motion } from "framer-motion";

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
        asChild
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          transition={{
            duration: 0.1,
          }}
        >
          <Play 
            className="size-6"
            color="white"
          />
          作業開始
        </motion.button>
      </Button>
    ) : (
      <Button 
        className={`
          flex gap-2 items-center w-81 h-18 text-white text-lg font-light 
          ${gradient} ${shadow}
        `}
        onClick={onEnd}
        asChild
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          transition={{
            duration: 0.1,
          }}
        >
          <X 
            className="size-6"
            color="white"
          />
          作業終了
        </motion.button>
      </Button>
    )
  )
}