import { RewardScheme, Task } from "modules/tasks/types";

const calculateReward = (task: Task): RewardScheme => {
    const { durationTimeHours, budgetSOL, minContributors, minSamplesCount } = task;

    if (minContributors <= 0 || minSamplesCount <= 0 || budgetSOL <= 0) {
        throw new Error("Invalid task configuration");
    }

    // -----------------------------
    // 1. Define Constants
    // -----------------------------
    const BONUS_POOL_PERCENTAGE = 0.2; // 20% reserved for bonuses
    const URGENCY_THRESHOLD_HOURS = 48; // Boost if below this
    const MAX_CONTRIBUTOR_BUDGET_PERCENTAGE = 0.3; // Max 30% of total budget

    // -----------------------------
    // 2. Urgency Multiplier
    // -----------------------------
    let urgencyMultiplier = 1;
    if (durationTimeHours < URGENCY_THRESHOLD_HOURS) {
        urgencyMultiplier = 1 + (1 - durationTimeHours / URGENCY_THRESHOLD_HOURS) * 0.2;
        // Max +20% reward boost if very urgent
    }

    // -----------------------------
    // 3. Budget Split
    // -----------------------------
    const bonusPool = budgetSOL * BONUS_POOL_PERCENTAGE;
    const baseBudget = budgetSOL - bonusPool;

    // -----------------------------
    // 4. Base Reward per Sample
    // -----------------------------
    const rawRewardPerSample = baseBudget / minSamplesCount;
    const baseRewardPerSample = rawRewardPerSample * urgencyMultiplier;

    // -----------------------------
    // 5. Estimated Reward per Contributor
    // -----------------------------
    const avgSamplesPerContributor = minSamplesCount / minContributors;
    const estimatedRewardPerContributor = baseRewardPerSample * avgSamplesPerContributor;

    // -----------------------------
    // 6. Max Cap per Contributor
    // -----------------------------
    const maxRewardPerContributor = budgetSOL * MAX_CONTRIBUTOR_BUDGET_PERCENTAGE;

    return {
        baseRewardPerSample: parseFloat(baseRewardPerSample.toFixed(4)),
        estimatedRewardPerContributor: parseFloat(estimatedRewardPerContributor.toFixed(4)),
        bonusPool: parseFloat(bonusPool.toFixed(4)),
        maxRewardPerContributor: parseFloat(maxRewardPerContributor.toFixed(4))
    };
}

export { calculateReward };
