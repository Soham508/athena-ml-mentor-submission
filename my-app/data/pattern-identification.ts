export interface PatternQuestion {
  id: number;
  question: string;
  pattern: string[];
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  system: string;
  hint?: string;
}

export const patternQuestions: PatternQuestion[] = [
  {
    id: 1,
    question: "Complete the Roman numeral sequence:",
    pattern: ["I", "II", "III", "IV", "?"],
    options: ["IIII", "V", "VI", "IV"],
    correctAnswer: 1,
    explanation: "The sequence follows 1, 2, 3, 4, 5 in Roman numerals. After IV (4) comes V (5).",
    difficulty: "easy",
    system: "Roman",
    hint: "Roman numerals use V to represent 5"
  },
  {
    id: 2,
    question: "What comes next in this Roman numeral pattern?",
    pattern: ["V", "X", "XV", "XX", "?"],
    options: ["XXV", "XXIV", "XXX", "VX"],
    correctAnswer: 0,
    explanation: "The pattern increases by 5 each time: 5, 10, 15, 20, 25. XXV represents 25.",
    difficulty: "easy",
    system: "Roman",
    hint: "Each step adds 5 to the previous value"
  },
  {
    id: 3,
    question: "Identify the pattern in Mayan numerals (● = 1, ▬ = 5):",
    pattern: ["●", "●●", "●●●", "●●●●", "?"],
    options: ["●●●●●", "▬", "▬ ●", "●●●●● ●"],
    correctAnswer: 1,
    explanation: "The sequence is 1, 2, 3, 4, 5. In Mayan numerals, 5 is represented by a single bar (▬).",
    difficulty: "easy",
    system: "Mayan",
    hint: "After four dots, Mayans use a bar symbol"
  },
  {
    id: 4,
    question: "Complete this Mayan number sequence:",
    pattern: ["▬", "▬ ●", "▬ ●●", "▬ ●●●", "?"],
    options: ["▬ ●●●●", "▬▬", "▬ ●●●● ●", "●●●●●●●●●"],
    correctAnswer: 0,
    explanation: "The pattern is 5, 6, 7, 8, 9. Nine is represented as ▬ ●●●● (one bar and four dots).",
    difficulty: "medium",
    system: "Mayan",
    hint: "One bar equals 5, add dots for additional units"
  },
  {
    id: 5,
    question: "What's the next number in this binary sequence?",
    pattern: ["1", "10", "11", "100", "?"],
    options: ["101", "110", "111", "1000"],
    correctAnswer: 0,
    explanation: "The sequence is 1, 2, 3, 4, 5 in binary. 5 in binary is 101.",
    difficulty: "medium",
    system: "Binary",
    hint: "Convert to decimal: 1, 2, 3, 4, ?"
  },
  {
    id: 6,
    question: "Complete the Egyptian hieroglyphic pattern (𓏺=1, 𓎆=10):",
    pattern: ["𓏺", "𓏺𓏺", "𓏺𓏺𓏺", "?"],
    options: ["𓏺𓏺𓏺𓏺", "𓎆", "𓏺𓏺𓏺𓏺𓏺", "𓏺𓏺𓏺𓏺𓏺𓏺𓏺𓏺𓏺𓏺"],
    correctAnswer: 0,
    explanation: "The pattern shows 1, 2, 3, so next is 4 (𓏺𓏺𓏺𓏺).",
    difficulty: "easy",
    system: "Egyptian",
    hint: "Simply count the stroke symbols"
  },
  {
    id: 7,
    question: "Identify the missing Roman numeral:",
    pattern: ["X", "XX", "?", "XL", "L"],
    options: ["XXX", "XXXX", "XC", "LX"],
    correctAnswer: 0,
    explanation: "The sequence is 10, 20, 30, 40, 50. XXX represents 30.",
    difficulty: "easy",
    system: "Roman",
    hint: "The pattern increases by 10 each time"
  },
  {
    id: 8,
    question: "What pattern do these Chinese numerals follow?",
    pattern: ["一", "二", "三", "四", "?"],
    options: ["五", "十", "六", "四四"],
    correctAnswer: 0,
    explanation: "This is the sequence 1-5 in Chinese. 五 (wǔ) means 5.",
    difficulty: "easy",
    system: "Chinese",
    hint: "These are the first five numbers in Chinese"
  },
  {
    id: 9,
    question: "Complete this powers-of-two binary pattern:",
    pattern: ["1", "10", "100", "1000", "?"],
    options: ["10000", "1111", "10001", "11000"],
    correctAnswer: 0,
    explanation: "Pattern shows 1, 2, 4, 8 (powers of 2). Next is 16 = 10000 in binary.",
    difficulty: "medium",
    system: "Binary",
    hint: "Each number is double the previous"
  },
  {
    id: 10,
    question: "Which Mayan numeral completes this sequence?",
    pattern: ["▬▬", "▬▬ ●", "▬▬ ●●", "?"],
    options: ["▬▬ ●●●", "▬▬▬", "●●●●●●●●●●●●", "▬ ▬ ▬"],
    correctAnswer: 0,
    explanation: "The sequence is 10, 11, 12, 13. Thirteen is ▬▬ ●●● (two bars and three dots).",
    difficulty: "medium",
    system: "Mayan",
    hint: "Two bars = 10, then add dots"
  },
  {
    id: 11,
    question: "Find the pattern in Roman numerals:",
    pattern: ["C", "XC", "LXXX", "LXX", "?"],
    options: ["LX", "L", "XL", "XXX"],
    correctAnswer: 0,
    explanation: "The pattern decreases by 10: 100, 90, 80, 70, 60. LX represents 60.",
    difficulty: "medium",
    system: "Roman",
    hint: "Each number decreases by 10"
  },
  {
    id: 12,
    question: "Complete the Chinese tens sequence:",
    pattern: ["十", "二十", "三十", "四十", "?"],
    options: ["五十", "百", "五", "十十"],
    correctAnswer: 0,
    explanation: "The sequence is 10, 20, 30, 40, 50. 五十 means 50 (five-tens).",
    difficulty: "medium",
    system: "Chinese",
    hint: "五 means five, 十 means ten"
  },
  {
    id: 13,
    question: "What's the pattern in these Egyptian numerals? (𓎆=10, 𓍢=100)",
    pattern: ["𓎆", "𓎆𓎆", "𓎆𓎆𓎆", "?"],
    options: ["𓍢", "𓎆𓎆𓎆𓎆", "𓎆𓎆𓎆𓎆𓎆", "𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓎆"],
    correctAnswer: 1,
    explanation: "The pattern is 10, 20, 30, 40. Four 𓎆 symbols represent 40.",
    difficulty: "easy",
    system: "Egyptian",
    hint: "Count the heel bone symbols"
  },
  {
    id: 14,
    question: "Identify the next binary number in this odd number sequence:",
    pattern: ["1", "11", "101", "111", "?"],
    options: ["1001", "1000", "1010", "1100"],
    correctAnswer: 0,
    explanation: "The sequence shows odd numbers: 1, 3, 5, 7, 9. Nine in binary is 1001.",
    difficulty: "hard",
    system: "Binary",
    hint: "These are odd numbers: 1, 3, 5, 7, ?"
  },
  {
    id: 15,
    question: "Complete this Roman numeral pattern with subtractive notation:",
    pattern: ["IV", "IX", "XIV", "XIX", "?"],
    options: ["XXIV", "XX", "XXIII", "XXV"],
    correctAnswer: 0,
    explanation: "Pattern: 4, 9, 14, 19, 24. Each adds 5, using subtractive notation. XXIV = 24.",
    difficulty: "hard",
    system: "Roman",
    hint: "The pattern adds 5 each time: 4, 9, 14, 19..."
  },
  {
    id: 16,
    question: "Find the missing Mayan numeral in this base-20 pattern:",
    pattern: ["●●●●", "▬ ●●●●", "▬▬ ●●●●", "?"],
    options: ["▬▬▬ ●●●●", "● | ●", "●●●● | ●●●●", "▬▬▬"],
    correctAnswer: 0,
    explanation: "The pattern is 4, 9, 14, 19. Nineteen is ▬▬▬ ●●●● (three bars and four dots).",
    difficulty: "hard",
    system: "Mayan",
    hint: "Each step adds 5 in base-20"
  },
  {
    id: 17,
    question: "What comes next in this Greek numeral sequence? (Α=1, Β=2, Γ=3, Δ=4)",
    pattern: ["Α", "Β", "Γ", "Δ", "?"],
    options: ["Ε", "Ϛ", "Η", "Ι"],
    correctAnswer: 0,
    explanation: "The sequence is 1, 2, 3, 4, 5. Ε (Epsilon) represents 5 in Greek numerals.",
    difficulty: "easy",
    system: "Greek",
    hint: "Following the Greek alphabet for numerals"
  },
  {
    id: 18,
    question: "Complete this Chinese hundreds pattern:",
    pattern: ["一百", "二百", "三百", "?"],
    options: ["四百", "百", "千", "四四"],
    correctAnswer: 0,
    explanation: "The sequence is 100, 200, 300, 400. 四百 means 400 (four-hundred).",
    difficulty: "medium",
    system: "Chinese",
    hint: "百 means hundred"
  },
  {
    id: 19,
    question: "Identify the pattern in this binary Fibonacci-style sequence:",
    pattern: ["1", "1", "10", "11", "?"],
    options: ["101", "100", "110", "111"],
    correctAnswer: 0,
    explanation: "Fibonacci in binary: 1, 1, 2, 3, 5. Five in binary is 101.",
    difficulty: "hard",
    system: "Binary",
    hint: "Add the previous two numbers: 1+1=2, 1+2=3, 2+3=?"
  },
  {
    id: 20,
    question: "Complete this complex Roman numeral pattern:",
    pattern: ["L", "XLV", "XL", "XXXV", "?"],
    options: ["XXX", "XXV", "XX", "XV"],
    correctAnswer: 0,
    explanation: "The pattern decreases by 5: 50, 45, 40, 35, 30. XXX represents 30.",
    difficulty: "hard",
    system: "Roman",
    hint: "Each number is 5 less than the previous"
  }
];

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return patternQuestions.filter(q => q.difficulty === difficulty);
};

export const getQuestionsBySystem = (system: string) => {
  return patternQuestions.filter(q => q.system === system);
};
