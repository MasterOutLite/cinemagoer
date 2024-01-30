import React from 'react';
import {Container} from "@mui/material";
import {BasePath, getBaseRequest, getVideoByFilter, VideoCategory} from "@/helper/api";
import RenderVideo from "@/components/RenderVideo/RenderVideo";
import Main from "@/layout";


export const metadata = {
    description: 'carton, мультфільми, мультфільми українською',
}


async function Page() {
    const type = await getBaseRequest(BasePath.type);
    const status = await getBaseRequest(BasePath.status);
    const ageRating = await getBaseRequest(BasePath.ageRating);
    const genre = await getBaseRequest(BasePath.genre);
    const videoBase = (await getVideoByFilter(0, 'videoCategoryId=' + VideoCategory.Cartoon)).rows;
    return (

        <Container>
            <RenderVideo videoBase={videoBase} title={'Мультфільми'}
                         filter={{genre, type, ageRating, status, videoCategory: VideoCategory.Cartoon}}/>
        </Container>

    );
}

export default Page;
