"use client";
import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Divider, IconButton,
    Link,
    Paper,
    Skeleton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {BasePath, getBaseRequest, getVideoDetails} from "@/helper/api";
import {useParams} from "next/navigation";
import {VideoDetail} from "@/type/video-detail";
import {getTypeLink} from "@/helper/link";
import {getDateLocal} from "@/helper";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {yellow} from "@mui/material/colors";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

function Page() {
    const [typeLink, setTypeLink] = useState<string>();
    const params = useParams();
    const [video, setVideo] = useState<VideoDetail>();
    const [comments, setComments] = useState();
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        const get = async () => {
            // @ts-ignore
            const data = await getVideoDetails(params?.id);
            const typeLink = getTypeLink(data.video.videoCategory);
            setTypeLink(typeLink);
            setVideo(data);
            console.log(data);
            const cDate = await getBaseRequest(BasePath.comments, `page=0&count=20&videoId=${data?.video.id}`);
            setComments(cDate.row);
            console.log('cDate');
            console.log(cDate);
        };

        get();
    }, []);

    if (!video)
        return (
            <Container>
                <Skeleton variant="rectangular" height={'100%'} width={'100%'}/>
            </Container>
        )

    return (
        <Container>
            <Paper>
                <Box p={1}>
                    <Stack direction={'row'}>
                        <Box>

                            <Box sx={{height: {xs: '340px'}, width: {xs: '250px'}}} p={1}>
                                {video.video.icon ?
                                    <img src={'http://localhost:5000/' + video.video.icon}
                                         style={{width: '100%', height: '100%'}}
                                         alt={'Icon'}/>
                                    :

                                    <Skeleton variant="rectangular" height={'100%'}/>
                                }
                            </Box>
                            <Stack
                                direction={'row'}
                                justifyContent={'center'}
                            >
                                <IconButton>
                                    <AddCircleOutlineRoundedIcon/>
                                </IconButton>
                                <IconButton>
                                    <CheckCircleOutlineRoundedIcon/>
                                </IconButton>
                                <IconButton>
                                    <AccessTimeRoundedIcon/>
                                </IconButton>
                                <IconButton>
                                    <FavoriteBorderRoundedIcon/>
                                </IconButton>

                            </Stack>
                        </Box>
                        <Stack flexGrow={1} p={2} alignContent={'flex-start'}>
                            <Stack flexDirection={'row'} gap={1}>
                                <StarRoundedIcon sx={{color: yellow[800], fontSize: 30}}/>
                                <Paper sx={{background: yellow[700], paddingX: '4px', minWidth: '50px'}}>
                                    <Typography variant={'h6'} textAlign={'center'}
                                                color={'#fff'}> {video.video.rate || '0.00'}</Typography>
                                </Paper>
                            </Stack>

                            <Typography variant={'h3'}>{video.video.name[0]}</Typography>
                            <Typography variant={'subtitle1'}>{video.video.name[1]}</Typography>

                            <Divider sx={{marginY: {xs: '8px'}}} orientation="horizontal" variant="fullWidth"/>

                            <Typography variant={'subtitle2'}>Тип: {video.video.type.name}</Typography>
                            <Typography variant={'subtitle2'}>
                                Жанри:
                                {video.video.genre.map((value, index, array) =>
                                    <React.Fragment key={value.id}>
                                        <Link underline="hover"
                                              href={`/${typeLink}?genre=${value.id}`}
                                        > {value.name}</Link>
                                        {index !== array.length - 1 ? <span>, </span> : null}
                                    </React.Fragment>
                                )}
                            </Typography>
                            <Typography variant={'subtitle2'}>
                                Дата виходу: {getDateLocal(video.video.dateRelease)}
                            </Typography>
                            <Typography variant={'subtitle2'}>
                                Видавець: {video.video.publisher.name}
                            </Typography>
                            <Typography variant={'subtitle2'}>
                                Віковий рейтинг: {video.video.ageRating.name}
                            </Typography>

                            <Typography variant={'subtitle2'}>
                                Тривалість: {video.videoInfo.duration}
                            </Typography>
                            <Typography variant={'subtitle2'}>
                                Головні герої: {video.videoInfo.mainCharacters.map((value, index, array) =>
                                <Typography component="span" variant={'subtitle1'} key={index}>
                                    {value}
                                    {index !== array.length - 1 ? <span>, </span> : null}
                                </Typography>
                            )}
                            </Typography>
                        </Stack>
                    </Stack>
                    <Typography p={1}>
                        {video.videoInfo.description}
                    </Typography>

                    {
                        video.videoInfo.pictures.length > 0 ?
                            <Box>
                                <Typography variant={'h4'}>Кадри</Typography>
                                <Stack direction={'row'} height={'150px'}
                                       gap={1} mt={2}>
                                    {video.videoInfo.pictures.map((value, index) => {
                                        if (index < 3)
                                            return (
                                                <Box key={index} width={250} height={150}>
                                                    <img height={'100%'} width={'100%'}
                                                         src={'http://localhost:5000/' + value}
                                                         alt={''}/>
                                                </Box>
                                            )
                                    })}
                                </Stack>
                            </Box>

                            :
                            null
                    }
                </Box>

                <Box sx={{width: '100%', typography: 'body1'}}>
                    <TabContext value={value}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Коментарі" value="1"/>
                                <Tab label="Рецензії" value="2"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <TextField margin={'normal'} fullWidth multiline size={'small'}/>
                            <Button variant="contained">Опублікувати</Button>
                            <Divider sx={{marginY: {xs: '16px'}}} orientation="horizontal" variant="fullWidth"/>
                            <Box mt={2}>
                                <Typography variant={'h5'}>Коментарі</Typography>
                            </Box>

                        </TabPanel>
                        <TabPanel value="2">
                            <TextField margin={'normal'} fullWidth multiline size={'small'}/>
                            <Button variant="contained">Опублікувати</Button>

                            <Box mt={2}>
                                <Divider sx={{marginY: {xs: '16px'}}} orientation="horizontal"
                                         variant="fullWidth"/>
                                <Typography variant={'h5'}>Рецензії</Typography>
                            </Box>
                        </TabPanel>

                    </TabContext>
                </Box>


            </Paper>
        </Container>
    );
}

export default Page;
