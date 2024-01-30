"use client"
import React, {useState} from 'react';
import {useAuthStore} from "@/store/useAuthStore";
import {Avatar, Button, Link} from "@mui/material";
import useStorePersist from "@/hook/useStorePersist";

function UserIcon() {
    //const {user} = useAuthStore()
    const user = useStorePersist(useAuthStore, state => state.user);
    const [userAvatarUrl,] = useState<null | string>(null);
    if (user) {
        return (
            <Avatar src={userAvatarUrl as string}
                    style={{
                        justifySelf: 'flex-end',
                    }}
            >
                <Link href={'/user'}>{user?.nickname.slice(0, 2)}</Link>
            </Avatar>
        );
    } else {
        return (<Button variant={'contained'} href={'/user'}>Увійти</Button>)
    }
}

export default UserIcon;
