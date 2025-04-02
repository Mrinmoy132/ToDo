import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const handleclick = ()=>{
        navigate("/");
    }
    return (
        <div className='notfound'>
            <div className='btn_div'>
                <div className='error'>404</div>
                <h1 style={{ color: 'rgb(114 90 90)' }}>You are Lost</h1>
                <h4 style={{ color: 'rgb(114 90 90)', textAlign: 'center' }}>Oops! The page you are looking for does not exist. It might have been moved or delete</h4>
            </div>
            <div className='btn_div'>
                <h3 style={{ color: 'rgb(114 90 90)', textAlign: 'center' }}> Click bellow button to go to the HomePage</h3>
                <div className='btn_home' onClick={handleclick}>Back to Home</div>
            </div>
        </div>
    )
}

export default NotFound;
