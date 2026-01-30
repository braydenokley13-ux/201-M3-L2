// Game data extracted from Excel file
const GAME_DATA = [
  {
    id: 1,
    sport: "MLB",
    title: "Replace a Star Hitter",
    description: "Your star player just left in free agency. Build a replacement strategy using 2-4 players within budget.",
    budget: 40,
    minPlayers: 2,
    maxPlayers: 4,
    passingCriteria: {
      obp_avg: { threshold: 0.33, operator: ">=", label: "OBP Average" },
      wrc_plus_avg: { threshold: 105, operator: ">=", label: "wRC+ Average" },
      war_efficiency: { threshold: 0.12, operator: ">=", label: "WAR per $M" }
    },
    statLabels: {
      obp: "OBP",
      slg: "SLG",
      ops: "OPS",
      war: "WAR",
      wrc_plus: "wRC+",
      salary: "Salary"
    },
    players: [
      { name: "Adrian Cortez", obp: 0.355, slg: 0.44, ops: 0.795, war: 3.2, wrc_plus: 118.0, salary: 14.0 },
      { name: "Logan Devers", obp: 0.32, slg: 0.41, ops: 0.73, war: 2.6, wrc_plus: 105.0, salary: 12.0 },
      { name: "Marcus Hall", obp: 0.3, slg: 0.38, ops: 0.68, war: 1.8, wrc_plus: 95.0, salary: 9.0 },
      { name: "Eli Turner", obp: 0.34, slg: 0.47, ops: 0.81, war: 3.8, wrc_plus: 125.0, salary: 18.0 },
      { name: "Jordan Kim", obp: 0.29, slg: 0.36, ops: 0.65, war: 1.2, wrc_plus: 88.0, salary: 7.0 },
      { name: "Trey Delgado", obp: 0.375, slg: 0.52, ops: 0.895, war: 4.5, wrc_plus: 140.0, salary: 22.0 },
      { name: "Kevin Morales", obp: 0.31, slg: 0.39, ops: 0.7, war: 2.0, wrc_plus: 98.0, salary: 11.0 },
      { name: "Sam Donnelly", obp: 0.333, slg: 0.45, ops: 0.783, war: 2.9, wrc_plus: 112.0, salary: 13.0 }
    ]
  },
  {
    id: 2,
    sport: "NBA",
    title: "Build an Efficient Playoff Lineup",
    description: "Construct a balanced playoff rotation with 3-5 players who can score efficiently and play defense.",
    budget: 75,
    minPlayers: 3,
    maxPlayers: 5,
    passingCriteria: {
      ts_percent_avg: { threshold: 0.57, operator: ">=", label: "TS% Average" },
      bpm_avg: { threshold: 1.5, operator: ">=", label: "BPM Average" },
      ortg_avg: { threshold: 113, operator: ">=", label: "ORtg Average" },
      drtg_avg: { threshold: 115, operator: "<=", label: "DRtg Average" }
    },
    statLabels: {
      ts_percent: "TS%",
      usage_percent: "Usage%",
      bpm: "BPM",
      ortg: "ORtg",
      drtg: "DRtg",
      salary: "Salary"
    },
    players: [
      { name: "Darius Flint", ts_percent: 0.615, usage_percent: 22.0, bpm: 3.6, ortg: 119.0, drtg: 111.0, salary: 18.0 },
      { name: "Malik Hartwell", ts_percent: 0.577, usage_percent: 26.0, bpm: 2.9, ortg: 116.0, drtg: 113.0, salary: 16.0 },
      { name: "Theo McKnight", ts_percent: 0.592, usage_percent: 18.0, bpm: 4.8, ortg: 122.0, drtg: 108.0, salary: 12.0 },
      { name: "Jalen Rivers", ts_percent: 0.605, usage_percent: 28.0, bpm: 1.4, ortg: 114.0, drtg: 117.0, salary: 14.0 },
      { name: "Rico Valentine", ts_percent: 0.563, usage_percent: 24.0, bpm: 0.5, ortg: 111.0, drtg: 115.0, salary: 9.0 },
      { name: "Owen Carter", ts_percent: 0.541, usage_percent: 17.0, bpm: -0.3, ortg: 108.0, drtg: 118.0, salary: 6.0 },
      { name: "Chris Donahue", ts_percent: 0.603, usage_percent: 30.0, bpm: 5.1, ortg: 123.0, drtg: 110.0, salary: 26.0 },
      { name: "Grant Lyles", ts_percent: 0.585, usage_percent: 21.0, bpm: 3.2, ortg: 118.0, drtg: 112.0, salary: 15.0 }
    ]
  },
  {
    id: 3,
    sport: "NFL",
    title: "Fix a Broken Offense",
    description: "Your offense ranked 28th last season. Pick 3-5 players to turn things around within budget.",
    budget: 80,
    minPlayers: 3,
    maxPlayers: 5,
    passingCriteria: {
      epa_per_play_avg: { threshold: 0.05, operator: ">=", label: "EPA/play Average" },
      cpoe_avg: { threshold: 1.0, operator: ">=", label: "CPOE Average" },
      success_rate_avg: { threshold: 48, operator: ">=", label: "Success Rate Average" }
    },
    statLabels: {
      epa_per_play: "EPA/play",
      cpoe: "CPOE",
      success_rate: "Success Rate",
      dvoa: "DVOA",
      age: "Age",
      salary: "Salary"
    },
    players: [
      { name: "Caleb Whitmore", epa_per_play: 0.18, cpoe: 4.5, success_rate: 54.0, dvoa: 22.0, age: 27.0, salary: 21.0 },
      { name: "Jordan Beckett", epa_per_play: 0.11, cpoe: 0.8, success_rate: 49.0, dvoa: 15.0, age: 26.0, salary: 14.0 },
      { name: "Zachary Cole", epa_per_play: 0.04, cpoe: -0.2, success_rate: 47.0, dvoa: 4.0, age: 24.0, salary: 9.0 },
      { name: "Mason Taylor", epa_per_play: -0.02, cpoe: -3.5, success_rate: 44.0, dvoa: -6.0, age: 25.0, salary: 6.0 },
      { name: "Isaiah Holt", epa_per_play: 0.16, cpoe: 3.3, success_rate: 51.0, dvoa: 18.0, age: 26.0, salary: 19.0 },
      { name: "Devin Morrison", epa_per_play: 0.09, cpoe: 1.4, success_rate: 50.0, dvoa: 6.0, age: 28.0, salary: 12.0 },
      { name: "Evan Sutter", epa_per_play: 0.07, cpoe: 2.2, success_rate: 48.0, dvoa: 10.0, age: 23.0, salary: 7.0 },
      { name: "Tyler Ames", epa_per_play: 0.13, cpoe: 5.1, success_rate: 55.0, dvoa: 25.0, age: 29.0, salary: 22.0 }
    ]
  }
];
