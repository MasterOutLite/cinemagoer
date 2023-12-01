import React from 'react';
import {getVideoDetails} from "@/helper/api";
import Video from "@/components/Video/Video";

async function Page({params}: { params: { id: string } }) {
    const id = parseInt(params.id);
    const videoDetail = await getVideoDetails(id);
    return (<Video id={id} videoDetail={videoDetail}/>)
}

export default Page;
