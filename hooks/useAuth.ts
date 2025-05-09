import { useAuthContext } from '@/context/AuthContext';

export function useAuth() {
  const authContext = useAuthContext();
  return authContext;
}