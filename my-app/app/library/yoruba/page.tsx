/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { useState } from 'react';

const YorubaNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(37);

    const yorubaNumbers: { [key: number]: string } = {
        0: 'òdo',
        1: 'ọkan',
        2: 'èjì',
        3: 'ẹta',
        4: 'ẹrin',
        5: 'àrùn',
        6: 'ẹfà',
        7: 'èje',
        8: 'ẹjọ',
        9: 'ẹsán',
        10: 'ẹwá',
        11: 'ọkànlá',
        12: 'èjìlá',
        13: 'ẹtàlá',
        14: 'ẹrìnlá',
        15: 'ẹ̀ẹ́dógún',
        16: 'ẹrìndílógún',
        17: 'ẹtàdílógún',
        18: 'èjìdílógún',
        19: 'ọkàndílógún',
        20: 'ogún',
        30: 'ọgbọ̀n',
        40: 'ogójì',
        50: 'àádọ́ta',
        60: 'ọgọ́ta',
        70: 'àádọ́rin',
        80: 'ọgọ́rin',
        90: 'àádọ́rùn-ún',
        100: 'ọgọ́rùn-ún',
        200: 'igba'
    };

    const decimalToYoruba = (num: number): string => {
        if (num === 0) return 'òdo';
        if (yorubaNumbers[num]) return yorubaNumbers[num];

        let result = '';

        if (num < 20) {
            // 1-19: Use addition from base numbers
            if (num <= 10) {
                return yorubaNumbers[num];
            } else {
                // 11-19: Use 10 + remainder
                const remainder = num - 10;
                result = `ẹwá lé ${yorubaNumbers[remainder]}`;
            }
        } else if (num < 30) {
            // 20-29
            if (num === 20) return 'ogún';
            const remainder = num - 20;
            result = `ogún lé ${yorubaNumbers[remainder]}`;
        } else if (num < 40) {
            // 30-39
            if (num === 30) return 'ọgbọ̀n';
            const remainder = num - 30;
            result = `ọgbọ̀n lé ${yorubaNumbers[remainder]}`;
        } else if (num < 50) {
            // 40-49
            if (num === 40) return 'ogójì';
            const remainder = num - 40;
            result = `ogójì lé ${yorubaNumbers[remainder]}`;
        } else if (num < 60) {
            // 50-59
            if (num === 50) return 'àádọ́ta';
            const remainder = num - 50;
            result = `àádọ́ta lé ${yorubaNumbers[remainder]}`;
        } else if (num < 70) {
            // 60-69
            if (num === 60) return 'ọgọ́ta';
            const remainder = num - 60;
            result = `ọgọ́ta lé ${yorubaNumbers[remainder]}`;
        } else if (num < 80) {
            // 70-79
            if (num === 70) return 'àádọ́rin';
            const remainder = num - 70;
            result = `àádọ́rin lé ${yorubaNumbers[remainder]}`;
        } else if (num < 90) {
            // 80-89
            if (num === 80) return 'ọgọ́rin';
            const remainder = num - 80;
            result = `ọgọ́rin lé ${yorubaNumbers[remainder]}`;
        } else if (num < 100) {
            // 90-99
            if (num === 90) return 'àádọ́rùn-ún';
            const remainder = num - 90;
            result = `àádọ́rùn-ún lé ${yorubaNumbers[remainder]}`;
        } else if (num < 200) {
            // 100-199
            if (num === 100) return 'ọgọ́rùn-ún';
            const remainder = num - 100;
            result = `ọgọ́rùn-ún lé ${decimalToYoruba(remainder)}`;
        } else if (num < 400) {
            // 200-399
            if (num === 200) return 'igba';
            const remainder = num - 200;
            result = `igba lé ${decimalToYoruba(remainder)}`;
        }

        return result;
    };

    const breakdownYoruba = (num: number) => {
        const breakdown = [];

        if (num === 0) {
            breakdown.push({ value: 0, yoruba: 'òdo', explanation: 'Zero' });
            return breakdown;
        }

        if (num < 20) {
            if (num <= 10) {
                breakdown.push({ value: num, yoruba: yorubaNumbers[num], explanation: `Base number: ${num}` });
            } else {
                const remainder = num - 10;
                breakdown.push({ value: 10, yoruba: 'ẹwá', explanation: 'Ten (base)' });
                breakdown.push({ value: remainder, yoruba: `lé ${yorubaNumbers[remainder]}`, explanation: `Plus ${remainder}` });
            }
        } else {
            // Find the base twenty
            const twenties = Math.floor(num / 20);
            const remainder = num % 20;

            const twentyBase = (twenties * 20) - (twenties === 0 ? 0 : 0);
            const baseName = yorubaNumbers[twenties * 20];

            breakdown.push({
                value: twenties * 20,
                yoruba: baseName,
                explanation: `Base: ${twenties * 20}`
            });

            if (remainder > 0) {
                breakdown.push({
                    value: remainder,
                    yoruba: `lé ${yorubaNumbers[remainder] || decimalToYoruba(remainder)}`,
                    explanation: `Plus ${remainder}`
                });
            }
        }

        return breakdown;
    };

    const yorubaNumber = decimalToYoruba(interactiveNumber);
    const yorubaBreakdown = breakdownYoruba(interactiveNumber);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Header */}
            <div className="bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-purple-100 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">🌍</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Yoruba Numerals</h1>
                            <p className="text-xl text-purple-100">West Africa • Ancient - Present</p>
                        </div>
                    </div>
                    <p className="text-xl text-purple-100 max-w-3xl leading-relaxed">
                        A sophisticated vigesimal (base-20) system using subtraction from multiples of 20.
                        Reflects deep linguistic and cultural traditions of the Yoruba people of Nigeria.
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Numbers (0-10)</h3>
                                <div className="space-y-3">
                                    {[
                                        { num: 0, yoruba: 'òdo', meaning: 'Nothing/Zero' },
                                        { num: 1, yoruba: 'ọkan', meaning: 'One' },
                                        { num: 2, yoruba: 'èjì', meaning: 'Two' },
                                        { num: 3, yoruba: 'ẹta', meaning: 'Three' },
                                        { num: 4, yoruba: 'ẹrin', meaning: 'Four' },
                                        { num: 5, yoruba: 'àrùn', meaning: 'Five' },
                                        { num: 6, yoruba: 'ẹfà', meaning: 'Six' },
                                        { num: 7, yoruba: 'èje', meaning: 'Seven' },
                                        { num: 8, yoruba: 'ẹjọ', meaning: 'Eight' },
                                        { num: 9, yoruba: 'ẹsán', meaning: 'Nine' },
                                        { num: 10, yoruba: 'ẹwá', meaning: 'Ten' },
                                    ].map((item) => (
                                        <div key={item.num} className="flex items-center justify-between p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-purple-600 w-12 text-center">{item.num}</span>
                                                <div>
                                                    <p className="font-bold text-gray-900">{item.yoruba}</p>
                                                    <p className="text-sm text-gray-600">{item.meaning}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Vigesimal Base Numbers (Multiples of 20)</h3>
                                <div className="space-y-3">
                                    {[
                                        { num: 20, yoruba: 'ogún', meaning: 'Twenty' },
                                        { num: 30, yoruba: 'ọgbọ̀n', meaning: 'Thirty (20+10)' },
                                        { num: 40, yoruba: 'ogójì', meaning: 'Forty (20×2)' },
                                        { num: 50, yoruba: 'àádọ́ta', meaning: 'Fifty (20+30)' },
                                        { num: 60, yoruba: 'ọgọ́ta', meaning: 'Sixty (20×3)' },
                                        { num: 70, yoruba: 'àádọ́rin', meaning: 'Seventy (20+50)' },
                                        { num: 80, yoruba: 'ọgọ́rin', meaning: 'Eighty (20×4)' },
                                        { num: 90, yoruba: 'àádọ́rùn-ún', meaning: 'Ninety (20+70)' },
                                        { num: 100, yoruba: 'ọgọ́rùn-ún', meaning: 'Hundred (20×5)' },
                                        { num: 200, yoruba: 'igba', meaning: 'Two Hundred (20×10)' },
                                    ].map((item) => (
                                        <div key={item.num} className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-300 flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg">{item.yoruba}</p>
                                                <p className="text-sm text-gray-600">{item.meaning}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-purple-600 text-xl">{item.num}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                                    <h4 className="font-bold text-blue-900 mb-2">System Characteristics</h4>
                                    <ul className="text-blue-800 space-y-1 text-sm">
                                        <li>✓ Vigesimal (Base-20) system</li>
                                        <li>✓ Linguistic/oral tradition</li>
                                        <li>✓ Additive and subtractive</li>
                                        <li>✓ Uses "lé" (plus) connector</li>
                                        <li>✓ Reflects body-part counting</li>
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
                            {/* Additive Pattern */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: Additive Construction (1-10, 11-19)</h3>
                                <p className="text-cyan-800 mb-4">
                                    Numbers below 20 are built additively using "lé" (meaning "and" or "plus"):
                                </p>
                                <div className="bg-white rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">11 = ẹwá lé ọkan</span>
                                        <span className="text-cyan-600">=</span>
                                        <span className="font-bold text-cyan-600">10 + 1</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">15 = ẹ̀ẹ́dógún</span>
                                        <span className="text-cyan-600">=</span>
                                        <span className="font-bold text-cyan-600">Special form (5 from 20)</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">19 = ọkàndílógún</span>
                                        <span className="text-cyan-600">=</span>
                                        <span className="font-bold text-cyan-600">One from twenty</span>
                                    </div>
                                </div>
                            </div>

                            {/* Subtractive Pattern */}
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Rule 2: Subtractive Pattern (15-19)</h3>
                                <p className="text-green-800 mb-4">
                                    Numbers approaching 20 use subtraction from 20 (dín = "from" or "before"):
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="text-sm text-gray-600 mb-1">15</p>
                                        <p className="text-xl font-bold text-gray-800 mb-2">ẹ̀ẹ́dógún</p>
                                        <p className="text-xs text-green-700">5 before 20 (20 - 5)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="text-sm text-gray-600 mb-1">16-19</p>
                                        <p className="text-xl font-bold text-gray-800 mb-2">...dílógún</p>
                                        <p className="text-xs text-green-700">...from twenty</p>
                                    </div>
                                </div>
                            </div>

                            {/* Compound Numbers */}
                            <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                                <h3 className="text-xl font-bold text-orange-900 mb-4">Rule 3: Compound Numbers (20+)</h3>
                                <p className="text-orange-800 mb-4">
                                    Beyond 20, base twenty is combined with additional units using "lé":
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900">25 = ogún lé àrùn</p>
                                        <p className="text-sm text-orange-700">Twenty plus five</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900">37 = ọgbọ̀n lé èje</p>
                                        <p className="text-sm text-orange-700">Thirty (20+10) plus seven</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900">67 = ọgọ́ta lé èje</p>
                                        <p className="text-sm text-orange-700">Sixty (20×3) plus seven</p>
                                    </div>
                                </div>
                            </div>

                            {/* Linguistic Features */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-purple-900 mb-4">Rule 4: Linguistic Features & Tone Marks</h3>
                                <p className="text-purple-800 mb-4">
                                    Yoruba numerals use tonal marks which are critical for pronunciation and meaning:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">Tone Marks Matter</p>
                                        <p className="text-sm text-purple-700">ọkan (one) vs. okan (different meaning) - tone differences are crucial</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">Vowel Harmony</p>
                                        <p className="text-sm text-purple-700">Many number words maintain vowel patterns within syllables</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">Nasalization</p>
                                        <p className="text-sm text-purple-700">Marks like ̀, ́, ̄ affect pronunciation: à, á, ā</p>
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
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Decimal Number (0-200)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        max="200"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(200, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-purple-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Yoruba</p>
                                        <p className="text-2xl font-bold text-purple-600 italic">{yorubaNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Component Breakdown</label>
                                <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 max-h-96 overflow-y-auto">
                                    {yorubaBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {yorubaBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-lg italic">{item.yoruba}</p>
                                                            <p className="text-sm text-gray-600">{item.explanation}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-purple-600 text-lg">{item.value}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="bg-purple-100 rounded-lg p-4 border-2 border-purple-300 mt-4">
                                                <p className="text-sm text-gray-600">Final Result</p>
                                                <p className="text-2xl font-bold text-purple-600 italic">{interactiveNumber}</p>
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
                            {/* Base-20 Structure */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Base-20 Hierarchy</h3>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {[
                                        { group: '1-10', label: 'Units', examples: 'ọkan...ẹwá' },
                                        { group: '11-19', label: 'Teens', examples: 'ọkànlá...ọkàndílógún' },
                                        { group: '20-39', label: 'Twenties', examples: 'ogún, ọgbọ̀n' },
                                        { group: '40-99', label: 'Higher', examples: 'ogójì, ọgọ́ta' },
                                        { group: '100-200', label: 'Hundreds', examples: 'ọgọ́rùn-ún, igba' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-300">
                                            <p className="text-xs font-bold text-gray-600 mb-1">{item.label}</p>
                                            <p className="text-lg font-bold text-purple-700 mb-2">{item.group}</p>
                                            <p className="text-xs text-gray-600">{item.examples}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example: Building 67 */}
                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 67</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 1: Identify base</p>
                                                <p className="font-mono text-gray-800">67 = 60 + 7</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600">60 | 7</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 2: Convert 60 (base)</p>
                                                <p className="font-mono text-gray-800">60 = ọgọ́ta (20 × 3)</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600 italic">ọgọ́ta</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 3: Convert 7 (units)</p>
                                                <p className="font-mono text-gray-800">7 = èje</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600 italic">èje</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 4: Connect with "lé"</p>
                                                <p className="font-mono text-gray-800">+ = lé (plus)</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600">lé</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Final Result:</p>
                                        <p className="text-2xl font-bold text-indigo-600 italic">ọgọ́ta lé èje</p>
                                    </div>
                                </div>
                            </div>

                            {/* Why Base-20 */}
                            <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-lg p-6 border-2 border-amber-200">
                                <h3 className="text-lg font-bold text-amber-900 mb-4">Why Base-20?</h3>
                                <div className="space-y-2 text-amber-800">
                                    <p><strong>Fingers and Toes:</strong> Humans have 20 digits total (counting fingers and toes)</p>
                                    <p><strong>Oral Tradition:</strong> Body-based counting system reflected in language</p>
                                    <p><strong>Natural Division:</strong> 20 divides into useful parts (5, 4, 2)</p>
                                    <p><strong>Cultural Significance:</strong> Reflects Yoruba cosmology and counting practices</p>
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Oral Counting Tradition</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                        <p className="font-bold text-blue-900">Ancient Origins (Pre-Contact)</p>
                                        <p className="text-blue-800 text-sm">Counting system developed independently within Yoruba culture</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-green-900">Oral Transmission</p>
                                        <p className="text-green-800 text-sm">Numbers preserved through songs, proverbs, and linguistic patterns</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                        <p className="font-bold text-purple-900">Mathematical Philosophy</p>
                                        <p className="text-purple-800 text-sm">Reflects Yoruba understanding of quantity and proportion</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="font-bold text-amber-900">Contemporary Use</p>
                                        <p className="text-amber-800 text-sm">Still used in traditional contexts, markets, and cultural ceremonies</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Cultural Applications</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '🎵', use: 'Oriki (Praise Poetry)', desc: 'Numbers woven into praises and genealogies' },
                                        { icon: '🛍️', use: 'Markets & Trade', desc: 'Essential for pricing and bartering goods' },
                                        { icon: '🎭', use: 'Ceremonial Contexts', desc: 'Used in rituals, festivals, and rites' },
                                        { icon: '📚', use: 'Linguistic Heritage', desc: 'Key aspect of Yoruba language study' },
                                        { icon: '👨‍👩‍👧‍👦', use: 'Family Counting', desc: 'Traditional child-rearing and education' },
                                        { icon: '🎪', use: 'Storytelling', desc: 'Numbers appear in folktales and narratives' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 flex items-start gap-3">
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

                        <div className="mt-8 bg-linear-to-r from-pink-100 to-purple-100 rounded-xl p-6 border-2 border-pink-300">
                            <h3 className="font-bold text-pink-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-pink-800 leading-relaxed">
                                The Yoruba numeral system is far more than a counting mechanism—it is a linguistic and cultural treasure reflecting
                                the sophistication of Yoruba civilization. Embedded within the language structure itself, these numbers preserve ancient
                                knowledge about human anatomy, natural philosophy, and social organization. Unlike writing systems imposed from outside,
                                Yoruba numerals developed organically from the community's needs and worldview. In contemporary West Africa, they continue
                                to serve not merely as tools for commerce but as bridges to ancestral wisdom, embodying the principle that language and
                                culture are inseparable from how we understand and express quantity.
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
                                { decimal: 0, yoruba: 'òdo' },
                                { decimal: 1, yoruba: 'ọkan' },
                                { decimal: 5, yoruba: 'àrùn' },
                                { decimal: 10, yoruba: 'ẹwá' },
                                { decimal: 15, yoruba: 'ẹ̀ẹ́dógún' },
                                { decimal: 19, yoruba: 'ọkàndílógún' },
                                { decimal: 20, yoruba: 'ogún' },
                                { decimal: 25, yoruba: 'ogún lé àrùn' },
                                { decimal: 30, yoruba: 'ọgbọ̀n' },
                                { decimal: 35, yoruba: 'ọgbọ̀n lé àrùn' },
                                { decimal: 40, yoruba: 'ogójì' },
                                { decimal: 50, yoruba: 'àádọ́ta' },
                                { decimal: 60, yoruba: 'ọgọ́ta' },
                                { decimal: 75, yoruba: 'àádọ́rin lé àrùn' },
                                { decimal: 80, yoruba: 'ọgọ́rin' },
                                { decimal: 100, yoruba: 'ọgọ́rùn-ún' },
                                { decimal: 125, yoruba: 'ọgọ́rùn-ún lé ọgbọ̀n lé àrùn' },
                                { decimal: 200, yoruba: 'igba' },
                            ].map((item) => (
                                <div
                                    key={item.decimal}
                                    className="bg-linear-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">Decimal</p>
                                        <p className="text-4xl font-bold text-purple-600 mb-4">{item.decimal}</p>
                                        <p className="text-gray-600 text-sm mb-2">Yoruba</p>
                                        <p className="text-lg font-bold text-gray-800 italic font-serif">{item.yoruba}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Key Connectors & Patterns</h3>
                                <p className="mb-4 text-purple-100">
                                    Understanding these patterns helps master Yoruba numerals:
                                </p>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-2 text-sm">
                                    <p>"<strong>lé</strong>" = plus/and (joins additive numbers)</p>
                                    <p>"<strong>dín</strong>" = from/before (subtractive, for 15-19)</p>
                                    <p><strong>-gún</strong> = twenty (suffix in compound numbers)</p>
                                    <p><strong>-ta</strong> = suffix for base thirty</p>
                                    <p><strong>-rin</strong> = suffix for base eighty</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Learning Strategy</h3>
                                <ul className="space-y-2 text-purple-100">
                                    <li>✓ Start with 1-10 (basic units)</li>
                                    <li>✓ Learn key twenties: 20, 40, 60, 80, 100, 200</li>
                                    <li>✓ Understand "lé" connector for addition</li>
                                    <li>✓ Practice compound formation (e.g., 25 = ogún lé àrùn)</li>
                                    <li>✓ Pay attention to tone marks (crucial for accuracy)</li>
                                    <li>✓ Listen to native speakers for proper pronunciation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default YorubaNumeralPage;
