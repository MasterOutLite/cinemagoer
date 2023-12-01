import React from 'react';
import Video from "@/components/Video/Video";
import {getVideoDetails} from "@/helper/api";

async function Page({params}: { params: { id: string } }) {
    const id = parseInt(params.id);
    const videoDetail = await getVideoDetails(id);
    return (<Video id={id} videoDetail={videoDetail}/>)
}

export default Page;
