import type { HouseworkStatus } from "@/types/housework-base.types";

export interface DirtinessConfig {
  level: number;
  color: string;
  blur: number;
  opacity: number;
}

const LEVEL_1: DirtinessConfig = { level: 1, color: "#66E08B", blur: 0, opacity: 0 };
const LEVEL_2: DirtinessConfig = { level: 2, color: "#108FFF", blur: 2, opacity: 0.15 };
const LEVEL_3: DirtinessConfig = { level: 3, color: "#FFC267", blur: 4, opacity: 0.25 };
const LEVEL_4: DirtinessConfig = { level: 4, color: "#FF754F", blur: 6, opacity: 0.35 };
const LEVEL_5: DirtinessConfig = { level: 5, color: "#FF6453", blur: 8, opacity: 0.45 };

const STATUS_TO_LEVEL: Record<HouseworkStatus, DirtinessConfig> = {
  // Normal
  "とても綺麗": LEVEL_1,
  "綺麗": LEVEL_2,
  "少し汚れている": LEVEL_3,
  "汚れている": LEVEL_4,
  // Laundry
  "完了": LEVEL_1,
  "少し溜まっている": LEVEL_2,
  "溜まっている": LEVEL_3,
  "かなり溜まっている": LEVEL_4,
  // Trash
  "少し入っている": LEVEL_2,
  "半分くらい": LEVEL_3,
  "いっぱい": LEVEL_4,
  // Organize
  "少し残っている": LEVEL_2,
  "残っている": LEVEL_3,
  "たまっている": LEVEL_4,
  // Shared
  "限界です": LEVEL_5,
};

export function getDirtinessLevel(status: HouseworkStatus): DirtinessConfig {
  return STATUS_TO_LEVEL[status] ?? LEVEL_1;
}
