import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

const createUser = async (email, password, name, photoURL) => {
  setLoading(true);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const currentUser = userCredential.user;

    await updateProfile(currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
    // console.log("Creating user with:", { name, email, photoURL });

    await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      name,
      email,
      photoURL,
    });

    return currentUser;
  } catch (error) {
    console.error("Email registration error:", error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};



const createUserGoogle = async () => {
  setLoading(true);
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // console.log(user);
    await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });

    return user;
  } catch (error) {
    console.error("Google Sign-In error:", error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};


  const logoutUser = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      });
      setLoading(false);
    });
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  const getAndStoreToken = async (email) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        { email },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error getting JWT:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        await getAndStoreToken(currentUser.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logoutUser,
    signInUser,
    loading,
    setLoading,
    updateUser,
    createUserGoogle,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
