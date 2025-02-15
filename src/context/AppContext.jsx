import { createContext, use, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
export const AppContext = createContext();
const AppContextProvider = (props) => {
    const locations = useLocation()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(() => {
        const users = JSON.parse(localStorage.getItem("user"))
        return users || null
    })
    useEffect(() => window.scrollTo(0, 0), [locations.pathname])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                localStorage.removeItem("user");
            }
            setLoading(false)
        })
        return unsubscribe
    }, [])
    const handleRegister = (email, password, name, image) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                return updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: image
                }).then(() => {
                    return () =>
                        setUser(auth.currentUser)
                });
            })
    };
    const handleLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                const loggedInUser = res.user;
                setUser(loggedInUser);
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                return loggedInUser;
            })
    }

    const value = { handleRegister, user }
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
export default AppContextProvider;