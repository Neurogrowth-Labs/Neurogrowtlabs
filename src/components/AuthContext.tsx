import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  loading: true,
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Retrieve or set user role in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          let role = 'user';
          
          // Auto-promote lusimadio12@gmail.com to super_admin
          const isSuperAdminEmail = currentUser.email?.toLowerCase() === 'lusimadio12@gmail.com';
          
          if (userSnap.exists()) {
            role = userSnap.data().role || 'user';
            if (isSuperAdminEmail && role !== 'super_admin') {
              role = 'super_admin';
              await setDoc(userRef, { role: 'super_admin' }, { merge: true });
            }
          } else {
            role = isSuperAdminEmail ? 'super_admin' : 'user';
            await setDoc(userRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              role: role,
              createdAt: serverTimestamp(),
            });
          }
          setUserRole(role);
        } catch (error) {
          console.error("Error retrieving user document:", error);
          setUserRole(currentUser.email?.toLowerCase() === 'lusimadio12@gmail.com' ? 'super_admin' : 'user');
        }
      } else {
        setUserRole(null);
      }
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmail = async (email: string, password: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const isSuperAdminEmail = email.toLowerCase() === 'lusimadio12@gmail.com';
    const role = isSuperAdminEmail ? 'super_admin' : 'user';
    
    await setDoc(doc(db, 'users', credential.user.uid), {
      uid: credential.user.uid,
      email: credential.user.email,
      role: role,
      createdAt: serverTimestamp(),
    });
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, loginWithEmail, registerWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
