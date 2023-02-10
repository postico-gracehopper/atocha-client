import React, { useContext, useState, useEffect, useRef } from 'react'
import { auth, db } from '../firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const userInfo = useRef()

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    console.log('User (authContext): ', user)
    setCurrentUser(user)
    setLoading(false)
  })

  useEffect(() => {
    return unsubscribe
  }, [unsubscribe])

  const value = {
    currentUser,
    userInfo,
    signup,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
