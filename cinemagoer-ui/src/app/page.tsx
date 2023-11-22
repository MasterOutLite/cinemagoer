import {Box, Container, Grid, Paper, Stack} from "@mui/material";
import React from "react";
import OutputOfSeries, {OutputOfSeriesProps} from "@/components/OutputOfSeries/OutputOfSeries";
import MiddleVideo from "@/components/MiddleVideo/MiddleVideo";
import {Video} from "@/type/video";
import Title from "@/components/Title/Title";
import BreakBlock2 from "@/components/BreakBlock/BreakBlock2";
import {getVideoByDayOfWeek, getVideoByFilter, VideoCategory} from "@/helper/api";

const seriesForDayOfWeek = [
    'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота', 'Неділя',
]

export const metadata = {
    title: 'Animon',
}

export default async function Home({}) {
    const anime = (await getVideoByFilter(0, 'videoCategoryId=' + VideoCategory.Anime)).rows;
    const movie = (await getVideoByFilter(0, 'videoCategoryId=' + VideoCategory.Movie)).rows;
    const series = await getVideoByDayOfWeek();

    return (
        <Container>
            <Stack flexDirection={'row'} justifyContent={'center'}>
                <Box sx={{minWidth: {xs: '100%', md: '400px'}}}>
                    {
                        seriesForDayOfWeek.map((value, index) =>
                            <OutputOfSeries key={index} title={value} series={series[index]} id={index}/>)
                    }
                </Box>
            </Stack>

            <Box p={2}></Box>

            <Paper elevation={3}>
                <Box>
                    <Title>
                        Фільми
                    </Title>


                    <Grid container spacing={2} p={1}>
                        {
                            movie.map(value => <Grid key={value.id} item xs={12} md={6}> <MiddleVideo   {...value}/>
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
                            anime.map(value => <Grid key={value.id} item xs={12} md={6}> <MiddleVideo  {...value}/>
                            </Grid>)
                        }
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

