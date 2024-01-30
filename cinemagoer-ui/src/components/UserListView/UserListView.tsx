import React from 'react';
import {Box, IconButton, Link, Skeleton, Stack, Tabs, Typography} from "@mui/material";
import Tab from "@mui/material/Tab";
import {TabPanel} from "@/components/TabPanel/TabPanel";
import {apiPath} from "@/helper/api";
import {getTypeLinkById} from "@/helper/link";
import DeleteIcon from "@mui/icons-material/Delete";
import {ListView} from "@/type/list-view";

export interface UserListViewProps {
    userList: ListView[];
}

function UserListView({userList}: UserListViewProps) {

    const [tab, setTab] = React.useState(1);

    const handleTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
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
    );
}

export default UserListView;
