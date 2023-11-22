import {Video} from "@/type/video";

export interface Series {
    id: number;
    videoId: number;
    dayShowId: number;
    series: number;
    name: string;
    dateRelease: string;
    release: boolean;
    seasonId: number;
    video: Video;
}
