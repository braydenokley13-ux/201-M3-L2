// Navigation and cross-page state synchronization

// Sync state across pages - call this on every page load
function syncStateAcrossPages() {
    gameState.loadState();
}

// Check unlock status for scenarios
function checkUnlockStatus(scenarioId) {
    return !gameState.isScenarioLocked(scenarioId);
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    syncStateAcrossPages();
});
