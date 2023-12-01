export type ListView = {
    id: number;
    name: string;
    listViewStateId: number;
    userId: number;
    video?: VideoFromListView[];
}

export type VideoFromListView = {
    id: number;
    name: string[];
    icon: string;
    videoCategoryId: number;
}
