import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    return(
         <nav style={{ background: '#16213e', borderBottom: '1px solid #2a2a4a', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span onClick={() => navigate('/')} style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
                🌍 Quizz Démographique
            </span>
        </nav>
    );
};

export default Navbar;