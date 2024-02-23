"use client"
import React, {memo, useState} from 'react';
import {Avatar, Box, IconButton, Link, Paper, Stack, Typography} from "@mui/material";
import {apiPath, post, PostPatch} from "@/helper/api";
import {Badge} from "@mui/base";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import ThumbDownRoundedIcon from "@mui/icons-material/ThumbDownRounded";
import {CommentsType} from "@/type/commentsType";
import {useAuthStore} from "@/store/useAuthStore";

function Comment({
                     id,
                     comments,
                     like,
                     user,
                     dislike,
                     createdAt,
                     userLike
                 }: CommentsType) {

    const auth = useAuthStore(state => state.user);
    const [likes, setLikes] = useState<number>(like)
    const [dislikes, setDislikes] = useState<number>(dislike)
    const [userLikes, setUserLikes] = useState<boolean>(userLike !== 'none');
    const [isLike, setIsLike] = useState<boolean>(userLike === true);

    const date = new Date(createdAt);
    const handleRate = (rate: boolean) => async () => {
        console.log({commentId: id, rate})
        console.log(id)
        if (!auth)
            return;
        const date = await post(PostPatch.CommentsRate, {commentId: id, rate}) as {
            commentId: number,
            rate: boolean,
            state: string
        };
        if (date.commentId === id) {
            switch (date.state) {
                case 'update': {
                    if (date.rate) {
                        setLikes((v) => v + 1)
                        setDislikes((v) => v - 1)
                        setIsLike(true);
                    } else {
                        setDislikes((v) => v + 1)
                        setLikes((v) => v - 1)
                        setIsLike(false);
                    }

                    break;
                }
                case 'create': {
                    if (date.rate)
                        setLikes((v) => v + 1);
                    else
                        setDislikes((v) => v + 1);
                    setIsLike(date.rate);
                    setUserLikes(true);
                    break;
                }
                case 'remove': {
                    if (date.rate)
                        setLikes((v) => v - 1);
                    else
                        setDislikes((v) => v - 1);
                    setUserLikes(false);
                    break;
                }
                default: {
                    break;
                }
            }
        }
        //console.log(date)
    }

    return (
        <Paper>
            <Stack direction={{sx: 'column', md: 'row'}} p={2} gap={2}

            >
                <Stack direction={'row'} gap={2}>
                    <Avatar alt={user.nickname}
                            sx={{width: '60px', height: '60px'}}
                            src={user.avatar ? apiPath + user.avatar : undefined}>
                        {
                            user.nickname.slice(0, 2)
                        }
                    </Avatar>
                    <Box sx={{display: {xs: 'block', md: 'none'}}}>
                        <Typography>{user.nickname}</Typography>
                        <Typography>{date.toLocaleDateString()}</Typography>
                    </Box>
                </Stack>
                <Box>
                    <Box sx={{display: {xs: 'none', md: 'block'}}}>
                        <Typography>
                            <Link href={'#'} underline="none"> {user.nickname}</Link>
                            {'\t' + date.toLocaleDateString()} | {date.toLocaleTimeString()}
                        </Typography>
                    </Box>
                    <Typography py={1}>{comments}</Typography>
                    <Stack direction={'row'} gap={1}>
                        <Badge badgeContent={likes} color="primary">
                            <IconButton onClick={handleRate(true)}>
                                <ThumbUpRoundedIcon color={isLike && userLikes ? "success" : 'inherit'}/>
                            </IconButton>
                        </Badge>
                        <Badge badgeContent={dislikes} color="primary">
                            <IconButton onClick={handleRate(false)}>
                                <ThumbDownRoundedIcon
                                    color={!isLike && userLikes ? "error" : 'inherit'}
                                />
                            </IconButton>
                        </Badge>
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    );
}

export default memo(Comment);
