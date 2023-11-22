import React from 'react';
import {Box, Link, Skeleton, Stack, Typography} from "@mui/material";
import Image from "next/image";
import {Series} from "@/type/series";
import {getTypeLink} from "@/helper/link";

export interface SmallVideoProps extends Series {
    radius?: number;

}

function SmallVideo({video, radius, series, dateRelease}: SmallVideoProps) {
    const radiusNow = radius || 80;
    const typeLink = getTypeLink(video.videoCategory);
    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'} gap={2}>
            <Box flexBasis={'auto'} width={radiusNow} height={radiusNow}>
                {video.icon ?
                    <img src={'http://localhost:5000/' + video.icon} alt={video.icon || 'Image'}
                         width={'100%'} height={'100%'}
                         style={{borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 50%'}}
                    /> :
                    <Skeleton variant="circular" width={'100%'} height={'100%'}/>
                }
            </Box>
            <Typography component={'h4'} style={{alignSelf: 'center', flexGrow: 1}}>
                <Link href={`/${typeLink}/${video.id}`} underline={'none'} color="inherit">
                    {video.name[0]}
                </Link>
            </Typography>

            <Stack justifyContent={'center'} flexBasis={'auto'}>
                <Typography component={'span'} textAlign={'center'}>
                    {series} серія
                </Typography>
                <Typography component={'span'} color={'#00000099'}>
                    ({new Date(dateRelease).toLocaleDateString()})
                </Typography>
            </Stack>

        </Stack>
    );
}

export default SmallVideo;
