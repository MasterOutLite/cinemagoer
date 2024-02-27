"use client"
import React, {memo, useCallback, useEffect, useState} from 'react';
import {BasePath, getBaseRequest, post, PostPatch} from "@/helper/api";
import {CountData} from "@/type/count-data";
import {Box, Button, Divider, Stack, TextField, Typography} from "@mui/material";
import {CommentsType} from "@/type/commentsType";
import Comment from "@/components/Comment/Comment";
import {useAuthStore} from "@/store/useAuthStore";

export interface CommentsProps {
    videoId: number;
}

function Comments({videoId}: CommentsProps) {
    const {user} = useAuthStore();
    const [commentsReq, setCommentsReq] = useState<CountData<CommentsType>>({count: 0, rows: []});
    const [comments, setComments] = useState<CommentsType[]>([]);
    const [page, setPage] = useState<number>(0)

    const [comment, setComment] = useState<string>('')

    const handleEditComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            value,
        } = event.target;
        setComment(value);
    }

    const handleSendComment = useCallback(async () => {

        if (user) {
            console.log(videoId)

            const commentReq = await post(PostPatch.Comments, {videoId, comment})
            setComments([commentReq, ...comments])
        } else
            console.log('Not auth user')
    }, [comment])

    useEffect(() => {
        const get = async () => {
            const date = await getBaseRequest(BasePath.comments,
                `page=${page}&count=20&videoId=${videoId}`) as CountData<CommentsType>;
            console.log(date);
            setCommentsReq(date);
            setComments([...date.rows])
            //console.log(date.rows);
        }
        get();
    }, []);

    return (
        <>
            <TextField margin={'normal'} fullWidth multiline size={'small'}
                       value={comment} onChange={handleEditComment}
            />
            <Button variant="contained" onClick={handleSendComment}>Опублікувати</Button>
            <Divider sx={{marginY: {xs: '16px'}}} orientation="horizontal" variant="fullWidth"/>
            <Box mt={2}>
                <Typography variant={'h5'}>Коментарі</Typography>
                <Stack gap={1}>
                    {
                        comments.map(value => (
                            <Comment key={value.id} {...value} />
                        ))
                    }
                </Stack>
            </Box>
        </>
    );
}

export default memo(Comments);
