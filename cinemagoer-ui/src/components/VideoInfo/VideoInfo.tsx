import React from 'react';
import {VideoDetail} from "@/type/video-detail";
import {Divider, Link, Paper, Stack, Typography} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {yellow} from "@mui/material/colors";
import {getDateLocal} from "@/helper";
import {FilterParam} from "@/type/filter-param";

export interface VideoInfoProps extends VideoDetail {
    typeLink: string;
}

function VideoInfo({video, videoInfo, typeLink}: VideoInfoProps) {
    return (
        <Stack flexGrow={1} p={2} alignContent={'flex-start'}>
            <Stack flexDirection={'row'} gap={1}>
                <StarRoundedIcon sx={{color: yellow[800], fontSize: 30}}/>
                <Paper sx={{background: yellow[700], paddingX: '4px', minWidth: '50px'}}>
                    <Typography variant={'h6'} textAlign={'center'}
                                color={'#fff'}> {video.rate || '0.00'}</Typography>
                </Paper>
            </Stack>

            <Typography variant={'h3'}>{video.name[0]}</Typography>
            <Typography variant={'subtitle1'}>{video.name[1]}</Typography>

            <Divider sx={{marginY: {xs: '8px'}}} orientation="horizontal" variant="fullWidth"/>

            <Typography variant={'subtitle2'}>Тип: {video.type.name}</Typography>
            <Typography variant={'subtitle2'}>
                Жанри:
                {video.genre.map((value, index, array) =>
                    <React.Fragment key={value.id}>
                        <Link underline="hover"
                              href={`/${typeLink}?${FilterParam.genre}=${value.id}`}
                        > {value.name}</Link>
                        {index !== array.length - 1 ? <span>, </span> : null}
                    </React.Fragment>
                )}
            </Typography>
            <Typography variant={'subtitle2'}>
                Дата виходу: {getDateLocal(video.dateRelease)}
            </Typography>
            <Typography variant={'subtitle2'}>
                Видавець: {video.publisher.name}
            </Typography>
            <Typography variant={'subtitle2'}>
                Віковий рейтинг: {video.ageRating.name}
            </Typography>

            <Typography variant={'subtitle2'}>
                Тривалість: {videoInfo.duration}
            </Typography>
            <Typography variant={'subtitle2'}>
                Головні герої: {videoInfo.mainCharacters.map((value, index, array) =>
                <Typography component="span" variant={'subtitle1'} key={index}>
                    {value}
                    {index !== array.length - 1 ? <span>, </span> : null}
                </Typography>
            )}
            </Typography>
        </Stack>
    );
}

export default VideoInfo;
