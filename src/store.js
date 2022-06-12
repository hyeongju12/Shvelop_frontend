import React, {createContext, useContext} from "react";
import {getStorageItem, setStorageItem} from "./utils/useLocalStorage";
import useReducerWithSideEffects, {UpdateWithSideEffect} from "use-reducer-with-side-effects/src";

const AppContext = createContext();

const reducer = (prevState, action) => {
    const {type} = action;
    if (type === SET_TOKEN) {
        const {payload: jwtToken} = action
        const newState = {...prevState, jwtToken, isAuthenticated: true}
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem("jwtToken", jwtToken)
        })
    }
    else if (type === DELETE_TOKEN) {
        const newState = {...prevState, jwtToken: '', isAuthenticated: false}
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem("jwtToken", '')
        })
    }
    return prevState
}

export const AppProvider = ({children}) => {
    const jwtToken = getStorageItem('jwtToken', '')
    const [store, dispatch] = useReducerWithSideEffects(reducer, ({
        jwtToken,
        isAuthenticated: jwtToken.length > 0
    }));
    return (
        <AppContext.Provider value={{store, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);

const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN"


export const setToken = token => ({type: SET_TOKEN, payload: token})
export const deleteToken = token => ({type: DELETE_TOKEN})


