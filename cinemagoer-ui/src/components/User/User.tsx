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



function User() {
    const [tab, setTab] = React.useState(1);
    const {user} = useAuthStore();
    const [userList, setUserList] = useState<ListView[]>([]);
    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    useEffect(() => {
        const get = async () => {
            const date = await getUserListWithVideo();
            console.log("With video");
            console.log(date);
            setUserList(date);
        }
        if (user)
            get();
    }, []);

    return (
        <Paper>
            <Box p={2}>
                <Typography>{user?.nickname}</Typography>
                <Box sx={{width: '100%', typography: 'body1'}}>

                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs onChange={handleTab} value={tab}>
                            {
                                userList.map((value, index) =>
                                    <Tab key={index} label={value.name}
                                         tabIndex={index}/>)
                            }
                        </Tabs>
                    </Box>
                    {
                        userList.map((value, index) =>
                            <TabPanel key={index} value={tab} index={index}>
                                {
                                    value.video ?
                                        value?.video?.map(video => (
                                            <Stack key={video.id} direction={'row'} gap={1} alignContent={'center'}>
                                                <Box width={80} height={80}>
                                                    {video.icon ?
                                                        <img src={apiPath + video.icon} alt={video.icon || 'Image'}
                                                             width={'100%'} height={'100%'}
                                                             style={{borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 50%'}}
                                                        /> :
                                                        <Skeleton variant="circular" width={'100%'} height={'100%'}/>
                                                    }
                                                </Box>
                                                <Stack justifyContent={'center'} flexGrow={1}>
                                                    <Link
                                                        href={`/${getTypeLinkById(video.videoCategoryId)}/${video.id}`}
                                                        underline={'none'} color="inherit">
                                                        <Typography variant={'h6'}>{video.name[0]}</Typography>
                                                        <Typography variant={'subtitle2'}>{video.name[1]}</Typography>
                                                    </Link>
                                                </Stack>

                                                <IconButton aria-label="delete" size={"large"}
                                                            sx={{flexShrink: 0, alignSelf: 'center'}}>
                                                    <DeleteIcon fontSize={"large"}/>
                                                </IconButton>
                                            </Stack>
                                        )) :
                                        <Typography>
                                            Список пустий
                                        </Typography>
                                }
                            </TabPanel>
                        )
                    }

                </Box>

            </Box>
        </Paper>
    );
}

export default User;
