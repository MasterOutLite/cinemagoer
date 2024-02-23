"use client"
import React, {useEffect} from 'react';
import {IconButton, Stack} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useAuthStore} from "@/store/useAuthStore";
import useStorePersist from "@/hook/useStorePersist";
import UserListViewService from "@/service/user-list-view.service";

export interface UserListViewButtonProps {
    videoId: number;
}

function UserListViewButton({videoId}: UserListViewButtonProps) {
    const user = useStorePersist(useAuthStore, (state) => state.user);
    const userList = useStorePersist(useAuthStore, (state) => state.userList);
    const [inList, setInList] = React.useState<number>();

    function handleAddToListView(userListViewId: number) {
        return async function send() {
            const data = await UserListViewService.addVideoToUserListView(userListViewId, videoId)
            if (data)
                setInList(data.add ? data.userListViewId : -1);
        }
    }

    useEffect(() => {
        const get = async () => {
            if (!user)
                return;
            const date = await UserListViewService.getListViewVideo(videoId);
            if (!date.notFound)
                setInList(date.userListViewId);
        }
        get();

    }, []);


    if (user && userList)
        return (
            <Stack
                direction={'row'}
                justifyContent={'center'}
            >
                <IconButton onClick={handleAddToListView(userList[0].id)}>
                    {userList[0].name[0]}
                    {inList === userList[0].id ?
                        <AddCircleIcon/>
                        :
                        <AddCircleOutlineRoundedIcon/>
                    }
                </IconButton>

                <IconButton onClick={handleAddToListView(userList[1].id)}>
                    {userList[1].name[0]}

                    {inList === userList[1].id ?
                        <AccessTimeFilledIcon/>
                        :
                        <AccessTimeRoundedIcon/>
                    }
                </IconButton>

                <IconButton onClick={handleAddToListView(userList[2].id)}>
                    {userList[2].name[0]}

                    {inList === userList[2].id ?
                        <CheckCircleIcon/>
                        :
                        <CheckCircleOutlineRoundedIcon/>
                    }
                </IconButton>

                <IconButton onClick={handleAddToListView(userList[3].id)}>
                    {userList[3].name[0]}

                    {inList === userList[3].id ?
                        <FavoriteIcon/>
                        :
                        <FavoriteBorderRoundedIcon/>
                    }
                </IconButton>
            </Stack>
        );
}

export default UserListViewButton;
