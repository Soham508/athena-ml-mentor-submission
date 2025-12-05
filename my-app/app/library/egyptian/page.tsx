/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { useState } from 'react';

const EgyptianNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(3456);

    const decimalToEgyptian = (num: number): string[] => {
        if (num === 0) return ['𓑊'];

        const symbols = [
            { value: 1000000, symbol: '𓁶', name: 'Amphora' },
            { value: 100000, symbol: '𓆿', name: 'Tadpole' },
            { value: 10000, symbol: '𓆼', name: 'Lotus Flower' },
            { value: 1000, symbol: '𓁨', name: 'Scarab Beetle' },
            { value: 100, symbol: '𓍢', name: 'Coiled Rope' },
            { value: 10, symbol: '𓎆', name: 'Heel Bone' },
            { value: 1, symbol: '𓏺', name: 'Stroke' }
        ];

        const result = [];
        let remaining = num;

        symbols.forEach(({ value, symbol }) => {
            const count = Math.floor(remaining / value);
            if (count > 0) {
                result.push(symbol.repeat(count));
                remaining -= count * value;
            }
        });

        return result;
    };

    const breakdownEgyptian = (num: number) => {
        const breakdown = [];

        const symbols = [
            { value: 1000000, symbol: '𓁶', name: 'Amphora (1,000,000)' },
            { value: 100000, symbol: '𓆿', name: 'Tadpole (100,000)' },
            { value: 10000, symbol: '𓆼', name: 'Lotus Flower (10,000)' },
            { value: 1000, symbol: '𓁨', name: 'Scarab Beetle (1,000)' },
            { value: 100, symbol: '𓍢', name: 'Coiled Rope (100)' },
            { value: 10, symbol: '𓎆', name: 'Heel Bone (10)' },
            { value: 1, symbol: '𓏺', name: 'Stroke (1)' }
        ];

        let remaining = num;

        symbols.forEach(({ value, symbol, name }) => {
            const count = Math.floor(remaining / value);
            if (count > 0) {
                breakdown.push({
                    value: count * value,
                    symbol: symbol.repeat(count),
                    name: name,
                    count: count,
                    explanation: `${count} × ${value} = ${count * value}`
                });
                remaining -= count * value;
            }
        });

        if (breakdown.length === 0) {
            breakdown.push({
                value: 0,
                symbol: '𓑊',
                name: 'Zero',
                count: 0,
                explanation: 'Zero (no symbols)'
            });
        }

        return breakdown;
    };

    const egyptianRepresentation = decimalToEgyptian(interactiveNumber);
    const egyptianBreakdown = breakdownEgyptian(interactiveNumber);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-amber-50 to-yellow-50">
            {/* Header */}
            <div className="bg-linear-to-r from-amber-600 via-yellow-600 to-orange-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-amber-100 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">𓀀</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Egyptian Hieroglyphic Numerals</h1>
                            <p className="text-xl text-amber-100">Ancient Egypt • 3000 BCE - 400 CE</p>
                        </div>
                    </div>
                    <p className="text-xl text-amber-100 max-w-3xl leading-relaxed">
                        A sophisticated decimal system using hieroglyphic symbols representing powers of 10.
                        Used for record-keeping, monumental inscriptions, and mathematical calculations in ancient Egypt.
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Hieroglyphic Symbols</h3>
                                <div className="space-y-3">
                                    {[
                                        { symbol: '𓏺', value: 1, name: 'Stroke', meaning: 'Single line (one unit)' },
                                        { symbol: '𓎆', value: 10, name: 'Heel Bone', meaning: 'Curved line like ankle' },
                                        { symbol: '𓍢', value: 100, name: 'Coiled Rope', meaning: 'Spiral rope symbol' },
                                        { symbol: '𓁨', value: 1000, name: 'Lotus Flower', meaning: 'Sacred lotus plant' },
                                        { symbol: '𓆼', value: 10000, name: 'Lotus Bud', meaning: 'Pointing finger gesture' },
                                        { symbol: '𓆿', value: 100000, name: 'Tadpole', meaning: 'Wiggling tadpole' },
                                        { symbol: '𓁶', value: 1000000, name: 'Amphora/Frog', meaning: 'Storage jar symbol' },
                                    ].map((item) => (
                                        <div key={item.value} className="flex items-center justify-between p-4 bg-linear-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl w-16 text-center text-black">{item.symbol}</span>
                                                <div>
                                                    <p className="font-bold text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-600">{item.meaning}</p>
                                                </div>
                                            </div>
                                            <span className="text-2xl font-bold text-amber-600">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">System Characteristics</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-blue-900 mb-2">Base System</h4>
                                        <p className="text-blue-800">Decimal (Base-10) with powers of 10</p>
                                    </div>
                                    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-green-900 mb-2">Notation Type</h4>
                                        <p className="text-green-800">Additive (sum of symbol values)</p>
                                    </div>
                                    <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-purple-900 mb-2">Representation</h4>
                                        <p className="text-purple-800">Hieroglyphic symbols on papyrus and stone</p>
                                    </div>
                                    <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-amber-900 mb-2">Zero Representation</h4>
                                        <p className="text-amber-800">No symbol for zero (implicit absence)</p>
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
                            {/* Additive Principle */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: Additive Principle</h3>
                                <p className="text-cyan-800 mb-4">
                                    Numbers are formed by repeating symbols and adding their values. No subtraction like Roman numerals.
                                </p>
                                <div className="bg-white rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">𓏺𓏺𓏺 (3 strokes)</span>
                                        <span className="text-cyan-600">=</span>
                                        <span className="font-bold text-cyan-600">3</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">𓎆𓎆𓏺𓏺𓏺 (2 heel bones, 3 strokes)</span>
                                        <span className="text-cyan-600">=</span>
                                        <span className="font-bold text-cyan-600">23</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">𓁨𓍢𓍢𓎆𓏺 (lotus, 2 ropes, heel, stroke)</span>
                                        <span className="text-cyan-600">=</span>
                                        <span className="font-bold text-cyan-600">1221</span>
                                    </div>
                                </div>
                            </div>

                            {/* Repetition Pattern */}
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Rule 2: Symbol Repetition</h3>
                                <p className="text-green-800 mb-4">
                                    Symbols can be repeated up to 9 times before replacing with the next higher value:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900 mb-2">1-9 Strokes</p>
                                        <p className="text-sm text-green-800">𓏺 through 𓏺𓏺𓏺𓏺𓏺𓏺𓏺𓏺𓏺</p>
                                        <p className="text-xs text-gray-600 mt-1">Never more than 9 of same symbol</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900 mb-2">10 becomes</p>
                                        <p className="text-sm text-green-800">𓎆 (one heel bone)</p>
                                        <p className="text-xs text-gray-600 mt-1">Step up to next symbol</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decimal Structure */}
                            <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                                <h3 className="text-xl font-bold text-orange-900 mb-4">Rule 3: Decimal Structure</h3>
                                <p className="text-orange-800 mb-4">
                                    Each symbol represents a power of 10, creating a strictly hierarchical system:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900">10⁰ = 1 (𓏺 Stroke)</p>
                                        <p className="text-sm text-orange-700">Ones place</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900">10¹ = 10 (𓎆 Heel Bone)</p>
                                        <p className="text-sm text-orange-700">Tens place</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900">10² = 100 (𓍢 Coiled Rope)</p>
                                        <p className="text-sm text-orange-700">Hundreds place</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900">And so on... up to 10⁶ = 1,000,000</p>
                                        <p className="text-sm text-orange-700">Millions place</p>
                                    </div>
                                </div>
                            </div>

                            {/* Arrangement */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-purple-900 mb-4">Rule 4: Arrangement & Organization</h3>
                                <p className="text-purple-800 mb-4">
                                    Symbols are typically arranged in groups from largest to smallest, often in columns:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">Largest to Smallest</p>
                                        <p className="text-sm text-purple-700">Organize by descending value</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">Visual Balance</p>
                                        <p className="text-sm text-purple-700">Often arranged symmetrically for aesthetics</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">Monumental Context</p>
                                        <p className="text-sm text-purple-700">Sized for visibility on temples and tombs</p>
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
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Decimal Number (0-9,999,999)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="9999999"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        max="9999999"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(9999999, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-amber-300 rounded-lg focus:border-amber-600 focus:ring-2 focus:ring-amber-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Egyptian</p>
                                        <div className="text-2xl font-bold text-amber-600 space-y-1">
                                            {egyptianRepresentation.map((level, idx) => (
                                                <p key={idx} className="break-all">{level}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Component Breakdown</label>
                                <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border-2 border-amber-200 max-h-96 overflow-y-auto">
                                    {egyptianBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {egyptianBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-amber-500">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="font-bold text-gray-900">{item.name}</p>
                                                            <p className="text-sm text-gray-600">{item.explanation}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-amber-600 mb-1">{item.symbol}</p>
                                                            <p className="font-bold text-amber-600 text-lg">{item.value}</p>
                                                        </div>
                                                    </div>
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
                            {/* Power of 10 Structure */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Powers of 10 Hierarchy</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { power: 0, value: 1, symbol: '𓏺', name: 'Stroke' },
                                        { power: 1, value: 10, symbol: '𓎆', name: 'Heel Bone' },
                                        { power: 2, value: 100, symbol: '𓍢', name: 'Coiled Rope' },
                                        { power: 3, value: 1000, symbol: '𓁨', name: 'Lotus Flower' },
                                        { power: 4, value: 10000, symbol: '𓆼', name: 'Lotus Bud' },
                                        { power: 5, value: 100000, symbol: '𓆿', name: 'Tadpole' },
                                        { power: 6, value: 1000000, symbol: '𓁶', name: 'Amphora' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-lg p-4 border-2 border-amber-300">
                                            <p className="text-xs font-bold text-gray-600 mb-1">{item.name}</p>
                                            <p className="text-3xl mb-2">{item.symbol}</p>
                                            <p className="text-sm font-bold text-amber-600">10^{item.power}</p>
                                            <p className="text-lg font-bold text-gray-900">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example: Building 3456 */}
                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 3,456</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 1: Thousands place</p>
                                                <p className="font-mono text-gray-800">3 × 1000 = 𓁨𓁨𓁨</p>
                                            </div>
                                            <p className="text-2xl">𓁨𓁨𓁨</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 2: Hundreds place</p>
                                                <p className="font-mono text-gray-800">4 × 100 = 𓍢𓍢𓍢𓍢</p>
                                            </div>
                                            <p className="text-2xl">𓍢𓍢𓍢𓍢</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 3: Tens place</p>
                                                <p className="font-mono text-gray-800">5 × 10 = 𓎆𓎆𓎆𓎆𓎆</p>
                                            </div>
                                            <p className="text-2xl">𓎆𓎆𓎆𓎆𓎆</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 4: Ones place</p>
                                                <p className="font-mono text-gray-800">6 × 1 = 𓏺𓏺𓏺𓏺𓏺𓏺</p>
                                            </div>
                                            <p className="text-2xl">𓏺𓏺𓏺𓏺𓏺𓏺</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Final Result:</p>
                                        <p className="text-2xl font-bold text-indigo-600">𓁨𓁨𓁨 𓍢𓍢𓍢𓍢 𓎆𓎆𓎆𓎆𓎆 𓏺𓏺𓏺𓏺𓏺𓏺</p>
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
                                        <p className="font-bold text-blue-900">Early Dynasty (3000-2000 BCE)</p>
                                        <p className="text-blue-800 text-sm">First hieroglyphic numerals appear in temple inscriptions</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-green-900">Old Kingdom (2686-2181 BCE)</p>
                                        <p className="text-green-800 text-sm">System becomes standardized for pyramid construction records</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                        <p className="font-bold text-purple-900">Middle Kingdom (2055-1650 BCE)</p>
                                        <p className="text-purple-800 text-sm">Wide use in administrative and commercial documents</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="font-bold text-amber-900">Greco-Roman Period (332 BCE-400 CE)</p>
                                        <p className="text-amber-800 text-sm">Gradually replaced by Greek numerals, then Arabic system</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Applications & Legacy</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '🏺', use: 'Temple Records', desc: 'Recording donations and inventory' },
                                        { icon: '📋', use: 'Administrative Texts', desc: 'Taxation and census data' },
                                        { icon: '🏗️', use: 'Construction Projects', desc: 'Pyramid and monument measurements' },
                                        { icon: '⚖️', use: 'Commerce & Trade', desc: 'Recording goods and transactions' },
                                        { icon: '📐', use: 'Mathematical Calculations', desc: 'Geometry and land surveying' },
                                        { icon: '🗿', use: 'Monumental Inscriptions', desc: 'Carved on temples and tombs' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border border-amber-200 flex items-start gap-3">
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

                        <div className="mt-8 bg-linear-to-r from-yellow-100 to-amber-100 rounded-xl p-6 border-2 border-yellow-300">
                            <h3 className="font-bold text-amber-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-amber-800 leading-relaxed">
                                Egyptian numerals represent humanity's first systematic decimal notation, revealing the mathematical sophistication
                                of one of antiquity's greatest civilizations. Their elegant hierarchical structure—where each symbol represents a power
                                of 10—demonstrates clear logical thinking about quantity and magnitude. The use of hieroglyphic symbols embedded numbers
                                within Egypt's larger writing system, making them inseparable from religious and administrative culture. For over 3,000
                                years, this system sustained the empire's vast construction projects, trade networks, and bureaucratic apparatus. Their
                                legacy persists in our modern decimal system and in the hieroglyphics preserved on monuments that continue to astound
                                visitors to Egypt today.
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
                                { decimal: 1, egyptian: '𓏺' },
                                { decimal: 5, egyptian: '𓏺𓏺𓏺𓏺𓏺' },
                                { decimal: 10, egyptian: '𓎆' },
                                { decimal: 23, egyptian: '𓎆𓎆𓏺𓏺𓏺' },
                                { decimal: 50, egyptian: '𓎆𓎆𓎆𓎆𓎆' },
                                { decimal: 99, egyptian: '𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓏺𓏺𓏺𓏺𓏺𓏺𓏺𓏺𓏺' },
                                { decimal: 100, egyptian: '𓍢' },
                                { decimal: 256, egyptian: '𓍢𓍢𓍢𓍢𓍢𓎆𓎆𓎆𓎆𓎆𓎆𓏺𓏺𓏺𓏺𓏺𓏺' },
                                { decimal: 888, egyptian: '𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓍢𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓏺𓏺𓏺𓏺𓏺𓏺𓏺𓏺𓏺' },
                                { decimal: 1000, egyptian: '𓁨' },
                                { decimal: 3000, egyptian: '𓁨𓁨𓁨' },
                                { decimal: 123456, egyptian: '𓁨𓆼𓍢𓍢𓍢𓎆𓎆𓎆𓎆𓎆𓎆𓎆𓏺𓏺𓏺𓏺𓏺𓏺' },
                            ].map((item) => (
                                <div
                                    key={item.decimal}
                                    className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-lg p-6 border-2 border-amber-200 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">Decimal</p>
                                        <p className="text-4xl font-bold text-amber-600 mb-4">{item.decimal}</p>
                                        <p className="text-gray-600 text-sm mb-2">Egyptian</p>
                                        <p className="text-xl font-bold text-gray-800 break-all">{item.egyptian}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-amber-600 to-yellow-600 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Remember the Symbols</h3>
                                <p className="mb-4 text-amber-100">
                                    Seven symbols represent powers of 10:
                                </p>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-2 text-sm">
                                    <p>𓏺 = 1 (Stroke) - basic unit</p>
                                    <p>𓎆 = 10 (Heel Bone) - ten</p>
                                    <p>𓍢 = 100 (Coiled Rope) - hundred</p>
                                    <p>𓁨 = 1,000 (Lotus) - thousand</p>
                                    <p>𓆼 = 10,000 (Lotus Bud) - ten thousand</p>
                                    <p>𓆿 = 100,000 (Tadpole) - hundred thousand</p>
                                    <p>𓁶 = 1,000,000 (Amphora) - million</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Construction Strategy</h3>
                                <ul className="space-y-2 text-amber-100">
                                    <li>✓ Break numbers into place values (thousands, hundreds, tens, ones)</li>
                                    <li>✓ Use appropriate symbol for each place value</li>
                                    <li>✓ Repeat each symbol as needed (1-9 times)</li>
                                    <li>✓ Arrange largest to smallest, left to right</li>
                                    <li>✓ Never exceed 9 of the same symbol</li>
                                    <li>✓ Never use subtraction (only addition)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default EgyptianNumeralPage;
