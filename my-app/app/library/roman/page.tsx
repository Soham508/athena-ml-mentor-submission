'use client';

import Link from 'next/link';
import { useState } from 'react';

const RomanNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(27);
    const [displayMode, setDisplayMode] = useState<'breakdown' | 'construction'>('breakdown');

    const romanToDecimal: { [key: string]: number } = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };

    const decimalToRoman = (num: number): string => {
        const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const numerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

        let result = '';
        values.forEach((value, index) => {
            while (num >= value) {
                result += numerals[index];
                num -= value;
            }
        });
        return result;
    };

    const breakdownRoman = (num: number) => {
        const mapping = [
            { value: 1000, numeral: 'M', name: 'One Thousand' },
            { value: 900, numeral: 'CM', name: 'Nine Hundred' },
            { value: 500, numeral: 'D', name: 'Five Hundred' },
            { value: 400, numeral: 'CD', name: 'Four Hundred' },
            { value: 100, numeral: 'C', name: 'One Hundred' },
            { value: 90, numeral: 'XC', name: 'Ninety' },
            { value: 50, numeral: 'L', name: 'Fifty' },
            { value: 40, numeral: 'XL', name: 'Forty' },
            { value: 10, numeral: 'X', name: 'Ten' },
            { value: 9, numeral: 'IX', name: 'Nine' },
            { value: 5, numeral: 'V', name: 'Five' },
            { value: 4, numeral: 'IV', name: 'Four' },
            { value: 1, numeral: 'I', name: 'One' },
        ];

        const breakdown = [];
        let remaining = num;

        mapping.forEach(({ value, numeral, name }) => {
            while (remaining >= value) {
                breakdown.push({ value, numeral, name });
                remaining -= value;
            }
        });

        return breakdown;
    };

    const romanBreakdown = breakdownRoman(interactiveNumber);
    const romanNumeral = decimalToRoman(interactiveNumber);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">
            {/* Header */}
            <div className="bg-linear-to-r from-red-600 via-orange-600 to-amber-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-red-100 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">🏛️</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Roman Numerals</h1>
                            <p className="text-xl text-red-100">Ancient Rome • 500 BCE - Present</p>
                        </div>
                    </div>
                    <p className="text-xl text-red-100 max-w-3xl leading-relaxed">
                        A sophisticated additive and subtractive numeral system that revolutionized mathematics in the ancient world.
                        Still used today in clocks, books, and monuments.
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Primary Symbols</h3>
                                <div className="space-y-3">
                                    {[
                                        { symbol: 'I', value: 1, name: 'Unus (One)', finger: '👆' },
                                        { symbol: 'V', value: 5, name: 'Quinque (Five)', finger: '✋' },
                                        { symbol: 'X', value: 10, name: 'Decem (Ten)', finger: '🤝' },
                                        { symbol: 'L', value: 50, name: 'Quinquaginta (Fifty)', finger: '✋✋' },
                                        { symbol: 'C', value: 100, name: 'Centum (Hundred)', finger: 'C' },
                                        { symbol: 'D', value: 500, name: 'Quingenti (Five Hundred)', finger: 'D' },
                                        { symbol: 'M', value: 1000, name: 'Mille (Thousand)', finger: 'M' },
                                    ].map((item) => (
                                        <div key={item.symbol} className="flex items-center justify-between p-4 bg-linear-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl font-bold text-red-600 w-16 text-center">{item.symbol}</span>
                                                <div>
                                                    <p className="font-bold text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-600">Value: {item.value}</p>
                                                </div>
                                            </div>
                                            <span className="text-3xl">{item.finger}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">System Characteristics</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-blue-900 mb-2">Base System</h4>
                                        <p className="text-blue-800">Decimal (Base-10) with additive and subtractive notation</p>
                                    </div>
                                    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-green-900 mb-2">Notation Type</h4>
                                        <p className="text-green-800">Additive (sum of symbols) + Subtractive (smaller before larger)</p>
                                    </div>
                                    <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-purple-900 mb-2">Maximum Value Representation</h4>
                                        <p className="text-purple-800">Typically up to 3,999 (MMMCMXCIX). Beyond requires overline notation</p>
                                    </div>
                                    <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-amber-900 mb-2">Zero Representation</h4>
                                        <p className="text-amber-800">No symbol for zero (major limitation)</p>
                                    </div>
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
                            {/* Additive Rule */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: Additive Principle</h3>
                                <p className="text-cyan-800 mb-4">
                                    Symbols are added together to create larger values. When a larger symbol follows or stands alone, add its value.
                                </p>
                                <div className="bg-white rounded-lg p-4 font-mono space-y-2">
                                    <p className='text-cyan-600'>III = 1 + 1 + 1 = <span className="font-bold text-cyan-600">3</span></p>
                                    <p className='text-cyan-600'>VII = 5 + 1 + 1 = <span className="font-bold text-cyan-600">7</span></p>
                                    <p className='text-cyan-600'>XII = 10 + 1 + 1 = <span className="font-bold text-cyan-600">12</span></p>
                                    <p className='text-cyan-600'>MDCLXVI = 1000 + 500 + 100 + 50 + 10 + 5 + 1 = <span className="font-bold text-cyan-600">1666</span></p>
                                </div>
                            </div>

                            {/* Subtractive Rule */}
                            <div className="bg-linear-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                                <h3 className="text-xl font-bold text-orange-900 mb-4">Rule 2: Subtractive Principle</h3>
                                <p className="text-orange-800 mb-4">
                                    When a smaller symbol appears before a larger one, subtract its value. Only specific combinations are allowed:
                                </p>
                                <div className="bg-white rounded-lg p-4 space-y-3">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-bold text-orange-700 mb-2">Valid Subtractions:</p>
                                            <ul className="space-y-1 text-orange-800 font-mono">
                                                <li>IV = 4 (I before V)</li>
                                                <li>IX = 9 (I before X)</li>
                                                <li>XL = 40 (X before L)</li>
                                                <li>XC = 90 (X before C)</li>
                                                <li>CD = 400 (C before D)</li>
                                                <li>CM = 900 (C before M)</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="font-bold text-red-700 mb-2">Invalid Subtractions:</p>
                                            <ul className="space-y-1 text-red-800 font-mono">
                                                <li>❌ IL = NOT 49</li>
                                                <li>❌ IC = NOT 99</li>
                                                <li>❌ ID = NOT 499</li>
                                                <li>❌ IM = NOT 999</li>
                                                <li>❌ XD = NOT 490</li>
                                                <li>❌ XM = NOT 990</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Repetition Rule */}
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Rule 3: Repetition Constraints</h3>
                                <p className="text-green-800 mb-4">
                                    Not all symbols can be repeated. Follow these guidelines:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="font-bold text-green-700 mb-2">Can Repeat (up to 3 times):</p>
                                        <p className="text-green-800 font-mono">I, X, C, M</p>
                                        <p className="text-sm text-green-700 mt-2">III = 3, XXX = 30, CCC = 300, MMM = 3000</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="font-bold text-orange-700 mb-2">Cannot Repeat:</p>
                                        <p className="text-orange-800 font-mono">V, L, D</p>
                                        <p className="text-sm text-orange-700 mt-2">These represent half-values and should appear only once</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Rule */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-purple-900 mb-4">Rule 4: Descending Order</h3>
                                <p className="text-purple-800 mb-4">
                                    Symbols should be arranged in descending order of value from left to right (except for subtractive combinations):
                                </p>
                                <div className="bg-white rounded-lg p-4 font-mono space-y-2 text-purple-800">
                                    <p>✓ MCMXCIV = 1000, 900, 90, 4 = <span className="font-bold text-purple-800">1994</span></p>
                                    <p>✗ MXMCXC = Violates order (wrong arrangement)</p>
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
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Decimal Number (1-3999)</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="3999"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-red-600"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="1"
                                        max="3999"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(3999, Math.max(1, parseInt(e.target.value) || 1)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-red-300 rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Roman Numeral</p>
                                        <p className="text-4xl font-bold text-red-600">{romanNumeral}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Step-by-Step Breakdown</label>
                                <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200 max-h-96 overflow-y-auto">
                                    {romanBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {romanBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-3 flex items-center justify-between border-l-4 border-red-500">
                                                    <div>
                                                        <p className="font-bold text-gray-900">{item.name}</p>
                                                        <p className="text-sm text-gray-600">{item.numeral}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-red-600 text-lg">{item.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="bg-red-100 rounded-lg p-3 border-2 border-red-300 mt-4">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-3xl font-bold text-red-600">{interactiveNumber}</p>
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
                            {/* Tier System */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Five-Tier Hierarchy</h3>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    {[
                                        { tier: 'Tier 1', symbols: ['I'], multiplier: '×1', example: '1' },
                                        { tier: 'Tier 2', symbols: ['V'], multiplier: '×5', example: '5' },
                                        { tier: 'Tier 3', symbols: ['X'], multiplier: '×10', example: '10' },
                                        { tier: 'Tier 4', symbols: ['L', 'C'], multiplier: '×50/100', example: '50, 100' },
                                        { tier: 'Tier 5', symbols: ['D', 'M'], multiplier: '×500/1000', example: '500, 1000' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-300">
                                            <p className="text-xs font-bold text-gray-600 mb-2">{item.tier}</p>
                                            <div className="flex gap-2 mb-3">
                                                {item.symbols.map((s, i) => (
                                                    <span key={i} className="text-3xl font-bold text-red-600">{s}</span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-700 mb-1">{item.multiplier}</p>
                                            <p className="text-xs text-gray-600">Ex: {item.example}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Progression Example */}
                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 444</h3>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                                        <span className="font-mono text-gray-900">400 (D - 100) = CD</span>
                                        <span className="text-2xl font-bold text-indigo-600">CD</span>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                                        <span className="font-mono text-gray-900">40 (X - 10) = XL</span>
                                        <span className="text-2xl font-bold text-indigo-600">XL</span>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                                        <span className="font-mono text-gray-900">4 (V - 1) = IV</span>
                                        <span className="text-2xl font-bold text-indigo-600">IV</span>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Result:</p>
                                        <p className="text-4xl font-bold text-indigo-600">CDXLIV</p>
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Origins & Evolution</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                        <p className="font-bold text-blue-900">Early Development (500 BCE)</p>
                                        <p className="text-blue-800 text-sm">Evolved from Etruscan counting symbols, adapted by Romans</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-green-900">Classical Period (100 BCE - 400 CE)</p>
                                        <p className="text-green-800 text-sm">Refined into the system we know today during the Roman Empire</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                        <p className="font-bold text-purple-900">Medieval Era (400 - 1500 CE)</p>
                                        <p className="text-purple-800 text-sm">Dominated European mathematics and record-keeping</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="font-bold text-amber-900">Modern Era (1500 - Present)</p>
                                        <p className="text-amber-800 text-sm">Gradually replaced by Arabic numerals, still used in specific contexts</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Modern Applications</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '🕐', use: 'Clock Faces', desc: 'XII, III, VI, IX mark hours' },
                                        { icon: '📖', use: 'Book Chapters', desc: 'Chapter I, II, III numbering' },
                                        { icon: '🎬', use: 'Movie Credits', desc: 'Copyright years: MMXXIV' },
                                        { icon: '👑', use: 'Royalty & Dynasty', desc: 'King Henry VIII, Louis XIV' },
                                        { icon: '🏛️', use: 'Monuments & Architecture', desc: 'Inscription dates on buildings' },
                                        { icon: '⚽', use: 'Sports', desc: 'Super Bowl LVIII numbering' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-200 flex items-start gap-3">
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

                        <div className="mt-8 bg-linear-to-r from-orange-100 to-red-100 rounded-xl p-6 border-2 border-orange-300">
                            <h3 className="font-bold text-orange-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-orange-800 leading-relaxed">
                                Roman numerals represent one of humanity&apos;s earliest standardized number systems. They facilitated commerce,
                                administration, and military organization across the vast Roman Empire. Though mathematically limited (no zero,
                                difficult for large calculations), they were revolutionary for their time and fundamentally shaped how Western
                                civilization approached mathematics. Their persistence in modern usage reflects their deep cultural heritage and
                                aesthetic appeal.
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
                                { decimal: 1, roman: 'I' },
                                { decimal: 4, roman: 'IV' },
                                { decimal: 9, roman: 'IX' },
                                { decimal: 27, roman: 'XXVII' },
                                { decimal: 49, roman: 'XLIX' },
                                { decimal: 99, roman: 'XCIX' },
                                { decimal: 444, roman: 'CDXLIV' },
                                { decimal: 888, roman: 'DCCCLXXXVIII' },
                                { decimal: 1994, roman: 'MCMXCIV' },
                                { decimal: 2024, roman: 'MMXXIV' },
                                { decimal: 3000, roman: 'MMM' },
                                { decimal: 3999, roman: 'MMMCMXCIX' },
                            ].map((item) => (
                                <div
                                    key={item.decimal}
                                    className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 border-2 border-red-200 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">Decimal</p>
                                        <p className="text-4xl font-bold text-red-600 mb-4">{item.decimal}</p>
                                        <p className="text-gray-600 text-sm mb-2">Roman</p>
                                        <p className="text-3xl font-bold text-gray-800 font-serif">{item.roman}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-red-600 to-orange-500 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Remember the Pattern</h3>
                                <p className="mb-4 text-red-100">
                                    Think of Roman numerals as building blocks. The pattern repeats at each tier:
                                </p>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 font-mono space-y-1 text-sm">
                                    <p>1, 2, 3, 4(subtract), 5, 6, 7, 8, 9(subtract)</p>
                                    <p>I, II, III, IV, V, VI, VII, VIII, IX</p>
                                    <p>X, XX, XXX, XL, L, LX, LXX, LXXX, XC</p>
                                    <p>C, CC, CCC, CD, D, DC, DCC, DCCC, CM</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Common Mistakes to Avoid</h3>
                                <ul className="space-y-2 text-red-100">
                                    <li>Do not repeat V, L, or D</li>
                                    <li>Do not subtract from values more than 10x smaller</li>
                                    <li>Do not write IIII instead of IV</li>
                                    <li>Do not forget descending order</li>
                                    <li>✓ Master basic combinations first</li>
                                    <li>✓ Practice with range 1-100 before 100-3999</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RomanNumeralPage;
