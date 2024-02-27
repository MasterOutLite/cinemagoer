import {Box, Container, Grid, Paper} from "@mui/material";
import React from "react";
import PreviewVideoWithInfoCard from "@/components/PreviewVideoWithInfoCard/PreviewVideoWithInfoCard";
import Title from "@/components/Title/Title";
import BreakBlock2 from "@/components/BreakBlock/BreakBlock2";
import {VideoCategory} from "@/helper/api";
import RenderSeriesDay from "@/components/RenderSeriesDay/RenderSeriesDay";
import VideoService from "@/service/video.service";
import {VideoType} from "@/type/videoType";

const seriesForDayOfWeek = [
    'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя',
]

export const metadata = {
    title: 'Animon',
}

export default async function Home({}) {

    const anime = (await VideoService.getVideoByFilter(0, 'videoCategoryId=' + VideoCategory.Anime)).rows;
    const movie = (await VideoService.getVideoByFilter(0, 'videoCategoryId=' + VideoCategory.Movie)).rows;
    const series = await VideoService.getVideoByDayOfWeek()

    return (

        <Container>
            {/*<Grid2 container justifyContent={'center'}>*/}
            {/*    {*/}
            {/*        seriesForDayOfWeek.map((value, index) =>*/}
            {/*            <Grid2 key={index} xs={12} md={6} lg={4}>*/}
            {/*                <OutputOfSeries title={value} series={series[index]} id={index}/>*/}
            {/*            </Grid2>)*/}
            {/*    }*/}
            {/*</Grid2>*/}

            <RenderSeriesDay series={series}/>

            <Box p={2}></Box>

            <Paper elevation={3}>
                <Box>
                    <Title>
                        Фільми
                    </Title>
                    <Grid container spacing={2} p={1}>
                        {
                            movie.map((value: VideoType) => <Grid key={value.id} item xs={12} md={6}>
                                <PreviewVideoWithInfoCard   {...value}/>
                            </Grid>)
                        }
                    </Grid>
                    <BreakBlock2/>
                </Box>

                <Box>
                    <Title>
                        Аніме
                    </Title>
                    <Grid container spacing={2} p={1}>
                        {
                            anime.map((value: VideoType) => <Grid key={value.id} item xs={12} md={6}>
                                <PreviewVideoWithInfoCard  {...value}/>
                            </Grid>)
                        }
                    </Grid>
                </Box>
            </Paper>
        </Container>

    );
}

