import {useAuthStore} from "@/store/useAuthStore";
export const apiPath = 'http://localhost:5000/';
export const nextInit: NextFetchRequestConfig = {revalidate: 3600}

export enum BasePath {
    type = 'type',
    genre = 'genre',
    status = 'status',
    ageRating = 'age-rating',
    comments = 'comments',
    videoCategory = 'video-category',
    publisher = 'publisher',
}

export enum VideoCategory {
    Movie = 1,
    Serial,
    Cartoon,
    Anime
}

export async function sendRequest(url: string, method?: 'post' | 'put' | 'delete', body?: object, header?: HeadersInit) {
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
        //console.log(await res.json())
        if (res.status === 401)
            useAuthStore.getState().getOut();
        else
            throw new Error('Failed to fetch data.' + 'Url: ' + url)
    }
    return await res.json();
}

export async function sendRequestPost(url: string, body: object, header?: HeadersInit) {
    return await sendRequest(url, "post", body, header || {"Content-Type": "application/json",})
}

export async function getBaseRequest(base: BasePath | string, query?: string, nextConfig?: NextFetchRequestConfig) {
    const queryRequest = query ? '?' + query : '';
    const url = `${base}` + queryRequest;
    return await sendRequest(url);
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

