import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { CalenderDateResponse } from "@/types/calender.types";
import { formatDoneAtToTime } from "@/lib/utils/";
import { motion } from "framer-motion";
import { Flame, X } from "lucide-react";

type Props = CalenderDateResponse & {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading?: boolean;
};

export function CalendarSheet({
  date,
  totalCalorie,
  logs,
  isOpen,
  onOpenChange,
  isLoading = false,
}: Props) {
  console.log('CalendarSheet render:', { isOpen, isLoading, logsCount: logs.length, totalCalorie });
  
  if (!isOpen) return null;

  return (
    <>
      {/* オーバーレイ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => onOpenChange(false)}
        style={{ pointerEvents: 'auto' }}
      />

      {/* シートコンテンツ */}
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100%" }}
        transition={{ 
          type: "spring",
          damping: 30,
          stiffness: 300
        }}
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl max-h-90 min-h-90 flex flex-col"
        style={{
          boxShadow: '0px -4px 20px 0px rgba(0, 0, 0, 0.1), 0px -2px 8px 0px rgba(0, 0, 0, 0.06)',
          pointerEvents: 'auto'
        }}
      >
      <button
        onClick={() => onOpenChange(false)}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
      >
        <X size={24} />
      </button>

      <div className="overflow-y-auto p-6 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          className="text-sm text-gray-500 mb-2"
        >
          {date}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="text-2xl font-bold mb-6"
        >
          合計消費カロリー: {totalCalorie} kcal
        </motion.h2>

        {isLoading ? (
          <div className="w-full h-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6201]" />
          </div>
        ) : (
        <div className="flex flex-col items-center gap-2">
          {logs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="w-full flex justify-center py-8"
            >
              <p className="text-gray-500 text-lg">この日は家事をしていません</p>
            </motion.div>
          ) : (
            logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{
                delay: 0.3 + i * 0.1,
                duration: 0.4,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center"
            >
              <Item 
                className="relative flex justify-around w-88 shadow-[0_4px_4px_rgba(133,122,255,0.25)]"
              >
                <ItemContent>
                  {formatDoneAtToTime(log.doneAt)}
                </ItemContent>
                <ItemContent className="absolute right-1/2 translate-x-1/2 text-lg font-medium">
                  {log.houseworkName}
                </ItemContent>
                <div className="flex items-center gap-2">
                  <ItemMedia>
                    <motion.div 
                      className="inline-flex items-center justify-center rounded-full p-1 bg-[#FF6201]"
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Flame 
                        color="white"
                        size={24}
                      />
                    </motion.div>
                  </ItemMedia>
                  <div className="flex items-end gap-1">
                    <motion.span 
                      className="text-xl font-semibold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 0.4 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 10
                      }}
                    >
                      {log.calorie}
                    </motion.span>
                    <p>kcal</p>
                  </div>
                </div>
              </Item>
            </motion.div>
            ))
          )}
        </div>
        )}
        </motion.div>
      </div>
    </motion.div>
    </>
  );
}