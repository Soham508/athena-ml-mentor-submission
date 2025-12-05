export interface ConstructionQuestion {
  id: number;
  question: string;
  task: string;
  type: 'mcq' | 'input';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  system: string;
  hint?: string;
  validationRegex?: string;
}

export const constructionQuestions: ConstructionQuestion[] = [
  {
    id: 1,
    question: "Build the number 2024 in Roman numerals using proper notation.",
    task: "Enter your answer in Roman numerals",
    type: 'input',
    correctAnswer: 'MMXXIV',
    explanation: "2024 = 2000 + 20 + 4 = MM + XX + IV = MMXXIV",
    difficulty: 'medium',
    system: 'Roman',
    hint: "Break it down: 2000, 20, and 4",
    validationRegex: '^[IVXLCDM]+$'
  },
  {
    id: 2,
    question: "Construct the number 99 using only Roman subtractive notation where possible.",
    task: "Choose the correct representation",
    type: 'mcq',
    options: ['XCIX', 'IC', 'LXXXXVIIII', 'XCVIIII'],
    correctAnswer: 0,
    explanation: "99 = 90 + 9 = XC + IX = XCIX. Using subtractive notation for both parts.",
    difficulty: 'medium',
    system: 'Roman',
    hint: "Think 90 + 9, both using subtraction"
  },
  {
    id: 3,
    question: "Build the number 73 in Mayan numerals (use ● for 1, ▬ for 5, | for position separator).",
    task: "Enter your answer using ●, ▬, and |",
    type: 'input',
    correctAnswer: '▬▬▬ ●●● | ▬▬▬',
    explanation: "73 in base-20: 73 = 3×20 + 13. Position 1: 3 = ▬▬▬, Position 0: 13 = ▬▬ ●●●. Written as: ▬▬▬ | ▬▬ ●●●",
    difficulty: 'hard',
    system: 'Mayan',
    hint: "73 ÷ 20 = 3 remainder 13. Show both levels.",
    validationRegex: '^[●▬|\\s]+$'
  },
  {
    id: 4,
    question: "Create the largest possible number using exactly 5 Mayan symbols (●, ▬).",
    task: "Choose the correct answer",
    type: 'mcq',
    options: ['▬▬▬▬▬', '▬▬▬▬ ●', '●●●●●', '▬ ▬ ▬ ▬ ▬'],
    correctAnswer: 0,
    explanation: "Five bars (▬▬▬▬▬) = 25, which is the largest. Five dots would be 5, and ▬▬▬▬ ● = 21.",
    difficulty: 'easy',
    system: 'Mayan',
    hint: "What single symbol has the highest value?"
  },
  {
    id: 5,
    question: "Construct 888 in Chinese numerals.",
    task: "Choose the correct construction",
    type: 'mcq',
    options: ['八百八十八', '八八八', '三八', '八千八百八'],
    correctAnswer: 0,
    explanation: "888 = 800 + 80 + 8 = 八百八十八 (eight-hundred eight-ten eight).",
    difficulty: 'medium',
    system: 'Chinese',
    hint: "Break into hundreds, tens, and ones"
  },
  {
    id: 6,
    question: "Build 255 in binary (base-2).",
    task: "Enter the binary representation",
    type: 'input',
    correctAnswer: '11111111',
    explanation: "255 in binary is 11111111 (eight 1s). This equals 128+64+32+16+8+4+2+1 = 255.",
    difficulty: 'medium',
    system: 'Binary',
    hint: "All bits on for an 8-bit number",
    validationRegex: '^[01]+$'
  },
  {
    id: 7,
    question: "Construct the number 444 using Roman numerals with the most efficient notation.",
    task: "Choose the most efficient representation",
    type: 'mcq',
    options: ['CDXLIV', 'CCCCXXXXIIII', 'CCCCXXXXIV', 'CDXXXXIV'],
    correctAnswer: 0,
    explanation: "444 = 400 + 40 + 4 = CD + XL + IV = CDXLIV. This uses subtractive notation efficiently.",
    difficulty: 'hard',
    system: 'Roman',
    hint: "Use subtractive notation for 400, 40, and 4"
  },
  {
    id: 8,
    question: "Create a palindromic binary number between 20 and 30 (decimal).",
    task: "Enter the binary palindrome",
    type: 'input',
    correctAnswer: '11011',
    explanation: "27 in binary is 11011, which reads the same forwards and backwards. 27 is between 20 and 30.",
    difficulty: 'hard',
    system: 'Binary',
    hint: "Try numbers around 27",
    validationRegex: '^[01]+$'
  },
  {
    id: 9,
    question: "Build 3456 in Chinese numerals.",
    task: "Enter your answer using Chinese characters",
    type: 'input',
    correctAnswer: '三千四百五十六',
    explanation: "3456 = 3000 + 400 + 50 + 6 = 三千四百五十六 (three-thousand four-hundred five-ten six).",
    difficulty: 'hard',
    system: 'Chinese',
    hint: "Break into: thousands, hundreds, tens, ones"
  },
  {
    id: 10,
    question: "Construct the Egyptian hieroglyphic for 1,234 (𓏺=1, 𓎆=10, 𓍢=100, 𓁨=1000).",
    task: "Choose the correct representation",
    type: 'mcq',
    options: [
      '𓁨𓍢𓍢𓎆𓎆𓎆𓏺𓏺𓏺𓏺',
      '𓁨𓁨𓍢𓍢𓍢𓎆𓎆𓎆𓎆',
      '𓁨𓍢𓍢𓎆𓎆𓎆𓏺𓏺𓏺',
      '𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓎆𓎆𓎆𓏺𓏺𓏺𓏺'
    ],
    correctAnswer: 0,
    explanation: "1234 = 1×1000 + 2×100 + 3×10 + 4×1 = 𓁨 + 𓍢𓍢 + 𓎆𓎆𓎆 + 𓏺𓏺𓏺𓏺",
    difficulty: 'medium',
    system: 'Egyptian',
    hint: "Count each symbol: 1 lotus, 2 coils, 3 heels, 4 strokes"
  },
  {
    id: 11,
    question: "Build the number 64 using Babylonian numerals (𓐕=1, 𓌋=10, | for position).",
    task: "Enter using 𓐕, 𓌋, and |",
    type: 'input',
    correctAnswer: '𓐕 | 𓐕𓐕𓐕𓐕',
    explanation: "64 in base-60: 64 = 1×60 + 4. Position 1: 1 = 𓐕, Position 0: 4 = 𓐕𓐕𓐕𓐕. Written as: 𓐕 | 𓐕𓐕𓐕𓐕",
    difficulty: 'hard',
    system: 'Babylonian',
    hint: "64 = 1×60 + 4. Show both positions.",
    validationRegex: '^[𓐕𓌋|\\s]+$'
  },
  {
    id: 12,
    question: "Construct the smallest Roman numeral that uses all symbols I, V, X, L, C, D, M at least once.",
    task: "Choose the smallest valid number",
    type: 'mcq',
    options: ['MDCLXVI', 'MCDLXVI', 'DCMLXVI', 'MDCLXIV'],
    correctAnswer: 0,
    explanation: "MDCLXVI = 1666. This uses M(1000)+D(500)+C(100)+L(50)+X(10)+V(5)+I(1) = 1666, the smallest possible.",
    difficulty: 'hard',
    system: 'Roman',
    hint: "Arrange symbols in descending order"
  },
  {
    id: 13,
    question: "Build 128 in binary.",
    task: "Enter the binary number",
    type: 'input',
    correctAnswer: '10000000',
    explanation: "128 is 2^7, which in binary is 10000000 (1 followed by seven 0s).",
    difficulty: 'easy',
    system: 'Binary',
    hint: "128 is a power of 2",
    validationRegex: '^[01]+$'
  },
  {
    id: 14,
    question: "Create the number 515 in Greek numerals (Φ=500, Ι=10, Ε=5).",
    task: "Choose the correct representation",
    type: 'mcq',
    options: ['ΦΙΕ', 'ΦΕΙ', 'ΦΙΙΕ', 'ΕΦΙ'],
    correctAnswer: 0,
    explanation: "515 = 500 + 10 + 5 = Φ + Ι + Ε = ΦΙΕ. Greek numerals are written in descending order.",
    difficulty: 'medium',
    system: 'Greek',
    hint: "Combine 500, 10, and 5 in order"
  },
  {
    id: 15,
    question: "Construct 1999 using Roman numerals with maximum use of subtractive notation.",
    task: "Enter your answer in Roman numerals",
    type: 'input',
    correctAnswer: 'MCMXCIX',
    explanation: "1999 = 1000 + 900 + 90 + 9 = M + CM + XC + IX = MCMXCIX.",
    difficulty: 'hard',
    system: 'Roman',
    hint: "Use subtractive for 900, 90, and 9",
    validationRegex: '^[IVXLCDM]+$'
  },
  {
    id: 16,
    question: "Build the number 45 in Mayan numerals.",
    task: "Enter using ● and ▬ and |",
    type: 'input',
    correctAnswer: '▬▬ | ▬',
    explanation: "45 in base-20: 45 = 2×20 + 5. Position 1: 2 = ●●, Position 0: 5 = ▬. Written as: ●● | ▬",
    difficulty: 'medium',
    system: 'Mayan',
    hint: "45 = 2×20 + 5",
    validationRegex: '^[●▬|\\s]+$'
  },
  {
    id: 17,
    question: "Create the number 1,111 using Chinese numerals.",
    task: "Choose the correct construction",
    type: 'mcq',
    options: ['一千一百一十一', '千百十一', '一一一一', '四一'],
    correctAnswer: 0,
    explanation: "1111 = 1000 + 100 + 10 + 1 = 一千一百一十一 (one-thousand one-hundred one-ten one).",
    difficulty: 'medium',
    system: 'Chinese',
    hint: "Each position needs '一' (one) as the digit"
  },
  {
    id: 18,
    question: "Build 777 in Egyptian hieroglyphics (𓏺=1, 𓎆=10, 𓍢=100).",
    task: "Enter the hieroglyphic sequence",
    type: 'input',
    correctAnswer: '𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓏺𓏺𓏺𓏺𓏺𓏺𓏺',
    explanation: "777 = 7×100 + 7×10 + 7×1 = 7 coils + 7 heels + 7 strokes.",
    difficulty: 'medium',
    system: 'Egyptian',
    hint: "Repeat each symbol 7 times"
  },
  {
    id: 19,
    question: "Construct a binary number that equals 63 in decimal.",
    task: "Enter the binary representation",
    type: 'input',
    correctAnswer: '111111',
    explanation: "63 in binary is 111111 (six 1s). This equals 32+16+8+4+2+1 = 63.",
    difficulty: 'easy',
    system: 'Binary',
    hint: "One less than 64 (which is 1000000)",
    validationRegex: '^[01]+$'
  },
  {
    id: 20,
    question: "Build 3,700 using Babylonian base-60 numerals (𓐕=1, 𓌋=10, | for position).",
    task: "Choose the correct representation",
    type: 'mcq',
    options: [
      '𓌋𓌋𓌋𓌋𓌋𓌋𓐕 | 𓌋𓌋𓌋𓌋',
      '𓌋𓌋𓌋 𓐕𓐕𓐕𓐕𓐕𓐕𓐕 | 𓌋𓌋𓌋𓌋',
      '𓌋𓌋𓌋𓌋𓌋𓌋 𓐕 | 𓌋𓌋𓌋𓌋',
      '𓐕𓐕𓐕 | 𓌋𓌋𓌋𓌋𓌋𓌋𓌋'
    ],
    correctAnswer: 0,
    explanation: "3700 in base-60: 3700 = 61×60 + 40. Position 1: 61 = 6×10 + 1 = 𓌋𓌋𓌋𓌋𓌋𓌋𓐕. Position 0: 40 = 𓌋𓌋𓌋𓌋.",
    difficulty: 'hard',
    system: 'Babylonian',
    hint: "Divide 3700 by 60. Remainder is the first position."
  }
];

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return constructionQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsBySystem = (system: string) => {
  return constructionQuestions.filter(q => q.system === system);
};

export const getQuestionsByType = (type: 'mcq' | 'input') => {
  return constructionQuestions.filter(q => q.type === type);
};
