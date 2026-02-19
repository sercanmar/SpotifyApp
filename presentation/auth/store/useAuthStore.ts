import { authLogin } from "@/core/auth/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import {create} from 'zustand'
 export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';
  export interface AuthState {
     status: AuthStatus;
     token?: string;
     user?: User;

     login: (email: string, password: string) => Promise<boolean>;
     checkStatus: () => Promise<void>;
     logout: () => Promise<void>;
 }
  export const useAuthStore = create<AuthState>()((set) => ({
     // Properties
     status: 'checking',
     token: undefined,
     user: undefined,

     // Actions
     login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);

        if (resp === null) {
            set({ status: 'unauthenticated', user: undefined, token: undefined });
            return false;
        }

        set({
            status: 'authenticated',
            user: resp.user as any,
            token: resp.token
        });

        return true;
    },
    changeStatus: async (token?: string, user?: User) => {
        if (!token || !user) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
     
        //    await SecureStorageAdapter.deleteItem('token');
            return false;
        }

        set({ status: 'authenticated', token: token, user: user });
    
      //  await SecureStorageAdapter.setItem('token', token);
        return true;
    },

     checkStatus: async () => {
     },

    logout: async () => {
    // TODO: eliminar el token en secure storage

    set({ status: 'unauthenticated', token: undefined, user: undefined });
},

 }))