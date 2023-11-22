import {BaseTypeSeed} from "@src/const/type/base-type-seed";

export const dayOfWeekList: BaseTypeSeed[] = [
    {
        id: 1,
        name: 'Понеділок'
    }, {
        id: 2,
        name: 'Вівторок'
    }, {
        id: 3,
        name: 'Середа'
    }, {
        id: 4,
        name: 'Четвер'
    }, {
        id: 5,
        name: 'П\'ятниця'
    }, {
        id: 6,
        name: 'Субота'
    }, {
        id: 7,
        name: 'Неділя'
    },
];

export enum DayOfWeekEnum {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}
