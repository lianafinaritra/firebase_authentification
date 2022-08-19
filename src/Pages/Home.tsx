import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout, auth } from "../Config/Firebase";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.currentUser) {
            navigate('/');
        }
    }, [navigate]);

    const handleClick = async () => {
        try {
            await logout();
            navigate('/')
        } catch (e) {
            console.error(e);
        }
    }

    return (
            <div className="raise">
                <div className="test">
                <button className="raiseBtn" onClick={handleClick}>Sign out</button>
                </div>
            </div>
    );
}

export default Home;