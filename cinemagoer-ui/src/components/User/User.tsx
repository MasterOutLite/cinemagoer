"use client";
import React, {useEffect, useState} from 'react';
import {Box, Paper, Typography} from "@mui/material";
import {useAuthStore} from "@/store/useAuthStore";
import {ListView} from "@/type/list-view";
import UserListView from "@/components/UserListView/UserListView";
import UserListViewService from "@/service/user-list-view.service";


function User() {

    const {user} = useAuthStore();
    const [userList, setUserList] = useState<ListView[]>([]);

    useEffect(() => {
        const get = async () => {
            const date = await UserListViewService.getUserListWithVideo();
            setUserList(date);
        }
        if (user)
            get();
    }, []);

    if (!user) {
        return <></>
    }

    return (
        <Paper elevation={2}>
            <Box p={2}>
                <Typography>Вітаю, {user.nickname}</Typography>
                <UserListView userList={userList}/>
            </Box>
        </Paper>
    );
}

export default User;
