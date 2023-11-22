import {BaseTypeSeed} from "@src/const/type/base-type-seed";

export const roles: BaseTypeSeed[] = [
    {id: 1, name: "USER", description: 'Simple user'},
    {id: 2, name: "ADMIN", description: 'Administrator'},
    {id: 3, name: 'MODERATOR', description: "Moderator"},
    {id: 4, name: 'VIP', description: 'VIP User'},
    {id: 5, name: 'ADD_Video', description: 'Can create new video'},
    {id: 6, name: 'UPLOAD_VIDEO', description: 'Can upload new video'},
    {id: 7, name: 'BAN_USER', description: 'Can ban user or mute'},
]

export enum RoleUser {
    USER = 1,
    ADMIN,
    MODERATOR,
    VIP,
    ADD_Video,
    UPLOAD_VIDEO,
    BAN_USER
}
