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
      top: "25%",
      left: "60%",
      width: "25%",
      height: "28%",
    },
  },
  {
    id: "washing-machine",
    name: "洗濯物",
    houseworkId: "2", // 洗濯物
    position: {
      top: "60%",
      left: "20%",
      width: "14%",
      height: "14%",
    },
  },
  {
    id: "sink",
    name: "シンク",
    houseworkId: "1", // 洗い物
    position: {
      top: "24%",
      left: "24%",
      width: "20%",
      height: "16%",
    },
  },
  {
    id: "toilet",
    name: "トイレ",
    houseworkId: "7", // トイレ掃除
    position: {
      top: "35%",
      left: "85%",
      width: "14%",
      height: "18%",
    },
  },
  {
    id: "trash",
    name: "ゴミ箱",
    houseworkId: "3", // ゴミ捨て
    position: {
      top: "52%",
      left: "12%",
      width: "13%",
      height: "18%",
    },
  },
  {
    id: "floor",
    name: "床",
    houseworkId: "4", // 床掃除
    position: {
      top: "40%",
      left: "38%",
      width: "28%",
      height: "24%",
    },
  },
  {
    id: "desk",
    name: "机",
    houseworkId: "5", // 整理整頓
    position: {
      top: "52%",
      left: "70%",
      width: "24%",
      height: "20%",
    },
  },
];
