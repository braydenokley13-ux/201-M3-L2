# ⚾🏀🏈 Sports Analytics Team Builder

An interactive web-based game where you use real sports analytics to build efficient teams within budget constraints. Make data-driven decisions across three exciting scenarios in MLB, NBA, and NFL!

## 🎮 Play Now

[Play the game on GitHub Pages](#) _(Link will be active after deployment)_

## 📖 How to Play

### Objective
Build the most efficient teams across three sports scenarios by selecting players that meet performance thresholds while staying within budget.

### Game Flow
1. **Start with MLB Scenario** - Pick 2-4 players to replace your departed star hitter
2. **Unlock NBA Scenario** - Complete MLB to build a 3-5 player playoff rotation
3. **Finish with NFL Scenario** - Fix a broken offense with 3-5 key players
4. **Win!** - Complete all three scenarios to master sports analytics

### How to Select Players
- **Click on player cards** to add them to your team
- **Click again** to remove them from your team
- Watch the **budget meter** and **stats panel** update in real-time
- When all criteria are met, click **"Check Team"** to validate

### Pass Criteria

#### Scenario 1: MLB
- **Budget**: $40M maximum
- **Players**: 2-4 players
- **Criteria**:
  - OBP Average ≥ 0.330
  - wRC+ Average ≥ 105
  - WAR per $M ≥ 0.12

#### Scenario 2: NBA
- **Budget**: $75M maximum
- **Players**: 3-5 players
- **Criteria**:
  - TS% Average ≥ 0.570
  - BPM Average ≥ 1.5
  - ORtg Average ≥ 113
  - DRtg Average ≤ 115

#### Scenario 3: NFL
- **Budget**: $80M maximum
- **Players**: 3-5 players
- **Criteria**:
  - EPA/play Average ≥ 0.05
  - CPOE Average ≥ 1.0
  - Success Rate Average ≥ 48%

## 🎯 Features

- **Real Sports Analytics** - All player stats are realistic performance metrics
- **Interactive Player Cards** - Beautiful card design with smooth animations
- **Real-time Validation** - See criteria update as you build your team
- **Progressive Unlock** - Complete scenarios in order to unlock the next
- **Auto-save Progress** - Your selections are saved automatically
- **Responsive Design** - Play on desktop, tablet, or mobile
- **Keyboard Shortcuts** - Press 'V' to validate, 'R' to reset

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and responsive design
- **Vanilla JavaScript** - No frameworks, pure performance
- **LocalStorage** - Client-side save system

## 📊 Understanding the Stats

### MLB Stats
- **OBP** (On-Base Percentage) - How often a player reaches base
- **SLG** (Slugging Percentage) - Measures power hitting
- **OPS** (On-Base Plus Slugging) - Combined offensive metric
- **WAR** (Wins Above Replacement) - Overall player value
- **wRC+** (Weighted Runs Created Plus) - Offensive production (100 is average)

### NBA Stats
- **TS%** (True Shooting Percentage) - Scoring efficiency
- **Usage%** - Percentage of team plays used by player
- **BPM** (Box Plus/Minus) - Overall impact per 100 possessions
- **ORtg** (Offensive Rating) - Points produced per 100 possessions
- **DRtg** (Defensive Rating) - Points allowed per 100 possessions (lower is better)

### NFL Stats
- **EPA/play** (Expected Points Added) - Average points added per play
- **CPOE** (Completion Percentage Over Expected) - Accuracy metric
- **Success Rate** - Percentage of successful plays
- **DVOA** (Defense-Adjusted Value Over Average) - Efficiency metric
- **Age** - Player age in years

## 🚀 Local Development

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Local web server (Python, Node.js, or any HTTP server)

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/201-M3-L2.git
   cd 201-M3-L2
   ```

2. **Open directly in browser**
   ```bash
   # Option 1: Just open the file
   open index.html

   # Option 2: Use Python's built-in server
   python3 -m http.server 8000
   # Then visit http://localhost:8000

   # Option 3: Use Node.js http-server
   npx http-server
   ```

3. **Start playing!**

### File Structure
```
201-M3-L2/
├── index.html              # Main game page
├── css/
│   ├── main.css           # Core styles
│   └── animations.css     # Animation effects
├── js/
│   ├── data.js            # Game data (players, scenarios)
│   ├── game-state.js      # State management
│   ├── validation.js      # Stat calculations
│   ├── player-selection.js # UI interactions
│   └── main.js            # App initialization
├── assets/
│   └── icons/             # Sport icons (if added)
└── README.md              # This file
```

## 🌐 Deploy to GitHub Pages

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Sports Analytics Team Builder game"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select source: `main` branch, `/ (root)` folder
   - Click "Save"

3. **Access your game**
   - Your game will be live at: `https://YOUR_USERNAME.github.io/201-M3-L2/`
   - It may take a few minutes to deploy

## 🎨 Customization

### Change Colors
Edit CSS variables in `css/main.css`:
```css
:root {
    --mlb-primary: #2d7a3e;  /* MLB color */
    --nba-primary: #ea580c;  /* NBA color */
    --nfl-primary: #1e40af;  /* NFL color */
}
```

### Modify Game Data
Edit player stats in `js/data.js`:
```javascript
const GAME_DATA = [
    {
        sport: "MLB",
        players: [
            { name: "Your Player", obp: 0.350, ... }
        ]
    }
];
```

### Adjust Pass Criteria
Modify thresholds in `js/data.js`:
```javascript
passingCriteria: {
    obp_avg: { threshold: 0.33, operator: ">=" }
}
```

## 🐛 Debug Tools

Open browser console and use:
```javascript
// View current game state
gameDebug.getState()

// Clear all progress
gameDebug.clearState()

// Complete all scenarios (testing)
gameDebug.completeAll()
```

## 📝 Credits

- **Game Design**: Analytics-based team building concept
- **Data Source**: Realistic player performance metrics
- **Built By**: Track 201 Module 3 Lesson 2 Project

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Found a bug or have a suggestion? Feel free to:
1. Open an issue
2. Submit a pull request
3. Share your feedback

## 🎓 Learning Outcomes

This project demonstrates:
- Interactive web application development
- Real-time data validation
- State management without frameworks
- Responsive UI/UX design
- Sports analytics concepts
- Game design principles

## 🏆 Have Fun!

Enjoy building your championship teams with data-driven decisions. May your analytics be sharp and your budgets be balanced!

---

**Remember**: The best GMs use analytics, but they also trust their instincts. Good luck! 🍀
