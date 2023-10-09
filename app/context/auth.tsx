'use client';

import React from 'react';
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

interface UserType {
    email: string | null;
    uid: string | null;
}
import { auth } from '../utils/firebase';
export const AuthContext = React.createContext({});

export const useAuth = () => React.useContext<any>(AuthContext);

export const AuthContextProvider = ({
    children,
}: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<UserType>({ email: null, uid: null });
    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid,
                })
            } else {
                setUser({ email: null, uid: null });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = async () => {
        setUser({ email: null, uid: null });
        await signOut(auth);
    };


    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
