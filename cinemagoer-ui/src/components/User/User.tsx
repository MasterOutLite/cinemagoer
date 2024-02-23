"use client";
import React, {useEffect, useState} from 'react';
import {Box, IconButton, Link, Paper, Skeleton, Stack, Tabs, Typography} from "@mui/material";
import {useAuthStore} from "@/store/useAuthStore";
import Tab from "@mui/material/Tab";
import {apiPath, getUserListWithVideo} from "@/helper/api";
import {ListView} from "@/type/list-view";
import DeleteIcon from '@mui/icons-material/Delete';
import {getTypeLink, getTypeLinkById} from "@/helper/link";
import {TabPanel} from "@/components/TabPanel/TabPanel";
import UserListView from "@/components/UserListView/UserListView";


function User() {

    const {user} = useAuthStore();
    const [userList, setUserList] = useState<ListView[]>([]);

    useEffect(() => {
        const get = async () => {
            const date = await getUserListWithVideo();
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
