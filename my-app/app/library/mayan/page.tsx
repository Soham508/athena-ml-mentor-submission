'use client';

import Link from 'next/link';
import { useState } from 'react';

const MayanNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(53);

    const decimalToMayan = (num: number): string[] => {
        if (num === 0) return ['𓑊'];

        const positions = [];
        let remaining = num;

        // Process each position in base-20
        while (remaining > 0 || positions.length === 0) {
            const digit = remaining % 20;
            const bars = Math.floor(digit / 5);
            const dots = digit % 5;

            const symbol = '▬'.repeat(bars) + (bars > 0 && dots > 0 ? ' ' : '') + '●'.repeat(dots);
            positions.unshift(symbol || '𓑊');

            remaining = Math.floor(remaining / 20);
        }

        return positions;
    };

    const breakdownMayan = (num: number) => {
        const breakdown = [];
        let remaining = num;
        let position = 0;

        while (remaining > 0 || position === 0) {
            const digit = remaining % 20;
            const bars = Math.floor(digit / 5);
            const dots = digit % 5;

            const symbol = '▬'.repeat(bars) + (bars > 0 && dots > 0 ? ' ' : '') + '●'.repeat(dots);

            breakdown.unshift({
                position: position,
                powerOf20: Math.pow(20, position),
                digit: digit,
                bars: bars,
                dots: dots,
                symbol: symbol || '𓑊',
                value: digit * Math.pow(20, position)
            });

            remaining = Math.floor(remaining / 20);
            position++;
        }

        return breakdown;
    };

    const mayanBreakdown = breakdownMayan(interactiveNumber);
    const mayanRepresentation = decimalToMayan(interactiveNumber);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-green-50 to-teal-50">
            {/* Header */}
            <div className="bg-linear-to-r from-green-600 via-teal-600 to-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-green-100 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">🗿</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Mayan Numerals</h1>
                            <p className="text-xl text-green-100">Mesoamerica • 300 BCE - 900 CE</p>
                        </div>
                    </div>
                    <p className="text-xl text-green-100 max-w-3xl leading-relaxed">
                        A sophisticated vigesimal (base-20) system that was one of the earliest to incorporate the concept of zero.
                        Used for astronomical and calendrical calculations by the Maya civilization.
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
                                        { symbol: '●', value: 1, name: 'Dot (Hun)', desc: 'One unit' },
                                        { symbol: '▬', value: 5, name: 'Bar (Ho\')', desc: 'Five units' },
                                        { symbol: '𓑊', value: 0, name: 'Shell/Zero (Ma\')', desc: 'Zero/nothing' },
                                    ].map((item) => (
                                        <div key={item.value} className="flex items-center justify-between p-4 bg-linear-to-r from-green-50 to-teal-50 rounded-xl border border-green-200">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl w-16 text-center">{item.symbol}</span>
                                                <div>
                                                    <p className="font-bold text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                                </div>
                                            </div>
                                            <span className="text-2xl font-bold text-teal-600">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">System Characteristics</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-blue-900 mb-2">Base System</h4>
                                        <p className="text-blue-800">Vigesimal (Base-20)</p>
                                    </div>
                                    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-green-900 mb-2">Notation Type</h4>
                                        <p className="text-green-800">Positional with dots and bars</p>
                                    </div>
                                    <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-purple-900 mb-2">Zero Representation</h4>
                                        <p className="text-purple-800">Shell symbol (𓑊) - one of earliest uses!</p>
                                    </div>
                                    <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-amber-900 mb-2">Orientation</h4>
                                        <p className="text-amber-800">Vertical arrangement (read top to bottom)</p>
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
                            {/* Dot-Bar System */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: Dot-Bar Composition</h3>
                                <p className="text-cyan-800 mb-4">
                                    Numbers 1-19 are constructed using combinations of dots (● = 1) and bars (▬ = 5):
                                </p>
                                <div className="grid md:grid-cols-5 gap-2">
                                    {Array.from({ length: 20 }, (_, i) => i).map((num) => {
                                        const bars = Math.floor(num / 5);
                                        const dots = num % 5;
                                        const symbol = (bars > 0 ? '▬'.repeat(bars) : '') +
                                            (bars > 0 && dots > 0 ? ' ' : '') +
                                            (dots > 0 ? '●'.repeat(dots) : (num === 0 ? '𓑊' : ''));
                                        return (
                                            <div key={num} className="bg-white rounded-lg p-2 text-center border border-cyan-300">
                                                <p className="text-xs text-gray-600 mb-1">{num}</p>
                                                <p className="text-lg font-bold text-gray-800 min-h-12 flex items-center justify-center">{symbol}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Positional System */}
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Rule 2: Positional System (Base-20)</h3>
                                <p className="text-green-800 mb-4">
                                    Unlike Roman numerals, Mayan numbers use vertical stacking to represent place values. Each level represents a power of 20:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-mono font-bold text-green-700 mb-1">Level 3 (top): × 20² = × 400</p>
                                        <p className="text-sm text-green-600">Highest position value</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500">
                                        <p className="font-mono font-bold text-teal-700 mb-1">Level 2 (middle): × 20¹ = × 20</p>
                                        <p className="text-sm text-teal-600">Middle position value</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                                        <p className="font-mono font-bold text-blue-700 mb-1">Level 1 (bottom): × 20⁰ = × 1</p>
                                        <p className="text-sm text-blue-600">Ones place</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reading Direction */}
                            <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200">
                                <h3 className="text-xl font-bold text-teal-900 mb-4">Rule 3: Vertical Reading Order</h3>
                                <p className="text-teal-800 mb-4">
                                    Mayan numbers are read from TOP to BOTTOM, unlike modern left-to-right writing:
                                </p>
                                <div className="bg-white rounded-lg p-6 border-2 border-teal-300 text-center">
                                    <div className="space-y-4">
                                        <div className="text-3xl font-bold text-teal-600">▬▬▬ ●●●</div>
                                        <p className="text-teal-800 font-bold">(Read top to bottom)</p>
                                        <div className="text-3xl font-bold text-teal-600 my-4">↓</div>
                                        <div className="text-3xl font-bold text-teal-600">▬ ●●</div>
                                        <p className="text-sm text-teal-700 mt-4">Top position = 13 × 20 = 260</p>
                                        <p className="text-sm text-teal-700">Bottom position = 7 × 1 = 7</p>
                                        <p className="text-sm text-teal-700 font-bold mt-2">Total = 267</p>
                                    </div>
                                </div>
                            </div>

                            {/* Zero Concept */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-purple-900 mb-4">Rule 4: Zero as Position Placeholder</h3>
                                <p className="text-purple-800 mb-4">
                                    The shell symbol (𓑊) represents zero and is crucial for positional notation. It marks empty positions:
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-lg p-4 border border-purple-300">
                                        <p className="text-2xl text-center mb-2">▬ ●●●●●</p>
                                        <p className="text-center text-sm text-gray-600">6</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-purple-300">
                                        <p className="text-2xl text-center mb-2">▬ ●●●●●</p>
                                        <p className="text-2xl text-center mb-2">𓑊</p>
                                        <p className="text-center text-sm text-gray-600">120 (6×20 + 0)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border border-purple-300">
                                        <p className="text-2xl text-center mb-2">▬ ●●●●●</p>
                                        <p className="text-2xl text-center mb-2">● ●●●●●</p>
                                        <p className="text-center text-sm text-gray-600">126 (6×20 + 6)</p>
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
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Decimal Number (0-399)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="399"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-green-600"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        max="399"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(399, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-green-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Mayan</p>
                                        <div className="space-y-2">
                                            {mayanRepresentation.map((level, idx) => (
                                                <p key={idx} className="text-3xl font-bold text-green-600 min-h-12 flex items-center justify-center">
                                                    {level}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Step-by-Step Breakdown</label>
                                <div className="bg-linear-to-br from-green-50 to-teal-50 rounded-xl p-6 border-2 border-green-200 max-h-96 overflow-y-auto">
                                    {mayanBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {mayanBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="font-bold text-gray-900">Position {item.position} (20^{item.position})</p>
                                                            <p className="text-sm text-gray-600">Value: {item.digit}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-green-600 mb-1">{item.symbol}</p>
                                                            <p className="font-bold text-green-600 text-lg">{item.value}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-600">
                                                        {item.bars > 0 ? `${item.bars} bar(s) × 5 = ${item.bars * 5}` : ''}{item.bars > 0 && item.dots > 0 ? ' + ' : ''}{item.dots > 0 ? `${item.dots} dot(s) × 1 = ${item.dots}` : ''}
                                                    </p>
                                                </div>
                                            ))}
                                            <div className="bg-green-100 rounded-lg p-4 border-2 border-green-300 mt-4">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-3xl font-bold text-green-600">{interactiveNumber}</p>
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
                            {/* Place Values */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Place Value System</h3>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    {[
                                        { position: 3, power: 3, value: 8000, name: 'Kin\'tun' },
                                        { position: 2, power: 2, value: 400, name: 'Baktun' },
                                        { position: 1, power: 1, value: 20, name: 'Uinal' },
                                        { position: 0, power: 0, value: 1, name: 'Kin' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4 border-2 border-gray-300">
                                            <p className="text-xs font-bold text-gray-600 mb-2">{item.name}</p>
                                            <p className="text-lg font-bold text-gray-900 mb-2">20^{item.power}</p>
                                            <p className="font-bold text-teal-600 text-2xl">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example: Building 73 */}
                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 73</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 1: Divide by 20</p>
                                                <p className="font-mono text-gray-800">73 ÷ 20 = 3 remainder 13</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600">3 | 13</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 2: Convert 3 (top level)</p>
                                                <p className="font-mono text-gray-800">3 = ▬▬▬ (zero bars + three dots = 3)</p>
                                            </div>
                                            <p className="text-2xl">▬▬▬</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 3: Convert 13 (bottom level)</p>
                                                <p className="font-mono text-gray-800">13 = ▬▬ ●●● (two bars + three dots = 13)</p>
                                            </div>
                                            <p className="text-2xl">▬▬ ●●●</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Final Mayan Representation (read top to bottom):</p>
                                        <div className="text-center space-y-2">
                                            <p className="text-2xl font-bold text-indigo-600">▬▬▬</p>
                                            <p className="text-lg text-gray-600">|</p>
                                            <p className="text-2xl font-bold text-indigo-600">▬▬ ●●●</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Special Case: Numbers with Zero */}
                            <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
                                <h3 className="text-lg font-bold text-purple-900 mb-4">Special Case: Numbers with Zero</h3>
                                <p className="text-purple-800 mb-4">When a position has zero value, the shell symbol (𓑊) is used:</p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900 mb-1">Example: 20</p>
                                        <div className="text-center space-y-1">
                                            <p className="text-2xl font-bold text-purple-600">●</p>
                                            <p className="text-lg text-gray-600">(top: 1×20)</p>
                                            <p className="text-2xl font-bold text-purple-600">𓑊</p>
                                            <p className="text-lg text-gray-600">(bottom: 0×1)</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900 mb-1">Example: 400 (20²)</p>
                                        <div className="text-center space-y-1">
                                            <p className="text-2xl font-bold text-purple-600">●</p>
                                            <p className="text-lg text-gray-600">(position: 1×400)</p>
                                            <p className="text-2xl font-bold text-purple-600">𓑊</p>
                                            <p className="text-lg text-gray-600">(position: 0×20)</p>
                                            <p className="text-2xl font-bold text-purple-600">𓑊</p>
                                            <p className="text-lg text-gray-600">(position: 0×1)</p>
                                        </div>
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
                                        <p className="font-bold text-blue-900">Early Development (1000-300 BCE)</p>
                                        <p className="text-blue-800 text-sm">Proto-Mayan societies develop counting systems influenced by Olmec civilization</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-green-900">Classic Period (300-900 CE)</p>
                                        <p className="text-green-800 text-sm">Refinement of base-20 system for astronomical and calendrical calculations</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                        <p className="font-bold text-purple-900">Mathematical Innovation</p>
                                        <p className="text-purple-800 text-sm">One of first civilizations to use zero (circa 350 BCE)</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="font-bold text-amber-900">Why Base-20?</p>
                                        <p className="text-amber-800 text-sm">Likely derived from counting on fingers and toes (20 digits total)</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Applications & Legacy</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '🌙', use: 'Astronomical Calendar', desc: 'Tracked celestial bodies and cycles' },
                                        { icon: '📅', use: 'Long Count Calendar', desc: 'Tracked vast spans of time' },
                                        { icon: '🏛️', use: 'Monument Dating', desc: 'Inscribed on temples and stelae' },
                                        { icon: '🔢', use: 'Inventory Records', desc: 'Recorded tribute and commerce' },
                                        { icon: '📚', use: 'Codices', desc: 'Mathematical and astronomical texts' },
                                        { icon: '🌏', use: 'Mathematical Precision', desc: 'Calculations accurate to 0.2 seconds per year' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200 flex items-start gap-3">
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

                        <div className="mt-8 bg-linear-to-r from-teal-100 to-green-100 rounded-xl p-6 border-2 border-teal-300">
                            <h3 className="font-bold text-teal-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-teal-800 leading-relaxed">
                                The Mayan numeral system represents a remarkable intellectual achievement. Unlike most ancient civilizations,
                                the Maya developed a true positional notation system with zero centuries before similar concepts appeared in Europe.
                                Their mathematics enabled them to create accurate astronomical tables and calendars that tracked cycles spanning
                                millions of years. This system demonstrates that sophisticated mathematical thinking emerged independently across
                                different cultures, revealing universal principles of human ingenuity.
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
                                { decimal: 0, mayan: '𓑊', name: 'Zero (Shell)' },
                                { decimal: 1, mayan: '●', name: 'One' },
                                { decimal: 5, mayan: '▬', name: 'Five' },
                                { decimal: 13, mayan: '▬▬ ●●●', name: 'Thirteen' },
                                { decimal: 19, mayan: '▬▬▬ ●●●●', name: 'Nineteen' },
                                { decimal: 20, mayan: '●\n𓑊', name: 'Twenty (1×20)' },
                                { decimal: 40, mayan: '▬▬\n𓑊', name: 'Forty (2×20)' },
                                { decimal: 73, mayan: '▬▬▬\n▬▬ ●●●', name: 'Seventy-Three' },
                                { decimal: 100, mayan: '●●●●●\n𓑊', name: 'One Hundred' },
                                { decimal: 260, mayan: '▬▬▬ ●●●\n𓑊', name: 'Calendar Year' },
                                { decimal: 399, mayan: '●●●●●▬▬▬▬ ●●●●\n●●●●●▬▬▬▬ ●●●●', name: 'Max 2-digit' },
                            ].map((item) => (
                                <div
                                    key={item.decimal}
                                    className="bg-linear-to-br from-green-50 to-teal-50 rounded-lg p-6 border-2 border-green-200 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">{item.name}</p>
                                        <p className="text-4xl font-bold text-green-600 mb-4">{item.decimal}</p>
                                        <div className="bg-white rounded-lg p-4 border border-green-300">
                                            <p className="text-3xl font-bold text-gray-800 whitespace-pre-line">{item.mayan}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-green-600 to-teal-600 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Remember the Patterns</h3>
                                <p className="mb-4 text-green-100">
                                    Think of Mayan as a vertical stacking system:
                                </p>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 font-mono space-y-2 text-sm">
                                    <p>1-4: ● ●● ●●● ●●●●</p>
                                    <p>5-9: ▬ ▬● ▬●● ▬●●● ▬●●●●</p>
                                    <p>10-14: ▬▬ ▬▬● ▬▬●● ▬▬●●● ▬▬●●●●</p>
                                    <p>15-19: ▬▬▬ ▬▬▬● ▬▬▬●● ▬▬▬●●● ▬▬▬●●●●</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Key Differences from Other Systems</h3>
                                <ul className="space-y-2 text-green-100">
                                    <li>✓ Read TOP to BOTTOM (not left to right)</li>
                                    <li>✓ Base-20 (not base-10)</li>
                                    <li>✓ Uses zero symbol (𓑊)</li>
                                    <li>✓ Positional notation</li>
                                    <li>✓ No subtraction rules like Roman numerals</li>
                                    <li>✓ Maximum individual digit is 19</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MayanNumeralPage;
