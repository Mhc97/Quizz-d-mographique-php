import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { saveScore } from "../services/api";

const Resultats = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {score, total, pseudo, mode} = location.state || {score: 0, total: 10, pseudo: 'Anonyme', mode: 'normal'};
    const percent = Math.round((score / total) * 100);

    useEffect(() =>{
        saveScore(pseudo, score, mode);
    }, [pseudo, score, mode]);

    const getMessage = () => {
      if (percent >= 80) return {text: 'Excelent !', icon:'🏆', color:'#f5a623'};
      if (percent >= 50) return {text: 'Bien joué !', icon:'👍', color:'#4caf50'};
      return {text: 'Continue !', icon: '📚', color: '#e94560'};
    }
    const msg = getMessage();
    
           return (
        <div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Georgia, serif' }}>

            <div style={{ background: '#16213e', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '400px', border: '1px solid #2a2a4a', textAlign: 'center' }}>
                
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
                <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Résultat
                </h2>
                <p style={{ color: '#a0a0b0', fontSize: '0.85rem', marginBottom: '2rem' }}>{pseudo}</p>

                <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: msg.color, marginBottom: '0.5rem' }}>
                    {score * 10}/100
                </div>
                <p style={{ color: '#a0a0b0', marginBottom: '1.5rem' }}>{score} bonnes réponses sur {total}</p>

                <div style={{ background: '#0f3460', borderRadius: '999px', height: '8px', marginBottom: '1rem', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${percent}%`, background: msg.color, borderRadius: '999px', transition: 'width 1s ease' }} />
                </div>
                <p style={{ color: '#a0a0b0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{percent}%</p>

                <p style={{ color: msg.color, fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                    {msg.icon} {msg.text}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{ padding: '0.9rem', borderRadius: '10px', border: '2px solid #2a2a4a', background: 'transparent', color: '#a0a0b0', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '0.95rem' }}
                    >
                        🏠 Accueil
                    </button>
                    <button
                        onClick={() => navigate('/quiz', { state: { mode, pseudo } })}
                        style={{ padding: '0.9rem', borderRadius: '10px', border: 'none', background: '#e94560', color: '#fff', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '0.95rem', fontWeight: 'bold' }}
                    >
                        🔄 Rejouer
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Resultats;