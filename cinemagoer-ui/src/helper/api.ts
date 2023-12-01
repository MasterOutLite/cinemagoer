import {VideoType} from "@/type/videoType";
import {VideoDetail} from "@/type/video-detail";
import {Series} from "@/type/series";
import {useAuthStore} from "@/store/useAuthStore";
import {ListView} from "@/type/list-view";

export const apiPath = 'http://localhost:5000/';
export const nextInit: NextFetchRequestConfig = {revalidate: 3600}

async function sendRequest(url: string, init?: RequestInit) {
    const res = await fetch(apiPath + url, {next: nextInit, ...init});

    if (!res.ok) {
        console.log(url)
        if (res.status === 401)
            useAuthStore.getState().getOut();
        else
            throw new Error('Failed to fetch data.' + 'Url: ' + url)
    }
    return await res.json();
}

export async function getVideoByFilter(page: number, query?: string) {
    const url = `api/video/filter?page=${page}${query ? `&${query}` : ''}`
    const date = await sendRequest(url, {next: nextInit})
    return date as {
        rows: VideoType[],
        page: number,
        count: number
    };
}

export async function getVideoByName(name: string, videoCategory: VideoCategory, page: number = 0, limit: number = 20) {
    const url = `api/video/searchByName` +
        `?page=${page}&name=${name}&videoCategoryId=${videoCategory}&limit=${limit}`
    const date = await sendRequest(url);
    return date as {
        rows: VideoType[],
        page: number,
        count: number
    };
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

export async function getBaseRequest(base: BasePath | string, query?: string, nextConfig?: NextFetchRequestConfig) {
    const queryRequest = query ? '?' + query : '';

    const url = `api/${base}` + queryRequest;
    const token = useAuthStore.getState().token;
    const init: RequestInit = {
        next: nextConfig,
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    }
    return await sendRequest(url, init);
}

export async function getVideoDetails(id: number, init?: RequestInit) {
    const url = `api/video?id=${id}`
    const date = await sendRequest(url, init);
    return date as VideoDetail;
}

export async function getVideoByDayOfWeek() {
    const url = `api/video-series/seriesOfDay`;
    const date = await sendRequest(url);
    return date as [Series[]];
}

export async function loginUser(login: string, password: string) {
    const url = 'api/auth/login';
    const init = {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login, password})
    }

    const date = await sendRequest(url, init);
    useAuthStore.getState().setToken(date.token);
}

export async function registrationUser(login: string, password: string, nickname: string) {
    const url = 'api/auth/registration';
    const init = {
        method: 'post',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({login, password, nickname})
    }

    const date = await sendRequest(url, init);
    useAuthStore.getState().setToken(date.token);
}

export async function getUserList(token: string, nextConfig?: NextFetchRequestConfig) {
    const url = `api/user-list-view`;
    const init: RequestInit = {
        next: nextConfig,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const date = await sendRequest(url, init);
    return date as ListView[];
}

export async function getUserListWithVideo(nextConfig?: NextFetchRequestConfig) {
    const token = useAuthStore.getState().token;
    const url = `api/user-list-view/video`;
    const init: RequestInit = {
        next: nextConfig,
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const date = await sendRequest(url, init);
    return date as ListView[];
}

export enum PostPatch {
    Comments = 'comments',
    CommentsRate = 'comments/rate',
    UserList = 'user-list-view'
}

export async function post(path: PostPatch | string, date: object) {
    const token = useAuthStore.getState().token;
    const url = `api/${path}`;
    const init: RequestInit = {
        method: 'post',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(date)
    }

    return await sendRequest(url, init);
}

export async function postWithFile(path: string, date: object) {
    const token = useAuthStore.getState().token;
    const url = `api/${path}`;
    const init: RequestInit = {
        method: 'post',
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(date)
    }

    return await sendRequest(url, init);
}

