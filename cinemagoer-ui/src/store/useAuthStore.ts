import {create} from "zustand";
import {jwtDecode} from "jwt-decode";
import {Auth} from "@/type/auth";
import {createJSONStorage, persist} from "zustand/middleware";
import {getUserList} from "@/helper/api";
import {ListView} from "@/type/list-view";


type State = {
    token: string,
    user: Auth | undefined,
    userList: ListView[]
}

type Action = {
    setToken: (token: string) => void;
    getOut: () => void;
}

const initState: State = {
    userList: [],
    token: '',
    user: undefined,
}

export const useAuthStore = create<State & Action>()(
    persist((set) => (
        {
            ...initState,
            async setToken(token: string) {
                const user = jwtDecode(token) as Auth;
                const date = await getUserList(token);
                console.log('AuthStore');
                console.log(date);
                set(() => ({token, user, userList: date}))
            },
            getOut() {
                set(initState)
            },
        }
    ), {
        name: 'auth-store',
        storage: createJSONStorage(() => localStorage),
    }));

// export const useAuthStore = create<State & Action>((set, get) => (
//     {
//         token: '',
//         user: undefined,
//         setToken(token: string) {
//             const user = jwtDecode(token) as Auth;
//             set(state => ({token, user}))
//         },
//     }
// ));
