import {VideoType} from "@/type/videoType";
import {VideoInfoType} from "@/type/video-info-type";
import {Series} from "@/type/series";

export type VideoDetail = {
    video: VideoType;
    videoInfo: VideoInfoType;
    season?: any[];
    series?: Series[];
}
