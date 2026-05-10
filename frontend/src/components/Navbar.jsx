import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    
    const linkStyle = {
        color: '#a0a0b0',
        cursor: 'pointer',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        fontFamily: 'Georgia, serif',
        fontSize: '0.95rem',
        transition: 'background 0.2s, color 0.2s',
        display: 'block',
    };

    const go = (path, state) => {
        navigate(path, state ? {state} : undefined);
        setOpen(false);
    };

    return(
         <nav style={{ background: '#16213e', borderBottom: '1px solid #2a2a4a', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span onClick={() => navigate('/')} style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
                🌍 Quizz Démographique
            </span>
       
        {/* les liens pour desktop first*/}
        <div className="nav_desktop" style={{display: 'flex', gap: '0.5rem'}}>
            <span onClick={() => go('/')} style={linkStyle} onMouseOver={e => { e.target.style.background = '#0f3460'; e.target.style.color = '#fff'; }} onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#a0a0b0'; }}>🏠Accueil</span>
            <span onClick={() => go('/quiz', { mode: 'normal', pseudo: '' })} style={linkStyle} onMouseOver={e => { e.target.style.background = '#0f3460'; e.target.style.color = '#fff'; }} onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#a0a0b0'; }}>🎯 Jouer</span>
        </div>
             {/* Bouton hamburger mobile*/}

        <button
                    onClick={() => setOpen(!open)}
                    className="nav-hamburger"
                    style={{ background: 'none', border: '1px solid #2a2a4a', borderRadius: '8px', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', padding: '0.4rem 0.7rem', lineHeight: 1 }}
                    aria-label="Menu"
                >
                    {open ? '✕' : '☰'}
                </button>
            
            
            {/*Menu mobile déroutant*/} 

            {open && (
                <div
                    className="nav-mobile"
                    style={{ marginTop: '0.75rem', borderTop: '1px solid #2a2a4a', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
                >
                    <span onClick={() => go('/')} style={linkStyle} onMouseOver={e => { e.target.style.background = '#0f3460'; e.target.style.color = '#fff'; }} onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#a0a0b0'; }}>🏠 Accueil</span>
                    <span onClick={() => go('/quiz', { mode: 'normal', pseudo: '' })} style={linkStyle} onMouseOver={e => { e.target.style.background = '#0f3460'; e.target.style.color = '#fff'; }} onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#a0a0b0'; }}>🎯 Jouer</span>
                </div>
            )}

 </nav>
       


    );
};

export default Navbar;