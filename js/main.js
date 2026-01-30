// Main Application Entry Point

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

// Initialize the game
function initializeGame() {
    console.log('Initializing Sports Analytics Team Builder...');

    // Create UI instances for each scenario
    const scenarios = GAME_DATA.map((scenarioData, index) => {
        return new ScenarioUI(scenarioData, scenarioData.id);
    });

    // Initialize each scenario
    scenarios.forEach(scenario => {
        scenario.initialize();
    });

    // Update overall progress
    updateOverallProgress();

    // Add keyboard shortcuts
    setupKeyboardShortcuts();

    console.log('Game initialized successfully!');
}

// Update overall progress display
function updateOverallProgress() {
    const completedCount = gameState.getCompletedCount();
    document.getElementById('completed-count').textContent = completedCount;

    const overallStatus = document.getElementById('overall-status');
    if (completedCount === 3) {
        overallStatus.textContent = 'Complete!';
        overallStatus.classList.add('complete');
    } else {
        overallStatus.textContent = 'In Progress';
        overallStatus.classList.remove('complete');
    }
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Press 'R' to reset current scenario
        if (e.key === 'r' || e.key === 'R') {
            const visibleScenario = document.querySelector('.scenario:not(.locked)');
            if (visibleScenario) {
                const scenarioId = parseInt(visibleScenario.dataset.scenario);
                document.getElementById(`reset-${scenarioId}`)?.click();
            }
        }

        // Press 'V' to validate current scenario
        if (e.key === 'v' || e.key === 'V') {
            const visibleScenario = document.querySelector('.scenario:not(.locked)');
            if (visibleScenario) {
                const scenarioId = parseInt(visibleScenario.dataset.scenario);
                const validateBtn = document.getElementById(`validate-${scenarioId}`);
                if (validateBtn && !validateBtn.disabled) {
                    validateBtn.click();
                }
            }
        }

        // Press Escape to close modals
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });
}

// Utility function to format currency
function formatCurrency(value) {
    return `$${value.toFixed(1)}M`;
}

// Utility function to format percentage
function formatPercentage(value) {
    return `${(value * 100).toFixed(1)}%`;
}

// Export functions for debugging (optional)
window.gameDebug = {
    getState: () => gameState.state,
    clearState: () => {
        gameState.clearState();
        location.reload();
    },
    completeAll: () => {
        [1, 2, 3].forEach(id => {
            gameState.completeScenario(id);
        });
        location.reload();
    }
};

console.log('Debug utilities available: gameDebug.getState(), gameDebug.clearState(), gameDebug.completeAll()');
