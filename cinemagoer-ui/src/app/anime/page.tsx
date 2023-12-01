import React from 'react';
import {Container} from "@mui/material";
import {BasePath, getBaseRequest, getVideoByFilter, VideoCategory} from "@/helper/api";
import RenderVideo from "@/components/RenderVideo/RenderVideo";


export const metadata = {
    description: 'anime, аніме, аніме українською',
}


async function Page() {
    const type = await getBaseRequest(BasePath.type);
    const status = await getBaseRequest(BasePath.status);
    const ageRating = await getBaseRequest(BasePath.ageRating);
    const genre = await getBaseRequest(BasePath.genre);
    const videoBase = (await getVideoByFilter(0, 'videoCategoryId=' + VideoCategory.Anime)).rows;
    return (
        <Container>
            <RenderVideo videoBase={videoBase} title={'Аніме'}
                         filter={{genre, type, ageRating, status, videoCategory: VideoCategory.Anime}}/>
        </Container>
    );
}

export default Page;
