import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../Firebase/firbase.init';

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const createUserWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    const sendPasswordReset = (email) => {
        return sendPasswordResetEmail(auth , email);
    }

    const updateUserProfile = async (profileData) => {
        setLoading(true);
        try {
            await updateProfile(auth.currentUser, {
                displayName: profileData.name,
                photoURL: profileData.photo
            });
            
            setUser({
                ...auth.currentUser,
                displayName: profileData.name,
                photoURL: profileData.photo
            });
            
            return true; 
        } catch (error) {
            console.error("Error updating profile:", error);
            return false; 
        } finally {
            setLoading(false);
        }
    };



    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const userInfo = {
        user,
        setUser,
        loading,
        createUser,
        createUserWithGoogle,
        signInUser,
        signOutUser,
        sendPasswordReset,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;