'use client';

import Link from 'next/link';
import { useState } from 'react';

const ArabicNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(2024);

    const decimalToArabic = (num: number): string => {
        return num.toString();
    };

    const breakdownArabic = (num: number) => {
        const breakdown = [];
        const numStr = num.toString();
        const length = numStr.length;

        for (let i = 0; i < length; i++) {
            const digit = parseInt(numStr[i]);
            const position = length - 1 - i;
            const powerOf10 = Math.pow(10, position);
            const value = digit * powerOf10;

            if (digit !== 0 || position === 0) {
                breakdown.push({
                    position: position,
                    powerOf10: powerOf10,
                    digit: digit,
                    value: value,
                    placeValue: ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands', 'Hundred Thousands', 'Millions'][position] || `10^${position}`,
                    explanation: `${digit} × 10^${position} = ${value}`
                });
            }
        }

        return breakdown;
    };

    const arabicNumber = decimalToArabic(interactiveNumber);
    const arabicBreakdown = breakdownArabic(interactiveNumber);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50 to-teal-50">
            {/* Header */}
            <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-emerald-100 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">🔢</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Arabic Numerals</h1>
                            <p className="text-xl text-emerald-100">Islamic Golden Age • 800s CE - Present</p>
                        </div>
                    </div>
                    <p className="text-xl text-emerald-100 max-w-3xl leading-relaxed">
                        The most widely used numeral system globally. A positional decimal system with nine digits (1-9) and zero.
                        Foundation of modern mathematics, science, and commerce worldwide.
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Ten Digits</h3>
                                <div className="space-y-3">
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                                        <div key={digit} className="flex items-center justify-between p-4 bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl font-bold text-emerald-600 w-16 text-center">{digit}</span>
                                                <div>
                                                    <p className="font-bold text-gray-900">{['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'][digit]}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {digit === 0 ? 'Represents nothing/absence' : `Represents ${digit} unit${digit !== 1 ? 's' : ''}`}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">System Characteristics</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-blue-900 mb-2">Base System</h4>
                                        <p className="text-blue-800">Decimal (Base-10)</p>
                                    </div>
                                    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-green-900 mb-2">Notation Type</h4>
                                        <p className="text-green-800">Positional with ten digits (0-9)</p>
                                    </div>
                                    <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-purple-900 mb-2">Zero Concept</h4>
                                        <p className="text-purple-800">True zero symbol (0) - revolutionary innovation</p>
                                    </div>
                                    <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-amber-900 mb-2">Universal Standard</h4>
                                        <p className="text-amber-800">Used globally in all scientific and commercial applications</p>
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
                            {/* Positional Value */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: Positional Place Value</h3>
                                <p className="text-cyan-800 mb-4">
                                    Each position represents a power of 10. Position value depends on location, not the digit itself.
                                </p>
                                <div className="bg-white rounded-lg p-4 space-y-2">
                                    <div className="flex items-center justify-between font-mono text-sm">
                                        <span className="text-gray-600">Position (right to left)</span>
                                        <span className="text-gray-600">Power</span>
                                        <span className="text-gray-600">Value</span>
                                    </div>
                                    <hr className="border-gray-300" />
                                    {[0, 1, 2, 3, 4, 5, 6].map((pos) => (
                                        <div key={pos} className="flex items-center justify-between font-mono text-sm">
                                            <span className="text-gray-800">Position {pos}</span>
                                            <span className="text-cyan-600">10^{pos}</span>
                                            <span className="font-bold text-cyan-600">{Math.pow(10, pos)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Digit Significance */}
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Rule 2: Digit Significance</h3>
                                <p className="text-green-800 mb-4">
                                    The same digit has different values depending on its position:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">5 in position 0 = 5 × 1 = 5</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">5 in position 1 = 5 × 10 = 50</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">5 in position 2 = 5 × 100 = 500</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">5 in position 3 = 5 × 1000 = 5000</p>
                                    </div>
                                </div>
                            </div>

                            {/* Zero Innovation */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-purple-900 mb-4">Rule 3: Zero as Placeholder</h3>
                                <p className="text-purple-800 mb-4">
                                    Zero enables positional notation by acting as a placeholder for empty positions:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">101 ≠ 11</p>
                                        <p className="text-sm text-purple-700">Zero marks the missing tens place</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">1001 ≠ 11</p>
                                        <p className="text-sm text-purple-700">Two zeros mark missing tens and hundreds</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">2024 = 2000 + 20 + 4</p>
                                        <p className="text-sm text-purple-700">Zero marks missing hundreds place</p>
                                    </div>
                                </div>
                            </div>

                            {/* Additive Composition */}
                            <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                                <h3 className="text-xl font-bold text-orange-900 mb-4">Rule 4: Additive Composition</h3>
                                <p className="text-orange-800 mb-4">
                                    Any number is the sum of its digits multiplied by their place values:
                                </p>
                                <div className="space-y-2">
                                    <div className="bg-white text-orange-800 rounded-lg p-3 border-l-4 border-orange-500 font-mono">
                                        <p className="text-sm">3456 = (3 × 1000) + (4 × 100) + (5 × 10) + (6 × 1)</p>
                                    </div>
                                    <div className="bg-white text-orange-800 rounded-lg p-3 border-l-4 border-orange-500 font-mono">
                                        <p className="text-sm">2024 = (2 × 1000) + (0 × 100) + (2 × 10) + (4 × 1)</p>
                                    </div>
                                    <div className="bg-white text-orange-800 rounded-lg p-3 border-l-4 border-orange-500 font-mono">
                                        <p className="text-sm">7890 = (7 × 1000) + (8 × 100) + (9 × 10) + (0 × 1)</p>
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
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Number (0-1,000,000)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000000"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        max="1000000"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(1000000, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-emerald-400 rounded-lg focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Arabic</p>
                                        <p className="text-3xl font-bold text-emerald-600">{arabicNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Place Value Breakdown</label>
                                <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border-2 border-emerald-300 max-h-96 overflow-y-auto">
                                    {arabicBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {arabicBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-emerald-600">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="font-bold text-gray-900">{item.placeValue}</p>
                                                            <p className="text-xs text-gray-600">{item.explanation}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-3xl font-bold text-emerald-600">{item.digit}</p>
                                                            <p className="font-bold text-emerald-600 text-sm">= {item.value}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="bg-emerald-100 rounded-lg p-4 border-2 border-emerald-400 mt-4">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-3xl font-bold text-emerald-600">{interactiveNumber}</p>
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
                            {/* Powers of 10 */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Powers of 10 Hierarchy</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { power: 0, value: 1, name: 'Ones' },
                                        { power: 1, value: 10, name: 'Tens' },
                                        { power: 2, value: 100, name: 'Hundreds' },
                                        { power: 3, value: 1000, name: 'Thousands' },
                                        { power: 4, value: 10000, name: 'Ten Thousands' },
                                        { power: 5, value: 100000, name: 'Hundred Thousands' },
                                        { power: 6, value: 1000000, name: 'Millions' },
                                        { power: 7, value: 10000000, name: 'Ten Millions' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border-2 border-emerald-300">
                                            <p className="text-xs font-bold text-gray-600 mb-1">{item.name}</p>
                                            <p className="text-2xl font-bold text-emerald-700 mb-2">10^{item.power}</p>
                                            <p className="text-lg font-bold text-gray-900">{item.value.toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example: Building 3,456 */}
                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 3,456</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Thousands place</p>
                                                <p className="font-mono text-gray-800">3 × 1000 = 3000</p>
                                            </div>
                                            <p className="text-2xl font-bold text-indigo-600">3000</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Hundreds place</p>
                                                <p className="font-mono text-gray-800">4 × 100 = 400</p>
                                            </div>
                                            <p className="text-2xl font-bold text-indigo-600">+ 400</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Tens place</p>
                                                <p className="font-mono text-gray-800">5 × 10 = 50</p>
                                            </div>
                                            <p className="text-2xl font-bold text-indigo-600">+ 50</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Ones place</p>
                                                <p className="font-mono text-gray-800">6 × 1 = 6</p>
                                            </div>
                                            <p className="text-2xl font-bold text-indigo-600">+ 6</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Final Result:</p>
                                        <p className="text-3xl font-bold text-indigo-600">3456</p>
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Origins & Development</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                        <p className="font-bold text-blue-900">Indian Origins (500s CE)</p>
                                        <p className="text-blue-800 text-sm">Developed in India with place-value and zero concept</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-green-900">Islamic Golden Age (800s CE)</p>
                                        <p className="text-green-800 text-sm">Al-Khwarizmi promotes system; term &quot;algorithm&quot; derived from his name</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                        <p className="font-bold text-purple-900">Medieval Europe (1100s-1400s)</p>
                                        <p className="text-purple-800 text-sm">Leonardo Fibonacci spreads Hindu-Arabic numerals in Europe</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="font-bold text-amber-900">Global Adoption (1500s - Present)</p>
                                        <p className="text-amber-800 text-sm">Becomes universal standard for science, commerce, and mathematics</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Modern Applications</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '🧪', use: 'Science & Research', desc: 'All measurements and calculations' },
                                        { icon: '💰', use: 'Commerce & Finance', desc: 'Currency, banking, accounting' },
                                        { icon: '🏛️', use: 'Government & Law', desc: 'Official documentation and records' },
                                        { icon: '📡', use: 'Technology', desc: 'Computing, telecommunications, data' },
                                        { icon: '📚', use: 'Education', desc: 'Global standard in all schools' },
                                        { icon: '⚡', use: 'Engineering', desc: 'Design, construction, manufacturing' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-300 flex items-start gap-3">
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

                        <div className="mt-8 bg-linear-to-r from-emerald-100 to-teal-100 rounded-xl p-6 border-2 border-emerald-400">
                            <h3 className="font-bold text-emerald-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-emerald-800 leading-relaxed">
                                Arabic numerals represent humanity&apos;s most transformative mathematical innovation. Born from Indian mathematics
                                and perfected during Islam&apos;s Golden Age, they revolutionized human capability in calculation and commerce. The genius
                                of positional notation—where position determines value—and the adoption of zero as both concept and symbol, enabled
                                complex mathematics that drove scientific revolution and industrial advancement. Unlike any previous system, Arabic
                                numerals made mathematics accessible and efficient, facilitating the global knowledge economy. Today, their universal
                                adoption reflects more than convenience; it represents humanity&apos;s shared mathematical language and the triumph of a
                                system so elegant that alternatives seem primitive.
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
                                { number: 0, desc: 'Zero - absence of value' },
                                { number: 1, desc: 'One - unity' },
                                { number: 10, desc: 'Ten - first two-digit' },
                                { number: 100, desc: 'One Hundred - first three-digit' },
                                { number: 1000, desc: 'One Thousand' },
                                { number: 10000, desc: 'Ten Thousand' },
                                { number: 100000, desc: 'One Hundred Thousand' },
                                { number: 1000000, desc: 'One Million' },
                                { number: 2024, desc: 'Current year example' },
                                { number: 365, desc: 'Days in a year' },
                                { number: 360, desc: 'Degrees in circle' },
                                { number: 999, desc: 'Largest three-digit' },
                            ].map((item) => (
                                <div
                                    key={item.number}
                                    className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border-2 border-emerald-300 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">{item.desc}</p>
                                        <p className="text-4xl font-bold text-emerald-600 mb-2">{item.number.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Place Value Positions</h3>
                                <p className="mb-4 text-emerald-100">
                                    Remember the hierarchy from right to left:
                                </p>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-1 text-sm font-mono">
                                    <p>Position 0: Ones (×1)</p>
                                    <p>Position 1: Tens (×10)</p>
                                    <p>Position 2: Hundreds (×100)</p>
                                    <p>Position 3: Thousands (×1000)</p>
                                    <p>Position 4: Ten Thousands (×10000)</p>
                                    <p>Position n: ×10^n</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Why Arabic Numerals Win</h3>
                                <ul className="space-y-2 text-emerald-100">
                                    <li>✓ Simple: only 10 digits (0-9)</li>
                                    <li>✓ Positional: value depends on placement</li>
                                    <li>✓ Zero: true placeholder and number</li>
                                    <li>✓ Efficient: easy arithmetic operations</li>
                                    <li>✓ Scalable: works for any size number</li>
                                    <li>✓ Universal: globally understood standard</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ArabicNumeralPage;
