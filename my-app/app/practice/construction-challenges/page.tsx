'use client';

import { constructionQuestions, ConstructionQuestion } from '@/data/construction-challenges';
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
    const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
    const [selectedSystem, setSelectedSystem] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<'all' | 'mcq' | 'input'>('all');
    const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});
    const [inputErrors, setInputErrors] = useState<{ [key: number]: string }>({});

    const questionsPerPage = 5;

    const filteredQuestions = constructionQuestions.filter(q => {
        const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
        const matchesSystem = selectedSystem === 'all' || q.system === selectedSystem;
        const matchesType = selectedType === 'all' || q.type === selectedType;
        return matchesDifficulty && matchesSystem && matchesType;
    });

    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
    const startIndex = (currentPage - 1) * questionsPerPage;
    const currentQuestions = filteredQuestions.slice(startIndex, startIndex + questionsPerPage);

    const allSystems = Array.from(new Set(constructionQuestions.map(q => q.system)));

    const handleAnswerSelect = (questionId: number, answer: string | number) => {
        if (!showResults) {
            setAnswers(prev => ({ ...prev, [questionId]: answer }));
            setInputErrors(prev => ({ ...prev, [questionId]: '' }));
        }
    };

    const handleInputChange = (questionId: number, value: string, regex?: string) => {
        if (!showResults) {
            // Validate input if regex is provided
            if (regex && value && !new RegExp(regex).test(value)) {
                setInputErrors(prev => ({
                    ...prev,
                    [questionId]: 'Invalid characters. Please use only the specified symbols.'
                }));
            } else {
                setInputErrors(prev => ({ ...prev, [questionId]: '' }));
            }
            setAnswers(prev => ({ ...prev, [questionId]: value.trim() }));
        }
    };

    const normalizeAnswer = (answer: string): string => {
        return answer.toUpperCase().replace(/\s+/g, '');
    };

    const handleSubmit = () => {
        const newResults: ResultState = {};
        let hasErrors = false;

        filteredQuestions.forEach(question => {
            if (answers[question.id] !== undefined) {
                const userAnswer = answers[question.id];
                const correctAnswer = question.correctAnswer;

                let isCorrect = false;

                if (question.type === 'mcq') {
                    isCorrect = userAnswer === correctAnswer;
                } else {
                    // For input type, normalize and compare
                    const normalizedUser = normalizeAnswer(String(userAnswer));
                    const normalizedCorrect = normalizeAnswer(String(correctAnswer));
                    isCorrect = normalizedUser === normalizedCorrect;
                }

                newResults[question.id] = isCorrect ? 'correct' : 'incorrect';
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

    const toggleHint = (questionId: number) => {
        setShowHints(prev => ({ ...prev, [questionId]: !prev[questionId] }));
    };

    const calculateScore = () => {
        const answeredQuestions = Object.keys(answers).length;
        const correctAnswers = Object.values(results).filter(r => r === 'correct').length;
        return { correct: correctAnswers, total: answeredQuestions };
    };

    const score = calculateScore();
    const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            case 'hard': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getSystemColor = (system: string) => {
        const colors: { [key: string]: string } = {
            'Roman': 'bg-red-50 text-red-700 border-red-200',
            'Mayan': 'bg-green-50 text-green-700 border-green-200',
            'Chinese': 'bg-yellow-50 text-yellow-700 border-yellow-200',
            'Binary': 'bg-gray-50 text-gray-700 border-gray-200',
            'Egyptian': 'bg-amber-50 text-amber-700 border-amber-200',
            'Greek': 'bg-purple-50 text-purple-700 border-purple-200',
            'Babylonian': 'bg-blue-50 text-blue-700 border-blue-200',
        };
        return colors[system] || 'bg-blue-50 text-blue-700 border-blue-200';
    };

    const getTypeIcon = (type: string) => {
        return type === 'mcq' ? '☑️' : '✍️';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Header */}
            <div className="bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <Link href="/practice" className="inline-flex items-center text-purple-100 hover:text-white mb-4 transition">
                        ← Back to Practice Zone
                    </Link>
                    <h1 className="text-5xl font-bold mb-4">
                        Construction Challenges
                    </h1>
                    <p className="text-xl text-purple-100 max-w-3xl">
                        Build numbers across cultural systems with precision and creativity
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters and Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    {/* Difficulty Filter */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Difficulty</h3>
                        <div className="space-y-2">
                            {(['all', 'easy', 'medium', 'hard'] as const).map((level) => (
                                <button
                                    key={level}
                                    onClick={() => {
                                        setSelectedDifficulty(level);
                                        setCurrentPage(1);
                                    }}
                                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${selectedDifficulty === level
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* System Filter */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">System</h3>
                        <select
                            value={selectedSystem}
                            onChange={(e) => {
                                setSelectedSystem(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
                        >
                            <option value="all">All Systems</option>
                            {allSystems.map(system => (
                                <option key={system} value={system}>{system}</option>
                            ))}
                        </select>
                    </div>

                    {/* Type Filter */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Type</h3>
                        <div className="space-y-2">
                            {(['all', 'mcq', 'input'] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setSelectedType(type);
                                        setCurrentPage(1);
                                    }}
                                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${selectedType === type
                                        ? 'bg-pink-600 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {type === 'all' ? 'All Types' : type === 'mcq' ? 'Multiple Choice' : 'Input Answer'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Score Display */}
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="font-semibold mb-3">Your Score</h3>
                        <div className="text-4xl font-bold mb-2">
                            {score.correct} / {score.total}
                        </div>
                        <div className="text-sm opacity-90">
                            {percentage}% Correct
                        </div>
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-6 mb-8">
                    {currentQuestions.map((question, index) => {
                        const isAnswered = answers[question.id] !== undefined;
                        const userAnswer = answers[question.id];
                        const result = results[question.id];

                        return (
                            <div
                                key={question.id}
                                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all ${result === 'correct' ? 'ring-2 ring-green-500' : result === 'incorrect' ? 'ring-2 ring-red-500' : ''
                                    }`}
                            >
                                {/* Question Header */}
                                <div className="bg-linear-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3 flex-1">
                                            <span className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                                {startIndex + index + 1}
                                            </span>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{question.question}</h3>
                                                <p className="text-sm text-gray-600 italic">{question.task}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                                                {getTypeIcon(question.type)} {question.type.toUpperCase()}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                                                {question.difficulty}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSystemColor(question.system)}`}>
                                                {question.system}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hint Button */}
                                    {question.hint && (
                                        <button
                                            onClick={() => toggleHint(question.id)}
                                            className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                                        >
                                            💡 {showHints[question.id] ? 'Hide Hint' : 'Show Hint'}
                                        </button>
                                    )}

                                    {/* Hint Display */}
                                    {showHints[question.id] && question.hint && (
                                        <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg p-3 text-sm text-purple-800">
                                            💡 <strong>Hint:</strong> {question.hint}
                                        </div>
                                    )}
                                </div>

                                {/* Answer Section */}
                                <div className="p-6">
                                    {question.type === 'mcq' ? (
                                        // MCQ Options
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {question.options?.map((option, optionIndex) => {
                                                const isSelected = userAnswer === optionIndex;
                                                const isCorrect = optionIndex === question.correctAnswer;
                                                const showCorrect = showResults && isCorrect;
                                                const showIncorrect = showResults && isSelected && !isCorrect;

                                                return (
                                                    <button
                                                        key={optionIndex}
                                                        onClick={() => handleAnswerSelect(question.id, optionIndex)}
                                                        disabled={showResults}
                                                        className={`p-4 rounded-xl border-2 text-left transition-all ${showCorrect
                                                            ? 'border-green-500 bg-green-50'
                                                            : showIncorrect
                                                                ? 'border-red-500 bg-red-50'
                                                                : isSelected
                                                                    ? 'border-purple-500 bg-purple-50'
                                                                    : 'border-gray-200 hover:border-purple-300'
                                                            } ${showResults ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${showCorrect
                                                                    ? 'bg-green-500 text-white'
                                                                    : showIncorrect
                                                                        ? 'bg-red-500 text-white'
                                                                        : isSelected
                                                                            ? 'bg-purple-500 text-white'
                                                                            : 'bg-gray-200 text-gray-600'
                                                                    }`}>
                                                                    {String.fromCharCode(65 + optionIndex)}
                                                                </span>
                                                                <span className="text-lg font-medium text-gray-800 break-all">{option}</span>
                                                            </div>
                                                            {showCorrect && <span className="text-2xl">✓</span>}
                                                            {showIncorrect && <span className="text-2xl">✗</span>}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        // Input Field
                                        <div className="space-y-3">
                                            <div>
                                                <input
                                                    type="text"
                                                    value={(userAnswer as string) || ''}
                                                    onChange={(e) => handleInputChange(question.id, e.target.value, question.validationRegex)}
                                                    disabled={showResults}
                                                    placeholder="Enter your answer here..."
                                                    className={`w-full px-6 py-4 text-2xl font-mono border-2 rounded-xl transition-all ${showResults
                                                        ? result === 'correct'
                                                            ? 'border-green-500 bg-green-50'
                                                            : 'border-red-500 bg-red-50'
                                                        : inputErrors[question.id]
                                                            ? 'border-red-500 focus:ring-red-500'
                                                            : 'border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500'
                                                        } ${showResults ? 'cursor-not-allowed' : ''} text-gray-900`}
                                                />
                                                {inputErrors[question.id] && (
                                                    <p className="mt-2 text-sm text-red-600">{inputErrors[question.id]}</p>
                                                )}
                                            </div>
                                            {showResults && (
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                    <p className="text-sm text-blue-800">
                                                        <strong>Correct Answer:</strong> <span className="font-mono text-lg">{question.correctAnswer}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Explanation */}
                                    {showResults && result && (
                                        <div className={`mt-4 p-4 rounded-lg ${result === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                                            }`}>
                                            <p className={`font-semibold mb-2 ${result === 'correct' ? 'text-green-800' : 'text-red-800'
                                                }`}>
                                                {result === 'correct' ? '✓ Correct!' : '✗ Incorrect'}
                                            </p>
                                            <p className="text-gray-700 text-sm">{question.explanation}</p>
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
                            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ← Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-lg font-semibold ${currentPage === page
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                            className="bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Answers
                        </button>
                    ) : (
                        <button
                            onClick={handleReset}
                            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            Try Again
                        </button>
                    )}
                </div>

                {/* Results Summary */}
                {showResults && (
                    <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                            Challenge Complete!
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div className="text-center p-6 bg-purple-50 rounded-xl">
                                <div className="text-4xl font-bold text-purple-600 mb-2">{score.total}</div>
                                <div className="text-gray-600">Questions Attempted</div>
                            </div>
                            <div className="text-center p-6 bg-green-50 rounded-xl">
                                <div className="text-4xl font-bold text-green-600 mb-2">{score.correct}</div>
                                <div className="text-gray-600">Correct Constructions</div>
                            </div>
                            <div className="text-center p-6 bg-pink-50 rounded-xl">
                                <div className="text-4xl font-bold text-pink-600 mb-2">{percentage}%</div>
                                <div className="text-gray-600">Accuracy</div>
                            </div>
                        </div>
                        <div className="text-center text-gray-600">
                            {percentage >= 80 ? (
                                <p className="text-xl text-green-600 font-semibold">🎉 Outstanding! You're a master constructor!</p>
                            ) : percentage >= 60 ? (
                                <p className="text-xl text-purple-600 font-semibold">👏 Great work! Keep building your skills.</p>
                            ) : (
                                <p className="text-xl text-orange-600 font-semibold">💪 Keep practicing! Construction mastery takes time.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
