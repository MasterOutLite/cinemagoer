import {Video} from "@/type/video";
import {VideoInfo} from "@/type/video-info";

export type VideoDetail = {
    video: Video;
    videoInfo: VideoInfo;
    season?: any[];
    series?: any[];
}
