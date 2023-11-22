import {BaseTypeSeed} from "@src/const/type/base-type-seed";

export const videoCategorys: BaseTypeSeed[] = [
    {id: 1, name: "Фільм", description: 'Фільм категорія відео'},
    {id: 2, name: "Серіали", description: 'Фільм категорія відео'},
    {id: 3, name: "Мультфільм", description: 'Мультфільм категорія відео'},
    {id: 4, name: "Аніме", description: 'Аніме категорія відео'},
];

export enum VideoCategory {
    Movie = 1,
    Serial,
    Cartoon,
    Anime
}
