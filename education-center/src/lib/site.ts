/**
 * Johnny Education Centre — 網站內容設定檔
 * 所有公司資料集中在這裡，改內容只需編輯此檔。
 */

export const site = {
  name: "Johnny Education Centre",
  tagline: "讓孩子從小愛上學習，贏在起跑線！",
  ageGroup: "專為 5 至 9 歲小學生而設",
  logo: "/images/logo.png",
  // 聯絡資料（如之後更新，直接改這裡）
  phone: "+852 1234 5678",
  whatsapp: "+852 1234 5678",
  email: "info@johnnyedu.hk",
  website: "www.johnnyedu.hk",
  address: "九龍長沙灣貿易廣場 5 樓 599 號",
  hours: [
    { days: "星期一至五", time: "14:00 – 19:30" },
    { days: "星期六", time: "10:00 – 18:00" },
    { days: "星期日及公眾假期", time: "休息" },
  ],
};

export const about = {
  title: "公司簡介",
  heading: "學術基礎 × 科技啟發，陪孩子自信成長",
  body: [
    "Johnny Education Centre 專為 5 至 9 歲小學生而設，致力打造一個結合學術基礎與科技啟發的學習環境。我們明白這個階段是孩子建立學習興趣與自信的關鍵時期，因此透過有趣、互動及生活化的教學方式，讓孩子在輕鬆愉快中成長與進步。",
  ],
  highlights: [
    "小班教學，照顧每位學生的學習進度",
    "遊戲化教學，寓學習於娛樂",
    "AI 與數碼工具啟蒙，提升未來競爭力",
  ],
  // TODO: 之後可放入中心環境相片 public/images/about.jpg
  image: null as string | null,
};

export const philosophy = {
  title: "教學理念",
  heading: "興趣是最好的老師",
  intro:
    "孩子只有在開心及被鼓勵的環境下，才能真正吸收知識。我們強調：",
  items: [
    {
      icon: "users",
      title: "小班互動教學",
      description: "照顧每位學生的學習進度，確保人人參與、人人進步。",
    },
    {
      icon: "gamepad",
      title: "遊戲式學習",
      description: "透過活動、遊戲及故事提升理解力，讓學習變成樂趣。",
    },
    {
      icon: "sparkles",
      title: "建立自信",
      description: "鼓勵表達與嘗試，培養正面學習態度與成就感。",
    },
    {
      icon: "rocket",
      title: "科技啟蒙",
      description: "讓孩子從小接觸 AI 與數碼工具，提升未來競爭力。",
    },
  ],
};

export type Course = {
  slug: string;
  name: string;
  tag: string;
  intro: string;
  price: string;
  duration: string;
  image: string | null; // TODO: 放入課程相片 public/images/courses/<slug>.jpg
  gradient: string;
  emoji: string;
};

export const courses: Course[] = [
  {
    slug: "ai-explorer",
    name: "AI 小小探索班",
    tag: "AI 啟蒙",
    intro:
      "透過簡單有趣的例子，讓孩子認識人工智能，學習如何用 AI 工具幫助學習及創作，例如生成故事、圖片等。",
    price: "HKD 1,100",
    duration: "4 堂",
    image: null,
    gradient: "from-violet-500 to-fuchsia-500",
    emoji: "🤖",
  },
  {
    slug: "python-kids",
    name: "兒童 Python 啟蒙班",
    tag: "編程思維",
    intro:
      "以遊戲及圖像方式教授編程概念，培養邏輯思維與解難能力，適合零基礎小朋友。",
    price: "HKD 1,300",
    duration: "4 堂",
    image: null,
    gradient: "from-sky-500 to-indigo-500",
    emoji: "🐍",
  },
  {
    slug: "primary-boost",
    name: "小學全科提升班",
    tag: "學術基礎",
    intro:
      "針對中文、英文及數學基礎，透過練習與講解，幫助學生打好基礎及提升成績。",
    price: "HKD 900",
    duration: "4 堂",
    image: null,
    gradient: "from-emerald-500 to-teal-500",
    emoji: "📚",
  },
  {
    slug: "creative-art",
    name: "創意繪畫小達人班",
    tag: "創意表達",
    intro:
      "讓孩子拾起畫筆，創作圖畫、簡報及小故事，提升創意與表達能力。",
    price: "HKD 1,200",
    duration: "4 堂",
    image: null,
    gradient: "from-amber-500 to-orange-500",
    emoji: "🎨",
  },
];

export const teachers = {
  title: "師資介紹",
  heading: "專業、有愛心、懂孩子",
  intro:
    "所有導師均具備教育熱誠及相關經驗，並經專業培訓，懂得如何與小朋友溝通及引導學習。我們重視耐心與鼓勵，讓每位孩子都能安心學習。",
  principal: {
    name: "Johnny Ip",
    role: "校長",
    badge: "Microsoft & Google Educator",
    bio: "擁有多年 IT 教學及培訓經驗，專注將複雜科技轉化為小朋友都能理解的學習內容。擅長以互動及遊戲方式教學，讓孩子在開心中學習，建立自信與成就感。",
    // TODO: 放入校長相片 public/images/teachers/principal.jpg
    image: null as string | null,
  },
};

export const contact = {
  title: "聯絡我們",
  heading: "歡迎預約參觀或查詢課程",
  intro: "想了解更多課程詳情？歡迎致電或 WhatsApp 我們！",
};

export const nav = [
  { label: "公司簡介", href: "#about" },
  { label: "教學理念", href: "#philosophy" },
  { label: "精選課程", href: "#courses" },
  { label: "師資介紹", href: "#teachers" },
  { label: "聯絡我們", href: "#contact" },
];
