import React, { createContext, useContext } from "react";

const Context = createContext(null);

// Hook to use the User Context
export const UseContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

// Context Provider
export const ContextProvider = ({ children, value }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
};
