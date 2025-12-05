'use client';

import { Breadcrumb } from '@/components/Breadcrumb';
import { numeralSystems } from '@/data/system';
import Link from 'next/link';
import { useState } from 'react';
import { GoArrowUpRight } from "react-icons/go";




const Page = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBase, setSelectedBase] = useState<number | 'all'>('all');

    const filteredSystems = numeralSystems.filter(system => {
        const matchesSearch = system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            system.culture.toLowerCase().includes(searchTerm.toLowerCase()) ||
            system.region.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBase = selectedBase === 'all' || system.base === selectedBase;
        return matchesSearch && matchesBase;
    });

    const uniqueBases = Array.from(new Set(numeralSystems.map(s => s.base))).sort((a, b) => a - b);

    return (
        <div className="min-h-screen bg-linear-to-r from-slate-50 via-blue-50 to-indigo-50">
            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Header Section */}
            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h1 className="text-5xl font-bold mb-4 text-center">
                        Numeral Systems Library
                    </h1>
                    <p className="text-xl text-center text-indigo-100 max-w-3xl mx-auto">
                        Explore how different cultures throughout history have represented and conceptualized numbers
                    </p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                Search Systems
                            </label>
                            <input
                                id="search"
                                type="text"
                                placeholder="Search by name, culture, or region..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border text-gray-900 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-indigo-500 focus:border-transparent transition"
                            />
                        </div>

                        {/* Base Filter */}
                        <div className="md:w-64">
                            <label htmlFor="base-filter" className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Base
                            </label>
                            <select
                                id="base-filter"
                                value={selectedBase}
                                onChange={(e) => setSelectedBase(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                                className="w-full px-4 py-3 rounded-lg border text-gray-900 border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-indigo-500 hover:cursor-pointer focus:border-transparent transition"
                            >
                                <option value="all">All Bases</option>
                                {uniqueBases.map(base => (
                                    <option key={base} value={base}>Base {base}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {filteredSystems.length} of {numeralSystems.length} systems
                    </div>
                </div>

                {/* Systems Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSystems.map((system) => (
                        <div
                            key={system.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Card Header */}
                            <div className={`bg-linear-to-r ${system.color} p-6 text-white`}>
                                <h3 className="text-2xl font-bold mb-2">{system.name}</h3>
                                <p className="text-sm opacity-90">{system.culture} • {system.region}</p>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                {/* Period and Base */}
                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full font-medium">
                                        📅 {system.period}
                                    </span>
                                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                                        Base {system.base}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    {system.description}
                                </p>

                                {/* Example */}
                                <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-4">
                                    <p className="text-xs text-gray-500 mb-1">Example ({system.exampleValue}):</p>
                                    <p className="text-2xl font-bold text-gray-800">{system.example}</p>
                                </div>

                                {/* Characteristics */}
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-row justify-between'>
                                        <p className="text-xs font-semibold text-gray-700 mb-2">Key Characteristics:</p>
                                        <Link href={`/library/${system.id}`} target="_blank" rel="noopener noreferrer" className={`text-indigo-600 group hover:underline underline-offset-2 hover:cursor-pointer hover:-translate-y-0.5 hover:text-indigo-800 flex items-center text-xs font-medium`}>
                                            Read more<GoArrowUpRight className="ml-1 group-hover:scale-125" />
                                        </Link>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {system.characteristics.map((char, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full"
                                            >
                                                {char}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredSystems.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-2xl text-gray-400">No systems found matching your criteria</p>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;