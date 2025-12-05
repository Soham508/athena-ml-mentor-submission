'use client';

import Link from 'next/link';
import { useState } from 'react';

const BinaryNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(255);

    const decimalToBinary = (num: number): string => {
        if (num === 0) return '0';
        return num.toString(2);
    };

    const breakdownBinary = (num: number) => {
        const breakdown = [];
        const binary = decimalToBinary(num);

        if (num === 0) {
            breakdown.push({
                position: 0,
                powerOf2: 1,
                digit: 0,
                value: 0,
                bitPosition: 0,
                explanation: '0 × 2^0 = 0'
            });
            return breakdown;
        }

        // Process each bit from right to left
        for (let i = binary.length - 1; i >= 0; i--) {
            const bit = parseInt(binary[i]);
            const position = binary.length - 1 - i;
            const powerOf2 = Math.pow(2, position);
            const value = bit * powerOf2;

            breakdown.unshift({
                position: position,
                powerOf2: powerOf2,
                digit: bit,
                value: value,
                bitPosition: binary.length - 1 - i,
                explanation: `${bit} × 2^${position} = ${value}`
            });
        }

        return breakdown;
    };

    const binaryNumber = decimalToBinary(interactiveNumber);
    const binaryBreakdown = breakdownBinary(interactiveNumber);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-slate-100">
            {/* Header */}
            <div className="bg-linear-to-r from-gray-700 via-slate-700 to-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">💻</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Binary Numerals</h1>
                            <p className="text-xl text-gray-300">Modern Computing • 1600s - Present</p>
                        </div>
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
                        A fundamental base-2 numeral system using only digits 0 and 1.
                        The language of all modern computers and the foundation of digital technology.
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Binary Digits</h3>
                                <div className="space-y-3">
                                    {[
                                        { digit: 0, name: 'Zero', meaning: 'Off/False/No signal' },
                                        { digit: 1, name: 'One', meaning: 'On/True/Signal present' },
                                    ].map((item) => (
                                        <div key={item.digit} className="flex items-center justify-between p-4 bg-linear-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-300">
                                            <div className="flex items-center gap-4">
                                                <span className="text-4xl font-bold text-gray-700 w-16 text-center">{item.digit}</span>
                                                <div>
                                                    <p className="font-bold text-gray-900">{item.name}</p>
                                                    <p className="text-sm text-gray-600">{item.meaning}</p>
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
                                        <p className="text-blue-800">Binary (Base-2)</p>
                                    </div>
                                    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-green-900 mb-2">Notation Type</h4>
                                        <p className="text-green-800">Positional with two digits (0, 1)</p>
                                    </div>
                                    <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-purple-900 mb-2">Applications</h4>
                                        <p className="text-purple-800">Digital electronics, computing, data storage</p>
                                    </div>
                                    <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-amber-900 mb-2">Logical Equivalent</h4>
                                        <p className="text-amber-800">Boolean algebra (true/false, on/off)</p>
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
                            {/* Positional Notation */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: Positional Powers of 2</h3>
                                <p className="text-cyan-800 mb-4">
                                    Each position represents a power of 2. Reading right to left: 2⁰, 2¹, 2², etc.
                                </p>
                                <div className="bg-white rounded-lg p-4 space-y-3">
                                    <div className="flex items-center justify-between font-mono">
                                        <span className="text-sm text-gray-600">Position (right to left)</span>
                                        <span className="text-sm text-gray-600">Power</span>
                                        <span className="text-sm text-gray-600">Value</span>
                                    </div>
                                    <hr className="border-gray-300" />
                                    {[0, 1, 2, 3, 4, 5, 6, 7].map((pos) => (
                                        <div key={pos} className="flex items-center justify-between font-mono text-sm">
                                            <span className="text-gray-800">Bit {pos}</span>
                                            <span className="text-cyan-600">2^{pos}</span>
                                            <span className="font-bold text-cyan-600">{Math.pow(2, pos)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Addition and Combination */}
                            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                                <h3 className="text-xl font-bold text-green-900 mb-4">Rule 2: Additive Combination</h3>
                                <p className="text-green-800 mb-4">
                                    Numbers are sums of powers of 2. Only digits are 0 (absence) or 1 (presence):
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">5 = 101₂</p>
                                        <p className="text-sm text-green-700">1×2² + 0×2¹ + 1×2⁰ = 4 + 0 + 1 = 5</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">11 = 1011₂</p>
                                        <p className="text-sm text-green-700">1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
                                        <p className="font-bold text-gray-900">255 = 11111111₂</p>
                                        <p className="text-sm text-green-700">All bits on = 128+64+32+16+8+4+2+1 = 255</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bit Significance */}
                            <div className="bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-6 border-2 border-orange-200">
                                <h3 className="text-xl font-bold text-orange-900 mb-4">Rule 3: Bit Significance</h3>
                                <p className="text-orange-800 mb-4">
                                    Bits have names based on their position and weight:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900 mb-2">LSB (Least Significant Bit)</p>
                                        <p className="text-sm text-orange-700">Rightmost bit, represents 2⁰ = 1</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900 mb-2">MSB (Most Significant Bit)</p>
                                        <p className="text-sm text-orange-700">Leftmost bit, highest power of 2</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900 mb-2">Nibble</p>
                                        <p className="text-sm text-orange-700">4 bits = 0-15 range</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
                                        <p className="font-bold text-gray-900 mb-2">Byte</p>
                                        <p className="text-sm text-orange-700">8 bits = 0-255 range</p>
                                    </div>
                                </div>
                            </div>

                            {/* Binary Arithmetic */}
                            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-xl font-bold text-purple-900 mb-4">Rule 4: Binary Arithmetic</h3>
                                <p className="text-purple-800 mb-4">
                                    Arithmetic follows simple rules with carry-over:
                                </p>
                                <div className="space-y-2">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">0 + 0 = 0 (no carry)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">0 + 1 = 1 (no carry)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">1 + 0 = 1 (no carry)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-purple-500">
                                        <p className="font-bold text-gray-900">1 + 1 = 10 (result 0, carry 1)</p>
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
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Decimal Number (0-1024)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1024"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-700"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        max="1024"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(1024, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-gray-400 rounded-lg focus:border-gray-700 focus:ring-2 focus:ring-gray-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Binary</p>
                                        <p className="text-2xl font-bold text-gray-700 font-mono">{binaryNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Bit Position Breakdown</label>
                                <div className="bg-linear-to-br from-gray-50 to-slate-50 rounded-xl p-6 border-2 border-gray-300 max-h-96 overflow-y-auto">
                                    {binaryBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {binaryBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-3 border-l-4 border-gray-600">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <div>
                                                            <p className="font-bold text-gray-900 font-mono">Bit {item.position}: {item.digit}</p>
                                                            <p className="text-xs text-gray-600">{item.explanation}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-gray-700 text-lg">{item.value}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="bg-gray-200 rounded-lg p-3 border-2 border-gray-400 mt-3">
                                                <p className="text-sm text-gray-600">Total</p>
                                                <p className="text-3xl font-bold text-gray-800">{interactiveNumber}</p>
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
                            {/* Powers of 2 */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Powers of 2 Hierarchy</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { power: 0, value: 1, bits: '1' },
                                        { power: 1, value: 2, bits: '10' },
                                        { power: 2, value: 4, bits: '100' },
                                        { power: 3, value: 8, bits: '1000' },
                                        { power: 4, value: 16, bits: '10000' },
                                        { power: 5, value: 32, bits: '100000' },
                                        { power: 6, value: 64, bits: '1000000' },
                                        { power: 7, value: 128, bits: '10000000' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-br from-gray-50 to-slate-50 rounded-lg p-4 border-2 border-gray-300">
                                            <p className="text-xs font-bold text-gray-600 mb-1">2^{item.power}</p>
                                            <p className="text-2xl font-bold text-gray-800 mb-2">{item.value}</p>
                                            <p className="text-sm font-mono text-gray-700">{item.bits}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Example: Building 170 */}
                            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 170 (10101010₂)</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 1: Identify powers of 2</p>
                                                <p className="font-mono text-gray-800">170 = 128 + 42</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600">128</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 2: Continue breaking down</p>
                                                <p className="font-mono text-gray-800">42 = 32 + 10</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600">+32</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 3: Continue</p>
                                                <p className="font-mono text-gray-800">10 = 8 + 2</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600">+8, +2</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Final Result:</p>
                                        <p className="text-2xl font-bold text-indigo-600 font-mono">10101010</p>
                                        <p className="text-xs text-indigo-800 mt-1">128 + 32 + 8 + 2 = 170</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bit Pattern */}
                            <div className="bg-linear-to-r from-cyan-50 to-blue-50 rounded-lg p-6 border-2 border-cyan-200">
                                <h3 className="text-lg font-bold text-cyan-900 mb-4">Bit Position Reference</h3>
                                <div className="bg-white rounded-lg p-4 font-mono">
                                    <div className="grid grid-cols-8 gap-1 mb-2">
                                        {[7, 6, 5, 4, 3, 2, 1, 0].map((pos) => (
                                            <div key={pos} className="text-center text-xs font-bold text-gray-600">
                                                {pos}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-8 gap-1 mb-2">
                                        {[7, 6, 5, 4, 3, 2, 1, 0].map((pos) => (
                                            <div key={pos} className="text-center text-sm font-bold text-gray-700">
                                                {Math.pow(2, pos)}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">Position 0 = LSB (rightmost), Position 7 = MSB (leftmost)</p>
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
                                        <p className="font-bold text-blue-900">Ancient Concepts (1000s)</p>
                                        <p className="text-blue-800 text-sm">I Ching and other ancient texts used binary-like concepts</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                                        <p className="font-bold text-green-900">Leibniz (1600s)</p>
                                        <p className="text-green-800 text-sm">Formal description of binary system; saw philosophical significance</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
                                        <p className="font-bold text-purple-900">Boolean Algebra (1800s)</p>
                                        <p className="text-purple-800 text-sm">George Boole connects binary to logical operations</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
                                        <p className="font-bold text-amber-900">Digital Computing (1900s-Present)</p>
                                        <p className="text-amber-800 text-sm">Foundation of all modern computers and digital technology</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Modern Applications</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '💻', use: 'Computer Systems', desc: 'All digital processors use binary' },
                                        { icon: '📱', use: 'Data Storage', desc: 'Hard drives, SSDs, memory devices' },
                                        { icon: '🌐', use: 'Networking', desc: 'IP addresses and data transmission' },
                                        { icon: '🎮', use: 'Graphics & Gaming', desc: 'Pixel representation and rendering' },
                                        { icon: '🔐', use: 'Cryptography', desc: 'Encryption and security protocols' },
                                        { icon: '🧠', use: 'AI & Machine Learning', desc: 'Neural networks and algorithms' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-300 flex items-start gap-3">
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

                        <div className="mt-8 bg-linear-to-r from-gray-100 to-slate-100 rounded-xl p-6 border-2 border-gray-400">
                            <h3 className="font-bold text-gray-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-gray-800 leading-relaxed">
                                Binary represents humanity's most successful numerical abstraction—the reduction of all information to two states.
                                This simplicity enabled the creation of electronic computers, as switches could easily represent 0 and 1. Binary's
                                elegance lies in its universality: every digital device, from smartphones to supercomputers, ultimately operates in binary.
                                It bridges mathematics, logic, and physics, making it the language through which humans communicate with machines.
                                More than just a number system, binary is the digital foundation of modern civilization, enabling artificial intelligence,
                                global communication, and the information age itself.
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
                                { decimal: 0, binary: '0' },
                                { decimal: 1, binary: '1' },
                                { decimal: 2, binary: '10' },
                                { decimal: 3, binary: '11' },
                                { decimal: 4, binary: '100' },
                                { decimal: 5, binary: '101' },
                                { decimal: 7, binary: '111' },
                                { decimal: 8, binary: '1000' },
                                { decimal: 15, binary: '1111' },
                                { decimal: 16, binary: '10000' },
                                { decimal: 31, binary: '11111' },
                                { decimal: 32, binary: '100000' },
                                { decimal: 63, binary: '111111' },
                                { decimal: 64, binary: '1000000' },
                                { decimal: 127, binary: '1111111' },
                                { decimal: 128, binary: '10000000' },
                                { decimal: 255, binary: '11111111' },
                                { decimal: 256, binary: '100000000' },
                            ].map((item) => (
                                <div
                                    key={item.decimal}
                                    className="bg-linear-to-br from-gray-50 to-slate-50 rounded-lg p-6 border-2 border-gray-300 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">Decimal</p>
                                        <p className="text-4xl font-bold text-gray-800 mb-4">{item.decimal}</p>
                                        <p className="text-gray-600 text-sm mb-2">Binary</p>
                                        <p className="text-xl font-bold text-gray-800 font-mono">{item.binary}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-gray-700 to-slate-800 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Remember Powers of 2</h3>
                                <p className="mb-4 text-gray-200">
                                    Memorize these key powers for quick conversion:
                                </p>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-1 text-sm font-mono">
                                    <p>2^0 = 1 | 2^1 = 2 | 2^2 = 4 | 2^3 = 8</p>
                                    <p>2^4 = 16 | 2^5 = 32 | 2^6 = 64</p>
                                    <p>2^7 = 128 | 2^8 = 256 | 2^9 = 512</p>
                                    <p>2^10 = 1024 | 2^16 = 65536</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Key Patterns</h3>
                                <ul className="space-y-2 text-gray-200">
                                    <li>✓ Count from right (LSB = position 0)</li>
                                    <li>✓ Each position = previous × 2</li>
                                    <li>✓ All 1s = 2^n - 1 (e.g., 11111111 = 255)</li>
                                    <li>✓ Single 1 followed by 0s = power of 2</li>
                                    <li>✓ 8 bits = 1 byte (0-255)</li>
                                    <li>✓ Even numbers end in 0, odd in 1</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default BinaryNumeralPage;
