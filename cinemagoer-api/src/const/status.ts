import {BaseTypeSeed} from "@src/const/type/base-type-seed";

export const statuses: BaseTypeSeed[] = [
    {id: 1, name: "Анонсовано", description: 'Дане відео є анансоване і ще не вийшло в прокат.'},
    {id: 2, name: "Виходить", description: 'Дане відео вже зявилось але не повністю вийшло.'},
    {id: 3, name: "Вийшло", description: 'Дане відео вже вийшло повністю.'},
    {id: 4, name: "Закинуто", description: 'По деяким причинам дане відео було закинуте і перестало виходити далі.'},
]

export enum Status {
    Announced = 1,
    ItComesOut,
    ItWorkedOut,
    Abandoned
}
