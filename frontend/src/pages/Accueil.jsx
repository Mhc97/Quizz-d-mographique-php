import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Accueil = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('normal');
    const [pseudo, setPseudo] = useState('');

    const startQuiz = () => {
        if (pseudo.trim() === '') { alert('Entre un pseudo'); return; }
        navigate('/quiz', { state: { mode, pseudo } });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Georgia, serif' }}>
            
            <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                Quizz Démographique
            </h1>
            <p style={{ color: '#a0a0b0', marginBottom: '3rem', fontSize: '1rem' }}>
                Teste tes connaissances sur les pays du monde
            </p>

            <div style={{ background: '#16213e', borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '420px', border: '1px solid #2a2a4a' }}>
                
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ color: '#a0a0b0', fontSize: '0.85rem', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Ton pseudo
                    </label>
                    <input
                        type="text"
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        placeholder="Entre ton pseudo..."
                        style={{ width: '100%', background: '#0f3460', border: '1px solid #2a2a4a', borderRadius: '8px', padding: '0.75rem 1rem', color: '#fff', fontSize: '1rem', outline: 'none', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ color: '#a0a0b0', fontSize: '0.85rem', display: 'block', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Mode de jeu
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                        <button
                            onClick={() => setMode('normal')}
                            style={{ padding: '1rem', borderRadius: '10px', border: `2px solid ${mode === 'normal' ? '#e94560' : '#2a2a4a'}`, background: mode === 'normal' ? '#e9456022' : 'transparent', color: mode === 'normal' ? '#e94560' : '#a0a0b0', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '0.95rem', transition: 'all .2s' }}
                        >
                            🎯 Normal
                        </button>
                        <button
                            onClick={() => setMode('chrono')}
                            style={{ padding: '1rem', borderRadius: '10px', border: `2px solid ${mode === 'chrono' ? '#f5a623' : '#2a2a4a'}`, background: mode === 'chrono' ? '#f5a62322' : 'transparent', color: mode === 'chrono' ? '#f5a623' : '#a0a0b0', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '0.95rem', transition: 'all .2s' }}
                        >
                            ⏱️ Chrono
                        </button>
                    </div>
                </div>

                <button
                    onClick={startQuiz}
                    style={{ width: '100%', background: '#e94560', border: 'none', borderRadius: '10px', padding: '1rem', color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Georgia, serif', letterSpacing: '0.05em', transition: 'background .2s' }}
                    onMouseOver={e => e.target.style.background = '#c73652'}
                    onMouseOut={e => e.target.style.background = '#e94560'}
                >
                    ▶ Commencer le quiz
                </button>
            </div>
        </div>
    );
};

export default Accueil;