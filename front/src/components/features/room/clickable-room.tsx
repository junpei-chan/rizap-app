"use client";

import { useState } from "react";
import Image from "next/image";
import { ROOM_ITEMS } from "@/data/room-items";
import { motion } from "framer-motion";

interface ClickableRoomProps {
  onItemClick: (houseworkId: string) => void;
}

/**
 * クリック可能な部屋コンポーネント
 * 画像上の各アイテムにクリック領域を配置し、選択された家事の詳細を表示
 */
export function ClickableRoom({ onItemClick }: ClickableRoomProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="fixed top-7 right-1/2 translate-x-1/2 w-93 h-111 z-0">
      {/* 背景画像 */}
      <Image
        src="/images/room.svg"
        alt="部屋"
        fill
        priority
      />

      {/* クリック可能な領域 */}
      {ROOM_ITEMS.map((item) => (
        <motion.button
          key={item.id}
          className="absolute cursor-pointer rounded-lg border-2 border-transparent transition-colors"
          style={{
            top: item.position.top,
            left: item.position.left,
            width: item.position.width,
            height: item.position.height,
            backgroundColor:
              hoveredId === item.id
                ? "rgba(59, 130, 246, 0.25)" // blue-500/25
                : "transparent",
          }}
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onItemClick(item.houseworkId)}
          aria-label={`${item.name}を選択`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* ホバー時のラベル表示 */}
          {hoveredId === item.id && (
            <motion.div
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap shadow-lg"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
            >
              {item.name}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
