import { createContext, useEffect, useState } from "react";
import axios from "axios";

    export  const UserContext = createContext({});

    export function UserContextProvider({children}) {
        const [user, setUser] = useState(null);
        const [ready, setReady] = useState(false);

        async function logout(){
            await axios.post("/logout");
            setUser(null);
        }
        
        useEffect(() => {
            if (!user) {
                axios.get("/profile")
                .then(({data}) => {
                    setUser(data); 
                    setReady(true);
                })
            }
        }, [])

        return (
            <UserContext.Provider value={{user, setUser, ready, logout}}>
                {children}
            </UserContext.Provider>
        )
    }