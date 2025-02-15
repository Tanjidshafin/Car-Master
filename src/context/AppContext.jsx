import { createContext, use, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
import swal from "sweetalert";
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
                const newUser = res.user;
                return updateProfile(newUser, {
                    displayName: name,
                    photoURL: image
                }).then(() => {
                    setUser({ ...newUser, displayName: name, photoURL: image });
                    swal({
                        title: "Welcome!",
                        text: `Welcome ${name}!`,
                        icon: "success",
                        button: "Okay",
                    });

                    localStorage.setItem("user", JSON.stringify({ ...newUser, displayName: name, photoURL: image }));
                    return newUser;
                });
            })
    };

    const handleLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                const loggedInUser = res.user;
                setUser(loggedInUser);
                swal({
                    title: "Welcome Back!",
                    text: `Welcome Back ${loggedInUser.displayName || "User"}`,
                    icon: "success",
                    button: "Okay",
                });
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                return loggedInUser;
            })
    };


    const value = { handleRegister, user, handleLogin, loading, setUser }
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
export default AppContextProvider;