import {CreateUserDto} from "@models/users/dto/create-user.dto";

export const users: CreateUserDto[] = [
    {
        email: 'condlo@email.com',
        nickname: 'CoNkd',
        password: 'L49Dj35dE'
    }, {
        email: 'cupi@email.com',
        nickname: 'Curoiti',
        password: 'F374d83rf35Fs'
    }, {
        email: 'compaint@email.com',
        nickname: 'Cobama',
        password: 'fo0#r5ed5FDf55dsd'
    },
]

export const admins: CreateUserDto[] = [
    {
        email: 'admin.first.cinemagor@email.com',
        password: 'K4r9Jfe3845FRfd5',
        nickname: 'Admin.Covalski'
    }, {
        email: 'admin.second.cinemagor@email.com',
        password: 'K4r9Jfe3845FRfd5',
        nickname: 'Admin.Voyedger'
    },
]
