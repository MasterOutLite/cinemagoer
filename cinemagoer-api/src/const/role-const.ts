import {CreateRoleDto} from "@role/dto/create-role.dto";

export const roles: CreateRoleDto[] = [
    {name: "USER", description: 'Simple user'},
    {name: "ADMIN", description: 'Administrator'},
    {name: 'MODERATOR', description: "Moderator"},
    {name: 'VIP', description: 'VIP User'},
    {name: 'ADD_Video', description: 'Can create new video'},
    {name: 'UPLOAD_VIDEO', description: 'Can upload new video'},
    {name: 'BAN_USER', description: 'Can ban user or mute'},
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
