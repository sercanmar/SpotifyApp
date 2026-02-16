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

        if (resp === "INVALIDO") {
            set({ status: 'unauthenticated', user: undefined });
            return false;
        }

        set({
            status: 'authenticated',
        });

        return true;
    },

     checkStatus: async () => {
     },

     logout: async () => {
     },
 }))