import {ApiProperty} from "@nestjs/swagger";
import Role from "@models/role/role.entity";

export class ResponseRoleDto {
    constructor(role: Role, withoutDesc = false) {
        this.id = role.id;
        this.name = role.name;
        if (!withoutDesc)
            this.description = role.description;
    }

    @ApiProperty({example: '1', description: 'ID role'})
    readonly id: number;

    @ApiProperty({example: 'Name role', description: 'Name role'})
    readonly name: string;

    @ApiProperty({
        example: 'A user role that allows you to save playlists, rate and write comments.',
        description: 'Description of what the role does'
    })
    readonly description?: string;
}
