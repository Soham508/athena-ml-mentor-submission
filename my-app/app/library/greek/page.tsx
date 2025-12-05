'use client';

import Link from 'next/link';
import { useState } from 'react';

const GreekNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(2024);

    const greekAlphabetNumerals: { [key: number]: string } = {
        1: 'Α', 2: 'Β', 3: 'Γ', 4: 'Δ', 5: 'Ε', 6: 'Ϛ', 7: 'Ζ', 8: 'Η', 9: 'Θ',
        10: 'Ι', 20: 'Κ', 30: 'Λ', 40: 'Μ', 50: 'Ν', 60: 'Ξ', 70: 'Ο', 80: 'Π', 90: 'Ϟ',
        100: 'Ρ', 200: 'Σ', 300: 'Τ', 400: 'Υ', 500: 'Φ', 600: 'Χ', 700: 'Ψ', 800: 'Ω', 900: 'Ϡ'
    };

    const decimalToGreek = (num: number): string => {
        if (num === 0) return '𝙾';
        if (num > 9999) return 'Out of range';

        const ones = ['', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ϛ', 'Ζ', 'Η', 'Θ'];
        const tens = ['', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ϟ'];
        const hundreds = ['', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'Ϡ'];
        const thousands = ['', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ϛ', 'Ζ', 'Η', 'Θ'];

        let result = '';

        const o = num % 10;
        const t = Math.floor((num % 100) / 10);
        const h = Math.floor((num % 1000) / 100);
        const th = Math.floor(num / 1000);

        if (th > 0) {
            result += thousands[th] + '͵';
        }

        result += hundreds[h] + tens[t] + ones[o];

        return result;
    };

    const breakdownGreek = (num: number) => {
        const breakdown = [];

        const ones = ['', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ϛ', 'Ζ', 'Η', 'Θ'];
        const tens = ['', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ϟ'];
        const hundreds = ['', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'Ϡ'];
        const thousands = ['', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ϛ', 'Ζ', 'Η', 'Θ'];

        const o = num % 10;
        const t = Math.floor((num % 100) / 10);
        const h = Math.floor((num % 1000) / 100);
        const th = Math.floor(num / 1000);

        if (th > 0) {
            breakdown.push({
                position: 'Thousands',
                digit: th,
                symbol: thousands[th] + '͵',
                value: th * 1000,
                explanation: `${th} thousand(s) = ${thousands[th]}͵ (${th * 1000})`
            });
        }

        if (h > 0) {
            breakdown.push({
                position: 'Hundreds',
                digit: h,
                symbol: hundreds[h],
                value: h * 100,
                explanation: `${h} hundred(s) = ${hundreds[h]} (${h * 100})`
            });
        }

        if (t > 0) {
            breakdown.push({
                position: 'Tens',
                digit: t,
                symbol: tens[t],
                value: t * 10,
                explanation: `${t} ten(s) = ${tens[t]} (${t * 10})`
            });
        }

        if (o > 0) {
            breakdown.push({
                position: 'Ones',
                digit: o,
                symbol: ones[o],
                value: o,
                explanation: `${o} one(s) = ${ones[o]} (${o})`
            });
        }

        if (breakdown.length === 0) {
            breakdown.push({
                position: 'Zero',
                digit: 0,
                symbol: '𝙾',
                value: 0,
                explanation: 'Zero (no symbols)'
            });
        }

        return breakdown;
    };

    const greekNumber = decimalToGreek(interactiveNumber);
    const greekBreakdown = breakdownGreek(interactiveNumber);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-purple-50 to-blue-50">
            {/* Header */}
            <div className="bg-linear-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-purple-100 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">🏛️</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Greek Numerals</h1>
                            <p className="text-xl text-purple-100">Ancient Greece • 500 BCE - Present</p>
                        </div>
                    </div>
                    <p className="text-xl text-purple-100 max-w-3xl leading-relaxed">
                        An alphabetic numeral system using Greek letters representing values.
                        One of the first alphabetic number systems and foundational to Western mathematical tradition.
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Alphabetic Symbols (1-900)</h3>
                                <div className="space-y-2">
                                    <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                        <p className="text-sm font-bold text-purple-900 mb-2">Units (1-9)</p>
                                        <p className="font-mono text-sm text-gray-800">Α(1) Β(2) Γ(3) Δ(4) Ε(5) Ϛ(6) Ζ(7) Η(8) Θ(9)</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                        <p className="text-sm font-bold text-blue-900 mb-2">Tens (10-90)</p>
                                        <p className="font-mono text-sm text-gray-800">Ι(10) Κ(20) Λ(30) Μ(40) Ν(50) Ξ(60) Ο(70) Π(80) Ϟ(90)</p>
                                    </div>
                                    <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
                                        <p className="text-sm font-bold text-indigo-900 mb-2">Hundreds (100-900)</p>
                                        <p className="font-mono text-sm text-gray-800">Ρ(100) Σ(200) Τ(300) Υ(400) Φ(500) Χ(600) Ψ(700) Ω(800) Ϡ(900)</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">System Characteristics</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-blue-900 mb-2">Base System</h4>
                                        <p className="text-blue-800">Decimal (Base-10) using 27 letters</p>
                                    </div>
                                    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-green-900 mb-2">Notation Type</h4>
                                        <p className="text-green-800">Additive with alphabetic characters</p>
                                    </div>
                                    <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-purple-900 mb-2">Thousands Marker</h4>
                                        <p className="text-purple-800">Keraia (͵) symbol indicates thousands</p>
                                    </div>
                                    <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-amber-900 mb-2">Range</h4>
                                        <p className="text-amber-800">Typically 1-9999 (numbers up to nearly 10,000)</p>
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
                            {/* Alphabetic Mapping */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: One-to-One Alphabetic Mapping</h3>
                                <p className="text-cyan-800 mb-4">
                                    Each number value maps to a single Greek letter. No repetition like Roman numerals:
                                </p>
                                <div className="bg-white rounded-lg p-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">5 = Ε (single letter)</span>
                                        <span className="text-cyan-600">NOT</span>
                                        <span className="font-bold text-gray-800">ΙΙΙΙΙ (five I's)</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">50 = Ν (single letter)</span>
                                        <span className="text-cyan-600">NOT</span>
                                        <span className="font-bold text-gray-800">ΙΙΙΙΙ repeated</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">500 = Φ (single letter)</span>
                                        <span className="text-cyan-600">NOT</span>
                                        <span className="font-bold text-gray-800">Ρ repeated</span>
                                    </div>
                                </div>
                            </div>

                            {/* Additive Combination */}
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Rule 2: Additive Combination</h3>
                                <p className="text-green-800 mb-4">
                                    Numbers combine letters additively, always in descending order:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">23 = ΚΓ</p>
                                        <p className="text-sm text-green-700">Κ(20) + Γ(3) = 23</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">456 = ΥΝϚ</p>
                                        <p className="text-sm text-green-700">Υ(400) + Ν(50) + Ϛ(6) = 456</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">789 = ΨΟΘ</p>
                                        <p className="text-sm text-green-700">Ψ(700) + Ο(70) + Θ(9) = 789</p>
                                    </div>
                                </div>
                            </div>

                            {/* Thousands Notation */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-purple-900 mb-4">Rule 3: Thousands Notation</h3>
                                <p className="text-purple-800 mb-4">
                                    Keraia (͵) symbol placed below or after a letter indicates multiplication by 1000:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">1000 = Α͵</p>
                                        <p className="text-sm text-purple-700">Α(1) with keraia = 1 × 1000</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">2024 = Β͵ΚΔ</p>
                                        <p className="text-sm text-purple-700">Β͵(2000) + Κ(20) + Δ(4) = 2024</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">5678 = Ε͵ϚΟΗ</p>
                                        <p className="text-sm text-purple-700">Ε͵(5000) + Ϛ(600) + Ο(70) + Η(8) = 5678</p>
                                    </div>
                                </div>
                            </div>

                            {/* Descending Order */}
                            <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                                <h3 className="text-xl font-bold text-orange-900 mb-4">Rule 4: Descending Order</h3>
                                <p className="text-orange-800 mb-4">
                                    Symbols always appear in descending order of value (left to right):
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900">✓ Ψ(700) + Π(80) + Ε(5) = ΨΠΕ (785)</p>
                                        <p className="text-sm text-orange-700">Correct descending order</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900">✗ ΕΠΨ (wrong order)</p>
                                        <p className="text-sm text-orange-700">Violates descending order rule</p>
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
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Decimal Number (1-9999)</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="9999"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-purple-600"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="1"
                                        max="9999"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(9999, Math.max(1, parseInt(e.target.value) || 1)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-purple-300 rounded-lg focus:border-purple-600 focus:ring-2 focus:ring-purple-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Greek</p>
                                        <p className="text-3xl font-bold text-purple-600 font-serif">{greekNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Component Breakdown</label>
                                <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200 max-h-96 overflow-y-auto">
                                    {greekBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {greekBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="font-bold text-gray-900">{item.position}</p>
                                                            <p className="text-sm text-gray-600">{item.explanation}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-3xl font-bold text-purple-600 font-serif mb-1">{item.symbol}</p>
                                                            <p className="font-bold text-purple-600 text-lg">{item.value}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="bg-purple-100 rounded-lg p-4 border-2 border-purple-300 mt-4">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-3xl font-bold text-purple-600">{interactiveNumber}</p>
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
                            {/* Three-Tier Structure */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Three-Tier Value Structure</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-linear-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-300">
                                        <p className="font-bold text-purple-900 mb-2">Units (1-9)</p>
                                        <p className="text-sm text-purple-800">Α through Θ</p>
                                        <p className="text-xs text-gray-600 mt-2">Single letter represents value</p>
                                    </div>
                                    <div className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-lg p-4 border-2 border-indigo-300">
                                        <p className="font-bold text-indigo-900 mb-2">Tens (10-90)</p>
                                        <p className="text-sm text-indigo-800">Ι through Ϟ</p>
                                        <p className="text-xs text-gray-600 mt-2">Each position × 10</p>
                                    </div>
                                    <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border-2 border-blue-300">
                                        <p className="font-bold text-blue-900 mb-2">Hundreds (100-900)</p>
                                        <p className="text-sm text-blue-800">Ρ through Ϡ</p>
                                        <p className="text-xs text-gray-600 mt-2">Each position × 100</p>
                                    </div>
                                </div>
                            </div>

                            {/* Example: Building 624 */}
                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 624</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 1: Hundreds place</p>
                                                <p className="font-mono text-gray-800">600 = Χ</p>
                                            </div>
                                            <p className="text-2xl font-serif text-indigo-600">Χ</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 2: Tens place</p>
                                                <p className="font-mono text-gray-800">20 = Κ</p>
                                            </div>
                                            <p className="text-2xl font-serif text-indigo-600">Κ</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 3: Ones place</p>
                                                <p className="font-mono text-gray-800">4 = Δ</p>
                                            </div>
                                            <p className="text-2xl font-serif text-indigo-600">Δ</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Final Result (descending order):</p>
                                        <p className="text-3xl font-bold text-indigo-600 font-serif">ΧΚΔ</p>
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
                                        <p className="font-bold text-blue-900">Athenian System (5th century BCE)</p>
                                        <p className="text-blue-800 text-sm">Early Acrophonic system using first letters of number words</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                        <p className="font-bold text-purple-900">Ionian System (3rd century BCE)</p>
                                        <p className="text-purple-800 text-sm">Full alphabetic system refined, adopted across Greek world</p>
                                    </div>
                                    <div className="bg-indigo-50 rounded-lg p-4 border-l-4 border-indigo-500">
                                        <p className="font-bold text-indigo-900">Mathematical Flourishing</p>
                                        <p className="text-indigo-800 text-sm">Facilitated advanced mathematics during Hellenistic period</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-500">
                                        <p className="font-bold text-slate-900">Byzantine Era (1453+ CE)</p>
                                        <p className="text-slate-800 text-sm">Continued use in Orthodox Christian traditions</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Applications & Legacy</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '📚', use: 'Mathematical Works', desc: 'Euclid, Archimedes used for calculations' },
                                        { icon: '🏛️', use: 'Administrative Records', desc: 'City-states tracked finances and resources' },
                                        { icon: '⚖️', use: 'Philosophical Texts', desc: 'Numbers in philosophical and musical theory' },
                                        { icon: '✝️', use: 'Religious Use', desc: 'Gematria practices in Orthodox traditions' },
                                        { icon: '📜', use: 'Papyri Documents', desc: 'Commercial and personal letters' },
                                        { icon: '🎓', use: 'Education', desc: 'Teaching Greek numeracy across empires' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200 flex items-start gap-3">
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

                        <div className="mt-8 bg-linear-to-r from-purple-100 to-blue-100 rounded-xl p-6 border-2 border-purple-300">
                            <h3 className="font-bold text-purple-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-purple-800 leading-relaxed">
                                Greek numerals represent a revolutionary approach to number representation—the first true alphabetic numeral system
                                that unified writing and mathematics. By mapping numbers to letters, Greeks connected numerical meaning with linguistic
                                form, enabling sophisticated mathematical discourse and facilitating trade across diverse regions. The elegance of the
                                system—where each value has a unique symbol—made it remarkably efficient compared to additive systems. In Orthodox
                                Christian traditions, Greek numerals continue to carry symbolic weight through isopsephy (gematria), where words acquire
                                numerical meaning. Their influence persists in Western mathematics, philosophy, and theology, testament to how Greeks
                                shaped fundamental human concepts of quantity and measurement.
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
                                { decimal: 1, greek: 'Α' },
                                { decimal: 5, greek: 'Ε' },
                                { decimal: 10, greek: 'Ι' },
                                { decimal: 23, greek: 'ΚΓ' },
                                { decimal: 50, greek: 'Ν' },
                                { decimal: 99, greek: 'ϞΘ' },
                                { decimal: 100, greek: 'Ρ' },
                                { decimal: 256, greek: 'ΣΝϚ' },
                                { decimal: 500, greek: 'Φ' },
                                { decimal: 888, greek: 'ΨΠΗ' },
                                { decimal: 1000, greek: 'Α͵' },
                                { decimal: 2024, greek: 'Β͵ΚΔ' },
                                { decimal: 5000, greek: 'Ε͵' },
                                { decimal: 5555, greek: 'Ε͵ΦΝΝ' },
                                { decimal: 9999, greek: 'Θ͵ϞϞΘ' },
                            ].map((item) => (
                                <div
                                    key={item.decimal}
                                    className="bg-linear-to-br from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-200 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">Decimal</p>
                                        <p className="text-4xl font-bold text-purple-600 mb-4">{item.decimal}</p>
                                        <p className="text-gray-600 text-sm mb-2">Greek</p>
                                        <p className="text-3xl font-bold text-gray-800 font-serif">{item.greek}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Remember the Three Groups</h3>
                                <p className="mb-4 text-purple-100">
                                    Greek letters divide into three value groups:
                                </p>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-2 text-sm">
                                    <p><strong>Units:</strong> Α-Θ (1-9) use first 9 letters</p>
                                    <p><strong>Tens:</strong> Ι-Ϟ (10-90) use next 9 letters</p>
                                    <p><strong>Hundreds:</strong> Ρ-Ϡ (100-900) use next 9 letters</p>
                                    <p><strong>Thousands:</strong> Add keraia (͵) below letter</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Key Principles</h3>
                                <ul className="space-y-2 text-purple-100">
                                    <li>✓ Each value has exactly ONE letter</li>
                                    <li>✓ Arrange in DESCENDING order</li>
                                    <li>✓ Keraia (͵) multiplies by 1000</li>
                                    <li>✓ No repetition like Roman numerals</li>
                                    <li>✓ Maximum value typically 9999</li>
                                    <li>✓ Archaic letters used (Ϛ, Ϟ, Ϡ)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GreekNumeralPage;
