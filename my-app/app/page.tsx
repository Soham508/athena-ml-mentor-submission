import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-r from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Explore the World of
              <span className="block bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2">
                Numbers Across Cultures
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover how different civilizations throughout history have represented,
              expressed, and conceptualized numbers. An interactive journey through mathematical diversity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/library"
                className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Explore Systems Library
              </Link>
              <Link
                href="/converter"
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-50 transition-all duration-300"
              >
                Try Converter
              </Link>
            </div>
          </div>

          {/* Floating Number Examples */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { system: 'Roman', example: 'XII', value: '12' },
              { system: 'Mayan', example: '●● ▬', value: '12' },
              { system: 'Chinese', example: '十二', value: '12' },
              { system: 'Arabic', example: '١٢', value: '12' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-xs text-gray-500 mb-1">{item.system}</p>
                <p className="text-2xl font-bold text-gray-800">{item.example}</p>
                <p className="text-xs text-indigo-600 mt-1">= {item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Interactive Learning Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three powerful tools to explore, convert, and master numeral systems from around the world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 h-80 ">
            {/* Feature 1 - Library */}
            <Link href="/library" className="group">
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 h-full rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Systems Library</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Browse a comprehensive catalog of numeral systems from Roman and Mayan to Chinese and Babylonian.
                  Discover their history, characteristics, and cultural significance.
                </p>
                <div className="flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
                  Explore Library
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Feature 2 - Converter */}
            <Link href="/converter" className="group">
              <div className="bg-linear-to-r from-purple-50 to-pink-50 h-full rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🔄</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Converter Engine</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Convert numbers between Arabic numerals and various cultural systems with step-by-step explanations.
                  Understand the transformation logic at each stage.
                </p>
                <div className="flex items-center text-purple-600 font-semibold group-hover:gap-2 transition-all">
                  Try Converter
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>

            {/* Feature 3 - Practice */}
            <Link href="/practice" className="group">
              <div className="bg-linear-to-r from-amber-50 to-orange-50 h-full rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-linear-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Practice Zone</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Challenge yourself with Olympiad-style puzzles featuring pattern identification,
                  construction challenges, and linguistics problems.
                </p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  Start Practicing
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Explore Section */}
      <section className="py-20 bg-linear-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Explore Numeral Systems?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding different number systems reveals the rich diversity of human mathematical thinking
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cultural Diversity</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover how cultures from Ancient Rome to the Maya civilization, from China to Africa,
                developed unique ways to represent and work with numbers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🧮</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Historical Context</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn about the historical development of number systems, from ancient Babylonian
                base-60 to modern binary systems that power our digital world.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Engage with interactive tools and visualizations that make understanding different
                numeral systems intuitive and memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Systems Showcase Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Numeral Systems
            </h2>
            <p className="text-xl text-gray-600">
              From ancient civilizations to modern mathematics
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Roman Numerals',
                region: 'Ancient Rome',
                color: 'from-red-500 to-orange-500',
                icon: '🏛️',
                description: 'Still used today in clocks, books, and monuments'
              },
              {
                name: 'Mayan System',
                region: 'Mesoamerica',
                color: 'from-green-500 to-teal-500',
                icon: '🗿',
                description: 'Innovative base-20 system with zero concept'
              },
              {
                name: 'Chinese Numerals',
                region: 'China',
                color: 'from-yellow-500 to-amber-500',
                icon: '🏮',
                description: 'Character-based system used for millennia'
              },
              {
                name: 'Babylonian',
                region: 'Mesopotamia',
                color: 'from-blue-500 to-indigo-500',
                icon: '📜',
                description: 'Base-60 system influencing time measurement'
              },
              {
                name: 'Arabic-Indic',
                region: 'Middle East & India',
                color: 'from-emerald-500 to-green-500',
                icon: '🕌',
                description: 'Foundation of modern decimal system'
              },
              {
                name: 'Binary System',
                region: 'Modern Computing',
                color: 'from-slate-600 to-gray-700',
                icon: '💻',
                description: 'The language of computers and digital age'
              }
            ].map((system, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`bg-linear-to-r ${system.color} p-6 text-white`}>
                  <span className="text-4xl mb-2 block">{system.icon}</span>
                  <h3 className="text-xl font-bold">{system.name}</h3>
                  <p className="text-sm opacity-90">{system.region}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{system.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/library"
              className="inline-block bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View All Systems →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Explore how mathematics transcends cultural boundaries while celebrating its diversity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/library"
              className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Browse Library
            </Link>
            <Link
              href="/converter"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Convert Numbers
            </Link>
            <Link
              href="/practice"
              className="inline-block bg-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Practice Puzzles
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Athena</h3>
            <p className="text-gray-400 mb-6">
              Interactive Learning Platform for Cultural Mathematics
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/library" className="hover:text-white transition">Library</Link>
              <span>•</span>
              <Link href="/converter" className="hover:text-white transition">Converter</Link>
              <span>•</span>
              <Link href="/practice" className="hover:text-white transition">Practice</Link>
              <span>•</span>
              <a href="#" className="hover:text-white transition">About</a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              © 2024 Athena Learning Platform. Celebrating mathematical diversity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
