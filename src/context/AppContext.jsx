import { createContext, useEffect } from "react";
import { useLocation } from "react-router";

export const AppContext = createContext();
const AppContextProvider = (props) => {
    const locations = useLocation()
    useEffect(() => window.scrollTo(0, 0), [locations.pathname])
    const value = {}
    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
}
export default AppContextProvider;