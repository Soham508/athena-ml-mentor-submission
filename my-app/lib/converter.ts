import { NumeralSystemConverter, ConversionStep } from "@/types";

// Conversion Logic Functions

export const converters: Record<string, NumeralSystemConverter> = {
    roman: {
        id: 'roman',
        name: 'Roman Numerals',
        color: 'from-red-500 to-orange-500',
        icon: '🏛️',
        placeholder: 'e.g., MCMXCIV',
        validate: (str: string) => /^[IVXLCDM]+$/i.test(str),
        toSystem: (num: number) => {
            const steps: ConversionStep[] = [];
            let remaining = num;
            let result = '';

            const values = [
                { value: 1000, numeral: 'M' },
                { value: 900, numeral: 'CM' },
                { value: 500, numeral: 'D' },
                { value: 400, numeral: 'CD' },
                { value: 100, numeral: 'C' },
                { value: 90, numeral: 'XC' },
                { value: 50, numeral: 'L' },
                { value: 40, numeral: 'XL' },
                { value: 10, numeral: 'X' },
                { value: 9, numeral: 'IX' },
                { value: 5, numeral: 'V' },
                { value: 4, numeral: 'IV' },
                { value: 1, numeral: 'I' }
            ];

            steps.push({
                step: 1,
                description: 'Starting conversion to Roman numerals',
                result: `Input: ${num}`
            });

            let stepNum = 2;
            values.forEach(({ value, numeral }) => {
                while (remaining >= value) {
                    result += numeral;
                    steps.push({
                        step: stepNum++,
                        description: `${remaining} ≥ ${value}, add '${numeral}'`,
                        calculation: `${remaining} - ${value} = ${remaining - value}`,
                        result: `Current: ${result}, Remaining: ${remaining - value}`
                    });
                    remaining -= value;
                }
            });

            steps.push({
                step: stepNum,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        },
        toArabic: (str: string) => {
            const steps: ConversionStep[] = [];
            const upperStr = str.toUpperCase();
            let result = 0;

            const values: Record<string, number> = {
                'I': 1, 'V': 5, 'X': 10, 'L': 50,
                'C': 100, 'D': 500, 'M': 1000
            };

            steps.push({
                step: 1,
                description: 'Starting conversion from Roman numerals',
                result: `Input: ${upperStr}`
            });

            for (let i = 0; i < upperStr.length; i++) {
                const current = values[upperStr[i]];
                const next = values[upperStr[i + 1]];

                if (next && current < next) {
                    result += (next - current);
                    steps.push({
                        step: steps.length + 1,
                        description: `Subtractive notation: ${upperStr[i]}${upperStr[i + 1]}`,
                        calculation: `${next} - ${current} = ${next - current}`,
                        result: `Running total: ${result}`
                    });
                    i++;
                } else {
                    result += current;
                    steps.push({
                        step: steps.length + 1,
                        description: `Add value of '${upperStr[i]}'`,
                        calculation: `+${current}`,
                        result: `Running total: ${result}`
                    });
                }
            }

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        }
    },

    mayan: {
        id: 'mayan',
        name: 'Mayan Numerals',
        color: 'from-green-500 to-teal-500',
        icon: '🗿',
        placeholder: 'e.g., ●●● ▬▬',
        validate: (str: string) => /^[●▬\s]+$/.test(str),
        toSystem: (num: number) => {
            const steps: ConversionStep[] = [];

            steps.push({
                step: 1,
                description: 'Converting to Mayan base-20 system',
                result: `Input: ${num}`
            });

            const levels: number[] = [];
            let remaining = num;
            let position = 0;

            while (remaining > 0 || position === 0) {
                levels.push(remaining % 20);
                steps.push({
                    step: steps.length + 1,
                    description: `Position ${position} (20^${position})`,
                    calculation: `${remaining} mod 20 = ${remaining % 20}`,
                    result: `Level value: ${remaining % 20}`
                });
                remaining = Math.floor(remaining / 20);
                position++;
            }

            levels.reverse();

            const result = levels.map(val => {
                const bars = Math.floor(val / 5);
                const dots = val % 5;
                return '▬'.repeat(bars) + ' ' + '●'.repeat(dots);
            }).join(' | ');

            steps.push({
                step: steps.length + 1,
                description: 'Convert to dots (●) and bars (▬). Each dot = 1, each bar = 5',
                result: `Final: ${result}`
            });

            return { result: result.trim(), steps };
        },
        toArabic: (str: string) => {
            const steps: ConversionStep[] = [];

            steps.push({
                step: 1,
                description: 'Converting from Mayan numerals',
                result: `Input: ${str}`
            });

            const levels = str.split('|').map(s => s.trim());
            let result = 0;

            levels.forEach((level, idx) => {
                const bars = (level.match(/▬/g) || []).length;
                const dots = (level.match(/●/g) || []).length;
                const value = bars * 5 + dots;
                const position = levels.length - idx - 1;
                const positionValue = value * Math.pow(20, position);

                result += positionValue;

                steps.push({
                    step: steps.length + 1,
                    description: `Level ${idx}: ${bars} bars (×5) + ${dots} dots = ${value}`,
                    calculation: `${value} × 20^${position} = ${positionValue}`,
                    result: `Running total: ${result}`
                });
            });

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        }
    },

    chinese: {
        id: 'chinese',
        name: 'Chinese Numerals',
        color: 'from-yellow-500 to-amber-500',
        icon: '🏮',
        placeholder: 'e.g., 二千零二十四',
        validate: (str: string) => /^[零一二三四五六七八九十百千万亿]+$/.test(str),
        toSystem: (num: number) => {
            const steps: ConversionStep[] = [];
            const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            const units = ['', '十', '百', '千'];
            const bigUnits = ['', '万', '亿'];

            steps.push({
                step: 1,
                description: 'Converting to Chinese numerals',
                result: `Input: ${num}`
            });

            if (num === 0) return { result: '零', steps: [...steps, { step: 2, description: 'Zero is 零', result: '零' }] };

            let result = '';
            let numStr = num.toString();
            let needZero = false;

            const processSection = (section: string, unitIdx: number) => {
                let sectionResult = '';
                for (let i = 0; i < section.length; i++) {
                    const digit = parseInt(section[i]);
                    const pos = section.length - i - 1;

                    if (digit === 0) {
                        needZero = true;
                    } else {
                        if (needZero && sectionResult) {
                            sectionResult += '零';
                        }
                        needZero = false;
                        if (digit !== 1 || pos !== 1 || section.length > 2) {
                            sectionResult += digits[digit];
                        }
                        if (pos > 0) {
                            sectionResult += units[pos];
                        }
                    }
                }
                return sectionResult + (sectionResult && unitIdx > 0 ? bigUnits[unitIdx] : '');
            };

            const sections = [];
            while (numStr.length > 0) {
                sections.unshift(numStr.slice(-4));
                numStr = numStr.slice(0, -4);
            }

            sections.forEach((section, idx) => {
                const sectionResult = processSection(section, sections.length - idx - 1);
                result += sectionResult;
                if (sectionResult) {
                    steps.push({
                        step: steps.length + 1,
                        description: `Processing section: ${section}`,
                        result: `Current: ${sectionResult}`
                    });
                }
            });

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final: ${result}`
            });

            return { result, steps };
        },
        toArabic: (str: string) => {
            const steps: ConversionStep[] = [];
            const digits: Record<string, number> = {
                '零': 0, '一': 1, '二': 2, '三': 3, '四': 4,
                '五': 5, '六': 6, '七': 7, '八': 8, '九': 9
            };
            const multipliers: Record<string, number> = {
                '十': 10, '百': 100, '千': 1000, '万': 10000, '亿': 100000000
            };

            steps.push({
                step: 1,
                description: 'Converting from Chinese numerals',
                result: `Input: ${str}`
            });

            let result = 0;
            let current = 0;
            let temp = 0;

            for (let char of str) {
                if (digits[char] !== undefined) {
                    temp = digits[char];
                    steps.push({
                        step: steps.length + 1,
                        description: `Read digit: ${char} = ${temp}`,
                        result: `Temp value: ${temp}`
                    });
                } else if (multipliers[char]) {
                    if (temp === 0) temp = 1;
                    if (char === '万' || char === '亿') {
                        result = (result + current + temp) * multipliers[char];
                        current = 0;
                        temp = 0;
                    } else {
                        current += temp * multipliers[char];
                        temp = 0;
                    }
                    steps.push({
                        step: steps.length + 1,
                        description: `Apply multiplier: ${char} (×${multipliers[char]})`,
                        result: `Running total: ${result + current}`
                    });
                }
            }

            result += current + temp;

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        }
    },

    binary: {
        id: 'binary',
        name: 'Binary System',
        color: 'from-slate-600 to-gray-700',
        icon: '💻',
        placeholder: 'e.g., 11111101000',
        validate: (str: string) => /^[01]+$/.test(str),
        toSystem: (num: number) => {
            const steps: ConversionStep[] = [];

            steps.push({
                step: 1,
                description: 'Converting to binary (base-2)',
                result: `Input: ${num}`
            });

            if (num === 0) {
                steps.push({ step: 2, description: 'Zero is 0 in binary', result: '0' });
                return { result: '0', steps };
            }

            let binary = '';
            let remaining = num;
            let position = 0;

            while (remaining > 0) {
                const bit = remaining % 2;
                binary = bit + binary;

                steps.push({
                    step: steps.length + 1,
                    description: `Position ${position} (2^${position})`,
                    calculation: `${remaining} ÷ 2 = ${Math.floor(remaining / 2)} remainder ${bit}`,
                    result: `Bit: ${bit}, Binary so far: ${binary}`
                });

                remaining = Math.floor(remaining / 2);
                position++;
            }

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final: ${binary}`
            });

            return { result: binary, steps };
        },
        toArabic: (str: string) => {
            const steps: ConversionStep[] = [];

            steps.push({
                step: 1,
                description: 'Converting from binary to decimal',
                result: `Input: ${str}`
            });

            let result = 0;
            const len = str.length;

            for (let i = 0; i < len; i++) {
                const bit = parseInt(str[len - 1 - i]);
                const value = bit * Math.pow(2, i);
                result += value;

                if (bit === 1) {
                    steps.push({
                        step: steps.length + 1,
                        description: `Position ${i}: bit is ${bit}`,
                        calculation: `${bit} × 2^${i} = ${value}`,
                        result: `Running total: ${result}`
                    });
                }
            }

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        }
    },

    babylonian: {
        id: 'babylonian',
        name: 'Babylonian Numerals',
        color: 'from-blue-500 to-indigo-500',
        icon: '📜',
        placeholder: 'e.g., 𒌋𒌋 𒐕',
        validate: (str: string) => /^[𒐕𒌋\s]+$/.test(str),
        toSystem: (num: number) => {
            const steps: ConversionStep[] = [];
            
            steps.push({
                step: 1,
                description: 'Converting to Babylonian base-60 system',
                result: `Input: ${num}`
            });

            if (num === 0) {
                steps.push({ step: 2, description: 'Zero representation', result: '𒑊' });
                return { result: '𒑊', steps };
            }

            const base60Digits: number[] = [];
            let remaining = num;
            let position = 0;

            // Convert to base-60
            while (remaining > 0) {
                const digit = remaining % 60;
                base60Digits.unshift(digit);
                steps.push({
                    step: steps.length + 1,
                    description: `Position ${position} (60^${position})`,
                    calculation: `${remaining} mod 60 = ${digit}`,
                    result: `Digit: ${digit}`
                });
                remaining = Math.floor(remaining / 60);
                position++;
            }

            // Convert each base-60 digit to cuneiform
            const result = base60Digits.map((digit, idx) => {
                const tens = Math.floor(digit / 10);
                const ones = digit % 10;
                
                const symbol = '𒌋'.repeat(tens) + ' ' + '𒐕'.repeat(ones);
                
                steps.push({
                    step: steps.length + 1,
                    description: `Position ${base60Digits.length - idx - 1}: ${digit} = ${tens}×10 + ${ones}×1`,
                    result: `Symbol: ${symbol.trim()}`
                });
                
                return symbol.trim();
            }).join(' | ');

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete. Positions separated by |',
                result: `Final: ${result}`
            });

            return { result, steps };
        },
        toArabic: (str: string) => {
            const steps: ConversionStep[] = [];
            
            steps.push({
                step: 1,
                description: 'Converting from Babylonian numerals',
                result: `Input: ${str}`
            });

            const positions = str.split('|').map(s => s.trim());
            let result = 0;

            positions.forEach((position, idx) => {
                const tens = (position.match(/𒌋/g) || []).length;
                const ones = (position.match(/𒐕/g) || []).length;
                const digitValue = tens * 10 + ones;
                const positionPower = positions.length - idx - 1;
                const value = digitValue * Math.pow(60, positionPower);
                
                result += value;
                
                steps.push({
                    step: steps.length + 1,
                    description: `Position ${positionPower}: ${tens}×10 + ${ones}×1 = ${digitValue}`,
                    calculation: `${digitValue} × 60^${positionPower} = ${value}`,
                    result: `Running total: ${result}`
                });
            });

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        }
    },

    greek: {
        id: 'greek',
        name: 'Greek Numerals',
        color: 'from-violet-500 to-purple-500',
        icon: '🏛️',
        placeholder: 'e.g., ΧΚΔ',
        validate: (str: string) => /^[ΑΒΓΔΕϚΖΗΘΙΚΛΜΝΞΟΠϞΡΣΤΥΦΧΨΩ]+$/i.test(str),
        toSystem: (num: number) => {
            const steps: ConversionStep[] = [];
            
            steps.push({
                step: 1,
                description: 'Converting to Greek alphabetic numerals',
                result: `Input: ${num}`
            });

            if (num === 0 || num > 9999) {
                steps.push({ 
                    step: 2, 
                    description: 'Number out of range (1-9999)', 
                    result: 'Error' 
                });
                return { result: 'Out of range', steps };
            }

            const ones = ['', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ϛ', 'Ζ', 'Η', 'Θ'];
            const tens = ['', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ϟ'];
            const hundreds = ['', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'];
            const thousands = ['', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ϛ', 'Ζ', 'Η', 'Θ'];

            const o = num % 10;
            const t = Math.floor((num % 100) / 10);
            const h = Math.floor((num % 1000) / 100);
            const th = Math.floor(num / 1000);

            let result = '';

            if (th > 0) {
                result += thousands[th] + '͵';
                steps.push({
                    step: steps.length + 1,
                    description: `Thousands place: ${th}`,
                    result: `Add ${thousands[th]}͵ (${th * 1000})`
                });
            }

            if (h > 0) {
                result += hundreds[h];
                steps.push({
                    step: steps.length + 1,
                    description: `Hundreds place: ${h}`,
                    result: `Add ${hundreds[h]} (${h * 100})`
                });
            }

            if (t > 0) {
                result += tens[t];
                steps.push({
                    step: steps.length + 1,
                    description: `Tens place: ${t}`,
                    result: `Add ${tens[t]} (${t * 10})`
                });
            }

            if (o > 0) {
                result += ones[o];
                steps.push({
                    step: steps.length + 1,
                    description: `Ones place: ${o}`,
                    result: `Add ${ones[o]} (${o})`
                });
            }

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final: ${result}`
            });

            return { result, steps };
        },
        toArabic: (str: string) => {
            const steps: ConversionStep[] = [];
            const upperStr = str.toUpperCase();
            
            steps.push({
                step: 1,
                description: 'Converting from Greek numerals',
                result: `Input: ${upperStr}`
            });

            const values: Record<string, number> = {
                'Α': 1, 'Β': 2, 'Γ': 3, 'Δ': 4, 'Ε': 5, 'Ϛ': 6, 'Ζ': 7, 'Η': 8, 'Θ': 9,
                'Ι': 10, 'Κ': 20, 'Λ': 30, 'Μ': 40, 'Ν': 50, 'Ξ': 60, 'Ο': 70, 'Π': 80, 'Ϟ': 90,
                'Ρ': 100, 'Σ': 200, 'Τ': 300, 'Υ': 400, 'Φ': 500, 'Χ': 600, 'Ψ': 700, 'Ω': 800
            };

            let result = 0;
            let i = 0;

            while (i < upperStr.length) {
                const char = upperStr[i];
                
                if (char === '͵' && i > 0) {
                    const prevChar = upperStr[i - 1];
                    const prevValue = values[prevChar] || 0;
                    result = result - prevValue + (prevValue * 1000);
                    steps.push({
                        step: steps.length + 1,
                        description: `Thousands marker (͵) after ${prevChar}`,
                        calculation: `${prevValue} × 1000 = ${prevValue * 1000}`,
                        result: `Running total: ${result}`
                    });
                } else if (values[char]) {
                    result += values[char];
                    steps.push({
                        step: steps.length + 1,
                        description: `Letter ${char}`,
                        calculation: `+${values[char]}`,
                        result: `Running total: ${result}`
                    });
                }
                i++;
            }

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        }
    },

    egyptian: {
        id: 'egyptian',
        name: 'Egyptian Hieroglyphic',
        color: 'from-amber-600 to-yellow-600',
        icon: '𓀀',
        placeholder: 'e.g., 𓆼𓆼𓆼',
        validate: (str: string) => /^[𓏺𓎆𓍢𓁨𓆼𓆿𓁶]+$/.test(str),
        toSystem: (num: number) => {
            const steps: ConversionStep[] = [];
            
            steps.push({
                step: 1,
                description: 'Converting to Egyptian hieroglyphic numerals',
                result: `Input: ${num}`
            });

            if (num === 0) {
                return { result: '0', steps: [...steps, { step: 2, description: 'Zero (no symbol)', result: '0' }] };
            }

            const symbols = [
                { value: 1000000, symbol: '𓁶' },
                { value: 100000, symbol: '𓆿' },
                { value: 10000, symbol: '𓆼' },
                { value: 1000, symbol: '𓁨' },
                { value: 100, symbol: '𓍢' },
                { value: 10, symbol: '𓎆' },
                { value: 1, symbol: '𓏺' }
            ];

            let result = '';
            let remaining = num;

            symbols.forEach(({ value, symbol }) => {
                const count = Math.floor(remaining / value);
                if (count > 0) {
                    const addedSymbols = symbol.repeat(count);
                    result += addedSymbols;
                    steps.push({
                        step: steps.length + 1,
                        description: `${count} × ${value} = ${count * value}`,
                        calculation: `Add ${count} "${symbol}" symbols`,
                        result: `Remaining: ${remaining - (count * value)}`
                    });
                    remaining -= count * value;
                }
            });

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final: ${result}`
            });

            return { result, steps };
        },
        toArabic: (str: string) => {
            const steps: ConversionStep[] = [];
            
            steps.push({
                step: 1,
                description: 'Converting from Egyptian hieroglyphics',
                result: `Input: ${str}`
            });

            const values: Record<string, number> = {
                '𓏺': 1,
                '𓎆': 10,
                '𓍢': 100,
                '𓁨': 1000,
                '𓆼': 10000,
                '𓆿': 100000,
                '𓁶': 1000000
            };

            let result = 0;

            Object.entries(values).forEach(([symbol, value]) => {
                const count = (str.match(new RegExp(symbol, 'g')) || []).length;
                if (count > 0) {
                    const contribution = count * value;
                    result += contribution;
                    steps.push({
                        step: steps.length + 1,
                        description: `Count ${symbol} symbols: ${count}`,
                        calculation: `${count} × ${value} = ${contribution}`,
                        result: `Running total: ${result}`
                    });
                }
            });

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        }
    },

    yoruba: {
        id: 'yoruba',
        name: 'Yoruba Numerals',
        color: 'from-purple-500 to-pink-500',
        icon: '🌍',
        placeholder: 'e.g., Ogún (20)',
        validate: (str: string) => true, // Accept text input
        toSystem: (num: number) => {
            const steps: ConversionStep[] = [];
            
            steps.push({
                step: 1,
                description: 'Converting to Yoruba base-20 subtractive system',
                result: `Input: ${num}`
            });

            const basicNumbers: Record<number, string> = {
                0: 'òdo', 1: 'ọkan', 2: 'èjì', 3: 'ẹta', 4: 'ẹrin', 5: 'àrùn',
                6: 'ẹfà', 7: 'èje', 8: 'ẹjọ', 9: 'ẹsán', 10: 'ẹwá',
                11: 'ọkànlá', 12: 'èjìlá', 13: 'ẹtàlá', 14: 'ẹrìnlá', 15: 'ẹ̀ẹ́dógún',
                16: 'ẹrìndílógún', 17: 'ẹtàdílógún', 18: 'èjìdílógún', 19: 'ọkàndílógún',
                20: 'ogún', 30: 'ọgbọ̀n', 40: 'ogójì', 50: 'àádọ́ta',
                60: 'ọgọ́ta', 70: 'àádọ́rin', 80: 'ọgọ́rin', 90: 'àádọ́rùn-ún',
                100: 'ọgọ́rùn-ún', 200: 'igba'
            };

            if (basicNumbers[num]) {
                steps.push({
                    step: 2,
                    description: 'Direct translation found',
                    result: `${num} = ${basicNumbers[num]}`
                });
                return { result: basicNumbers[num], steps };
            }

            // Simplified conversion for demonstration
            let result = '';
            
            if (num < 20) {
                result = basicNumbers[num] || `ọkan lé ${basicNumbers[num - 1]}`;
            } else if (num < 100) {
                const twenties = Math.floor(num / 20);
                const remainder = num % 20;
                
                if (remainder === 0) {
                    result = basicNumbers[num] || `ogún ${['', 'méjì', 'mẹta', 'mẹrin'][twenties - 1]}`;
                } else if (remainder < 10) {
                    result = `${basicNumbers[remainder]} lé ${basicNumbers[twenties * 20]}`;
                } else {
                    result = `${basicNumbers[20 - remainder]} dín ${basicNumbers[(twenties + 1) * 20]}`;
                    steps.push({
                        step: steps.length + 1,
                        description: 'Using subtractive notation',
                        calculation: `${(twenties + 1) * 20} - ${20 - remainder} = ${num}`,
                        result: result
                    });
                }
            } else {
                result = `ọgọ́rùn-ún ${num > 100 ? `lé ${num - 100}` : ''}`;
            }

            steps.push({
                step: steps.length + 1,
                description: 'Yoruba uses base-20 with subtractive patterns',
                result: `Approximate: ${result}`
            });

            return { result, steps };
        },
        toArabic: (str: string) => {
            const steps: ConversionStep[] = [];
            
            steps.push({
                step: 1,
                description: 'Converting from Yoruba numerals',
                result: `Input: ${str}`
            });

            const basicNumbers: Record<string, number> = {
                'òdo': 0, 'ọkan': 1, 'èjì': 2, 'ẹta': 3, 'ẹrin': 4, 'àrùn': 5,
                'ẹfà': 6, 'èje': 7, 'ẹjọ': 8, 'ẹsán': 9, 'ẹwá': 10,
                'ọkànlá': 11, 'èjìlá': 12, 'ẹtàlá': 13, 'ẹrìnlá': 14,
                'ogún': 20, 'ọgbọ̀n': 30, 'ogójì': 40, 'ọgọ́ta': 60,
                'ọgọ́rin': 80, 'ọgọ́rùn-ún': 100, 'igba': 200
            };

            const lowerStr = str.toLowerCase().trim();
            
            if (basicNumbers[lowerStr] !== undefined) {
                const result = basicNumbers[lowerStr];
                steps.push({
                    step: 2,
                    description: 'Direct match found',
                    result: `${lowerStr} = ${result}`
                });
                return { result, steps };
            }

            // Simple parsing for demonstration
            let result = 0;
            
            if (lowerStr.includes('lé')) {
                const parts = lowerStr.split('lé');
                result = (basicNumbers[parts[1]?.trim()] || 0) + (basicNumbers[parts[0]?.trim()] || 0);
                steps.push({
                    step: 2,
                    description: 'Additive pattern (lé = add)',
                    calculation: `${parts[1]?.trim()} + ${parts[0]?.trim()}`,
                    result: `Result: ${result}`
                });
            } else if (lowerStr.includes('dín')) {
                const parts = lowerStr.split('dín');
                result = (basicNumbers[parts[1]?.trim()] || 0) - (basicNumbers[parts[0]?.trim()] || 0);
                steps.push({
                    step: 2,
                    description: 'Subtractive pattern (dín = subtract from)',
                    calculation: `${parts[1]?.trim()} - ${parts[0]?.trim()}`,
                    result: `Result: ${result}`
                });
            } else {
                result = basicNumbers[lowerStr] || 0;
            }

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        }
    },

    inuktitut: {
        id: 'inuktitut',
        name: 'Inuktitut Numerals',
        color: 'from-cyan-500 to-blue-500',
        icon: '❄️',
        placeholder: 'e.g., atausiq (1)',
        validate: (str: string) => true, // Accept text input
        toSystem: (num: number) => {
            const steps: ConversionStep[] = [];
            
            steps.push({
                step: 1,
                description: 'Converting to Inuktitut base-20 system',
                result: `Input: ${num}`
            });

            const numbers: Record<number, string> = {
                0: 'ilitchutik',
                1: 'atausiq', 2: 'marruuk', 3: 'pingasut', 4: 'sisamat', 5: 'tallimat',
                6: 'pingasuutit', 7: 'sitamautit', 8: 'sitamaujunirutit', 9: 'qulingutit',
                10: 'qulittut', 11: 'qulittut atausirmik', 12: 'qulittut marruumik',
                13: 'qulittut pingasumik', 14: 'qulittut sisamaumik', 15: 'qulittut tallimaumik',
                16: 'qulittut pingasuutimik', 17: 'qulittut sitamautimik',
                18: 'qulittut sitamaujunirutimik', 19: 'qulittut qulingutimik',
                20: 'inuujunik'
            };

            if (numbers[num]) {
                steps.push({
                    step: 2,
                    description: 'Direct translation',
                    result: `${num} = ${numbers[num]}`
                });
                return { result: numbers[num], steps };
            }

            // Base-20 construction
            let result = '';
            
            if (num < 20) {
                result = numbers[num] || `atausiq (${num})`;
            } else {
                const twenties = Math.floor(num / 20);
                const remainder = num % 20;
                
                const twentyWord = twenties === 1 ? 'inuujunik' : `inuujunik ${numbers[twenties] || twenties}`;
                
                if (remainder === 0) {
                    result = twentyWord;
                } else {
                    result = `${twentyWord} ${numbers[remainder] || remainder}`;
                }
                
                steps.push({
                    step: 2,
                    description: `${twenties} × 20 + ${remainder}`,
                    calculation: `Base-20 construction`,
                    result: result
                });
            }

            steps.push({
                step: steps.length + 1,
                description: 'Inuktitut uses body-part based counting (fingers and toes)',
                result: `Final: ${result}`
            });

            return { result, steps };
        },
        toArabic: (str: string) => {
            const steps: ConversionStep[] = [];
            
            steps.push({
                step: 1,
                description: 'Converting from Inuktitut numerals',
                result: `Input: ${str}`
            });

            const numbers: Record<string, number> = {
                'ilitchutik': 0,
                'atausiq': 1, 'marruuk': 2, 'pingasut': 3, 'sisamat': 4, 'tallimat': 5,
                'pingasuutit': 6, 'sitamautit': 7, 'sitamaujunirutit': 8, 'qulingutit': 9,
                'qulittut': 10, 'inuujunik': 20
            };

            const lowerStr = str.toLowerCase().trim();
            
            if (numbers[lowerStr] !== undefined) {
                const result = numbers[lowerStr];
                steps.push({
                    step: 2,
                    description: 'Direct match found',
                    result: `${lowerStr} = ${result}`
                });
                return { result, steps };
            }

            // Parse compound numbers
            let result = 0;
            const words = lowerStr.split(' ');
            
            words.forEach(word => {
                if (numbers[word] !== undefined) {
                    result += numbers[word];
                    steps.push({
                        step: steps.length + 1,
                        description: `Parsing: ${word}`,
                        calculation: `+${numbers[word]}`,
                        result: `Running total: ${result}`
                    });
                }
            });

            if (result === 0 && lowerStr.includes('qulittut')) {
                result = 10;
                steps.push({
                    step: 2,
                    description: 'Contains qulittut (10)',
                    result: `Approximate: ${result}`
                });
            }

            steps.push({
                step: steps.length + 1,
                description: 'Conversion complete',
                result: `Final Result: ${result}`
            });

            return { result, steps };
        }
    }
};