// Navigation and cross-page state synchronization

// Navigate to a specific page
function navigateTo(page) {
    window.location.href = page;
}

// Sync state across pages - call this on every page load
function syncStateAcrossPages() {
    gameState.loadState();
}

// Check unlock status for scenarios
function checkUnlockStatus(scenarioId) {
    return !gameState.isScenarioLocked(scenarioId);
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '');
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    syncStateAcrossPages();
});
