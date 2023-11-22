import {BaseTypeSeed} from "@src/const/type/base-type-seed";

export const types: BaseTypeSeed[] = [
    {id: 1, name: "Фільм", description: 'Вставити'},
    {id: 2, name: "Серіал", description: 'Вставити'},
    {id: 3, name: 'OVA', description: "Вставити"},
    {id: 4, name: 'Короткометражний фільм', description: 'Вставити'},
    {id: 5, name: 'Спеціальний епізод', description: 'Вставити'},
]

export enum Type {
    Movie = 1,
    Serial,
    OVA,
    ShortMovie,
    SpecialEpisode,
}
