"use client";
import React, {useState} from 'react';
import {useAuthStore} from "@/store/useAuthStore";
import {Avatar, Button, Link} from "@mui/material";
import useStorePersist from "@/hook/useStorePersist";

function AvatarUser() {
    // const user = useStorePersist(useAuthStore, state => state.user);
    const user = useAuthStore().user;
    return (
        <Button variant={'contained'} href={'/user'}>{user ? 'Профіль' : 'Увійти'}</Button>
    );
}

export default AvatarUser;
