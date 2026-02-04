import { ChevronLeft, Sparkles } from "lucide-react";
import { HOMEWORK_ITEMS } from "@/data/homework-items";
import { calculateTimeDifference, getHouseworkStatusById } from "@/lib/utils/";
import { getCaloriesByHouseworkAndLevel } from "@/lib/utils/housework";
import { HouseworkStatusBadge } from "@/components/features/housework";
import { IBM_Plex_Sans_JP } from "next/font/google";
import { ButtonWithHousework } from "@/components/features/housework";
import { motion } from "framer-motion";
import type { HouseworkResponse } from "@/types/housework-base.types";

type Props = {
  selectedId: string | null;
  housework: HouseworkResponse | undefined;
  isHouseworkRunning: boolean;
  onHouseworkStartAction: (id: number) => void;
  onHouseworkEndAction: (id: number, calorie: number) => void;
  onHiddenAction: () => void;
}

const IbmPlexSansJpFont = IBM_Plex_Sans_JP({
  weight: ["300", "400", "500"],
  subsets: ["latin"]
})

export function HouseworkDetailOverview({
  housework,
  isHouseworkRunning,
  onHouseworkStartAction,
  onHouseworkEndAction,
  onHiddenAction,
}: Props) {
  if (!housework) return null;

  const houseworkId = Number(housework.houseworkId);
  const label = calculateTimeDifference(housework.doneAt);
  const status = getHouseworkStatusById(housework.doneAt, String(houseworkId));
  const calorie = getCaloriesByHouseworkAndLevel(String(houseworkId), status);

  const handleOverviewClose = () => {
    onHiddenAction();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        fixed top-0 right-0 w-screen h-screen z-50
        ${IbmPlexSansJpFont.className}
      `}
      style={{
        background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 20%)'
      }}
    >
      <button
        className="absolute top-10 left-6 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-[0px_0px_6px_0px_rgba(0,0,0,0.4)]" 
        onClick={handleOverviewClose}
      >
        <ChevronLeft />
      </button>
      <div
        className="absolute bottom-0 w-full flex flex-col items-center gap-9 pt-35 pb-14"
        style={{
          background: 'linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(255, 255, 255, 0) 100%)'
        }}
      >
        <h2 className="text-text text-4xl font-semibold">
          {HOMEWORK_ITEMS[houseworkId - 1].label}
        </h2>
        {!isHouseworkRunning ? (
          <>
            <ButtonWithHousework 
              isRunning={isHouseworkRunning}
              homeworkId={houseworkId}
              onStart={() => onHouseworkStartAction(houseworkId)}
            />
            <div
              className="relative flex flex-col w-81 h-28 bg-white rounded-xl"
              style={{
                boxShadow: '0px 10px 30px 0px rgba(74, 58, 255, 0.1), 0px 4px 10px 0px rgba(10, 10, 44, 0.02), 0px -8px 18px 0px rgba(10, 10, 44, 0.04)'
              }}
            >
              <div className="flex items-center h-1/2 px-6">
                <HouseworkStatusBadge
                  lastDoneDate={housework.doneAt}
                  houseworkId={String(houseworkId)}
                />
              </div>
              <div className="absolute bottom-0 w-full flex items-center gap-2 h-1/2 border-t border-[#EEECF3] text-text px-6">
                <h3 className="text-sm">
                  最後に作業した日：
                </h3>
                <p>
                  {label}
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <ButtonWithHousework 
              isRunning={isHouseworkRunning}
              homeworkId={houseworkId}
              onEnd={() => onHouseworkEndAction(houseworkId, calorie)}
            />
            <div
              className="relative flex items-center justify-center gap-3 w-81 h-28 bg-white rounded-xl"
              style={{
                boxShadow: '0px 10px 30px 0px rgba(74, 58, 255, 0.1), 0px 4px 10px 0px rgba(10, 10, 44, 0.02), 0px -8px 18px 0px rgba(10, 10, 44, 0.04)'
              }}
            >
              <Sparkles 
                size={24}
                color="black"
              />
              <p>進行中です</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}