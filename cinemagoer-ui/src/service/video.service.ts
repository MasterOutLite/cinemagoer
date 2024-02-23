import {VideoDetail} from "@/type/video-detail";
import {sendRequest, VideoCategory} from '@/helper/api'
import {VideoType} from "@/type/videoType";
import {Series} from "@/type/series";

class VideoService {
    async getVideoDetails(id: number) {
        const url = `video?id=${id}`
        const date = await sendRequest(url);
        return date as VideoDetail;
    }

    async getVideoByFilter(page: number, query?: string) {
        const url = `video/filter?page=${page}${query ? `&${query}` : ''}`
        const date = await sendRequest(url,)
        return date as {
            rows: VideoType[],
            page: number,
            count: number
        };
    }

    async getVideoByName(name: string, videoCategory: VideoCategory, page: number = 0, limit: number = 20) {
        const url = `video/searchByName` +
            `?page=${page}&name=${name}&videoCategoryId=${videoCategory}&limit=${limit}`
        const date = await sendRequest(url);
        return date as {
            rows: VideoType[],
            page: number,
            count: number
        };
    }

    async getVideoByDayOfWeek() {
        const url = `video-series/seriesOfDay`;
        const date = await sendRequest(url);
        return date as [Series[]];
    }
}

export default new VideoService()
