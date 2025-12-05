'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import { converters } from '@/lib/converter';
import { ConversionStep } from '@/types';
import { useState } from 'react';

type ConversionDirection = 'toSystem' | 'toArabic';


const Page = () => {
    const [selectedSystem, setSelectedSystem] = useState<string>('roman');
    const [direction, setDirection] = useState<ConversionDirection>('toSystem');
    const [inputValue, setInputValue] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [steps, setSteps] = useState<ConversionStep[]>([]);
    const [error, setError] = useState<string>('');

    const handleConvert = () => {
        setError('');
        setSteps([]);
        setResult('');

        const converter = converters[selectedSystem];

        if (!inputValue.trim()) {
            setError('Please enter a value to convert');
            return;
        }

        try {
            if (direction === 'toSystem') {
                const num = parseInt(inputValue);
                if (isNaN(num) || num < 0 || num > 999999) {
                    setError('Please enter a valid number between 0 and 999,999');
                    return;
                }
                const conversion = converter.toSystem(num);
                setResult(conversion.result);
                setSteps(conversion.steps);
            } else {
                if (!converter.validate(inputValue)) {
                    setError(`Invalid ${converter.name} format`);
                    return;
                }
                const conversion = converter.toArabic(inputValue);
                setResult(conversion.result.toString());
                setSteps(conversion.steps);
            }
        } catch (err) {
            setError('Conversion error. Please check your input.');
        }
    };

    const currentConverter = converters[selectedSystem];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Header */}
            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-5xl font-bold mb-4 text-center">
                        Number System Converter
                    </h1>
                    <p className="text-xl text-center text-indigo-100 max-w-3xl mx-auto">
                        Convert between Arabic numerals and various cultural number systems with step-by-step explanations
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Panel - Converter Interface */}
                    <div>
                        {/* System Selection */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Number System</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.values(converters).map((converter) => (
                                    <button
                                        key={converter.id}
                                        onClick={() => {
                                            setSelectedSystem(converter.id);
                                            setInputValue('');
                                            setResult('');
                                            setSteps([]);
                                            setError('');
                                        }}
                                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedSystem === converter.id
                                            ? 'border-indigo-600 bg-indigo-50'
                                            : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    >
                                        <span className="text-3xl block mb-2">{converter.icon}</span>
                                        <span className="font-semibold text-gray-900 text-sm">{converter.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Direction Toggle */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Direction</h2>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => {
                                        setDirection('toSystem');
                                        setInputValue('');
                                        setResult('');
                                        setSteps([]);
                                        setError('');
                                    }}
                                    className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${direction === 'toSystem'
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200 hover:border-indigo-300'
                                        }`}
                                >
                                    <div className="font-semibold text-gray-900">Arabic → {currentConverter.name}</div>
                                    <div className="text-sm text-gray-500 mt-1">e.g., 2024 → MMXXIV</div>
                                </button>
                                <button
                                    onClick={() => {
                                        setDirection('toArabic');
                                        setInputValue('');
                                        setResult('');
                                        setSteps([]);
                                        setError('');
                                    }}
                                    className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${direction === 'toArabic'
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200 hover:border-indigo-300'
                                        }`}
                                >
                                    <div className="font-semibold text-gray-900">{currentConverter.name} → Arabic</div>
                                    <div className="text-sm text-gray-500 mt-1">e.g., MMXXIV → 2024</div>
                                </button>
                            </div>
                        </div>

                        {/* Input Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Enter Value</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {direction === 'toSystem' ? 'Arabic Number' : currentConverter.name}
                                    </label>
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={
                                            direction === 'toSystem'
                                                ? 'Enter a number (0-999,999)'
                                                : currentConverter.placeholder
                                        }
                                        className="w-full px-4 py-3 text-lg text-gray-900 border-2 border-gray-300 rounded-xl focus:ring-2 focus:outline-indigo-500 focus:ring-indigo-500 focus:border-transparent transition"
                                        onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={handleConvert}
                                    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                >
                                    Convert →
                                </button>

                                {result && (
                                    <div className={`bg-linear-to-r ${currentConverter.color} p-6 rounded-xl text-white`}>
                                        <div className="text-sm opacity-90 mb-2">Result:</div>
                                        <div className="text-3xl font-bold break-all">{result}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Steps */}
                    <div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Step-by-Step Explanation
                            </h2>

                            {steps.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <div className="text-6xl mb-4">🧮</div>
                                    <p className="text-lg">Enter a value and click convert to see the step-by-step breakdown</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                                    {steps.map((step, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-linear-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-indigo-500"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                                                    {step.step}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-900 mb-1">
                                                        {step.description}
                                                    </p>
                                                    {step.calculation && (
                                                        <p className="text-sm text-indigo-600 font-mono mb-1">
                                                            {step.calculation}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-600">
                                                        {step.result}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="mt-12 bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        About {currentConverter.name}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Conversion Tips:</h4>
                            <ul className="text-gray-600 space-y-1 text-sm">
                                {selectedSystem === 'roman' && (
                                    <>
                                        <li>• Uses letters: I(1), V(5), X(10), L(50), C(100), D(500), M(1000)</li>
                                        <li>• Smaller before larger means subtract (IV = 4)</li>
                                        <li>• No zero or negative numbers</li>
                                    </>
                                )}
                                {selectedSystem === 'mayan' && (
                                    <>
                                        <li>• Base-20 system (vigesimal)</li>
                                        <li>• Dots (●) represent 1, bars (▬) represent 5</li>
                                        <li>• Levels separated by |, read from top to bottom</li>
                                    </>
                                )}
                                {selectedSystem === 'chinese' && (
                                    <>
                                        <li>• Uses characters for digits and multipliers</li>
                                        <li>• 十(10), 百(100), 千(1000), 万(10,000)</li>
                                        <li>• Combines characters to build numbers</li>
                                    </>
                                )}
                                {selectedSystem === 'binary' && (
                                    <>
                                        <li>• Base-2 system using only 0 and 1</li>
                                        <li>• Each position is a power of 2</li>
                                        <li>• Foundation of all computer systems</li>
                                    </>
                                )}
                                {selectedSystem === 'babylonian' && (
                                    <>
                                        <li>• Base-60 (sexagesimal) system</li>
                                        <li>• 𒐕 represents 1, 𒌋 represents 10</li>
                                        <li>• Positions separated by | for place values</li>
                                    </>
                                )}
                                {selectedSystem === 'greek' && (
                                    <>
                                        <li>• Uses Greek alphabet letters as numerals</li>
                                        <li>• ͵ symbol indicates thousands</li>
                                        <li>• Works for numbers 1-9999</li>
                                    </>
                                )}
                                {selectedSystem === 'egyptian' && (
                                    <>
                                        <li>• Additive system with hieroglyphic symbols</li>
                                        <li>• 𓏺(1), 𓎆(10), 𓍢(100), 𓁨(1000), 𓆼(10000)</li>
                                        <li>• Repeat symbols to create values</li>
                                    </>
                                )}
                                {selectedSystem === 'yoruba' && (
                                    <>
                                        <li>• Base-20 with unique subtractive system</li>
                                        <li>• Uses lé (add) and dín (subtract from)</li>
                                        <li>• Reflects oral counting tradition</li>
                                    </>
                                )}
                                {selectedSystem === 'inuktitut' && (
                                    <>
                                        <li>• Base-20 system from Arctic Canada</li>
                                        <li>• Based on fingers and toes counting</li>
                                        <li>• Uses Inuktitut language words</li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Quick Examples:</h4>
                            <div className="space-y-2 text-sm">
                                {selectedSystem === 'roman' && (
                                    <>
                                        <div className="bg-white text-gray-900 p-2 rounded">1 → I, 4 → IV, 9 → IX</div>
                                        <div className="bg-white text-gray-900 p-2 rounded">2024 → MMXXIV</div>
                                    </>
                                )}
                                {selectedSystem === 'mayan' && (
                                    <>
                                        <div className="bg-white text-gray-900 p-2 rounded">5 → ▬</div>
                                        <div className="bg-white text-gray-900 p-2 rounded">13 → ▬▬ ●●●</div>
                                    </>
                                )}
                                {selectedSystem === 'chinese' && (
                                    <>
                                        <div className="bg-white text-gray-900 p-2 rounded">11 → 十一</div>
                                        <div className="bg-white text-gray-900 p-2 rounded">2024 → 二千零二十四</div>
                                    </>
                                )}
                                {selectedSystem === 'binary' && (
                                    <>
                                        <div className="bg-white text-gray-900 p-2 rounded">5 → 101</div>
                                        <div className="bg-white text-gray-900 p-2 rounded">255 → 11111111</div>
                                    </>
                                )}
                                {selectedSystem === 'babylonian' && (
                                    <>
                                        <div className="bg-white text-gray-900 p-2 rounded">25 → 𒌋𒌋 𒐕𒐕𒐕𒐕𒐕</div>
                                        <div className="bg-white text-gray-900 p-2 rounded">130 → 𒌋𒌋 | 𒐕𒐕𒐕𒐕𒐕𒐕𒐕𒐕𒐕𒐕</div>
                                    </>
                                )}
                                {selectedSystem === 'greek' && (
                                    <>
                                        <div className="bg-white text-gray-900 p-2 rounded">15 → ΙΕ</div>
                                        <div className="bg-white text-gray-900 p-2 rounded">624 → ΧΚΔ</div>
                                    </>
                                )}
                                {selectedSystem === 'egyptian' && (
                                    <>
                                        <div className="bg-white text-gray-900 p-2 rounded">23 → 𓎆𓎆𓏺𓏺𓏺</div>
                                        <div className="bg-white text-gray-900 p-2 rounded">3000 → 𓁨𓁨𓁨</div>
                                    </>
                                )}
                                {selectedSystem === 'yoruba' && (
                                    <>
                                        <div className="bg-white text-gray-900 p-2 rounded">1 → ọkan</div>
                                        <div className="bg-white text-gray-900 p-2 rounded">20 → ogún</div>
                                    </>
                                )}
                                {selectedSystem === 'inuktitut' && (
                                    <>
                                        <div className="bg-white text-gray-900 p-2 rounded">1 → atausiq</div>
                                        <div className="bg-white text-gray-900 p-2 rounded">20 → inuujunik</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
