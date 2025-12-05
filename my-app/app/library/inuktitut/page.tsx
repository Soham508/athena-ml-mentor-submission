'use client';

import Link from 'next/link';
import { useState } from 'react';

const InuktitutNumeralPage = () => {
    const [interactiveNumber, setInteractiveNumber] = useState(47);

    const inuktitutNumbers: { [key: number]: string } = {
        0: 'ilitchutik',
        1: 'atausiq',
        2: 'marruuk',
        3: 'pingasut',
        4: 'sisamat',
        5: 'tallimat',
        6: 'pingasuutit',
        7: 'sitamautit',
        8: 'sitamaujunirutit',
        9: 'qulingutit',
        10: 'qulittut',
        11: 'qulittut atausirmik',
        12: 'qulittut marruumik',
        13: 'qulittut pingasumik',
        14: 'qulittut sisamaumik',
        15: 'qulittut tallimaumik',
        16: 'qulittut pingasuutimik',
        17: 'qulittut sitamautimik',
        18: 'qulittut sitamaujunirutimik',
        19: 'qulittut qulingutimik',
        20: 'inuujunik'
    };

    const decimalToInuktitut = (num: number): string => {
        if (num === 0) return 'ilitchutik';
        if (inuktitutNumbers[num]) return inuktitutNumbers[num];

        let result = '';

        if (num < 20) {
            if (num <= 10) {
                return inuktitutNumbers[num];
            } else {
                // 11-19: Use 10 + remainder
                const remainder = num - 10;
                const remainderWord = inuktitutNumbers[remainder] || decimalToInuktitut(remainder);
                result = `qulittut ${remainderWord.toLowerCase()}mik`;
            }
        } else if (num < 40) {
            // 20-39
            if (num === 20) return 'inuujunik';
            const remainder = num - 20;
            result = `inuujunik ${inuktitutNumbers[remainder] || decimalToInuktitut(remainder)}`;
        } else if (num < 60) {
            // 40-59
            const twenties = Math.floor(num / 20);
            const remainder = num % 20;
            result = `inuujunik marruumik`;
            if (remainder > 0) {
                result += ` ${inuktitutNumbers[remainder] || decimalToInuktitut(remainder)}`;
            }
        } else if (num < 100) {
            // 60-99
            const twenties = Math.floor(num / 20);
            const remainder = num % 20;
            result = `inuujunik pingasumik`;
            if (remainder > 0) {
                result += ` ${inuktitutNumbers[remainder] || decimalToInuktitut(remainder)}`;
            }
        } else if (num < 200) {
            // 100-199
            if (num === 100) return 'qqamugjuk';
            const remainder = num - 100;
            result = `qqamugjuk ${decimalToInuktitut(remainder)}`;
        }

        return result;
    };

    const breakdownInuktitut = (num: number) => {
        const breakdown = [];

        if (num === 0) {
            breakdown.push({ value: 0, inuktitut: 'ilitchutik', explanation: 'Zero' });
            return breakdown;
        }

        if (num < 20) {
            if (num <= 10) {
                breakdown.push({ value: num, inuktitut: inuktitutNumbers[num], explanation: `Base number: ${num}` });
            } else {
                const remainder = num - 10;
                breakdown.push({ value: 10, inuktitut: 'qulittut', explanation: 'Ten (base)' });
                breakdown.push({ value: remainder, inuktitut: inuktitutNumbers[remainder], explanation: `Plus ${remainder}` });
            }
        } else {
            // Find the base twenty
            const twenties = Math.floor(num / 20);
            const remainder = num % 20;

            if (twenties === 1) {
                breakdown.push({
                    value: 20,
                    inuktitut: 'inuujunik',
                    explanation: 'Twenty (1×20)'
                });
            } else {
                const twentyMultiplier = inuktitutNumbers[twenties] || twenties;
                breakdown.push({
                    value: twenties * 20,
                    inuktitut: `inuujunik ${twentyMultiplier}`,
                    explanation: `${twenties}×20`
                });
            }

            if (remainder > 0) {
                breakdown.push({
                    value: remainder,
                    inuktitut: inuktitutNumbers[remainder],
                    explanation: `Plus ${remainder}`
                });
            }
        }

        return breakdown;
    };

    const inuktitutNumber = decimalToInuktitut(interactiveNumber);
    const inuktitutBreakdown = breakdownInuktitut(interactiveNumber);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-50">
            {/* Header */}
            <div className="bg-linear-to-r from-cyan-600 via-blue-600 to-teal-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/library" className="inline-flex items-center text-cyan-100 hover:text-white mb-4 transition">
                        ← Back to Library
                    </Link>
                    <div className="flex items-center gap-6 mb-6">
                        <div className="text-6xl">❄️</div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2">Inuktitut Numerals</h1>
                            <p className="text-xl text-cyan-100">Arctic Canada • Ancient - Present</p>
                        </div>
                    </div>
                    <p className="text-xl text-cyan-100 max-w-3xl leading-relaxed">
                        A vigesimal (base-20) system reflecting the traditional counting method of Inuit peoples using fingers and toes.
                        Still used in contemporary Inuit communities as part of cultural and linguistic heritage.
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
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Numbers (0-20)</h3>
                                <div className="space-y-3">
                                    {[
                                        { num: 0, inuktitut: 'ilitchutik', meaning: 'Nothing/Zero' },
                                        { num: 1, inuktitut: 'atausiq', meaning: 'One' },
                                        { num: 2, inuktitut: 'marruuk', meaning: 'Two' },
                                        { num: 3, inuktitut: 'pingasut', meaning: 'Three' },
                                        { num: 4, inuktitut: 'sisamat', meaning: 'Four' },
                                        { num: 5, inuktitut: 'tallimat', meaning: 'Five' },
                                        { num: 6, inuktitut: 'pingasuutit', meaning: 'Six' },
                                        { num: 7, inuktitut: 'sitamautit', meaning: 'Seven' },
                                        { num: 8, inuktitut: 'sitamaujunirutit', meaning: 'Eight' },
                                        { num: 9, inuktitut: 'qulingutit', meaning: 'Nine' },
                                        { num: 10, inuktitut: 'qulittut', meaning: 'Ten' },
                                        { num: 20, inuktitut: 'inuujunik', meaning: 'Twenty' },
                                    ].map((item) => (
                                        <div key={item.num} className="flex items-center justify-between p-4 bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                                            <div className="flex items-center gap-4">
                                                <span className="text-3xl font-bold text-cyan-600 w-12 text-center">{item.num}</span>
                                                <div>
                                                    <p className="font-bold text-gray-900">{item.inuktitut}</p>
                                                    <p className="text-sm text-gray-600">{item.meaning}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Body-Based Counting System</h3>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-lg">
                                        <h4 className="font-bold text-blue-900 mb-2">System Characteristics</h4>
                                        <ul className="text-blue-800 space-y-1 text-sm">
                                            <li>✓ Vigesimal (Base-20) system</li>
                                            <li>✓ Body-part based counting</li>
                                            <li>✓ Fingers and toes (20 total)</li>
                                            <li>✓ Oral/linguistic tradition</li>
                                            <li>✓ Still used in Arctic communities</li>
                                        </ul>
                                    </div>

                                    <div className="bg-linear-to-r from-teal-50 to-cyan-50 rounded-lg p-5 border border-teal-300">
                                        <h4 className="font-bold text-teal-900 mb-3">Why Base-20?</h4>
                                        <p className="text-teal-800 text-sm leading-relaxed">
                                            Inuit peoples traditionally counted using fingers and toes, which total 20. This body-based counting system
                                            reflects the practical mathematics of Arctic communities and their connection to natural, embodied cognition.
                                        </p>
                                    </div>

                                    <div className="bg-linear-to-r from-cyan-50 to-blue-50 rounded-lg p-5 border border-cyan-300">
                                        <h4 className="font-bold text-cyan-900 mb-3">Linguistic Preservation</h4>
                                        <p className="text-cyan-800 text-sm leading-relaxed">
                                            Inuktitut numerals are crucial for language preservation efforts, maintaining connections to traditional
                                            knowledge systems and Arctic Indigenous heritage.
                                        </p>
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
                            {/* Fingers and Toes */}
                            <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 1: Fingers and Toes (1-10)</h3>
                                <p className="text-cyan-800 mb-4">
                                    Numbers 1-10 represent fingers on one hand or up to five fingers on each hand:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-cyan-500">
                                        <p className="text-sm text-gray-600 mb-1">One Hand (1-5)</p>
                                        <p className="text-sm text-cyan-800">atausiq (1), marruuk (2), pingasut (3), sisamat (4), tallimat (5)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                                        <p className="text-sm text-gray-600 mb-1">Two Hands (6-10)</p>
                                        <p className="text-sm text-blue-800">pingasuutit (6), sitamautit (7), sitamaujunirutit (8), qulingutit (9), qulittut (10)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Teens */}
                            <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-teal-200">
                                <h3 className="text-xl font-bold text-teal-900 mb-4">Rule 2: Teens (11-19)</h3>
                                <p className="text-teal-800 mb-4">
                                    Numbers 11-19 build on 10 plus additional fingers on one foot:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-teal-500">
                                        <p className="font-bold text-gray-900">qulittut + fingers</p>
                                        <p className="text-sm text-teal-700">Ten (both hands) plus additional fingers from first foot</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-teal-500">
                                        <p className="font-bold text-gray-900">Example: 15</p>
                                        <p className="text-sm text-teal-700">qulittut tallimaumik (ten plus five from foot)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Twenty and Multiples */}
                            <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                                <h3 className="text-xl font-bold text-blue-900 mb-4">Rule 3: Complete Cycle (20)</h3>
                                <p className="text-blue-800 mb-4">
                                    Twenty represents completion of all fingers and toes (inuujunik):
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
                                        <p className="font-bold text-gray-900">inuujunik</p>
                                        <p className="text-sm text-blue-700">Complete set of fingers and toes (20 total)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
                                        <p className="font-bold text-gray-900">inuujunik marruumik (40)</p>
                                        <p className="text-sm text-blue-700">20 × 2 (two complete sets)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
                                        <p className="font-bold text-gray-900">inuujunik pingasumik (60)</p>
                                        <p className="text-sm text-blue-700">20 × 3 (three complete sets)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Compound Formation */}
                            <div className="bg-linear-to-br from-cyan-50 to-teal-50 rounded-xl p-6 border-2 border-cyan-200">
                                <h3 className="text-xl font-bold text-cyan-900 mb-4">Rule 4: Compound Number Formation</h3>
                                <p className="text-cyan-800 mb-4">
                                    Numbers above 20 combine base twenties with additional units:
                                </p>
                                <div className="space-y-3">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-cyan-500">
                                        <p className="font-bold text-gray-900">25 = inuujunik atausirmik</p>
                                        <p className="text-sm text-cyan-700">Twenty plus one (complete set plus one more)</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-cyan-500">
                                        <p className="font-bold text-gray-900">47 = inuujunik marruumik tallimat</p>
                                        <p className="text-sm text-cyan-700">40 (two sets) plus 7</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-cyan-500">
                                        <p className="font-bold text-gray-900">100 = qqamugjuk</p>
                                        <p className="text-sm text-cyan-700">Hundred (higher-order unit)</p>
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
                                <label className="block text-sm font-bold text-gray-700 mb-4">Enter a Decimal Number (0-100)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={interactiveNumber}
                                    onChange={(e) => setInteractiveNumber(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                                />
                                <div className="mt-4 flex items-center justify-between gap-4">
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={interactiveNumber}
                                        onChange={(e) => setInteractiveNumber(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="flex-1 px-4 py-3 text-3xl font-bold text-center border-2 border-cyan-300 rounded-lg focus:border-cyan-600 focus:ring-2 focus:ring-cyan-500 text-gray-900"
                                    />
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-1">Inuktitut</p>
                                        <p className="text-xl font-bold text-cyan-600 italic">{inuktitutNumber}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">Component Breakdown</label>
                                <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200 max-h-96 overflow-y-auto">
                                    {inuktitutBreakdown.length === 0 ? (
                                        <p className="text-gray-500 italic">Enter a number to see breakdown</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {inuktitutBreakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-cyan-500">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <p className="font-bold text-gray-900 italic">{item.inuktitut}</p>
                                                            <p className="text-sm text-gray-600">{item.explanation}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-cyan-600 text-lg">{item.value}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="bg-cyan-100 rounded-lg p-4 border-2 border-cyan-300 mt-4">
                                                <p className="text-sm text-gray-600">Final Result</p>
                                                <p className="text-2xl font-bold text-cyan-600 italic">{interactiveNumber}</p>
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
                            {/* Counting on Body Parts */}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Body-Part Counting Hierarchy</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border-2 border-cyan-300">
                                        <p className="font-bold text-cyan-900 mb-2">👆 First Hand (1-5)</p>
                                        <p className="text-sm text-cyan-800">Individual fingers on one hand</p>
                                    </div>
                                    <div className="bg-linear-to-br from-blue-50 to-teal-50 rounded-lg p-4 border-2 border-blue-300">
                                        <p className="font-bold text-blue-900 mb-2">🤚 Both Hands (6-10)</p>
                                        <p className="text-sm text-blue-800">Completion of both hands (10 total)</p>
                                    </div>
                                    <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border-2 border-teal-300">
                                        <p className="font-bold text-teal-900 mb-2">🦶 Feet (11-20)</p>
                                        <p className="text-sm text-teal-800">Transition to toes (20 complete set)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Example: Building 47 */}
                            <div className="bg-linear-to-r from-indigo-50 to-cyan-50 rounded-lg p-6 border-2 border-indigo-200">
                                <h3 className="text-lg font-bold text-indigo-900 mb-4">Example: Building 47</h3>
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 1: Identify base</p>
                                                <p className="font-mono text-gray-800">47 = 40 + 7</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600">40 | 7</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 2: Convert 40 (two twenties)</p>
                                                <p className="font-mono text-gray-800">40 = inuujunik marruumik (20×2)</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600 italic">inuujunik marruumik</p>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border-l-4 border-indigo-500">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">Step 3: Convert 7 (remainder)</p>
                                                <p className="font-mono text-gray-800">7 = sitamautit</p>
                                            </div>
                                            <p className="text-lg font-bold text-indigo-600 italic">sitamautit</p>
                                        </div>
                                    </div>
                                    <div className="bg-indigo-100 rounded-lg p-3 border-2 border-indigo-300">
                                        <p className="text-sm text-gray-600 mb-1">Final Result:</p>
                                        <p className="text-2xl font-bold text-indigo-600 italic">inuujunik marruumik sitamautit</p>
                                    </div>
                                </div>
                            </div>

                            {/* Body Counting Phases */}
                            <div className="bg-linear-to-r from-cyan-100 to-blue-100 rounded-lg p-6 border-2 border-cyan-300">
                                <h3 className="text-lg font-bold text-cyan-900 mb-4">Counting Phases</h3>
                                <div className="space-y-2 text-cyan-800">
                                    <p><strong>Phase 1 (1-10):</strong> Hand counting - one hand then both hands</p>
                                    <p><strong>Phase 2 (11-20):</strong> Toe counting - adding toes to complete count</p>
                                    <p><strong>Phase 3 (20+):</strong> Multiple sets - counting groups of complete cycles</p>
                                    <p><strong>Phase 4 (100+):</strong> Higher orders - additional counting units emerge</p>
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
                                        <p className="font-bold text-blue-900">Ancient Arctic Origins</p>
                                        <p className="text-blue-800 text-sm">Indigenous Inuit counting practices developed independently from body-based mathematics</p>
                                    </div>
                                    <div className="bg-cyan-50 rounded-lg p-4 border-l-4 border-cyan-500">
                                        <p className="font-bold text-cyan-900">Oral Transmission</p>
                                        <p className="text-cyan-800 text-sm">Preserved through generations via oral tradition and linguistic practice</p>
                                    </div>
                                    <div className="bg-teal-50 rounded-lg p-4 border-l-4 border-teal-500">
                                        <p className="font-bold text-teal-900">Language Preservation Efforts</p>
                                        <p className="text-teal-800 text-sm">Modern initiatives to document and teach Inuktitut numerals in schools</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-500">
                                        <p className="font-bold text-slate-900">Contemporary Use</p>
                                        <p className="text-slate-800 text-sm">Still used in some communities, cultural events, and educational settings</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Cultural Significance</h3>
                                <div className="space-y-3">
                                    {[
                                        { icon: '🏔️', use: 'Arctic Heritage', desc: 'Foundation of Inuit mathematical traditions' },
                                        { icon: '📚', use: 'Language Preservation', desc: 'Essential component of Inuktitut revitalization' },
                                        { icon: '🧮', use: 'Traditional Education', desc: 'Teaching methods rooted in body-based learning' },
                                        { icon: '👨‍👩‍👧', use: 'Cultural Identity', desc: 'Symbol of Inuit heritage and knowledge systems' },
                                        { icon: '🌍', use: 'Indigenous Knowledge', desc: 'Example of non-Western mathematical thinking' },
                                        { icon: '📖', use: 'Linguistic Studies', desc: 'Subject of anthropological research' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-linear-to-r from-cyan-50 to-blue-50 rounded-lg p-4 border border-cyan-200 flex items-start gap-3">
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

                        <div className="mt-8 bg-linear-to-r from-cyan-100 to-teal-100 rounded-xl p-6 border-2 border-cyan-300">
                            <h3 className="font-bold text-cyan-900 mb-3">🌍 Cultural Significance</h3>
                            <p className="text-cyan-800 leading-relaxed">
                                Inuktitut numerals represent far more than a counting system—they embody the mathematical intelligence of Arctic
                                Indigenous peoples and their direct connection to the natural world. The body-based approach to counting reflects
                                a holistic worldview where mathematics is inseparable from physical experience and communal knowledge. In an era
                                of language endangerment, these numerals serve as vital links to Inuit cultural identity, intellectual traditions,
                                and ways of knowing. Their preservation and revitalization strengthen Indigenous sovereignty and contribute to the
                                global understanding of how diverse cultures conceptualize quantity and mathematics.
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
                                { decimal: 0, inuktitut: 'ilitchutik' },
                                { decimal: 1, inuktitut: 'atausiq' },
                                { decimal: 5, inuktitut: 'tallimat' },
                                { decimal: 10, inuktitut: 'qulittut' },
                                { decimal: 15, inuktitut: 'qulittut tallimaumik' },
                                { decimal: 19, inuktitut: 'qulittut qulingutimik' },
                                { decimal: 20, inuktitut: 'inuujunik' },
                                { decimal: 25, inuktitut: 'inuujunik atausirmik' },
                                { decimal: 30, inuktitut: 'inuujunik marruumik pingasut' },
                                { decimal: 40, inuktitut: 'inuujunik marruumik' },
                                { decimal: 50, inuktitut: 'inuujunik pingasumik tallimat' },
                                { decimal: 60, inuktitut: 'inuujunik pingasumik' },
                            ].map((item) => (
                                <div
                                    key={item.decimal}
                                    className="bg-linear-to-br from-cyan-50 to-blue-50 rounded-lg p-6 border-2 border-cyan-200 hover:shadow-lg transition-all"
                                >
                                    <div className="text-center">
                                        <p className="text-gray-600 text-sm mb-2">Decimal</p>
                                        <p className="text-4xl font-bold text-cyan-600 mb-4">{item.decimal}</p>
                                        <p className="text-gray-600 text-sm mb-2">Inuktitut</p>
                                        <p className="text-lg font-bold text-gray-800 italic font-serif">{item.inuktitut}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quick Tips */}
                <section>
                    <div className="bg-linear-to-r from-cyan-600 to-teal-600 rounded-2xl shadow-lg p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <span className="text-4xl">💡</span> Quick Tips & Tricks
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Remember the Counting Sequence</h3>
                                <p className="mb-4 text-cyan-100">
                                    Think of Inuktitut numerals as a physical journey:
                                </p>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-2 text-sm">
                                    <p>👆 One hand: atausiq to tallimat (1-5)</p>
                                    <p>🤚 Both hands: pingasuutit to qulittut (6-10)</p>
                                    <p>🦶 Adding toes: 11-20 (complete cycle)</p>
                                    <p>♾️ Multiple sets: inuujunik for groups of 20</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4">Key Learning Patterns</h3>
                                <ul className="space-y-2 text-cyan-100">
                                    <li>✓ Start with 1-10 (hand counting)</li>
                                    <li>✓ Master the base 20 (inuujunik)</li>
                                    <li>✓ Learn compound formation</li>
                                    <li>✓ Understand body-part logic</li>
                                    <li>✓ Practice with Arctic context</li>
                                    <li>✓ Connect to Inuktitut language</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default InuktitutNumeralPage;
