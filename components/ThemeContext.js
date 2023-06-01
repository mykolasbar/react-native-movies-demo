import React, { createContext, useState }  from 'react';

export let ThemeContext = createContext()

export let ThemeProvider = ({children}) => {

    let [theme, setTheme] = useState('dark')

    let setColorTheme = (theme) => {setTheme(theme)}

    let getColorTheme = () => {return theme}

    return (
        <ThemeContext.Provider value={{ setColorTheme, getColorTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
