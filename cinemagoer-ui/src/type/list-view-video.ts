export type ListViewVideo = {
    "id": number,
    "videoId": number,
    "userListViewId": number,
    "userListView": {
        "id": number,
        "name": string,
        "listViewStateId": number,
        "userId": number,
        "createdAt": string,
        "updatedAt": string
    }
    notFound: boolean;
}
