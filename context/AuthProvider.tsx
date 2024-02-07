'use client'
import { createContext, useContext, useState } from 'react'


interface IAuthContext {
    isAuthenticated: boolean;
    user: any;
    signup: (val: any) => void;
    login: (val: any) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

const defaultState: IAuthContext = {
    isAuthenticated: false,
    user: {},
    signup: () => {},
    login: () => {},
    logout: () => {},
    isLoggedIn: () => false,
}


const AuthContext = createContext<IAuthContext>(defaultState);


export default function AuthProvider({ children }: {children: React.ReactNode}) {
    const [state, setState] = useState({
        isAuthenticated: false,
        user: {}
    })


    const signup = async (userData: any) => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userData)
        })

        const { user } = await res.json();

        if (user?.email) {
            setState(state => ({ ...state, user, isAuthenticated: false }))
        }
    }


    const login = async (userData: any) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userData)
        })

        const { user } = await res.json();

        if (user?.email) {
            setState({ ...state, user, isAuthenticated: true })
        }
    }


    const logout = async () => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'content-type': 'application/json' }
        })

        const { status } = await response.json(); 

        if (status === 'success') {
            setState(state => ({ ...state, user: {}, isAuthenticated: false }))
        }
    }

    
    const isLoggedIn = (): boolean => {
        if (state.isAuthenticated) return true;
        return false;
    }


    return (
        <AuthContext.Provider value={{ ...state, signup, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => useContext(AuthContext);