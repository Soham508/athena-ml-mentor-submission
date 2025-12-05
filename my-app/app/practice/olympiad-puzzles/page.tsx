'use client';

import { olympiadPuzzles, OlympiadPuzzle, getTotalPoints } from '@/data/olympiad-puzzles';
import Link from 'next/link';
import { useState } from 'react';

type AnswerState = {
    [key: number]: string | number;
};

type ResultState = {
    [key: number]: 'correct' | 'incorrect' | null;
};

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [answers, setAnswers] = useState<AnswerState>({});
    const [results, setResults] = useState<ResultState>({});
    const [showResults, setShowResults] = useState(false);
    const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'medium' | 'hard' | 'expert'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});
    const [inputErrors, setInputErrors] = useState<{ [key: number]: string }>({});

    const puzzlesPerPage = 5;

    const filteredPuzzles = olympiadPuzzles.filter(p => {
        const matchesDifficulty = selectedDifficulty === 'all' || p.difficulty === selectedDifficulty;
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesDifficulty && matchesCategory;
    });

    const totalPages = Math.ceil(filteredPuzzles.length / puzzlesPerPage);
    const startIndex = (currentPage - 1) * puzzlesPerPage;
    const currentPuzzles = filteredPuzzles.slice(startIndex, startIndex + puzzlesPerPage);

    const allCategories = Array.from(new Set(olympiadPuzzles.map(p => p.category)));

    const handleAnswerSelect = (puzzleId: number, answer: string | number) => {
        if (!showResults) {
            setAnswers(prev => ({ ...prev, [puzzleId]: answer }));
            setInputErrors(prev => ({ ...prev, [puzzleId]: '' }));
        }
    };

    const handleInputChange = (puzzleId: number, value: string, regex?: string) => {
        if (!showResults) {
            if (regex && value && !new RegExp(regex).test(value)) {
                setInputErrors(prev => ({
                    ...prev,
                    [puzzleId]: 'Invalid format. Check the expected answer format.'
                }));
            } else {
                setInputErrors(prev => ({ ...prev, [puzzleId]: '' }));
            }
            setAnswers(prev => ({ ...prev, [puzzleId]: value.trim() }));
        }
    };

    const normalizeAnswer = (answer: string): string => {
        return answer.toUpperCase().replace(/\s+/g, '');
    };

    const handleSubmit = () => {
        const newResults: ResultState = {};

        filteredPuzzles.forEach(puzzle => {
            if (answers[puzzle.id] !== undefined) {
                const userAnswer = answers[puzzle.id];
                const correctAnswer = puzzle.correctAnswer;

                let isCorrect = false;

                if (puzzle.type === 'mcq') {
                    isCorrect = userAnswer === correctAnswer;
                } else {
                    const normalizedUser = normalizeAnswer(String(userAnswer));
                    const normalizedCorrect = normalizeAnswer(String(correctAnswer));
                    isCorrect = normalizedUser === normalizedCorrect;
                }

                newResults[puzzle.id] = isCorrect ? 'correct' : 'incorrect';
            }
        });

        setResults(newResults);
        setShowResults(true);
    };

    const handleReset = () => {
        setAnswers({});
        setResults({});
        setShowResults(false);
        setCurrentPage(1);
        setShowHints({});
        setInputErrors({});
    };

    const toggleHint = (puzzleId: number) => {
        setShowHints(prev => ({ ...prev, [puzzleId]: !prev[puzzleId] }));
    };

    const calculateScore = () => {
        const answeredPuzzles = Object.keys(answers).length;
        const correctAnswers = Object.keys(results).filter(id => results[Number(id)] === 'correct').length;
        const totalPoints = filteredPuzzles.reduce((sum, p) => {
            if (results[p.id] === 'correct') return sum + p.points;
            return sum;
        }, 0);
        const maxPoints = filteredPuzzles.filter(p => answers[p.id] !== undefined).reduce((sum, p) => sum + p.points, 0);

        return { correct: correctAnswers, total: answeredPuzzles, points: totalPoints, maxPoints };
    };

    const score = calculateScore();
    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'hard': return 'bg-orange-100 text-orange-700 border-orange-300';
            case 'expert': return 'bg-red-100 text-red-700 border-red-300';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getCategoryColor = (category: string) => {
        const colors: { [key: string]: string } = {
            'linguistic': 'bg-purple-50 text-purple-700 border-purple-200',
            'mathematical': 'bg-blue-50 text-blue-700 border-blue-200',
            'cross-cultural': 'bg-green-50 text-green-700 border-green-200',
            'decoding': 'bg-pink-50 text-pink-700 border-pink-200',
        };
        return colors[category] || 'bg-gray-50 text-gray-700 border-gray-200';
    };

    const getCategoryIcon = (category: string) => {
        const icons: { [key: string]: string } = {
            'linguistic': '📖',
            'mathematical': '🔢',
            'cross-cultural': '🌍',
            'decoding': '🔐',
        };
        return icons[category] || '🧩';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
            {/* Header */}
            <div className="bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/practice" className="inline-flex items-center text-amber-100 hover:text-white mb-4 transition">
                        ← Back to Practice Zone
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-5xl font-bold mb-4">
                                🏆 Olympiad Puzzles
                            </h1>
                            <p className="text-xl text-amber-100 max-w-3xl">
                                Advanced linguistics and mathematics challenges inspired by international competitions
                            </p>
                        </div>
                        <div className="hidden md:block bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                            <div className="text-3xl font-bold">{getTotalPoints()}</div>
                            <div className="text-sm opacity-90">Total Points Available</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters and Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    {/* Difficulty Filter */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <span>🎯</span> Difficulty
                        </h3>
                        <div className="space-y-2">
                            {(['all', 'medium', 'hard', 'expert'] as const).map((level) => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        setSelectedDifficulty(level);
                                        setCurrentPage(1);
                                    }}
                                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${selectedDifficulty === level
                                        ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <span>📚</span> Category
                        </h3>
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900"
                        >
                            <option value="all">All Categories</option>
                            {allCategories.map(cat => (
                                <option key={cat} value={cat}>
                                    {getCategoryIcon(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Score Display */}
                    <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="font-semibold mb-3">Your Score</h3>
                        <div className="text-4xl font-bold mb-2">
                            {score.correct} / {score.total}
                        </div>
                        <div className="text-sm opacity-90">
                            {percentage}% Accuracy
                        </div>
                    </div>

                    {/* Points Display */}
                    <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="font-semibold mb-3">Points Earned</h3>
                        <div className="text-4xl font-bold mb-2">
                            {score.points}
                        </div>
                        <div className="text-sm opacity-90">
                            out of {score.maxPoints} attempted
                        </div>
                    </div>
                </div>

                {/* Puzzles */}
                <div className="space-y-8 mb-8">
                    {currentPuzzles.map((puzzle, index) => {
                        const isAnswered = answers[puzzle.id] !== undefined;
                        const userAnswer = answers[puzzle.id];
                        const result = results[puzzle.id];

                        return (
                            <div
                                key={puzzle.id}
                                className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all ${result === 'correct' ? 'ring-4 ring-green-500' : result === 'incorrect' ? 'ring-4 ring-red-500' : ''
                                    }`}
                            >
                                {/* Puzzle Header */}
                                <div className="bg-linear-to-r from-amber-50 via-orange-50 to-yellow-50 p-6 border-b-2 border-amber-200">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">
                                                {startIndex + index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{puzzle.title}</h3>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getDifficultyColor(puzzle.difficulty)}`}>
                                                        {puzzle.difficulty.toUpperCase()}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(puzzle.category)}`}>
                                                        {getCategoryIcon(puzzle.category)} {puzzle.category}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-300">
                                                        {puzzle.points} points
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                                                        {puzzle.type === 'mcq' ? '☑️ Multiple Choice' : '✍️ Input Answer'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scenario */}
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 mb-4 border-l-4 border-amber-500">
                                        <p className="text-sm font-semibold text-amber-700 mb-2">📋 SCENARIO:</p>
                                        <p className="text-gray-800 leading-relaxed">{puzzle.scenario}</p>
                                    </div>

                                    {/* Question */}
                                    <div className="bg-linear-to-r from-orange-100 to-amber-100 rounded-xl p-5 border-2 border-orange-300">
                                        <p className="text-sm font-semibold text-orange-700 mb-2">❓ QUESTION:</p>
                                        <p className="text-lg font-bold text-gray-900">{puzzle.question}</p>
                                    </div>

                                    {/* Hint Button */}
                                    {puzzle.hint && (
                                        <button
                                            onClick={() => toggleHint(puzzle.id)}
                                            className="mt-4 text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center gap-1 transition-colors"
                                        >
                                            💡 {showHints[puzzle.id] ? 'Hide Hint' : 'Show Hint'}
                                        </button>
                                    )}

                                    {/* Hint Display */}
                                    {showHints[puzzle.id] && puzzle.hint && (
                                        <div className="mt-3 bg-amber-50 border-2 border-amber-300 rounded-lg p-4 text-sm text-amber-900">
                                            <strong>💡 Hint:</strong> {puzzle.hint}
                                        </div>
                                    )}
                                </div>

                                {/* Answer Section */}
                                <div className="p-6">
                                    {puzzle.type === 'mcq' ? (
                                        // MCQ Options
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {puzzle.options?.map((option, optionIndex) => {
                                                const isSelected = userAnswer === optionIndex;
                                                const isCorrect = optionIndex === puzzle.correctAnswer;
                                                const showCorrect = showResults && isCorrect;
                                                const showIncorrect = showResults && isSelected && !isCorrect;

                                                return (
                                                    <button
                                                        key={optionIndex}
                                                        onClick={() => handleAnswerSelect(puzzle.id, optionIndex)}
                                                        disabled={showResults}
                                                        className={`p-5 rounded-xl border-2 text-left transition-all ${showCorrect
                                                            ? 'border-green-500 bg-green-50 shadow-lg'
                                                            : showIncorrect
                                                                ? 'border-red-500 bg-red-50 shadow-lg'
                                                                : isSelected
                                                                    ? 'border-amber-500 bg-amber-50 shadow-md'
                                                                    : 'border-gray-200 hover:border-amber-300 hover:shadow-md'
                                                            } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${showCorrect
                                                                    ? 'bg-green-500 text-white'
                                                                    : showIncorrect
                                                                        ? 'bg-red-500 text-white'
                                                                        : isSelected
                                                                            ? 'bg-amber-500 text-white'
                                                                            : 'bg-gray-200 text-gray-600'
                                                                    }`}>
                                                                    {String.fromCharCode(65 + optionIndex)}
                                                                </span>
                                                                <span className="text-base font-medium text-gray-800">{option}</span>
                                                            </div>
                                                            {showCorrect && <span className="text-3xl">✓</span>}
                                                            {showIncorrect && <span className="text-3xl">✗</span>}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        // Input Field
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Enter your answer:
                                                </label>
                                                <input
                                                    type="text"
                                                    value={(userAnswer as string) || ''}
                                                    onChange={(e) => handleInputChange(puzzle.id, e.target.value, puzzle.validationRegex)}
                                                    disabled={showResults}
                                                    placeholder="Type your answer here..."
                                                    className={`w-full px-6 py-4 text-xl font-mono border-2 rounded-xl transition-all ${showResults
                                                        ? result === 'correct'
                                                            ? 'border-green-500 bg-green-50'
                                                            : 'border-red-500 bg-red-50'
                                                        : inputErrors[puzzle.id]
                                                            ? 'border-red-500 focus:ring-red-500'
                                                            : 'border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500'
                                                        } ${showResults ? 'cursor-not-allowed' : ''} text-gray-900`}
                                                />
                                                {inputErrors[puzzle.id] && (
                                                    <p className="mt-2 text-sm text-red-600">{inputErrors[puzzle.id]}</p>
                                                )}
                                            </div>
                                            {showResults && (
                                                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                                                    <p className="text-sm font-semibold text-blue-900 mb-1">Correct Answer:</p>
                                                    <p className="font-mono text-xl text-blue-800">{puzzle.correctAnswer}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Explanation */}
                                    {showResults && result && (
                                        <div className={`mt-6 p-5 rounded-xl border-2 ${result === 'correct'
                                            ? 'bg-green-50 border-green-300'
                                            : 'bg-red-50 border-red-300'
                                            }`}>
                                            <p className={`font-bold text-lg mb-3 ${result === 'correct' ? 'text-green-800' : 'text-red-800'
                                                }`}>
                                                {result === 'correct' ? '✓ Correct! (+' + puzzle.points + ' points)' : '✗ Incorrect (0 points)'}
                                            </p>
                                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                <p className="text-sm font-semibold text-gray-700 mb-2">Explanation:</p>
                                                <p className="text-gray-800 leading-relaxed">{puzzle.explanation}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mb-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            ← Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg font-semibold shadow-sm ${currentPage === page
                                    ? 'bg-linear-to-r from-amber-600 to-orange-600 text-white'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            Next →
                        </button>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                    {!showResults ? (
                        <button
                            onClick={handleSubmit}
                            disabled={Object.keys(answers).length === 0}
                            className="bg-linear-to-r from-amber-600 to-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Solutions
                        </button>
                    ) : (
                        <button
                            onClick={handleReset}
                            className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            Try Again
                        </button>
                    )}
                </div>

                {/* Results Summary */}
                {showResults && (
                    <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-amber-500">
                        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                            🏆 Olympiad Results
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                                <div className="text-5xl font-bold text-blue-600 mb-2">{score.total}</div>
                                <div className="text-gray-600 font-medium">Puzzles Attempted</div>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                                <div className="text-5xl font-bold text-green-600 mb-2">{score.correct}</div>
                                <div className="text-gray-600 font-medium">Correct Solutions</div>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
                                <div className="text-5xl font-bold text-amber-600 mb-2">{score.points}</div>
                                <div className="text-gray-600 font-medium">Points Earned</div>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                                <div className="text-5xl font-bold text-purple-600 mb-2">{percentage}%</div>
                                <div className="text-gray-600 font-medium">Accuracy Rate</div>
                            </div>
                        </div>
                        <div className="text-center">
                            {percentage >= 80 ? (
                                <div className="space-y-3">
                                    <p className="text-2xl text-green-600 font-bold">🥇 Outstanding! Olympiad Champion Level!</p>
                                    <p className="text-gray-600">You've demonstrated exceptional mastery of numeral systems across cultures.</p>
                                </div>
                            ) : percentage >= 60 ? (
                                <div className="space-y-3">
                                    <p className="text-2xl text-blue-600 font-bold">🥈 Excellent Performance!</p>
                                    <p className="text-gray-600">Strong problem-solving skills. Review explanations to achieve mastery.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-2xl text-orange-600 font-bold">🥉 Keep Training!</p>
                                    <p className="text-gray-600">These are advanced puzzles. Study the explanations and try again!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
