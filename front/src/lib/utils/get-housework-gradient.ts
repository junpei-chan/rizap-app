// Cleated by Github Copilot!!

/**
 * 家事IDに応じたグラデーションクラス名を返す
 * @param houseworkId - 家事ID (1-8) または文字列形式
 * @returns Tailwind CSSグラデーションクラス名
 */
export const getHouseworkGradient = (
  houseworkId: number | string
): string => {
  const id = typeof houseworkId === "string" ? houseworkId : String(houseworkId);

  const gradientMap: Record<string, string> = {
    "1": "bg-gradient-to-b from-[#FF85BC] to-[#FF469A]", // pink - 洗い物
    "2": "bg-gradient-to-b from-[#64BEFD] to-[#3091FD]", // lightBlue - 洗濯
    "3": "bg-gradient-to-b from-[#D968F2] to-[#D829FF]", // purple - ゴミ捨て
    "4": "bg-gradient-to-b from-[#7B67FF] to-[#482DFF]", // darkBlue - 床掃除
    "5": "bg-gradient-to-b from-[#FF9358] to-[#FF682C]", // orange - 整理整頓
    "6": "bg-gradient-to-b from-[#FFC267] to-[#FFAA2C]", // yellow - 風呂掃除
    "7": "bg-gradient-to-b from-[#88EAA5] to-[#2FD762]", // lightGreen - トイレ掃除
    "8": "bg-gradient-to-b from-[#C77DFF] to-[#9D4EDD]", // gray - その他
  };

  return gradientMap[id] || gradientMap["1"]; // デフォルトはpink
};

/**
 * 家事IDに応じたシャドウカラーを返す
 * @param houseworkId - 家事ID (1-8) または文字列形式
 * @returns Tailwind CSSシャドウクラス名
 */
export const getHouseworkShadow = (
  houseworkId: number | string
): string => {
  const id = typeof houseworkId === "string" ? houseworkId : String(houseworkId);

  const shadowMap: Record<string, string> = {
    "1": "shadow-[0_3px_0px_#DC3581]", // pink shadow - 洗い物
    "2": "shadow-[0_3px_0px_#2171D9]", // lightBlue shadow - 洗濯
    "3": "shadow-[0_3px_0px_#B100D9]", // purple shadow - ゴミ捨て
    "4": "shadow-[0_3px_0px_#E67E22]", // darkBlue shadow - 床掃除
    "5": "shadow-[0_3px_0px_#F4C430]", // orange shadow - 整理整頓
    "6": "shadow-[0_3px_0px_#5FC9A8]", // yellow shadow - 風呂掃除
    "7": "shadow-[0_3px_0px_#E5537A]", // lightGreen shadow - トイレ掃除
    "8": "shadow-[0_3px_0px_#7B2CBF]", // gray shadow - その他
  };

  return shadowMap[id] || shadowMap["1"]; // デフォルトはpink shadow
};
