# Numeral Systems Explorer

A comprehensive educational platform for exploring, learning, and practicing various numeral systems used across different cultures and historical periods. This application bridges mathematics, linguistics, and cultural studies through interactive learning experiences.

## Overview

Numeral Systems Explorer provides an in-depth examination of how different civilizations conceptualized and represented numbers. From ancient Egyptian hieroglyphics to modern binary notation, this platform offers:

- Interactive conversions between numeral systems
- Detailed educational materials on 10+ numeral systems
- Practice challenges across three difficulty levels
- Olympiad-style puzzles combining linguistic and mathematical reasoning
- Step-by-step explanations for all conversions and solutions

## Features

### 1. Library of Numeral Systems

Comprehensive documentation of historical and modern numeral systems with:

- **Base Structure**: Understanding fundamental symbols and their values
- **Morphology & Construction Rules**: How numbers are formed in each system
- **Hierarchical Logic**: Position and place value explanations
- **Historical Context**: Cultural significance and real-world applications
- **Interactive Examples**: Live conversion tools and visual breakdowns

Supported systems:
- Roman Numerals
- Mayan Numerals
- Chinese Numerals
- Egyptian Hieroglyphics
- Greek Numerals
- Babylonian Numerals
- Yoruba Numerals
- Inuktitut Numerals
- Binary
- Arabic Numerals

### 2. Number System Converter

A dual-mode converter allowing conversions between Arabic numerals and any supported system with:

- Real-time conversion feedback
- Step-by-step algorithmic breakdown
- System-specific conversion tips
- Visual organization for complex conversions

### 3. Practice Zone

Three progressive challenge categories:

#### Pattern Identification
- 20 problems across difficulty levels
- Recognize patterns in various numeral systems
- Develop sequence completion skills
- Foundation for advanced problem-solving

#### Construction Challenges
- 20 intermediate to advanced problems
- Build specific numbers using system rules
- Apply understanding of morphological principles
- Master multiple numeral systems

#### Olympiad Puzzles
- 20 expert-level challenges
- Contains linguistics and mathematics problems
- Competition-style questions
- Four categories: linguistic, mathematical, cross-cultural, decoding

### 4. Navigation & Accessibility

- Modern breadcrumb navigation
- Responsive design for all screen sizes
- Intuitive filtering and search capabilities
- Accessibility-first component design

## Technology Stack

- **Framework**: Next.js 16 with React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **UI Components**: Custom-built with accessibility in mind

## Project Structure

├── app/
│   ├── layout.tsx         # Global structure
│   ├── page.tsx           # Home page
│   ├── converter/
│   │   └── page.tsx       # Main client component for converter
│   └── library/
│       ├── page.tsx       # System List
│       └── [system.id]/
│           └── page.tsx   # System Detail
├── components/
│   ├──Breadcrumb.tsx    # Handles Breadcrumb component used acroos pages
|
├── lib/
│   ├── converter.ts       # CORE LOGIC: arabicToSystem, systemToArabic
|
└── data/
    ├── systems.ts                 # JSON/JS Object of all numeral systems
    └── construction-challenges.ts # Data for construction challenges problem set
    └── pattern-identification.ts  # Data for pattern identification problem set
    └── olympiad-puzzles           # Data for olympiad puzzles problem set
