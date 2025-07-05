import { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Crée le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fournisseur du contexte
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
