// Game State Management
class GameState {
    constructor() {
        this.state = {
            currentScenario: 1,
            scenarios: {
                1: { selected: [], completed: false, locked: false },
                2: { selected: [], completed: false, locked: true },
                3: { selected: [], completed: false, locked: true }
            },
            completedCount: 0
        };
        this.loadState();
    }

    // Save state to localStorage
    saveState() {
        try {
            localStorage.setItem('sportsAnalyticsGameState', JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save state:', e);
        }
    }

    // Load state from localStorage
    loadState() {
        try {
            const saved = localStorage.getItem('sportsAnalyticsGameState');
            if (saved) {
                this.state = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    }

    // Clear all state (reset game)
    clearState() {
        this.state = {
            currentScenario: 1,
            scenarios: {
                1: { selected: [], completed: false, locked: false },
                2: { selected: [], completed: false, locked: true },
                3: { selected: [], completed: false, locked: true }
            },
            completedCount: 0
        };
        this.saveState();
    }

    // Get selected players for a scenario
    getSelectedPlayers(scenarioId) {
        return this.state.scenarios[scenarioId].selected || [];
    }

    // Set selected players for a scenario
    setSelectedPlayers(scenarioId, selectedIndices) {
        this.state.scenarios[scenarioId].selected = selectedIndices;
        this.saveState();
    }

    // Toggle player selection
    togglePlayer(scenarioId, playerIndex) {
        const selected = this.state.scenarios[scenarioId].selected;
        const index = selected.indexOf(playerIndex);

        if (index > -1) {
            // Deselect
            selected.splice(index, 1);
        } else {
            // Select
            selected.push(playerIndex);
        }

        this.saveState();
        return selected;
    }

    // Check if player is selected
    isPlayerSelected(scenarioId, playerIndex) {
        return this.state.scenarios[scenarioId].selected.includes(playerIndex);
    }

    // Mark scenario as completed
    completeScenario(scenarioId) {
        this.state.scenarios[scenarioId].completed = true;
        this.state.completedCount++;

        // Unlock next scenario
        const nextScenarioId = scenarioId + 1;
        if (this.state.scenarios[nextScenarioId]) {
            this.state.scenarios[nextScenarioId].locked = false;
        }

        this.saveState();
    }

    // Check if scenario is completed
    isScenarioCompleted(scenarioId) {
        return this.state.scenarios[scenarioId].completed;
    }

    // Check if scenario is locked
    isScenarioLocked(scenarioId) {
        return this.state.scenarios[scenarioId].locked;
    }

    // Get completed count
    getCompletedCount() {
        return this.state.completedCount;
    }

    // Check if all scenarios are complete
    isGameComplete() {
        return this.state.completedCount === 3;
    }

    // Reset a specific scenario
    resetScenario(scenarioId) {
        this.state.scenarios[scenarioId].selected = [];
        this.saveState();
    }
}

// Create global instance
const gameState = new GameState();
