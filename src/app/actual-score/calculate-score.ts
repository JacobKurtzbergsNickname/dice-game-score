const RESET_STREAK_LENGTH = 3;

interface ScoreState {
  runningTotal: number;
  zeroStreak: number;
}

export function calculateScore(scoreEntries: number[]): number {
  const finalState = scoreEntries.reduce<ScoreState>((state, entry) => {
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
  }, {
    runningTotal: 0,
    zeroStreak: 0,
  });

  return finalState.runningTotal;
}
