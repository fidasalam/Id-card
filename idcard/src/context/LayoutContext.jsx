import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [layout, setLayout] = useState({
        components: [], // Store components with their styles and positions
    });

    return (
        <LayoutContext.Provider value={{ layout, setLayout }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => {
    return useContext(LayoutContext);
};
