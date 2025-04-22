import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [menus, setMenus] = useState([]);
  const [items, setItems] = useState([]);

  return (
    <GlobalContext.Provider value={{ menus, setMenus, items, setItems }}>
      {children}
    </GlobalContext.Provider>
  );
};
