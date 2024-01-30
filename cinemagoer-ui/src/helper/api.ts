import {VideoType} from "@/type/videoType";
import {VideoDetail} from "@/type/video-detail";
import {Series} from "@/type/series";
import {useAuthStore} from "@/store/useAuthStore";
import {ListView} from "@/type/list-view";
import {ListViewVideo} from "@/type/list-view-video";

export const apiPath = 'http://localhost:5000/';
export const nextInit: NextFetchRequestConfig = {revalidate: 3600}

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


async function sendRequest(url: string, method?: 'post' | 'put' | 'delete', body?: object, header?: HeadersInit) {
    const token = useAuthStore.getState().token;
    const res = await fetch(apiPath + 'api/' + url, {
        next: nextInit,
        headers: {
            "Authorization": `Bearer ${token}`,
            ...header
        },
        body: JSON.stringify(body),
        method: method || 'get'
    });

    if (!res.ok) {
        console.log(url)
        console.log(await res.json())
        if (res.status === 401)
            useAuthStore.getState().getOut();
        else
            throw new Error('Failed to fetch data.' + 'Url: ' + url)
    }
    return await res.json();
}

async function sendRequestPost(url: string, body: object, header?: HeadersInit) {
    return await sendRequest(url, "post", body, header || {"Content-Type": "application/json",})
}

export async function getVideoByFilter(page: number, query?: string) {
    const url = `video/filter?page=${page}${query ? `&${query}` : ''}`
    const date = await sendRequest(url,)
    return date as {
        rows: VideoType[],
        page: number,
        count: number
    };
}

export async function getVideoByName(name: string, videoCategory: VideoCategory, page: number = 0, limit: number = 20) {
    const url = `video/searchByName` +
        `?page=${page}&name=${name}&videoCategoryId=${videoCategory}&limit=${limit}`
    const date = await sendRequest(url);
    return date as {
        rows: VideoType[],
        page: number,
        count: number
    };
}


export async function getBaseRequest(base: BasePath | string, query?: string, nextConfig?: NextFetchRequestConfig) {
    const queryRequest = query ? '?' + query : '';
    const url = `${base}` + queryRequest;
    return await sendRequest(url);
}

export async function getVideoDetails(id: number) {
    const url = `video?id=${id}`
    const date = await sendRequest(url);
    return date as VideoDetail;
}

export async function getVideoByDayOfWeek() {
    const url = `video-series/seriesOfDay`;
    const date = await sendRequest(url);
    return date as [Series[]];
}

export async function loginUser(login: string, password: string) {
    const url = 'auth/login';

    const date = await sendRequestPost(url, {login, password},);
    useAuthStore.getState().setToken(date.token);
}

export async function registrationUser(login: string, password: string, nickname: string) {
    const url = 'auth/registration';
    const date = await sendRequestPost(url, {login, password, nickname});
    useAuthStore.getState().setToken(date.token);
}

export async function getUserList() {
    const url = `user-list-view`;
    const date = await sendRequest(url);
    return date as ListView[];
}

export async function getListViewVideo(id: number) {
    const url = `user-list-view/listView?videoId=${id}`;
    const date = await sendRequest(url);
    return date as ListViewVideo;
}

export async function getUserListWithVideo() {
    const url = `user-list-view/video`;
    const date = await sendRequest(url);
    return date as ListView[];
}

export enum PostPatch {
    Comments = 'comments',
    CommentsRate = 'comments/rate',
    UserList = 'user-list-view'
}

export async function post(path: PostPatch | string, date: object) {
    const url = `${path}`;
    return await sendRequestPost(url, date);
}

export async function postWithFile(path: string, date: object) {
    const url = `${path}`;
    return await sendRequestPost(url, date, {'Content-Type': 'application/x-www-form-urlencoded'});
}

