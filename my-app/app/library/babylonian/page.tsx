'use client';

import Link from 'next/link';
import { useState } from 'react';

const BabylonianNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(125);

    const decimalToBabylonian = (num: number): string[] => {
        if (num === 0) return ['𓑊'];

        const positions = [];
        let remaining = num;

        // Process each position in base-60
        while (remaining > 0 || positions.length === 0) {
            const digit = remaining % 60;
            const tens = Math.floor(digit / 10);
            const ones = digit % 10;

            const symbol = '𓌋'.repeat(tens) + (tens > 0 && ones > 0 ? ' ' : '') + '𓐕'.repeat(ones);
            positions.unshift(symbol || '𓑊');

            remaining = Math.floor(remaining / 60);
        }

        return positions;
    };

    const breakdownBabylonian = (num: number) => {
        const breakdown = [];
        let remaining = num;
        let position = 0;

        while (remaining > 0 || position === 0) {
            const digit = remaining % 60;
            const tens = Math.floor(digit / 10);
            const ones = digit % 10;

            const symbol = '𓌋'.repeat(tens) + (tens > 0 && ones > 0 ? ' ' : '') + '𓐕'.repeat(ones);

            breakdown.unshift({
                position: position,
                powerOf60: Math.pow(60, position),
                digit: digit,
                tens: tens,
                ones: ones,
                symbol: symbol || '𓑊',
                value: digit * Math.pow(60, position)
            });

            remaining = Math.floor(remaining / 60);
            position++;
        }

        return breakdown;
    };

    const babylonianBreakdown = breakdownBabylonian(interactiveNumber);
    const babylonianRepresentation = decimalToBabylonian(interactiveNumber);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-blue-100 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">📜</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Babylonian Numerals</h1>
                            <p className="text-xl text-blue-100">Mesopotamia • 3100 BCE - 300 BCE</p>
                        </div>
                    </div>
                    <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
                        A sophisticated sexagesimal (base-60) system using cuneiform symbols. One of the earliest positional notation systems
                        and the foundation for our modern measurements of time and angles.
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
                                        { symbol: '𓐕', name: 'Nail/Wedge', value: 1, desc: 'Vertical wedge for one unit' },
                                        { symbol: '𓌋', name: 'Corner/Angle', value: 10, desc: 'Horizontal wedge for ten units' },
                                        { symbol: '𓑊', name: 'Empty/Zero', value: 0, desc: 'Space or zero placeholder' },
                                    ].map((item) => (
                                        <div key={item.value} className="flex items-center justify-between p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl w-16 text-center text-black">{item.symbol}</span>
                                                <div>
                                                    <p className="font-bold text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                                </div>
                                            </div>
                                            <span className="text-2xl font-bold text-indigo-600">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">System Characteristics</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-blue-900 mb-2">Base System</h4>
                                        <p className="text-blue-800">Sexagesimal (Base-60)</p>
                                    </div>
                                    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-green-900 mb-2">Notation Type</h4>
                                        <p className="text-green-800">Positional with wedge symbols</p>
                                    </div>
                                    <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-purple-900 mb-2">Zero Representation</h4>
                                        <p className="text-purple-800">Space or empty position (incomplete)</p>
                                    </div>
                                    <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-amber-900 mb-2">Orientation</h4>
                                        <p className="text-amber-800">Horizontal arrangement with position separators</p>
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
                            {/* Wedge Composition */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: Wedge Composition</h3>
                                <p className="text-cyan-800 mb-4">
                                    Numbers 1-59 are constructed using combinations of wedges: vertical wedges (𓐕 = 1) and horizontal wedges (𓌋 = 10):
                                </p>
                                <div className="grid md:grid-cols-3 gap-3">
                                    {[
                                        { num: 1, symbol: '𓐕', desc: 'One' },
                                        { num: 5, symbol: '𓐕𓐕𓐕𓐕𓐕', desc: 'Five' },
                                        { num: 10, symbol: '𓌋', desc: 'Ten' },
                                        { num: 15, symbol: '𓌋 𓐕𓐕𓐕𓐕𓐕', desc: 'Fifteen' },
                                        { num: 30, symbol: '𓌋𓌋𓌋', desc: 'Thirty' },
                                        { num: 59, symbol: '𓌋𓌋𓌋𓌋𓌋 𓐕𓐕𓐕𓐕𓐕𓐕𓐕𓐕𓐕', desc: 'Fifty-nine' },
                                    ].map((item) => (
                                        <div key={item.num} className="bg-white rounded-lg p-3 text-center border border-cyan-300">
                                            <p className="text-xs text-gray-600 mb-1">{item.num}</p>
                                            <p className="text-lg font-bold text-gray-800 min-h-12 flex items-center justify-center">{item.symbol}</p>
                                            <p className="text-xs text-cyan-700">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Positional System */}
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Rule 2: Positional System (Base-60)</h3>
                                <p className="text-green-800 mb-4">
                                    Unlike additive systems, Babylonian uses positional notation. Each position represents a power of 60:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-mono font-bold text-green-700 mb-1">60² position: × 3,600</p>
                                        <p className="text-sm text-green-600">Highest common position (rarely used in practice)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-teal-500">
                                        <p className="font-mono font-bold text-teal-700 mb-1">60¹ position: × 60</p>
                                        <p className="text-sm text-teal-600">Middle position for sexagesimal place</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                                        <p className="font-mono font-bold text-blue-700 mb-1">60⁰ position: × 1</p>
                                        <p className="text-sm text-blue-600">Ones place (0-59)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Separation */}
                            <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200">
                                <h3 className="text-xl font-bold text-teal-900 mb-4">Rule 3: Position Separation</h3>
                                <p className="text-teal-800 mb-4">
                                    Positions are separated by space or marks. This distinguishes between groups of wedges:
                                </p>
                                <div className="bg-white rounded-lg p-6 border-2 border-teal-300 space-y-4">
                                    <div className="space-y-2">
                                        <p className="font-bold text-gray-900">Example: 65</p>
                                        <p className="text-3xl font-bold text-teal-600">𓐕 | 𓐕</p>
                                        <p className="text-sm text-teal-700">Read as: 1 (in 60s place) and 5 (in ones place) = 60 + 5 = 65</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="font-bold text-gray-900">Example: 125</p>
                                        <p className="text-3xl font-bold text-teal-600">𓌋 | 𓐕𓐕𓐕𓐕𓐕</p>
                                        <p className="text-sm text-teal-700">Read as: 10 (in 60s place) and 5 (in ones place) = 600 + 5... Wait: 10×60 + 5 = 605. Let me recalculate: 125 = 2×60 + 5, so: 𓌋 𓐕 | 𓐕𓐕𓐕𓐕𓐕</p>
                                    </div>
                                </div>
                            </div>

                            {/* Zero Challenges */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-purple-900 mb-4">Rule 4: Zero Challenge (Incomplete)</h3>
                                <p className="text-purple-800 mb-4">
                                    Babylonians lacked a true zero symbol. Empty spaces indicated missing positions, creating ambiguity:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">𓌋</p>
                                        <p className="text-sm text-purple-700">Could mean: 10 OR 10×60 = 600 (ambiguous without context)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">𓌋 | 𓐕𓐕</p>
                                        <p className="text-sm text-purple-700">Clearly means: 10×60 + 2 = 602 (position separator helps)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">𓌋 | 𓑊 | 𓐕𓐕</p>
                                        <p className="text-sm text-purple-700">With later refinement: 10×3600 + 0×60 + 2 = 36002</p>
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
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Decimal Number (0-3599)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="3599"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        max="3599"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(3599, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-blue-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Babylonian</p>
                                        <div className="space-y-2">
                                            {babylonianRepresentation.map((level, idx) => (
                                                <p key={idx} className="text-2xl font-bold text-blue-600 min-h-12 flex items-center justify-center">
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
                                <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 max-h-96 overflow-y-auto">
                                    {babylonianBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {babylonianBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="font-bold text-gray-900">Position {item.position} (60^{item.position})</p>
                                                            <p className="text-sm text-gray-600">Value: {item.digit}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-blue-600 mb-1">{item.symbol}</p>
                                                            <p className="font-bold text-blue-600 text-lg">{item.value}</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-xs text-gray-600">
                                                        {item.tens > 0 ? `${item.tens} ten(s) × 10 = ${item.tens * 10}` : ''}{item.tens > 0 && item.ones > 0 ? ' + ' : ''}{item.ones > 0 ? `${item.ones} one(s) × 1 = ${item.ones}` : ''}
                                                    </p>
                                                </div>
                                            ))}
                                            <div className="bg-blue-100 rounded-lg p-4 border-2 border-blue-300 mt-4">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-3xl font-bold text-blue-600">{interactiveNumber}</p>
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
                                        { position: 3, power: 3, value: 216000, name: 'Sar' },
                                        { position: 2, power: 2, value: 3600, name: 'Soss' },
                                        { position: 1, power: 1, value: 60, name: 'Ner' },
                                        { position: 0, power: 0, value: 1, name: 'Unit' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-300">
                                            <p className="text-xs font-bold text-gray-600 mb-2">{item.name}</p>
                                            <p className="text-lg font-bold text-gray-900 mb-2">60^{item.power}</p>
                                            <p className="font-bold text-blue-600 text-xl">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example: Building 425 */}
                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 425</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 1: Divide by 60</p>
                                                <p className="font-mono text-gray-800">425 ÷ 60 = 7 remainder 5</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600">7 | 5</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 2: Convert 7 (60s place)</p>
                                                <p className="font-mono text-gray-800">7 = 𓌋 𓐕𓐕𓐕𓐕𓐕𓐕𓐕</p>
                                            </div>
                                            <p className="text-2xl">𓌋 𓐕𓐕𓐕𓐕𓐕𓐕𓐕</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 3: Convert 5 (ones place)</p>
                                                <p className="font-mono text-gray-800">5 = 𓐕𓐕𓐕𓐕𓐕</p>
                                            </div>
                                            <p className="text-2xl">𓐕𓐕𓐕𓐕𓐕</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Final Babylonian Representation (separated by |):</p>
                                        <div className="text-center space-y-1">
                                            <p className="text-2xl font-bold text-indigo-600">𓌋 𓐕𓐕𓐕𓐕𓐕𓐕𓐕</p>
                                            <p className="text-lg text-gray-600">|</p>
                                            <p className="text-2xl font-bold text-indigo-600">𓐕𓐕𓐕𓐕𓐕</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Why Base-60 */}
                            <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-lg p-6 border-2 border-amber-200">
                                <h3 className="text-lg font-bold text-amber-900 mb-4">Why Base-60?</h3>
                                <div className="space-y-2 text-amber-800">
                                    <p><strong>Highly Divisible:</strong> 60 has many factors (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60)</p>
                                    <p><strong>Practical for Astronomy:</strong> Perfect for tracking celestial cycles</p>
                                    <p><strong>Mathematical Convenience:</strong> Easy for fractions and complex calculations</p>
                                    <p><strong>Legacy Today:</strong> Still used in time (60 seconds/minutes) and angles (360 degrees)</p>
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
                                        <p className="font-bold text-blue-900">Early Development (3100-2500 BCE)</p>
                                        <p className="text-blue-800 text-sm">Sumerians develop earliest recording system using clay tablets</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-green-900">Akkadian Period (2500-2200 BCE)</p>
                                        <p className="text-green-800 text-sm">Cuneiform refined, sexagesimal system becomes standardized</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                        <p className="font-bold text-purple-900">Babylonian Era (1900-1600 BCE)</p>
                                        <p className="text-purple-800 text-sm">Peak sophistication, used for mathematics, astronomy, commerce</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="font-bold text-amber-900">Historical Importance</p>
                                        <p className="text-amber-800 text-sm">One of first true positional notation systems in history</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Applications & Legacy</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '⏰', use: 'Time Measurement', desc: '60 seconds/minutes - direct inheritance' },
                                        { icon: '📐', use: 'Angle Measurement', desc: '360 degrees = 6 × 60 (Babylonian legacy)' },
                                        { icon: '🌙', use: 'Astronomical Calculations', desc: 'Tracked planetary movements precisely' },
                                        { icon: '🏗️', use: 'Architecture', desc: 'Used for land surveying and construction' },
                                        { icon: '💰', use: 'Commerce & Banking', desc: 'Record keeping for trade and taxes' },
                                        { icon: '📚', use: 'Mathematical Texts', desc: 'Sophisticated algebra and geometry problems' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 flex items-start gap-3">
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

                        <div className="mt-8 bg-linear-to-r from-indigo-100 to-blue-100 rounded-xl p-6 border-2 border-indigo-300">
                            <h3 className="font-bold text-indigo-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-indigo-800 leading-relaxed">
                                The Babylonian sexagesimal system represents a watershed moment in mathematical history. Unlike earlier additive systems,
                                it employed true positional notation—a revolutionary concept that would later inspire the Hindu-Arabic decimal system.
                                Though limited by the absence of a zero symbol, Babylonian mathematics achieved remarkable sophistication, enabling
                                astronomers to predict celestial events with astonishing accuracy. Their legacy persists in our measurement of time,
                                angles, and coordinates—a testament to the power and elegance of base-60 mathematics.
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
                                { decimal: 0, babylonian: '𓑊', name: 'Zero/Empty' },
                                { decimal: 1, babylonian: '𓐕', name: 'One' },
                                { decimal: 10, babylonian: '𓌋', name: 'Ten' },
                                { decimal: 25, babylonian: '𓌋𓌋 𓐕𓐕𓐕𓐕𓐕', name: 'Twenty-five' },
                                { decimal: 60, babylonian: '𓐕 | 𓑊', name: 'Sixty (1×60)' },
                                { decimal: 90, babylonian: '𓐕 | 𓌋𓌋𓌋', name: 'Ninety' },
                                { decimal: 125, babylonian: '𓌋 𓐕 | 𓐕𓐕𓐕𓐕𓐕', name: 'One-Twenty-five' },
                                { decimal: 360, babylonian: '𓌋𓌋𓌋𓌋𓌋𓌋 | 𓑊', name: 'Three-Sixty' },
                                { decimal: 600, babylonian: '𓐕𓐕𓐕𓐕𓐕𓐕𓐕𓐕𓐕𓐕 | 𓑊', name: 'Six Hundred' },
                                { decimal: 1200, babylonian: '𓌋𓌋 | 𓑊', name: 'Twelve Hundred' },
                                { decimal: 3000, babylonian: '𓐕𓐕𓐕𓐕𓐕𓐕 | 𓑊 | 𓑊', name: 'Three Thousand' },
                                { decimal: 3599, babylonian: '𓐕𓐕𓐕𓐕𓐕𓐕 | 𓌋𓌋𓌋𓌋𓌋 | 𓌋𓌋𓌋𓌋𓌋𓌋𓌋𓌋𓌋', name: 'Max 2-digit' },
                            ].map((item) => (
                                <div
                                    key={item.decimal}
                                    className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">{item.name}</p>
                                        <p className="text-4xl font-bold text-blue-600 mb-4">{item.decimal}</p>
                                        <div className="bg-white rounded-lg p-4 border border-blue-300">
                                            <p className="text-2xl font-bold text-gray-800 break-all">{item.babylonian}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Remember the Symbols</h3>
                                <p className="mb-4 text-blue-100">
                                    Two basic wedge types construct all numbers 1-59:
                                </p>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-3 text-sm">
                                    <p>𓐕 Vertical wedge = 1 (repeat up to 9 times)</p>
                                    <p>𓌋 Horizontal wedge = 10 (repeat up to 5 times)</p>
                                    <p>Maximum combination: 𓌋𓌋𓌋𓌋𓌋 𓐕𓐕𓐕𓐕𓐕𓐕𓐕𓐕𓐕 = 59</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Key Differences</h3>
                                <ul className="space-y-2 text-blue-100">
                                    <li>✓ Base-60 (not base-10)</li>
                                    <li>✓ Positional notation with separators</li>
                                    <li>✓ No true zero symbol (major limitation)</li>
                                    <li>✓ Used for time and angles today</li>
                                    <li>✓ Maximum clear range: 0-3599</li>
                                    <li>✓ Practice dividing by 60!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BabylonianNumeralPage;
