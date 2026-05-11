import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // État du menu hamburger (ouvert ou fermé)
    const [menuOpen, setMenuOpen] = useState(true);

    // Ferme le menu et navigue vers une page
    const goTo = (path) => {
        setMenuOpen(false);
        navigate(path);
    };

    return (
        <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">

            <div className="flex items-center justify-between px-4 py-3">

                {/* Hamburger — UNIQUEMENT sur mobile (md:hidden) */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex flex-col justify-center gap-1.5 w-8 h-8 focus:outline-none md:hidden"
                    aria-label="Menu"
                >
                    <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>

                {/* Titre */}
                <span
                    onClick={() => goTo('/')}
                    className="text-white font-bold text-sm md:text-base cursor-pointer select-none whitespace-nowrap"
                >
                    🌍 Quizz Démographique
                </span>

                {/* Liens desktop — cachés sur mobile (hidden md:flex) */}
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={() => goTo('/')} className="text-gray-300 hover:text-white transition text-sm">
                        🏠 Accueil
                    </button>
                    <button onClick={() => goTo('/quiz')} className="text-gray-300 hover:text-white transition text-sm">
                        🎯 Jouer
                    </button>
                </div>

                {/* Boutons décoratifs (maquette) — cachés sur mobile */}
                <div className="hidden md:flex items-center gap-2">
                    <span className="w-5 h-5 border border-gray-400 rounded-sm block" />
                    <span className="w-5 h-5 border border-gray-400 rounded-sm block" />
                    <span className="w-5 h-5 bg-gray-400 rounded-full block" />
                </div>

                {/* Boutons décoratifs mobile */}
                <div className="flex md:hidden items-center gap-2">
                    <span className="w-4 h-4 border border-gray-400 rounded-sm block" />
                    <span className="w-4 h-4 border border-gray-400 rounded-sm block" />
                    <span className="w-4 h-4 bg-gray-400 rounded-full block" />
                </div>
            </div>

            {/* Menu déroulant mobile uniquement */}
            {menuOpen && (
                <div className="md:hidden bg-gray-900 border-t border-gray-700 px-4 py-3 flex flex-col gap-2">
                    <button onClick={() => goTo('/')} className="text-left text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition">
                        🏠 Accueil
                    </button>
                    <button onClick={() => goTo('/quiz')} className="text-left text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition">
                        🎯 Jouer
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;