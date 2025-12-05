'use client';

import Link from 'next/link';
import { useState } from 'react';

const ChineseNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(2024);

    const decimalToChinese = (num: number): string => {
        if (num === 0) return '零';

        const digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const units = ['', '十', '百', '千'];
        const bigUnits = ['', '万', '亿', '兆'];

        let result = '';
        let bigUnitIndex = 0;
        let needZero = false;

        while (num > 0) {
            const section = num % 10000;
            num = Math.floor(num / 10000);

            if (section === 0) {
                needZero = true;
            } else {
                if (needZero && result) {
                    result = '零' + result;
                    needZero = false;
                }

                let sectionStr = '';
                let tempSection = section;
                let unitIndex = 0;

                while (tempSection > 0) {
                    const digit = tempSection % 10;
                    tempSection = Math.floor(tempSection / 10);

                    if (digit === 0) {
                        needZero = true;
                    } else {
                        if (needZero && sectionStr) {
                            sectionStr = '零' + sectionStr;
                            needZero = false;
                        }
                        sectionStr = digits[digit] + (unitIndex > 0 ? units[unitIndex] : '') + sectionStr;
                    }
                    unitIndex++;
                }

                result = sectionStr + (bigUnitIndex > 0 ? bigUnits[bigUnitIndex] : '') + result;
            }
            bigUnitIndex++;
        }

        return result;
    };

    const breakdownChinese = (num: number) => {
        const breakdown = [];
        let tempNum = num;

        const digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const units = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];

        if (num === 0) {
            breakdown.push({ value: 0, character: '零', explanation: 'Zero' });
            return breakdown;
        }

        let position = 0;
        while (tempNum > 0) {
            const digit = tempNum % 10;
            tempNum = Math.floor(tempNum / 10);

            if (digit > 0) {
                const character = digits[digit] + (position > 0 ? units[position] : '');
                const value = digit * Math.pow(10, position);
                breakdown.unshift({
                    position,
                    digit,
                    character,
                    value,
                    explanation: `${digit} × 10^${position} = ${value}`
                });
            } else if (breakdown.length > 0 && !breakdown[0].isZero && position > 0) {
                if (!breakdown[0].isZero) {
                    breakdown.unshift({
                        position,
                        digit: 0,
                        character: '零',
                        value: 0,
                        isZero: true,
                        explanation: 'Zero placeholder'
                    });
                }
            }
            position++;
        }

        return breakdown;
    };

    const chineseNumber = decimalToChinese(interactiveNumber);
    const chineseBreakdown = breakdownChinese(interactiveNumber);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-yellow-50 to-amber-50">
            {/* Header */}
            <div className="bg-linear-to-r from-yellow-600 via-amber-600 to-orange-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-yellow-100 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">🏮</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Chinese Numerals</h1>
                            <p className="text-xl text-yellow-100">China • 1500 BCE - Present</p>
                        </div>
                    </div>
                    <p className="text-xl text-yellow-100 max-w-3xl leading-relaxed">
                        A sophisticated decimal system using Chinese characters representing numbers and place values.
                        Still widely used in Chinese-speaking regions for formal documents, transactions, and cultural contexts.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Base Structure */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🔧</span> Base Structure
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Digit Characters</h3>
                                <div className="space-y-3">
                                    {[
                                        { character: '零', pinyin: 'líng', value: 0, traditional: 'Alternative: 〇' },
                                        { character: '一', pinyin: 'yī', value: 1, traditional: 'One stroke' },
                                        { character: '二', pinyin: 'èr', value: 2, traditional: 'Two strokes' },
                                        { character: '三', pinyin: 'sān', value: 3, traditional: 'Three strokes' },
                                        { character: '四', pinyin: 'sì', value: 4, traditional: 'Box-shaped' },
                                        { character: '五', pinyin: 'wǔ', value: 5, traditional: 'Cross pattern' },
                                        { character: '六', pinyin: 'liù', value: 6, traditional: 'Roof + six' },
                                        { character: '七', pinyin: 'qī', value: 7, traditional: 'Tool-shaped' },
                                        { character: '八', pinyin: 'bā', value: 8, traditional: 'Split/divide' },
                                        { character: '九', pinyin: 'jiǔ', value: 9, traditional: 'Hook shape' },
                                    ].map((item) => (
                                        <div key={item.value} className="flex items-center justify-between p-4 bg-linear-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl font-bold text-amber-700 w-16 text-center">{item.character}</span>
                                                <div>
                                                    <p className="font-bold text-gray-900">{item.pinyin}</p>
                                                    <p className="text-sm text-gray-600">{item.traditional}</p>
                                                </div>
                                            </div>
                                            <span className="text-2xl font-bold text-amber-600">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Place Value Characters</h3>
                                <div className="space-y-4">
                                    {[
                                        { character: '十', meaning: 'Ten', value: 10, level: 1 },
                                        { character: '百', meaning: 'Hundred', value: 100, level: 2 },
                                        { character: '千', meaning: 'Thousand', value: 1000, level: 3 },
                                        { character: '万', meaning: 'Ten Thousand', value: 10000, level: 4 },
                                        { character: '十万', meaning: 'Hundred Thousand', value: 100000, level: 5 },
                                        { character: '百万', meaning: 'Million', value: 1000000, level: 6 },
                                        { character: '千万', meaning: 'Ten Million', value: 10000000, level: 7 },
                                        { character: '亿', meaning: 'Hundred Million', value: 100000000, level: 8 },
                                    ].map((item) => (
                                        <div key={item.value} className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-300 flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">{item.character}</p>
                                                <p className="text-sm text-gray-600">{item.meaning}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-amber-600 text-xl">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                                    <h4 className="font-bold text-blue-900 mb-2">System Characteristics</h4>
                                    <ul className="text-blue-800 space-y-1 text-sm">
                                        <li>✓ Decimal (Base-10) system</li>
                                        <li>✓ Character-based notation</li>
                                        <li>✓ Positional system</li>
                                        <li>✓ Includes zero (零)</li>
                                        <li>✓ Hierarchical place values</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Morphology and Construction Rules */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🧬</span> Morphology & Construction Rules
                        </h2>

                        <div className="space-y-6">
                            {/* Basic Construction */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: Basic Construction</h3>
                                <p className="text-cyan-800 mb-4">
                                    Numbers are formed by combining digit characters with place value characters. Read left to right.
                                </p>
                                <div className="bg-white rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">十</span>
                                        <span className="text-amber-600">=</span>
                                        <span className="font-bold text-amber-600">10</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">一十 = 十</span>
                                        <span className="text-amber-600">=</span>
                                        <span className="font-bold text-amber-600">10</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">二十</span>
                                        <span className="text-amber-600">=</span>
                                        <span className="font-bold text-amber-600">20</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">一百</span>
                                        <span className="text-amber-600">=</span>
                                        <span className="font-bold text-amber-600">100</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">五千</span>
                                        <span className="text-amber-600">=</span>
                                        <span className="font-bold text-amber-600">5000</span>
                                    </div>
                                </div>
                            </div>

                            {/* Compound Numbers */}
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Rule 2: Compound Numbers</h3>
                                <p className="text-green-800 mb-4">
                                    Combine multiple place values by listing components from largest to smallest:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="text-sm text-gray-600 mb-1">23</p>
                                        <p className="text-2xl font-bold text-gray-800 mb-2">二十三</p>
                                        <p className="text-xs text-green-700">2×10 + 3 = 二十 + 三</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="text-sm text-gray-600 mb-1">456</p>
                                        <p className="text-2xl font-bold text-gray-800 mb-2">四百五十六</p>
                                        <p className="text-xs text-green-700">4×100 + 5×10 + 6 = 四百 + 五十 + 六</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="text-sm text-gray-600 mb-1">2024</p>
                                        <p className="text-2xl font-bold text-gray-800 mb-2">二千零二十四</p>
                                        <p className="text-xs text-green-700">2×1000 + 0×100 + 2×10 + 4</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="text-sm text-gray-600 mb-1">10203</p>
                                        <p className="text-2xl font-bold text-gray-800 mb-2">一万零二百零三</p>
                                        <p className="text-xs text-green-700">1×10000 + 0×1000 + 2×100 + 0×10 + 3</p>
                                    </div>
                                </div>
                            </div>

                            {/* Zero Handling */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-purple-900 mb-4">Rule 3: Zero Placement</h3>
                                <p className="text-purple-800 mb-4">
                                    The zero character (零) is used to indicate missing place values in the middle of a number:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">101 = 一百零一</p>
                                        <p className="text-sm text-purple-700">One hundred AND one (zero indicates missing tens)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">1001 = 一千零一</p>
                                        <p className="text-sm text-purple-700">One thousand AND one (zero indicates missing hundreds and tens)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">1020 = 一千零二十</p>
                                        <p className="text-sm text-purple-700">One thousand AND twenty (zero indicates missing hundreds)</p>
                                    </div>
                                </div>
                                <div className="mt-4 bg-red-50 border border-red-300 rounded-lg p-3">
                                    <p className="text-sm text-red-800">
                                        <strong>Note:</strong> Multiple consecutive zeros are represented by a single 零. Never use 零 at the beginning or end of a number.
                                    </p>
                                </div>
                            </div>

                            {/* Simplified vs Traditional */}
                            <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200">
                                <h3 className="text-xl font-bold text-teal-900 mb-4">Rule 4: Simplified vs Traditional</h3>
                                <p className="text-teal-800 mb-4">
                                    Chinese numerals have both simplified and traditional forms. Most common in mainland China vs. Taiwan/Hong Kong:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="font-bold text-teal-700 mb-2">Simplified (Mainland)</p>
                                        <p className="text-sm text-teal-800">一、二、三、四、五、六、七、八、九、十</p>
                                        <p className="text-xs text-gray-600 mt-2">Direct number representation</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="font-bold text-teal-700 mb-2">Traditional (Financial)</p>
                                        <p className="text-sm text-teal-800">壹、貳、叁、肆、伍、陸、柒、捌、玖、拾</p>
                                        <p className="text-xs text-gray-600 mt-2">Used in checks and formal documents to prevent fraud</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive Example */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🔄</span> Interactive Conversion Tool
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Decimal Number (0-99,999,999)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="99999999"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        max="99999999"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(99999999, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-amber-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Chinese</p>
                                        <p className="text-3xl font-bold text-amber-600">{chineseNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Component Breakdown</label>
                                <div className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border-2 border-yellow-200 max-h-96 overflow-y-auto">
                                    {chineseBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {chineseBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-yellow-500">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-lg">{item.character}</p>
                                                            {(
                                                                <p className="text-sm text-gray-600">10^ position</p>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-amber-600 text-lg">{item.value}</p>
                                                        </div>
                                                    </div>
                                                    {item.explanation && (
                                                        <p className="text-xs text-gray-600 italic">{item.explanation}</p>
                                                    )}
                                                </div>
                                            ))}
                                            <div className="bg-amber-100 rounded-lg p-4 border-2 border-amber-300 mt-4">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-3xl font-bold text-amber-600">{interactiveNumber}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hierarchical Logic */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">📊</span> Hierarchical Logic
                        </h2>

                        <div className="space-y-8">
                            {/* Place Value Hierarchy */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Place Value Hierarchy</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { level: 'Units', character: '', multiplier: '×1', value: 1 },
                                        { level: 'Tens', character: '十', multiplier: '×10', value: 10 },
                                        { level: 'Hundreds', character: '百', multiplier: '×100', value: 100 },
                                        { level: 'Thousands', character: '千', multiplier: '×1,000', value: 1000 },
                                        { level: 'Ten Thousands', character: '万', multiplier: '×10,000', value: 10000 },
                                        { level: 'Hundred Thousands', character: '十万', multiplier: '×100,000', value: 100000 },
                                        { level: 'Millions', character: '百万', multiplier: '×1,000,000', value: 1000000 },
                                        { level: 'Hundred Millions', character: '亿', multiplier: '×100,000,000', value: 100000000 },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border-2 border-yellow-300">
                                            <p className="text-xs font-bold text-gray-600 mb-1">{item.level}</p>
                                            <p className="text-2xl font-bold text-amber-700 mb-2">{item.character || '个'}</p>
                                            <p className="text-sm font-bold text-amber-600">{item.multiplier}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example: Building 3695 */}
                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 3,695</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Thousands place</p>
                                                <p className="font-mono text-gray-800">3 × 1000 = 三千</p>
                                            </div>
                                            <p className="text-2xl font-bold text-indigo-600">三千</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Hundreds place</p>
                                                <p className="font-mono text-gray-800">6 × 100 = 六百</p>
                                            </div>
                                            <p className="text-2xl font-bold text-indigo-600">六百</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Tens place</p>
                                                <p className="font-mono text-gray-800">9 × 10 = 九十</p>
                                            </div>
                                            <p className="text-2xl font-bold text-indigo-600">九十</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Units place</p>
                                                <p className="font-mono text-gray-800">5 × 1 = 五</p>
                                            </div>
                                            <p className="text-2xl font-bold text-indigo-600">五</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Final Result:</p>
                                        <p className="text-3xl font-bold text-indigo-600">三千六百九十五</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Historical Context */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">📜</span> Cultural & Historical Context
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Historical Evolution</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                        <p className="font-bold text-blue-900">Ancient Period (1500-221 BCE)</p>
                                        <p className="text-blue-800 text-sm">Oracle bone inscriptions show early counting systems. Tally marks evolve into characters.</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-green-900">Qin-Han Dynasty (221 BCE-220 CE)</p>
                                        <p className="text-green-800 text-sm">Decimal system firmly established with characters for digits and place values</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                        <p className="font-bold text-purple-900">Medieval Period (220-1600s)</p>
                                        <p className="text-purple-800 text-sm">Further refinement and standardization. Development of 万 (ten thousand) as key unit</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="font-bold text-amber-900">Modern Era (1600s - Present)</p>
                                        <p className="text-amber-800 text-sm">Coexists with Arabic numerals. Traditional forms used for formal/legal documents</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Modern Applications</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '📄', use: 'Legal Documents', desc: 'Contracts, checks, official records' },
                                        { icon: '🏢', use: 'Business/Finance', desc: 'Traditional business transactions' },
                                        { icon: '📚', use: 'Literature', desc: 'Classical texts, poetry, formal writing' },
                                        { icon: '🎓', use: 'Education', desc: 'Teaching Chinese culture and numeracy' },
                                        { icon: '🎎', use: 'Cultural Events', desc: 'Ceremonies and traditional celebrations' },
                                        { icon: '🏷️', use: 'Signage', desc: 'Shop signs and traditional displays' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-200 flex items-start gap-3">
                                            <span className="text-3xl">{item.icon}</span>
                                            <div>
                                                <p className="font-bold text-gray-900">{item.use}</p>
                                                <p className="text-sm text-gray-600">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-linear-to-r from-orange-100 to-yellow-100 rounded-xl p-6 border-2 border-orange-300">
                            <h3 className="font-bold text-orange-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-orange-800 leading-relaxed">
                                Chinese numerals represent one of humanity&apos;s oldest continuous mathematical traditions. With over 3,500 years of
                                documented history, they enabled sophisticated calculations and astronomical observations that influenced Eastern
                                mathematics and science. The decimal system&apos;s elegance—combining positional notation with character-based representation—
                                made complex calculations accessible across the vast Chinese empire. Today, while Arabic numerals dominate everyday use,
                                Chinese numerals remain culturally significant, appearing in formal documents, traditional business, and as a symbol
                                of Chinese heritage in the modern world.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Common Examples */}
                <section className="mb-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">📋</span> Common Examples & Reference
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { decimal: 0, chinese: '零' },
                                { decimal: 1, chinese: '一' },
                                { decimal: 5, chinese: '五' },
                                { decimal: 10, chinese: '十' },
                                { decimal: 15, chinese: '十五' },
                                { decimal: 23, chinese: '二十三' },
                                { decimal: 50, chinese: '五十' },
                                { decimal: 99, chinese: '九十九' },
                                { decimal: 100, chinese: '一百' },
                                { decimal: 101, chinese: '一百零一' },
                                { decimal: 256, chinese: '二百五十六' },
                                { decimal: 888, chinese: '八百八十八' },
                                { decimal: 1000, chinese: '一千' },
                                { decimal: 2024, chinese: '二千零二十四' },
                                { decimal: 5555, chinese: '五千五百五十五' },
                                { decimal: 10000, chinese: '一万' },
                                { decimal: 50000, chinese: '五万' },
                                { decimal: 100000, chinese: '十万' },
                            ].map((item) => (
                                <div
                                    key={item.decimal}
                                    className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-lg p-6 border-2 border-yellow-200 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">Decimal</p>
                                        <p className="text-4xl font-bold text-amber-600 mb-4">{item.decimal}</p>
                                        <p className="text-gray-600 text-sm mb-2">Chinese</p>
                                        <p className="text-2xl font-bold text-gray-800 font-serif">{item.chinese}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-yellow-600 to-amber-600 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Remember Place Values</h3>
                                <p className="mb-4 text-yellow-100">
                                    The key to mastering Chinese numerals is understanding place values:
                                </p>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-2 text-sm">
                                    <p>个/一 (1) • 十 (10) • 百 (100) • 千 (1000)</p>
                                    <p>万 (10,000) • 十万 (100,000) • 百万 (1,000,000)</p>
                                    <p>千万 (10,000,000) • 亿 (100,000,000)</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Common Patterns</h3>
                                <ul className="space-y-2 text-yellow-100">
                                    <li>✓ Omit 一 before 十, 百, 千 at start (十 not 一十)</li>
                                    <li>✓ Use 零 for missing place values in middle</li>
                                    <li>✓ Never use 零 at beginning or end</li>
                                    <li>✓ Combine characters left to right (largest to smallest)</li>
                                    <li>✓ Learn simplified forms (mainland) first</li>
                                    <li>✓ Practice with common numbers: 日期 (dates), 价格 (prices)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ChineseNumeralPage;
