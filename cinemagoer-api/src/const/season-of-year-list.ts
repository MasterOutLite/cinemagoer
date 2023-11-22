import {BaseTypeSeed} from "@src/const/type/base-type-seed";

export const seasonOfYearList: BaseTypeSeed[] = [
    {
        id: 1,
        name: 'Зима',
    }, {
        id: 2,
        name: 'Весна',
    }, {
        id: 3,
        name: 'Літо',
    }, {
        id: 4,
        name: 'Осінь',
    },
]

export enum SeasonOfYearEnum {
    Winter = 1,
    Spring,
    Summer,
    Fall
}
