// 家事関連の型定義のみ（Zodなし）

// API リクエスト/レスポンス型
export interface RoomRequest {
  houseworkId: number;
  doneAt: string;
}

export interface HouseworkRequest {
  houseworkId: number;
  calorie: number;
}

export interface HouseworkResponse {
  houseworkId: string;
  status: string;
  doneAt: string;
}

export interface HouseworkStartRequest {
  houseworkId: number;
}

// 家事の状態（通常版）
export type HouseworkStatusNormal = 
  | "とても綺麗"
  | "綺麗"
  | "少し汚れている"
  | "汚れている"
  | "限界";

// 家事の状態（洗濯）
export type HouseworkStatusLaundry = 
  | "完了"
  | "少し溜まっている"
  | "溜まっている"
  | "かなり溜まっている"
  | "限界";

// 家事の状態（ゴミ）
export type HouseworkStatusTrash = 
  | "完了"
  | "少し入っている"
  | "半分くらい"
  | "いっぱい"
  | "限界";

// 家事の状態（整理整頓）
export type HouseworkStatusOrganize = 
  | "完了"
  | "少し残っている"
  | "残っている"
  | "たまっている"
  | "限界";

// 家事の状態（全体）
export type HouseworkStatus = 
  | HouseworkStatusNormal
  | HouseworkStatusLaundry
  | HouseworkStatusTrash
  | HouseworkStatusOrganize;
