import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
    const [loggedIn, setLoggedIn] = useState(false)
    const {state} = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        console.log('INIT : '+ state)
        if(!state){ 
            navigate('/login') 
        }else{
            setLoggedIn(true)
        }
    },[])

    return (
        <div style={styles.root}>
            {loggedIn && <div style={{color:"lightgreen",fontWeight:600}}>Oled sisse logitud</div>}
            <div style={{marginBottom:50, width:"100%", overflow:"hidden"}}>
                <div style={{overflow:"auto"}}>{state && JSON.stringify(state)}</div>
            </div>
            <div>
                <div>
                    <img src={state?.picture?.data?.url}/>
                </div>
                <div>
                    <h3>{state?.name || "kasutaja"}</h3>
                    <h4>{state?.email || "email"}</h4>
                </div>
            </div>
            
        </div>
    )

    
}
const styles = {
    root:{
        padding: 50,
        overFlow: "hidden"
    }
}

export default Home;
