import {create} from "zustand";
import {jwtDecode} from "jwt-decode";
import {Auth} from "@/type/auth";
import {createJSONStorage, persist} from "zustand/middleware";
import {ListView} from "@/type/list-view";
import UserListViewService from "@/service/user-list-view.service";


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
                set({token});
                const date = await UserListViewService.getUserList();

                // @ts-ignore
                if (date.statusCode == 401)
                    return;
                console.log('AuthStore');
                console.log(date);
                set({user, userList: date})
            },
            getOut() {
                set(initState)
            },
        }
    ), {
        name: 'auth-store',
        storage: createJSONStorage(() => localStorage),
    }));
