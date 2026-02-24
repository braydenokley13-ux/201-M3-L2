// Player Selection and UI Updates

// UI Constants
const BUDGET_LOW_THRESHOLD = 50;      // % of budget below which bar shows "low" state
const BUDGET_MEDIUM_THRESHOLD = 90;   // % of budget above which bar shows "high" state
const TOTAL_SCENARIOS = 3;
const UNLOCK_DELAY_MS = 1000;
const VICTORY_DELAY_MS = 2000;
const CONFETTI_COUNT = 50;

class ScenarioUI {
    constructor(scenarioData, scenarioId) {
        this.scenario = scenarioData;
        this.scenarioId = scenarioId;
        this.validator = new Validator(scenarioData);
        this.setupEventListeners();
    }

    // Setup event listeners for this scenario
    setupEventListeners() {
        // Reset button
        document.getElementById(`reset-${this.scenarioId}`).addEventListener('click', () => {
            this.resetScenario();
        });

        // Validate button
        document.getElementById(`validate-${this.scenarioId}`).addEventListener('click', () => {
            this.validateTeam();
        });
    }

    // Render player cards
    renderPlayers() {
        const grid = document.getElementById(`player-grid-${this.scenarioId}`);
        grid.innerHTML = '';

        this.scenario.players.forEach((player, index) => {
            const card = this.createPlayerCard(player, index);
            grid.appendChild(card);
        });
    }

    // Create a player card element
    createPlayerCard(player, index) {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.dataset.playerIndex = index;

        // Check if player is selected
        if (gameState.isPlayerSelected(this.scenarioId, index)) {
            card.classList.add('selected');
        }

        // Get stat keys for this sport
        const statKeys = Object.keys(this.scenario.statLabels).filter(key => key !== 'salary');

        // Build stats HTML with tooltips
        let statsHTML = '';
        statKeys.forEach(key => {
            const label = this.scenario.statLabels[key];
            const value = player[key];
            const formattedValue = this.validator.formatStatValue(key, value);
            const explanation = this.scenario.statExplanations[key] || '';

            statsHTML += `
                <div class="stat-item">
                    <span class="stat-label tooltip-trigger" data-tooltip="${explanation}">
                        ${label}
                    </span>
                    <span class="stat-value">${formattedValue}</span>
                </div>
            `;
        });

        card.innerHTML = `
            <div class="player-card-header">
                <div>
                    <div class="player-name">${player.name}</div>
                    <span class="position-badge">${player.position}</span>
                </div>
                <div>
                    <span class="salary-label">Salary</span>
                    <div class="player-salary">$${player.salary.toFixed(1)}M</div>
                </div>
            </div>
            <div class="player-bio">${player.bio}</div>
            <div class="player-stats">
                ${statsHTML}
            </div>
            <div class="selection-indicator">✓</div>
        `;

        // Add click listener
        card.addEventListener('click', () => {
            this.togglePlayerSelection(index, card);
        });

        return card;
    }

    // Toggle player selection
    togglePlayerSelection(playerIndex, cardElement) {
        // Don't allow selection if scenario is locked or completed
        if (gameState.isScenarioLocked(this.scenarioId) || gameState.isScenarioCompleted(this.scenarioId)) {
            return;
        }

        // Toggle in state
        const selected = gameState.togglePlayer(this.scenarioId, playerIndex);

        // Update card visual
        cardElement.classList.toggle('selected');
        cardElement.classList.add('ripple');
        setTimeout(() => cardElement.classList.remove('ripple'), 600);

        // Update UI
        this.updateStats();
    }

    // Update stats panel
    updateStats() {
        const selectedIndices = gameState.getSelectedPlayers(this.scenarioId);
        const validationResult = this.validator.validate(selectedIndices);

        // Update player count
        document.getElementById(`player-count-${this.scenarioId}`).textContent = selectedIndices.length;

        // Update budget
        const budgetSpent = validationResult.budget.spent;
        const budgetPercentage = validationResult.budget.percentage;
        document.getElementById(`budget-spent-${this.scenarioId}`).textContent = `$${budgetSpent.toFixed(1)}M`;

        const budgetBar = document.getElementById(`budget-bar-${this.scenarioId}`);
        budgetBar.style.width = `${Math.min(budgetPercentage, 100)}%`;

        // Color code budget bar
        budgetBar.classList.remove('low', 'medium', 'high');
        if (budgetPercentage < BUDGET_LOW_THRESHOLD) {
            budgetBar.classList.add('low');
        } else if (budgetPercentage < BUDGET_MEDIUM_THRESHOLD) {
            budgetBar.classList.add('medium');
        } else {
            budgetBar.classList.add('high');
        }

        // Update criteria
        this.updateCriteria(validationResult.criteria);

        // Enable/disable validate button
        const validateBtn = document.getElementById(`validate-${this.scenarioId}`);
        if (validationResult.playerCount.pass && validationResult.budget.pass && selectedIndices.length > 0) {
            validateBtn.disabled = false;
        } else {
            validateBtn.disabled = true;
        }

        // Show error feedback
        if (validationResult.budget.pass === false) {
            this.showBudgetError();
        }

        // Update selected players list
        this.updateSelectedPlayersList();
    }

    // Update criteria display
    updateCriteria(criteriaResults) {
        const criteriaContainer = document.getElementById(`criteria-${this.scenarioId}`);
        criteriaContainer.innerHTML = '';

        for (const [key, result] of Object.entries(criteriaResults)) {
            const criterion = document.createElement('div');
            criterion.className = `criterion ${result.pass ? 'pass' : 'fail'}`;

            const formattedValue = this.validator.formatStatValue(key, result.value);
            const formattedThreshold = this.validator.formatStatValue(key, result.threshold);

            criterion.innerHTML = `
                <span class="criterion-label">${result.label}</span>
                <span class="criterion-value">
                    ${formattedValue} ${result.operator} ${formattedThreshold}
                    <span class="criterion-icon">${result.pass ? '✓' : '✗'}</span>
                </span>
            `;

            criteriaContainer.appendChild(criterion);
        }
    }

    // Show budget error animation
    showBudgetError() {
        const panel = document.querySelector(`#scenario-${this.scenarioId} .stats-panel`);
        panel.classList.add('shake');
        setTimeout(() => panel.classList.remove('shake'), 500);
    }

    // Validate team
    validateTeam() {
        const selectedIndices = gameState.getSelectedPlayers(this.scenarioId);
        const validationResult = this.validator.validate(selectedIndices);

        if (validationResult.pass) {
            this.handleSuccess();
        } else {
            this.handleFailure(validationResult);
        }
    }

    // Handle successful validation
    handleSuccess() {
        // Mark scenario as complete
        gameState.completeScenario(this.scenarioId);

        // Update scenario status
        this.updateScenarioStatus(true);

        // Show success animation
        const scenario = document.getElementById(`scenario-${this.scenarioId}`);
        scenario.classList.add('pass-animation', 'complete');

        // Show success modal
        this.showSuccessModal();

        // Create confetti
        this.createConfetti();

        // Update overall progress
        this.updateOverallProgress();

        // Unlock next scenario
        if (this.scenarioId < TOTAL_SCENARIOS) {
            setTimeout(() => {
                this.unlockNextScenario();
            }, UNLOCK_DELAY_MS);
        } else {
            // Game complete
            setTimeout(() => {
                this.showVictoryModal();
            }, VICTORY_DELAY_MS);
        }
    }

    // Handle failed validation
    handleFailure(validationResult) {
        // Build failure reasons list
        const failedItems = [];

        if (!validationResult.playerCount.pass) {
            failedItems.push(validationResult.playerCount.message);
        }

        if (!validationResult.budget.pass) {
            failedItems.push(validationResult.budget.message);
        }

        for (const [key, result] of Object.entries(validationResult.criteria)) {
            if (!result.pass) {
                const direction = result.operator === '>=' ? 'too low' : 'too high';
                failedItems.push(`${result.label} is ${direction}`);
            }
        }

        if (validationResult.positions) {
            for (const [key, result] of Object.entries(validationResult.positions)) {
                if (!result.pass) {
                    failedItems.push(
                        `Need at least ${result.min} ${result.label} (${result.positions.join('/')}) — have ${result.count}`
                    );
                }
            }
        }

        // Populate and show the failure modal
        const list = document.getElementById('failure-reasons-list');
        list.innerHTML = failedItems.map(reason => `<li>${reason}</li>`).join('');

        const modal = document.getElementById('failure-modal');
        modal.classList.add('show');

        document.getElementById('failure-modal-close').onclick = () => {
            modal.classList.remove('show');
        };

        // Update criteria display to show failures
        this.updateCriteria(validationResult.criteria);
    }

    // Update scenario status indicator
    updateScenarioStatus(passed) {
        const statusElement = document.getElementById(`status-${this.scenarioId}`);

        if (passed) {
            statusElement.innerHTML = `
                <span class="status-icon">✅</span>
                <span class="status-text">Complete</span>
            `;
            statusElement.className = 'scenario-status pass';
        }
    }

    // Show success modal
    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        const messageEl = modal.querySelector('.modal-message');

        const selectedIndices = gameState.getSelectedPlayers(this.scenarioId);
        const validationResult = this.validator.validate(selectedIndices);
        const playerNames = selectedIndices
            .map(idx => this.scenario.players[idx].name)
            .join(', ');

        messageEl.innerHTML = `
            You built an efficient ${this.scenario.sport} team for
            <strong>$${validationResult.budget.spent.toFixed(1)}M</strong>!<br>
            <span class="modal-player-list">Roster: ${playerNames}</span>
        `;

        modal.classList.add('show');

        document.getElementById('modal-close').onclick = () => {
            modal.classList.remove('show');
        };
    }

    // Show victory modal (all scenarios complete)
    showVictoryModal() {
        const modal = document.getElementById('victory-modal');
        modal.classList.add('show');

        document.getElementById('play-again').onclick = () => {
            this.showConfirm(
                'Reset all progress and play again from the beginning?',
                'Play Again',
                () => {
                    gameState.clearState();
                    location.reload();
                }
            );
        };
    }

    // Show a reusable confirmation modal
    showConfirm(message, okLabel, onConfirm) {
        const modal = document.getElementById('confirm-modal');
        document.getElementById('confirm-message').textContent = message;
        document.getElementById('confirm-ok').textContent = okLabel || 'Confirm';
        modal.classList.add('show');

        const okBtn = document.getElementById('confirm-ok');
        const cancelBtn = document.getElementById('confirm-cancel');

        const cleanup = () => modal.classList.remove('show');

        const okHandler = () => {
            cleanup();
            onConfirm();
            okBtn.removeEventListener('click', okHandler);
            cancelBtn.removeEventListener('click', cancelHandler);
        };
        const cancelHandler = () => {
            cleanup();
            okBtn.removeEventListener('click', okHandler);
            cancelBtn.removeEventListener('click', cancelHandler);
        };

        okBtn.addEventListener('click', okHandler);
        cancelBtn.addEventListener('click', cancelHandler);
    }

    // Create confetti effect
    createConfetti() {
        for (let i = 0; i < CONFETTI_COUNT; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 5000);
        }
    }

    // Update overall progress
    updateOverallProgress() {
        const completedCount = gameState.getCompletedCount();
        document.getElementById('completed-count').textContent = completedCount;

        const overallStatus = document.getElementById('overall-status');
        if (completedCount === TOTAL_SCENARIOS) {
            overallStatus.textContent = 'Complete!';
            overallStatus.classList.add('complete');
        } else {
            overallStatus.textContent = 'In Progress';
        }
    }

    // Unlock next scenario
    unlockNextScenario() {
        const nextScenarioId = this.scenarioId + 1;
        const nextScenario = document.getElementById(`scenario-${nextScenarioId}`);

        if (nextScenario) {
            nextScenario.classList.remove('locked');
            nextScenario.classList.add('unlocked');

            // Scroll to next scenario
            nextScenario.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Reset scenario
    resetScenario() {
        this.showConfirm(
            'Reset this scenario? Your player selections will be cleared.',
            'Yes, Reset',
            () => {
                gameState.resetScenario(this.scenarioId);
                this.renderPlayers();
                this.updateStats();
            }
        );
    }

    // Update the selected players list in the sidebar
    updateSelectedPlayersList() {
        const container = document.getElementById(`selected-players-${this.scenarioId}`);
        if (!container) return;

        const selectedIndices = gameState.getSelectedPlayers(this.scenarioId);

        if (selectedIndices.length === 0) {
            container.innerHTML = '<p class="no-players-msg">No players selected yet</p>';
            return;
        }

        container.innerHTML = selectedIndices.map(idx => {
            const player = this.scenario.players[idx];
            return `
                <div class="selected-player-tag">
                    <span class="tag-name">${player.name}</span>
                    <span class="tag-position">${player.position}</span>
                    <span class="tag-salary">$${player.salary.toFixed(1)}M</span>
                </div>
            `;
        }).join('');
    }

    // Render position requirements in the sidebar
    renderPositionConstraints() {
        const container = document.getElementById(`position-constraints-${this.scenarioId}`);
        if (!container || !this.scenario.positionConstraints) return;

        const entries = Object.entries(this.scenario.positionConstraints);
        if (entries.length === 0) return;

        const rows = entries.map(([groupName, constraint]) => {
            const label = groupName.charAt(0).toUpperCase() + groupName.slice(1);
            return `<li class="position-req">
                Needs ≥${constraint.min} ${label}
                <span class="position-req-detail">(${constraint.positions.join('/')})</span>
            </li>`;
        }).join('');

        container.innerHTML = `
            <h3>Position Requirements</h3>
            <ul class="position-req-list">${rows}</ul>
        `;
    }

    // Initialize scenario UI
    initialize() {
        // Render players
        this.renderPlayers();

        // Initialize stats
        this.updateStats();

        // Render story hook if present
        const storyHookEl = document.getElementById(`story-hook-${this.scenarioId}`);
        if (storyHookEl && this.scenario.storyHook) {
            storyHookEl.textContent = this.scenario.storyHook;
        }

        // Render position constraints
        this.renderPositionConstraints();

        // Update scenario status if already completed
        if (gameState.isScenarioCompleted(this.scenarioId)) {
            this.updateScenarioStatus(true);
            document.getElementById(`scenario-${this.scenarioId}`).classList.add('complete');
        }

        // Update lock state
        if (gameState.isScenarioLocked(this.scenarioId)) {
            document.getElementById(`scenario-${this.scenarioId}`).classList.add('locked');
        } else {
            document.getElementById(`scenario-${this.scenarioId}`).classList.remove('locked');
        }
    }
}
