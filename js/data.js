// Enhanced Game Data with Real Players (Current Stars + Legends)
const GAME_DATA = [
  {
    id: 1,
    sport: "MLB",
    title: "The Lost Star",
    description: "Your franchise player just signed with a rival for $30M/year. The owner won't match that price. You have $40M to replace his production with 2-4 players. Can you build a platoon that matches elite offensive output?",
    storyHook: "Miguel Torres, your star outfielder, just left for a division rival. The fans are devastated. The owner is furious. Your job is on the line. Use analytics to prove you don't need one superstar—you need smart spending.",
    budget: 40,
    minPlayers: 2,
    maxPlayers: 4,
    passingCriteria: {
      obp_avg: { threshold: 0.33, operator: ">=", label: "OBP Average" },
      wrc_plus_avg: { threshold: 105, operator: ">=", label: "wRC+ Average" },
      war_efficiency: { threshold: 0.12, operator: ">=", label: "WAR per $M" }
    },
    positionConstraints: {
      infielders: { min: 1, positions: ["1B", "2B", "SS", "3B"] },
      outfielders: { min: 1, positions: ["OF", "DH"] }
    },
    statLabels: {
      obp: "OBP",
      slg: "SLG",
      ops: "OPS",
      war: "WAR",
      wrc_plus: "wRC+",
      salary: "Salary"
    },
    statExplanations: {
      obp: "On-Base Percentage: How often a player reaches base (hits + walks + HBP). The goal is simple: don't make outs.",
      slg: "Slugging Percentage: Total bases per at-bat. Power drives scoring, and SLG captures it.",
      ops: "On-Base Plus Slugging: Adds OBP and SLG for a simple snapshot of offensive value.",
      war: "Wins Above Replacement: Replace this player with an average guy—how many wins do you lose? That's WAR. Performance into wins, wins into dollars.",
      wrc_plus: "Weighted Runs Created Plus: Adjusts for ballparks and era. 120 wRC+ = 20% better than league average. Makes analytics fair from Babe Ruth to today.",
      salary: "Annual salary in millions of dollars"
    },
    players: [
      {
        name: "Shohei Ohtani",
        position: "DH",
        team: "LAD",
        age: 30,
        bio: "Two-way phenom who revolutionized baseball—elite hitter and ace pitcher",
        obp: 0.390,
        slg: 0.646,
        ops: 1.036,
        war: 9.2,
        wrc_plus: 190,
        salary: 22.0 // Adjusted for game balance
      },
      {
        name: "Juan Soto",
        position: "OF",
        team: "NYY",
        age: 26,
        bio: "Elite plate discipline and raw power—future Hall of Famer in his prime",
        obp: 0.419,
        slg: 0.569,
        ops: 0.988,
        war: 7.9,
        wrc_plus: 180,
        salary: 20.0
      },
      {
        name: "Aaron Judge",
        position: "OF",
        team: "NYY",
        age: 32,
        bio: "6'7\" power machine who can hit 60+ homers and draw walks",
        obp: 0.408,
        slg: 0.701,
        ops: 1.109,
        war: 11.0,
        wrc_plus: 211,
        salary: 24.0
      },
      {
        name: "Freddie Freeman",
        position: "1B",
        team: "LAD",
        age: 35,
        bio: "Consistent contact hitter with sneaky power—Mr. Reliable",
        obp: 0.380,
        slg: 0.567,
        ops: 0.947,
        war: 6.4,
        wrc_plus: 162,
        salary: 18.0
      },
      {
        name: "Bobby Witt Jr.",
        position: "SS",
        team: "KC",
        age: 24,
        bio: "Young superstar shortstop—speed, power, and elite defense",
        obp: 0.367,
        slg: 0.588,
        ops: 0.955,
        war: 8.6,
        wrc_plus: 159,
        salary: 14.0
      },
      {
        name: "Jose Ramirez",
        position: "3B",
        team: "CLE",
        age: 32,
        bio: "Underrated MVP candidate—30/30 threat with elite contact skills",
        obp: 0.346,
        slg: 0.539,
        ops: 0.885,
        war: 6.3,
        wrc_plus: 143,
        salary: 16.0
      },
      {
        name: "Babe Ruth",
        position: "OF",
        team: "NYY (Legend)",
        age: 28,
        bio: "The Sultan of Swat—transformed baseball with power hitting in the 1920s",
        obp: 0.474,
        slg: 0.690,
        ops: 1.164,
        war: 13.7,
        wrc_plus: 225,
        salary: 26.0
      },
      {
        name: "Ted Williams",
        position: "OF",
        team: "BOS (Legend)",
        age: 23,
        bio: "The Splendid Splinter—last player to hit .400, pure hitting science",
        obp: 0.482,
        slg: 0.667,
        ops: 1.149,
        war: 10.6,
        wrc_plus: 233,
        salary: 25.0
      }
    ]
  },
  {
    id: 2,
    sport: "NBA",
    title: "The Playoff Push",
    description: "Your team squeaked into the playoffs as the 8-seed and got swept. The coach demands efficient scorers who can defend. You have $75M to build a 3-5 player rotation that can compete with the elite teams.",
    storyHook: "The locker room is quiet after a humiliating first-round exit. The coach says: 'We need players who don't just score—they score efficiently AND defend.' The front office is watching. Can you build a championship-level rotation?",
    budget: 75,
    minPlayers: 3,
    maxPlayers: 5,
    passingCriteria: {
      ts_percent_avg: { threshold: 0.57, operator: ">=", label: "TS% Average" },
      bpm_avg: { threshold: 1.5, operator: ">=", label: "BPM Average" },
      ortg_avg: { threshold: 113, operator: ">=", label: "ORtg Average" },
      drtg_avg: { threshold: 115, operator: "<=", label: "DRtg Average" }
    },
    positionConstraints: {
      guards: { min: 1, positions: ["PG", "SG"] },
      forwards: { min: 1, positions: ["SF", "PF", "C"] }
    },
    statLabels: {
      ts_percent: "TS%",
      bpm: "BPM",
      ortg: "ORtg",
      drtg: "DRtg",
      usage_percent: "Usage%",
      salary: "Salary"
    },
    statExplanations: {
      ts_percent: "True Shooting Percentage: Measures scoring efficiency across twos, threes, and free throws. Rewards smart shot selection—not just volume.",
      bpm: "Box Plus/Minus: How much a player affects the score per 100 possessions. The machine-learning layer that adjusts for teammates, opponents, everything.",
      ortg: "Offensive Rating: Points produced per 100 possessions. Higher is better.",
      drtg: "Defensive Rating: Points allowed per 100 possessions. Lower is better—elite defenders keep this under 110.",
      usage_percent: "Usage Rate: How often a player ends a possession. Too high? Ball-hogging. Too low? Not using talent enough.",
      salary: "Annual salary in millions of dollars"
    },
    players: [
      {
        name: "Nikola Jokic",
        position: "C",
        team: "DEN",
        age: 29,
        bio: "Three-time MVP—best passing big man ever, elite efficiency",
        ts_percent: 0.654,
        bpm: 13.7,
        ortg: 130,
        drtg: 112,
        usage_percent: 29.3,
        salary: 26.0
      },
      {
        name: "Luka Doncic",
        position: "PG",
        team: "DAL",
        age: 25,
        bio: "Triple-double machine with playoff experience beyond his years",
        ts_percent: 0.597,
        bpm: 9.8,
        ortg: 120,
        drtg: 115,
        usage_percent: 36.2,
        salary: 25.0
      },
      {
        name: "Shai Gilgeous-Alexander",
        position: "SG",
        team: "OKC",
        age: 26,
        bio: "Smooth scorer with elite mid-range game and defensive instincts",
        ts_percent: 0.627,
        bpm: 8.4,
        ortg: 123,
        drtg: 109,
        usage_percent: 33.1,
        salary: 22.0
      },
      {
        name: "Jayson Tatum",
        position: "SF",
        team: "BOS",
        age: 26,
        bio: "Finals MVP—two-way wing who can create his own shot",
        ts_percent: 0.599,
        bpm: 6.9,
        ortg: 118,
        drtg: 110,
        usage_percent: 29.6,
        salary: 21.0
      },
      {
        name: "Giannis Antetokounmpo",
        position: "PF",
        team: "MIL",
        age: 29,
        bio: "The Greek Freak—dominant paint force with back-to-back MVPs",
        ts_percent: 0.614,
        bpm: 9.3,
        ortg: 121,
        drtg: 108,
        usage_percent: 34.1,
        salary: 24.0
      },
      {
        name: "Stephen Curry",
        position: "PG",
        team: "GSW",
        age: 36,
        bio: "Changed the game with his three-point shooting—4x champion",
        ts_percent: 0.633,
        bpm: 7.8,
        ortg: 125,
        drtg: 113,
        usage_percent: 32.8,
        salary: 23.0
      },
      {
        name: "Michael Jordan",
        position: "SG",
        team: "CHI (Legend)",
        age: 30,
        bio: "The GOAT—6 championships, 5 MVPs, unstoppable on both ends",
        ts_percent: 0.582,
        bpm: 11.2,
        ortg: 122,
        drtg: 102,
        usage_percent: 33.3,
        salary: 28.0
      },
      {
        name: "LeBron James",
        position: "SF",
        team: "CLE (Prime)",
        age: 28,
        bio: "All-around force—scoring, passing, rebounding, defense at elite levels",
        ts_percent: 0.640,
        bpm: 10.6,
        ortg: 124,
        drtg: 106,
        usage_percent: 31.7,
        salary: 27.0
      }
    ]
  },
  {
    id: 3,
    sport: "NFL",
    title: "The Offensive Overhaul",
    description: "Your offense ranked 28th in EPA/play last season. Fans are booing. The owner gave you $80M to hire 3-5 offensive weapons before Week 1. Can you transform this unit using advanced analytics?",
    storyHook: "The locker room is toxic after a 5-12 season. The quarterback was sacked 60 times. Receivers couldn't get open. The running back fumbled at critical moments. This is your last chance to fix it. The analytics department has the answers—if you trust the data.",
    budget: 80,
    minPlayers: 3,
    maxPlayers: 5,
    passingCriteria: {
      epa_per_play_avg: { threshold: 0.05, operator: ">=", label: "EPA/play Average" },
      cpoe_avg: { threshold: 1.0, operator: ">=", label: "CPOE Average" },
      success_rate_avg: { threshold: 48, operator: ">=", label: "Success Rate Average" }
    },
    positionConstraints: {
      backfield: { min: 1, positions: ["QB", "RB"] },
      receivers: { min: 1, positions: ["WR", "TE"] }
    },
    statLabels: {
      epa_per_play: "EPA/play",
      cpoe: "CPOE",
      success_rate: "Success Rate",
      dvoa: "DVOA",
      age: "Age",
      salary: "Salary"
    },
    statExplanations: {
      epa_per_play: "Expected Points Added per play: How much did this change our expected points? A 7-yard gain on 3rd & 6? Huge EPA. Same gain on 3rd & 15? Basically nothing. It's the probability game.",
      cpoe: "Completion Percentage Over Expected: Adjusts accuracy for difficulty. Deep sideline lasers > screen passes. Not all throws are created equal.",
      success_rate: "Success Rate: How often an offense hits the goal—50% of yards on 1st down, 70% on 2nd, convert on 3rd. High success = sustainable offense.",
      dvoa: "Defense-Adjusted Value Over Average: Compares every play to league average, adjusting for opponent. The ultimate efficiency per down.",
      age: "Player age in years",
      salary: "Annual salary in millions of dollars"
    },
    players: [
      {
        name: "Patrick Mahomes",
        position: "QB",
        team: "KC",
        age: 29,
        bio: "3x Super Bowl champion—elite arm talent with improvisational genius",
        epa_per_play: 0.21,
        cpoe: 4.8,
        success_rate: 54.0,
        dvoa: 28,
        age: 29,
        salary: 26.0
      },
      {
        name: "Josh Allen",
        position: "QB",
        team: "BUF",
        age: 28,
        bio: "Dual-threat QB who can beat you with arm or legs—MVP candidate",
        epa_per_play: 0.18,
        cpoe: 3.2,
        success_rate: 51.0,
        dvoa: 24,
        age: 28,
        salary: 24.0
      },
      {
        name: "CeeDee Lamb",
        position: "WR",
        team: "DAL",
        age: 25,
        bio: "Elite route runner with yards-after-catch ability—All-Pro receiver",
        epa_per_play: 0.14,
        cpoe: 2.1,
        success_rate: 52.0,
        dvoa: 22,
        age: 25,
        salary: 22.0
      },
      {
        name: "Christian McCaffrey",
        position: "RB",
        team: "SF",
        age: 28,
        bio: "Do-everything back—rushing, receiving, blocking—offensive weapon",
        epa_per_play: 0.11,
        cpoe: 1.5,
        success_rate: 49.0,
        dvoa: 19,
        age: 28,
        salary: 20.0
      },
      {
        name: "Tyreek Hill",
        position: "WR",
        team: "MIA",
        age: 30,
        bio: "Cheetah speed—game-breaking ability to score from anywhere",
        epa_per_play: 0.16,
        cpoe: 2.8,
        success_rate: 53.0,
        dvoa: 26,
        age: 30,
        salary: 23.0
      },
      {
        name: "Travis Kelce",
        position: "TE",
        team: "KC",
        age: 35,
        bio: "Best tight end of his generation—elite receiving with blocking",
        epa_per_play: 0.13,
        cpoe: 2.3,
        success_rate: 50.0,
        dvoa: 21,
        age: 35,
        salary: 18.0
      },
      {
        name: "Tom Brady",
        position: "QB",
        team: "NE (Prime)",
        age: 30,
        bio: "7x Super Bowl champion—GOAT QB with clutch gene and football IQ",
        epa_per_play: 0.24,
        cpoe: 5.5,
        success_rate: 56.0,
        dvoa: 31,
        age: 30,
        salary: 28.0
      },
      {
        name: "Jerry Rice",
        position: "WR",
        team: "SF (Legend)",
        age: 28,
        bio: "Greatest receiver ever—unstoppable work ethic and route precision",
        epa_per_play: 0.19,
        cpoe: 3.9,
        success_rate: 55.0,
        dvoa: 29,
        age: 28,
        salary: 25.0
      }
    ]
  }
];
