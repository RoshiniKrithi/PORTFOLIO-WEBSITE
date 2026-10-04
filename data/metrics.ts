export interface MetricCardData {
  platform: string;
  category: string;
  badge?: string;
  highlightColor?: string;
  mainStat: {
    label: string;
    value: string;
    subtext?: string;
  };
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  telemetryStat: {
    label: string;
    value: string;
    subtext: string;
  };
  telemetryMetrics: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
  sparkline: number[];
}

export const metricsData: MetricCardData[] = [
  {
    platform: "LEETCODE",
    category: "ALGORITHMIC MASTERY",
    badge: "TOP 9.11% GLOBAL",
    highlightColor: "#f59e0b",
    mainStat: {
      label: "MAX CONTEST RATING",
      value: "1776",
      subtext: "Knight Tier Trajectory",
    },
    metrics: [
      { label: "PROBLEMS SOLVED", value: "389+" },
      { label: "GLOBAL RANKING", value: "Top 9.11%", sublabel: "Worldwide" },
      { label: "CONTEST BADGES", value: "6 Badges", sublabel: "Earned" },
    ],
    telemetryStat: {
      label: "CONTEST ACCURACY",
      value: "94.2%",
      subtext: "+68 Points in Recent Round",
    },
    telemetryMetrics: [
      { label: "HARD PROBLEMS", value: "48 Solved", sublabel: "DP & Segment Trees" },
      { label: "MED. PROBLEMS", value: "245 Solved", sublabel: "Graphs & Backtracking" },
      { label: "RATING TARGET", value: "1900+", sublabel: "Guardian Road" },
    ],
    sparkline: [1420, 1480, 1530, 1610, 1590, 1675, 1720, 1776],
  },
  {
    platform: "CODEFORCES",
    category: "SPEED & ACCURACY",
    badge: "PUPIL RANK",
    highlightColor: "#38bdf8",
    mainStat: {
      label: "PEAK RATING",
      value: "1340",
      subtext: "Pupil Rank — Active Competitor",
    },
    metrics: [
      { label: "CURRENT STATUS", value: "Pupil" },
      { label: "PEAK STATUS", value: "1340 Rating", sublabel: "Official Div. 2/3" },
      { label: "FOCUS", value: "Math & Graphs", sublabel: "Combinatorics" },
    ],
    telemetryStat: {
      label: "DIV. 2 ROUNDS",
      value: "28 Rated",
      subtext: "Official Global Contests",
    },
    telemetryMetrics: [
      { label: "PROBLEM A & B", value: "<15 mins", sublabel: "Speed Solving" },
      { label: "MATH & NUMBER", value: "Tier 1", sublabel: "Prime Sieve & Modulo" },
      { label: "MAX DELTA", value: "+84 pts", sublabel: "Round #924" },
    ],
    sparkline: [1100, 1180, 1220, 1205, 1280, 1310, 1340],
  },
  {
    platform: "CODECHEF",
    category: "PROBLEM SOLVING DISCIPLINE",
    badge: "2 STAR RATED",
    highlightColor: "#a855f7",
    mainStat: {
      label: "MAX RATING",
      value: "1585",
      subtext: "2 Star Division Competitor",
    },
    metrics: [
      { label: "PROBLEMS SOLVED", value: "760+" },
      { label: "STAR RATING", value: "2 Star", sublabel: "Division Active" },
      { label: "CONSISTENCY", value: "Rated Contests", sublabel: "Regular Starters" },
    ],
    telemetryStat: {
      label: "STARTERS DIVISION",
      value: "Top 5%",
      subtext: "Division 3 Leaderboard",
    },
    telemetryMetrics: [
      { label: "STREAK WEEKS", value: "24 Weeks", sublabel: "Contest Regular" },
      { label: "SOLVE RATE", value: "4/5 Avg", sublabel: "Starters Contests" },
      { label: "NEXT TIER", value: "3 Star (1600+)", sublabel: "Target Range" },
    ],
    sparkline: [1300, 1370, 1420, 1490, 1460, 1520, 1585],
  },
  {
    platform: "MILESTONES",
    category: "AGGREGATE DISCIPLINE",
    badge: "100-DAY STREAK",
    highlightColor: "#10b981",
    mainStat: {
      label: "TOTAL PROBLEMS SOLVED",
      value: "1,150+",
      subtext: "Across All Competitive Judges",
    },
    metrics: [
      { label: "DAILY STREAK", value: "100+ Days", sublabel: "Unbroken Focus" },
      { label: "DATA STRUCTURES", value: "Trees, DP, Graphs", sublabel: "Advanced Mastery" },
      { label: "TIME COMPLEXITY", value: "O(1) / O(N log N)", sublabel: "Optimal Approaches" },
    ],
    telemetryStat: {
      label: "HOURS INVESTED",
      value: "650+ hrs",
      subtext: "Algorithmic Engineering",
    },
    telemetryMetrics: [
      { label: "DATA STRUCTURES", value: "18 Types", sublabel: "Tries, Fenwick, Heaps" },
      { label: "SUBMISSIONS", value: "2,400+", sublabel: "Judged Attempts" },
      { label: "ACTIVE REPO", value: "Daily DSA", sublabel: "GitHub Verified" },
    ],
    sparkline: [200, 450, 700, 920, 1050, 1150],
  },
];
