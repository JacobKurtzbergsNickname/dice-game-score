const RESET_STREAK_LENGTH = 3;

export const SCORE_THRESHOLDS = {
  over1000: 1000,
  over2000: 2000,
  over5000: 5000,
  over9000: 9000,
  autoWin: 10000,
} as const;

export type ScoreMilestone = 'base' | 'over1000' | 'over2000' | 'over5000' | 'over9000' | 'autoWin';

interface MilestoneInfo {
  readonly milestone: ScoreMilestone;
  readonly label: string;
}

const MILESTONE_INFO: Readonly<Record<ScoreMilestone, MilestoneInfo>> = {
  base: {
    milestone: 'base',
    label: '',
  },
  over1000: {
    milestone: 'over1000',
    label: 'Over 1000',
  },
  over2000: {
    milestone: 'over2000',
    label: 'Over 2000',
  },
  over5000: {
    milestone: 'over5000',
    label: 'Over 5000',
  },
  over9000: {
    milestone: 'over9000',
    label: "IT'S OVER 9000!",
  },
  autoWin: {
    milestone: 'autoWin',
    label: 'Over 10000 - Auto Win!',
  },
};

interface ScoreState {
  runningTotal: number;
  zeroStreak: number;
}

export function getScoreMilestone(score: number): ScoreMilestone {
  if (score >= SCORE_THRESHOLDS.autoWin) {
    return 'autoWin';
  }

  if (score > SCORE_THRESHOLDS.over9000) {
    return 'over9000';
  }

  if (score > SCORE_THRESHOLDS.over5000) {
    return 'over5000';
  }

  if (score > SCORE_THRESHOLDS.over2000) {
    return 'over2000';
  }

  if (score > SCORE_THRESHOLDS.over1000) {
    return 'over1000';
  }

  return 'base';
}

export function getMilestoneLabel(score: number): string {
  const milestone = getScoreMilestone(score);
  return MILESTONE_INFO[milestone].label;
}

export function isAutoWin(score: number): boolean {
  return score >= SCORE_THRESHOLDS.autoWin;
}

export function calculateScore(scoreEntries: number[]): number {
  const finalState = scoreEntries.reduce<ScoreState>(
    (state, entry) => {
      if (entry !== 0) {
        return {
          runningTotal: state.runningTotal + entry,
          zeroStreak: 0,
        };
      }

      const nextZeroStreak = state.zeroStreak + 1;

      if (nextZeroStreak === RESET_STREAK_LENGTH) {
        return {
          runningTotal: 0,
          zeroStreak: 0,
        };
      }

      return {
        ...state,
        zeroStreak: nextZeroStreak,
      };
    },
    {
      runningTotal: 0,
      zeroStreak: 0,
    },
  );

  return finalState.runningTotal;
}
