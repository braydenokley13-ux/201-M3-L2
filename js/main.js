// Main Application Entry Point

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});

// Detect current page
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '');
}

// Initialize the game based on current page
function initializeGame() {
    console.log('Initializing Sports Analytics Team Builder...');

    const currentPage = getCurrentPage();
    console.log('Current page:', currentPage);

    // Route to appropriate initialization based on page
    switch(currentPage) {
        case 'index':
        case '':
            // Intro page - no game initialization needed
            console.log('Intro page loaded');
            break;

        case 'league-select':
            // Hub page - no game initialization needed
            console.log('League select page loaded');
            break;

        case 'mlb':
            initializeScenario(1); // MLB is scenario 1
            break;

        case 'nba':
            initializeScenario(2); // NBA is scenario 2
            break;

        case 'nfl':
            initializeScenario(3); // NFL is scenario 3
            break;

        case 'victory':
            // Victory page - no game initialization needed
            console.log('Victory page loaded');
            break;

        case 'index-old':
            // Old single-page version - initialize all scenarios
            initializeAllScenarios();
            break;

        default:
            console.warn('Unknown page:', currentPage);
    }

    console.log('Game initialized successfully!');
}

// Initialize a single scenario (for individual scenario pages)
function initializeScenario(scenarioId) {
    console.log(`Initializing scenario ${scenarioId}...`);

    // Check if scenario exists in DOM
    const scenarioElement = document.getElementById(`scenario-${scenarioId}`);
    if (!scenarioElement) {
        console.error(`Scenario ${scenarioId} element not found in DOM`);
        return;
    }

    // Get the scenario data
    const scenarioData = GAME_DATA.find(s => s.id === scenarioId);
    if (!scenarioData) {
        console.error(`Scenario ${scenarioId} data not found`);
        return;
    }

    // Create and initialize the scenario UI
    const scenarioUI = new ScenarioUI(scenarioData, scenarioId);
    scenarioUI.initialize();

    // Add keyboard shortcuts
    setupKeyboardShortcuts();

    // Update success modal to return to hub
    updateSuccessModalNavigation();

    console.log(`Scenario ${scenarioId} initialized successfully!`);
}

// Initialize all scenarios (for old single-page version)
function initializeAllScenarios() {
    console.log('Initializing all scenarios...');

    // Create UI instances for each scenario
    const scenarios = GAME_DATA.map((scenarioData) => {
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
}

// Update success modal to navigate back to hub
function updateSuccessModalNavigation() {
    const modalCloseBtn = document.getElementById('modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            window.location.href = 'league-select.html';
        });
    }
}

// Update overall progress display (for old single-page version)
function updateOverallProgress() {
    const completedCountElement = document.getElementById('completed-count');
    const overallStatusElement = document.getElementById('overall-status');

    if (!completedCountElement || !overallStatusElement) {
        // Elements don't exist on this page
        return;
    }

    const completedCount = gameState.getCompletedCount();
    completedCountElement.textContent = completedCount;

    if (completedCount === 3) {
        overallStatusElement.textContent = 'Complete!';
        overallStatusElement.classList.add('complete');
    } else {
        overallStatusElement.textContent = 'In Progress';
        overallStatusElement.classList.remove('complete');
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
