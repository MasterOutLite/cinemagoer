import React from 'react';
import Video from "@/components/Video/Video";
import VideoService from "@/service/video.service";

async function Page({params}: { params: { id: string } }) {
    const id = parseInt(params.id);
    const videoDetail = await VideoService.getVideoDetails(id);
    return (<Video id={id} videoDetail={videoDetail}/>)
}

export default Page;
