export const translations = {
  zh: {
    header: {
      brandName: "羽球人联赛",
      subtitle: "2026 积分排行榜",
      rankings: "排行榜",
      admin: "管理",
      signOut: "退出",
    },
    home: {
      heroTitle: "2026年羽球人赛事积分表",
      heroSubtitle: "羽球积分排行榜",
      totalPlayers: "参赛人数",
      nextMatch: "下一场比赛",
      venue: "比赛场地",
      noPlayers: "暂无选手注册",
      addPlayersHint: "请在管理面板添加选手",
      tieMessage: "积分相同时，按胜场、场次及字母顺序排列，待分出高下后显示领奖台",
      otherPlayers: "其他选手",
    },
    podium: {
      topPlayers: "前三甲",
      champion: "冠军",
      runnerUp: "亚军",
      third: "季军",
      pts: "分",
    },
    ranking: {
      sessions: "场次",
      wins: "胜",
      points: "积分",
    },
    countdown: {
      matchStarting: "比赛即将开始！",
      days: "天",
      hours: "时",
      minutes: "分",
      seconds: "秒",
    },
    notifications: {
      enabled: "通知已开启",
      disabled: "通知已关闭",
      notSupported: "您的浏览器不支持通知功能",
      blocked: "请在浏览器设置中开启通知权限",
      enabledDesc: "比赛开始前1小时将收到提醒",
      disabledDesc: "您将不会收到比赛提醒",
      matchSoon: "比赛即将开始！🏸",
      matchSoonBody: "您的羽毛球比赛将在1小时后开始",
    },
  },
  en: {
    header: {
      brandName: "Badminton League",
      subtitle: "2026 Rankings",
      rankings: "Rankings",
      admin: "Admin",
      signOut: "Sign Out",
    },
    home: {
      heroTitle: "2026 Badminton League Rankings",
      heroSubtitle: "Season Points Leaderboard",
      totalPlayers: "Total Players",
      nextMatch: "Next Match",
      venue: "Venue",
      noPlayers: "No players registered yet",
      addPlayersHint: "Add players from the Admin panel",
      tieMessage: "Rankings tied on points, wins, and sessions — podium displayed when tiebreaker is resolved",
      otherPlayers: "Other Players",
    },
    podium: {
      topPlayers: "TOP PLAYERS",
      champion: "CHAMPION",
      runnerUp: "RUNNER-UP",
      third: "THIRD",
      pts: "pts",
    },
    ranking: {
      sessions: "sessions",
      wins: "wins",
      points: "points",
    },
    countdown: {
      matchStarting: "Match starting!",
      days: "d",
      hours: "h",
      minutes: "m",
      seconds: "s",
    },
    notifications: {
      enabled: "Notifications enabled",
      disabled: "Notifications disabled",
      notSupported: "Your browser doesn't support notifications.",
      blocked: "Please enable notifications in your browser settings.",
      enabledDesc: "You'll be notified 1 hour before the match.",
      disabledDesc: "You won't receive match reminders.",
      matchSoon: "Match Starting Soon! 🏸",
      matchSoonBody: "Your badminton match starts in 1 hour.",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = {
  header: {
    brandName: string;
    subtitle: string;
    rankings: string;
    admin: string;
    signOut: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    totalPlayers: string;
    nextMatch: string;
    venue: string;
    noPlayers: string;
    addPlayersHint: string;
    tieMessage: string;
    otherPlayers: string;
  };
  podium: {
    topPlayers: string;
    champion: string;
    runnerUp: string;
    third: string;
    pts: string;
  };
  ranking: {
    sessions: string;
    wins: string;
    points: string;
  };
  countdown: {
    matchStarting: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  notifications: {
    enabled: string;
    disabled: string;
    notSupported: string;
    blocked: string;
    enabledDesc: string;
    disabledDesc: string;
    matchSoon: string;
    matchSoonBody: string;
  };
};
