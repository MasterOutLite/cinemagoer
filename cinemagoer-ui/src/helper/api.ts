import {Video} from "@/type/video";
import {VideoDetail} from "@/type/video-detail";

export async function getVideoByFilter(page: number, query?: string) {
    const add = query ? '&' + query : '';
    const host = 'localhost:5000';
    const res = await fetch(`http://${host}/api/video/filter` + `?page=${page}` + add);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    //console.log(date);
    return await res.json() as { rows: Video[], page: number, count: number };
}

export async function getVideoByName(name: string, videoCategory: VideoCategory, page: number = 0, limit: number = 20) {
    const host = 'localhost:5000';
    const res = await fetch(`http://${host}/api/video/searchByName` +
        `?page=${page}&name=${name}&videoCategoryId=${videoCategory}&limit=${limit}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    //console.log(date);
    return await res.json() as { rows: Video[], page: number, count: number };
}

export enum BasePath {
    type = 'type',
    genre = 'genre',
    status = 'status',
    ageRating = 'age-rating',
    comments = 'comments'
}

export enum VideoCategory {
    Movie = 1,
    Serial,
    Cartoon,
    Anime
}

export async function getBaseRequest(base: BasePath | string, query?: string, init?: RequestInit) {
    const host = 'localhost:5000';
    const queryRequest = query ? '?' + query : '';
    const res = await fetch(`http://${host}/api/${base}` + queryRequest, init);
    console.log(`${new Date().toString()}. ` + `http://${host}/api/${base}` + queryRequest);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const date = await res.json();
    //console.log(date);
    return date;
}

export async function getVideoDetails(id: number, init?: RequestInit) {
    const host = 'localhost:5000';
    const res = await fetch(`http://${host}/api/video?id=${id}`, init);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const date = await res.json();
    return date as VideoDetail;
}

export async function getVideoByDayOfWeek(init?: RequestInit) {
    const host = 'localhost:5000';
    const res = await fetch(`http://${host}/api/video-series/seriesOfDay`, init);
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return await res.json();
}
