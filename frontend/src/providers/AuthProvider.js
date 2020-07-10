import React, { createContext, useEffect, useState } from 'react';
import { getFirebaseIdToken } from '../util/firebaseFunctions';
import firebase from '../firebase';
import { useDispatch } from 'react-redux'
import { updateCurrentUser } from '../features/auth/authSlice';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(null);
    const dispatch = useDispatch()

    const updateUser = (user) => {
        setLoading(true)
         if (user) {
            const { email, uid } = user;
            const lastLogin = user.metadata.lastSignInTime;
            setCurrentUser({ email, uid, lastLogin });
            getFirebaseIdToken().then((token) => {
                setToken(token);
                setLoading(false)
                dispatch(updateCurrentUser({email, uid, lastLogin, token}))
            })
        } else {
            dispatch(updateCurrentUser(null))
           setCurrentUser(null);
           setLoading(false)
         }
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(updateUser)
        return unsubscribe;
    }, []);

    if (loading) return <div>Loading...</div>;

    return(
        <AuthContext.Provider value={{currentUser, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider; 