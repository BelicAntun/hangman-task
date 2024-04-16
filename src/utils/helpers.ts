type SmartPropType = {
  lengthOfQuote: number;
  uniqueLetters: number;
  mistakes: number;
  time: number;
};

export const calculateScore = ({ lengthOfQuote, uniqueLetters, mistakes, time }: SmartPropType) => {
  console.log('lengthOfQuote', lengthOfQuote);
  console.log('uniqueLetters', uniqueLetters);
  console.log('mistakes', mistakes);
  console.log('time', time);
  return Math.round((100 / mistakes) * 1000 + (uniqueLetters / lengthOfQuote) * 1000 - time / 1000);
};
