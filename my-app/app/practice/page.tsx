'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import Link from 'next/link';
import { useState } from 'react';

interface PuzzleCategory {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    color: string;
    difficulty: string;
    problemCount: number;
    skills: string[];
    examples: string[];
    comingSoon?: boolean;
}

const categories: PuzzleCategory[] = [
    {
        id: 'pattern-identification',
        title: 'Pattern Identification',
        subtitle: 'Decode Cultural Number Patterns',
        description: 'Analyze sequences and identify the underlying patterns in various numeral systems. Develop your analytical skills by recognizing how different cultures structure their numerical representations.',
        icon: '🔍',
        color: 'from-blue-500 to-cyan-500',
        difficulty: 'Beginner to Intermediate',
        problemCount: 20,
        skills: ['Pattern Recognition', 'Logical Reasoning', 'Cultural Analysis', 'Sequence Completion'],
        examples: [
            'Complete the Roman numeral sequence: V, X, XV, __',
            'Identify the pattern in Mayan dot-bar combinations',
            'Find the rule in Chinese number character formations'
        ]
    },
    {
        id: 'construction-challenges',
        title: 'Construction Challenges',
        subtitle: 'Build Numbers Across Systems',
        description: 'Construct specific numbers using the rules and symbols of different numeral systems. Master the art of translating numerical concepts across cultural boundaries.',
        icon: '🏗️',
        color: 'from-purple-500 to-pink-500',
        difficulty: 'Intermediate to Advanced',
        problemCount: 20,
        skills: ['System Mastery', 'Creative Problem Solving', 'Multi-step Reasoning', 'Cross-cultural Translation'],
        examples: [
            'Build 2024 using only Roman subtractive notation',
            'Construct the largest number with 5 Mayan symbols',
            'Create palindromic numbers in binary system'
        ]
    },
    {
        id: 'olympiad-puzzles',
        title: 'Olympiad Puzzles',
        subtitle: 'Linguistics & Math Competition Style',
        description: 'Tackle complex, multi-layered problems inspired by International Linguistics and Mathematics Olympiads. Perfect preparation for competitive academic challenges.',
        icon: '🏆',
        color: 'from-amber-500 to-orange-500',
        difficulty: 'Advanced to Expert',
        problemCount: 20,
        skills: ['Advanced Logic', 'Linguistic Analysis', 'Mathematical Proofs', 'Cultural Linguistics'],
        examples: [
            'Decode an unknown numeral system from limited examples',
            'Prove properties of base conversion algorithms',
            'Analyze hypothetical numeral system characteristics'
        ]
    }
];

const Page = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-linear-to-r from-slate-50 via-purple-50 to-pink-50">
            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Header Section */}
            <div className="bg-linear-to-r from-purple-600 via-pink-600 to-orange-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <span className="text-sm font-semibold">Olympiad-Style Training</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            Practice Zone
                        </h1>
                        <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
                            Sharpen your skills with challenging puzzles inspired by Linguistics and Mathematics Olympiads
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-2xl shadow-2xl p-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-3xl font-bold text-purple-600">
                                {categories.reduce((sum, cat) => sum + cat.problemCount, 0)}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">Total Puzzles</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-pink-600">3</div>
                            <div className="text-sm text-gray-600 mt-1">Categories</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-600">5+</div>
                            <div className="text-sm text-gray-600 mt-1">Numeral Systems</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Introduction */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Choose Your Challenge
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Each category offers unique challenges designed to develop different aspects of
                        your analytical and linguistic reasoning abilities
                    </p>
                </div>

                {/* Category Cards */}
                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/practice/${category.id}`}>
                            <div
                                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {/* Card Header */}
                                <div className={`bg-linear-to-r ${category.color} p-8 text-white relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 text-9xl opacity-10 -mr-4 -mt-4">
                                        {category.icon}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="text-5xl mb-3">{category.icon}</div>
                                        <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                                        <p className="text-sm opacity-90">{category.subtitle}</p>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-6">
                                    {/* Description */}
                                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                                        {category.description}
                                    </p>

                                    {/* Metadata */}
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Difficulty:</span>
                                            <span className="font-semibold text-gray-900">{category.difficulty}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Problems:</span>
                                            <span className="font-semibold text-purple-600">{category.problemCount} puzzles</span>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-4">
                                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Skills Developed:</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {category.skills.map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Examples */}
                                    <div className="mb-4">
                                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Example Puzzles:</h4>
                                        <ul className="space-y-1">
                                            {category.examples.slice(0, 2).map((example, idx) => (
                                                <li key={idx} className="text-xs text-gray-600 flex items-start">
                                                    <span className="text-purple-500 mr-2">•</span>
                                                    <span>{example}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Action Button */}
                                    <button className={`w-full bg-linear-to-r ${category.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                                        Start Practicing →
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Why Practice Section */}
                <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-12">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                            Why Practice Olympiad-Style Puzzles?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="text-3xl mb-3">🧠</div>
                                <h3 className="text-xl font-bold mb-2">Develop Critical Thinking</h3>
                                <p className="text-indigo-100 text-sm">
                                    Enhance your analytical and logical reasoning skills through challenging problems
                                    that require creative approaches.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="text-3xl mb-3">🌍</div>
                                <h3 className="text-xl font-bold mb-2">Cultural Understanding</h3>
                                <p className="text-indigo-100 text-sm">
                                    Gain deeper appreciation for how different cultures approach mathematics
                                    and numerical representation.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="text-3xl mb-3">🎯</div>
                                <h3 className="text-xl font-bold mb-2">Competition Preparation</h3>
                                <p className="text-indigo-100 text-sm">
                                    Perfect training for Linguistics and Mathematics Olympiads with authentic
                                    problem-solving scenarios.
                                </p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                                <div className="text-3xl mb-3">📈</div>
                                <h3 className="text-xl font-bold mb-2">Progressive Learning</h3>
                                <p className="text-indigo-100 text-sm">
                                    Start with pattern recognition, advance to construction, and master
                                    complex olympiad-level challenges.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Tips for Success
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">📝</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Start Simple</h3>
                            <p className="text-sm text-gray-600">
                                Begin with pattern identification before moving to advanced challenges
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔄</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Practice Regularly</h3>
                            <p className="text-sm text-gray-600">
                                Consistent practice builds intuition and pattern recognition skills
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-linear-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💡</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Learn from Mistakes</h3>
                            <p className="text-sm text-gray-600">
                                Review solutions and understand the reasoning behind each answer
                            </p>
                        </div>
                    </div>
                </div>

                {/* Coming Soon Badge */}
                <div className="mt-8 text-center">
                    <div className="inline-block bg-linear-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-full px-6 py-3">
                        <span className="text-purple-700 font-semibold">
                            🚀 Interactive puzzle solving interface coming soon!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
