import { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import { auth, db } from '@/firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc 
} from 'firebase/firestore';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor';
  photoURL?: string;
};

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
};

type AuthAction = 
  | { type: 'LOADING' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' };

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'customer' | 'vendor') => Promise<void>;
  logout: () => Promise<void>;
  updateProfileData: (name: string, photoURL?: string) => Promise<void>;
};

// Initial state
const initialState: AuthState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

// Create context
const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfileData: async () => {},
});

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Provider component
export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        dispatch({ type: 'LOADING' });

        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              id: firebaseUser.uid,
              name: userData.name,
              email: firebaseUser.email || '',
              role: userData.role,
              photoURL: userData.photoURL || '',
            },
          });
        } else {
          await setDoc(doc(db, 'users', firebaseUser.uid), {
            name: firebaseUser.displayName || '',
            role: 'customer',
            photoURL: '',
          });
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || '',
              email: firebaseUser.email || '',
              role: 'customer',
              photoURL: '',
            },
          });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOADING' });
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (name: string, email: string, password: string, role: 'customer' | 'vendor') => {
    dispatch({ type: 'LOADING' });
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    await setDoc(doc(db, 'users', user.uid), {
      name,
      role,
      photoURL: '',
    });
  };

  const logout = async () => {
    await signOut(auth);
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfileData = async (name: string, photoURL?: string) => {
    if (!auth.currentUser) throw new Error('No authenticated user');
    dispatch({ type: 'LOADING' });

    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      name,
      ...(photoURL && { photoURL }),
    });

    await updateProfile(auth.currentUser, { displayName: name });

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        id: auth.currentUser.uid,
        name,
        email: auth.currentUser.email || '',
        role: state.user?.role || 'customer',
        photoURL: photoURL || state.user?.photoURL || '',
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfileData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
