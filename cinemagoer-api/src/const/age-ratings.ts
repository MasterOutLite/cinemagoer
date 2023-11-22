import {BaseTypeSeed} from "@src/const/type/base-type-seed";

export const ageRatings: BaseTypeSeed[] = [
    {id: 1, name: "G", description: 'Немає вікових обмежень'},
    {id: 2, name: "PG", description: 'Дітям рекомендується дивитися фільм з батьками.'},
    {id: 3, name: "PG-13", description: 'Діти до 13 років допускаються на фільм тільки з батьками.'},
    {
        id: 4,
        name: "R",
        description: 'Підлітки до 17 років допускаються до фільму тільки в супроводі одного з батьків або законного представника.'
    },
    {id: 5, name: "NC-17", description: 'Особи, які не досягли 17 років, до фільму не допускаються.'},
    {id: 6, name: "0+", description: 'Без вікових обмежень.'},
    {
        id: 7,
        name: "16+",
        description: 'Перегляд неповнолітніми до вказаного на цензі віку дозволено разом з батьками (особами, що їх замінюють) або з їхнього дозволу.'
    },
    {id: 8, name: "18+", description: 'Перегляд рекомендується тільки повнолітніми глядачами.'},
]

export enum AgeRating {
    G = 1,
    PG,
    PG13,
    R,
    NC17,
    ZeroPlus,
    SixteenPlus,
    EighteenPlus
}
