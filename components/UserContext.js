import React, { createContext, useState }  from 'react';

export let UserContext = createContext()

export let UserProvider = ({children}) => {

    let [user, setUser] = useState('')

    let [watchlist, setWatchlist] = useState([])

    let setUserName = (user) => {setUser(user)}

    let getUserName = () => {return user}

    let addToWatchlist = (newFilm) => {setWatchlist([...watchlist, newFilm]); console.log(watchlist)}

    let removeFromWatchlist = (id) => {setWatchlist(watchlist.filter(film => film.id !== id))}

    let getWatchlist = () => {return watchlist}

    return (
        <UserContext.Provider value={{ setUserName, getUserName, addToWatchlist, getWatchlist, removeFromWatchlist }}>
            {children}
        </UserContext.Provider>
    );
}