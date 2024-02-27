import React from 'react';
import {Box, IconButton, Link, Skeleton, Stack, Typography} from "@mui/material";
import {apiPath,} from "@/helper/api";
import {getTypeLinkById} from "@/helper/link";
import DeleteIcon from "@mui/icons-material/Delete";
import {VideoFromListView} from "@/type/list-view";
import UserListViewService from "@/service/user-list-view.service";

export interface UserListViewTabContentProps {
    video: VideoFromListView[],
    userListViewId: number,
    remove: (videoId: number) => void;
}

function UserListViewTabContent({video, userListViewId, remove}: UserListViewTabContentProps) {
    const [listVideo, setListVideo] = React.useState<VideoFromListView[]>(video || []);

    function handleRemoveVideo(videoId: number, userListViewId: number) {
        return () => {
            const deleteVideo = async () => {
                const data = await UserListViewService.removeVideoToUserListView(userListViewId, videoId);
                if (!data || data.add)
                    return;
                const newList = listVideo.filter(value => value.id !== data.videoId);
                remove(data.videoId);
                setListVideo(newList);
            }
            deleteVideo();
        }
    }

    return (
        <>
            {
                listVideo.map(value =>
                    <Stack key={value.id} direction={'row'} gap={1} alignContent={'center'}>
                        <Box width={80} height={80}>
                            {value.icon ?
                                <img src={apiPath + value.icon} alt={value.icon || 'Image'}
                                     width={'100%'} height={'100%'}
                                     style={{borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 50%'}}
                                /> :
                                <Skeleton variant="circular" width={'100%'} height={'100%'}/>
                            }
                        </Box>
                        <Stack justifyContent={'center'} flexGrow={1}>
                            <Link
                                href={`/${getTypeLinkById(value.videoCategoryId)}/${value.id}`}
                                underline={'none'} color="inherit">
                                <Typography variant={'h6'}>{value.name[0]}</Typography>
                                <Typography variant={'subtitle2'}>{value.name[1]}</Typography>
                            </Link>
                        </Stack>

                        <IconButton aria-label="delete" size={"large"}
                                    onClick={handleRemoveVideo(value.id, userListViewId)}
                                    sx={{flexShrink: 0, alignSelf: 'center'}}>
                            <DeleteIcon fontSize={"large"}/>
                        </IconButton>
                    </Stack>
                )
            }
        </>
    );
}

export default UserListViewTabContent;
