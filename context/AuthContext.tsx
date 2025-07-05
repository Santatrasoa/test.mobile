import { createContext, useContext, useState } from 'react';
import userData from '../../data/users.json';

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// Crée le contexte
const AuthContext = createContext<AuthContextType>({user:userData[0], setUser:()=>{}});

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
  const {user, setUser} = useContext(AuthContext);

  return { user, setUser};
};
