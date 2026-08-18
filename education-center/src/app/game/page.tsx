import type { Metadata } from "next";
import { GameApp } from "@/components/game/game-app";

export const metadata: Metadata = {
  title: "學習遊戲 | Johnny Education Centre",
  description:
    "小朋友學習遊戲：英文生字 + 數學加減，卡通介面、計分系統、動畫回饋，適合 5-8 歲。",
};

export default function GamePage() {
  return <GameApp />;
}
