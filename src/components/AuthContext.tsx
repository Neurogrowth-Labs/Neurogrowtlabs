import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

interface CustomUser {
  uid: string;
  id: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: CustomUser | null;
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
  const [user, setUser] = useState<CustomUser | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial Session Retrieval
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const sUser = session.user;
          const mappedUser: CustomUser = {
            uid: sUser.id,
            id: sUser.id,
            email: sUser.email,
          };
          setUser(mappedUser);
          
          const isSuperAdminEmail = sUser.email?.toLowerCase() === 'lusimadio12@gmail.com';
          let role = isSuperAdminEmail ? 'super_admin' : 'user';
          
          // Try to fetch role from 'users' table
          try {
            const { data } = await supabase
              .from('users')
              .select('role')
              .eq('id', sUser.id)
              .maybeSingle();
              
            if (data?.role) {
              role = data.role;
            } else {
              // Try inserting standard user profile if table exists
              await supabase.from('users').insert({
                id: sUser.id,
                email: sUser.email,
                role: role,
              });
            }
          } catch (dbErr) {
            console.warn("Database error fetching role (this is normal if 'users' table is not created yet):", dbErr);
          }
          
          setUserRole(role);
        } else {
          setUser(null);
          setUserRole(null);
        }
      } catch (err) {
        console.error("Error getting initial session:", err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // 2. Auth State Change Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const sUser = session.user;
        const mappedUser: CustomUser = {
          uid: sUser.id,
          id: sUser.id,
          email: sUser.email,
        };
        setUser(mappedUser);
        
        const isSuperAdminEmail = sUser.email?.toLowerCase() === 'lusimadio12@gmail.com';
        let role = isSuperAdminEmail ? 'super_admin' : 'user';
        
        try {
          const { data } = await supabase
            .from('users')
            .select('role')
            .eq('id', sUser.id)
            .maybeSingle();
            
          if (data?.role) {
            role = data.role;
          }
        } catch (dbErr) {
          console.warn("Database error on state change role fetch:", dbErr);
        }
        
        setUserRole(role);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const registerWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    
    if (data?.user) {
      const isSuperAdminEmail = email.toLowerCase() === 'lusimadio12@gmail.com';
      const role = isSuperAdminEmail ? 'super_admin' : 'user';
      try {
        await supabase.from('users').insert({
          id: data.user.id,
          email: data.user.email,
          role: role,
        });
      } catch (dbErr) {
        console.warn("Could not insert user record in database:", dbErr);
      }
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, loginWithEmail, registerWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

