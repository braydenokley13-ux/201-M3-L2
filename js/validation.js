// Validation and Statistics Calculation
class Validator {
    constructor(scenarioData) {
        this.scenario = scenarioData;
    }

    // Calculate total salary of selected players
    calculateTotalSalary(selectedPlayers) {
        return selectedPlayers.reduce((total, player) => total + player.salary, 0);
    }

    // Calculate average of a specific stat
    calculateAverage(selectedPlayers, statKey) {
        if (selectedPlayers.length === 0) return 0;
        const sum = selectedPlayers.reduce((total, player) => total + player[statKey], 0);
        return sum / selectedPlayers.length;
    }

    // Calculate WAR efficiency (total WAR / total salary in millions)
    calculateWarEfficiency(selectedPlayers) {
        const totalSalary = this.calculateTotalSalary(selectedPlayers);
        if (totalSalary === 0) return 0;
        const totalWar = selectedPlayers.reduce((total, player) => total + player.war, 0);
        return totalWar / totalSalary;
    }

    // Validate player count
    validatePlayerCount(count) {
        return {
            pass: count >= this.scenario.minPlayers && count <= this.scenario.maxPlayers,
            message: count < this.scenario.minPlayers
                ? `Pick at least ${this.scenario.minPlayers} players`
                : count > this.scenario.maxPlayers
                ? `Pick no more than ${this.scenario.maxPlayers} players`
                : `${count} players selected`,
            count: count,
            required: `${this.scenario.minPlayers}-${this.scenario.maxPlayers}`
        };
    }

    // Validate budget
    validateBudget(totalSalary) {
        return {
            pass: totalSalary <= this.scenario.budget,
            message: totalSalary > this.scenario.budget
                ? `Over budget by $${(totalSalary - this.scenario.budget).toFixed(1)}M`
                : `$${totalSalary.toFixed(1)}M / $${this.scenario.budget}M`,
            spent: totalSalary,
            budget: this.scenario.budget,
            percentage: (totalSalary / this.scenario.budget) * 100
        };
    }

    // Validate position constraints
    validatePositions(selectedPlayers, positionConstraints) {
        const results = {};

        // If no position constraints, return empty results (all pass)
        if (!positionConstraints) {
            return results;
        }

        // Check each position group
        for (const [groupName, constraint] of Object.entries(positionConstraints)) {
            // Count players in this position group
            const count = selectedPlayers.filter(player =>
                constraint.positions.includes(player.position)
            ).length;

            // Check if minimum requirement is met
            const passes = count >= constraint.min;

            results[groupName] = {
                label: groupName.charAt(0).toUpperCase() + groupName.slice(1),
                count: count,
                min: constraint.min,
                positions: constraint.positions,
                pass: passes
            };
        }

        return results;
    }

    // Validate specific criteria
    validateCriteria(selectedPlayers) {
        const results = {};
        const criteria = this.scenario.passingCriteria;

        for (const [key, criterion] of Object.entries(criteria)) {
            let value;

            // Calculate the value based on the criterion type
            if (key === 'war_efficiency') {
                value = this.calculateWarEfficiency(selectedPlayers);
            } else {
                // Extract stat key from criterion key (e.g., "obp_avg" -> "obp")
                const statKey = key.replace('_avg', '');
                value = this.calculateAverage(selectedPlayers, statKey);
            }

            // Check if criterion passes
            const passes = this.evaluateOperator(value, criterion.threshold, criterion.operator);

            results[key] = {
                label: criterion.label,
                value: value,
                threshold: criterion.threshold,
                operator: criterion.operator,
                pass: passes
            };
        }

        return results;
    }

    // Evaluate operator comparison
    evaluateOperator(value, threshold, operator) {
        switch (operator) {
            case '>=':
                return value >= threshold;
            case '<=':
                return value <= threshold;
            case '>':
                return value > threshold;
            case '<':
                return value < threshold;
            case '==':
                return value === threshold;
            default:
                return false;
        }
    }

    // Full validation - returns complete validation result
    validate(selectedPlayerIndices) {
        // Get selected player objects
        const selectedPlayers = selectedPlayerIndices.map(index => this.scenario.players[index]);

        // Validate player count
        const playerCountValidation = this.validatePlayerCount(selectedPlayers.length);

        // Validate budget
        const totalSalary = this.calculateTotalSalary(selectedPlayers);
        const budgetValidation = this.validateBudget(totalSalary);

        // Validate criteria
        const criteriaResults = this.validateCriteria(selectedPlayers);

        // Validate position constraints
        const positionResults = this.validatePositions(selectedPlayers, this.scenario.positionConstraints);

        // Determine overall pass/fail
        const allCriteriaPass = Object.values(criteriaResults).every(c => c.pass);
        const allPositionsPass = Object.values(positionResults).every(p => p.pass);
        const overallPass = playerCountValidation.pass && budgetValidation.pass && allCriteriaPass && allPositionsPass;

        return {
            pass: overallPass,
            playerCount: playerCountValidation,
            budget: budgetValidation,
            criteria: criteriaResults,
            positions: positionResults,
            selectedPlayers: selectedPlayers
        };
    }

    // Get formatted stat display value
    formatStatValue(key, value) {
        // Percentage stats
        if (key.includes('percent') || key === 'obp' || key === 'slg' || key === 'ops' || key === 'ts_percent') {
            return (value * 100).toFixed(1) + '%';
        }

        // Money
        if (key === 'salary') {
            return '$' + value.toFixed(1) + 'M';
        }

        // Whole numbers
        if (key === 'age' || key.includes('usage') || key === 'success_rate' || key === 'dvoa') {
            return value.toFixed(0);
        }

        // Default: 2 decimal places
        return value.toFixed(2);
    }
}
