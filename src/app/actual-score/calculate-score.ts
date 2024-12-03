export function calculateScore(scoreEntries: number[]): number {
  // Define the accumulator type
  interface ScoreAccumulator {
    total: number;
    consecutiveZeros: number;
  }

  // Initialize the accumulator with total score and consecutive zero count
  const initialAccumulator: ScoreAccumulator = {
    total: 0,
    consecutiveZeros: 0,
  };

  // Perform the reduction with enhanced logic
  const finalAccumulator = scoreEntries.reduce(
    (accumulator: ScoreAccumulator, addend: number): ScoreAccumulator => {
      if (addend === 0) {
        // Increment the count of consecutive zeros
        accumulator.consecutiveZeros += 1;

        if (accumulator.consecutiveZeros === 3) {
          // Reset the total score if three consecutive zeros are found
          accumulator.total = 0;
          // Optionally, reset the consecutive zero count
          accumulator.consecutiveZeros = 0;
        }
      } else {
        // Reset the consecutive zero count if the current addend is not zero
        accumulator.consecutiveZeros = 0;
        // Add the current score to the total
        accumulator.total += addend;
      }

      return accumulator;
    },
    initialAccumulator
  );

  return finalAccumulator.total;
}
