/**
 * 部屋のアイテム位置定義
 * 画像上の各家具・アイテムのクリック可能な領域を定義
 */

export interface RoomItem {
  id: string;
  name: string;
  houseworkId: string; // HOMEWORK_ITEMSのidと対応
  position: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
}

/**
 * 部屋画像上の各アイテムの位置
 * 座標は画像のサイズに対する相対値（%）で指定
 */
export const ROOM_ITEMS: RoomItem[] = [
  {
    id: "bath",
    name: "お風呂",
    houseworkId: "6", // 風呂掃除
    position: {
      top: "18%",
      left: "58%",
      width: "22%",
      height: "28%",
    },
  },
  {
    id: "washing-machine",
    name: "洗濯機",
    houseworkId: "2", // 洗濯物
    position: {
      top: "12%",
      left: "8%",
      width: "12%",
      height: "18%",
    },
  },
  {
    id: "sink",
    name: "シンク",
    houseworkId: "1", // 洗い物
    position: {
      top: "12%",
      left: "20%",
      width: "15%",
      height: "16%",
    },
  },
  {
    id: "toilet",
    name: "トイレ",
    houseworkId: "7", // トイレ掃除
    position: {
      top: "18%",
      left: "78%",
      width: "14%",
      height: "22%",
    },
  },
  {
    id: "trash",
    name: "ゴミ箱",
    houseworkId: "3", // ゴミ捨て
    position: {
      top: "52%",
      left: "8%",
      width: "10%",
      height: "18%",
    },
  },
  {
    id: "floor",
    name: "床",
    houseworkId: "4", // 床掃除
    position: {
      top: "48%",
      left: "38%",
      width: "28%",
      height: "20%",
    },
  },
  {
    id: "desk",
    name: "机",
    houseworkId: "5", // 整理整頓
    position: {
      top: "52%",
      left: "68%",
      width: "18%",
      height: "16%",
    },
  },
];
