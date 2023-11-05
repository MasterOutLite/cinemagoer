import Group from "@src/group/group.model";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString, IsString} from "class-validator";

export class ResponseGroupDto {
    constructor(group: Group) {
        this.id = group.id;
        this.name = group.name;
    }

    @ApiProperty({example: '1', description: 'Id group'})
    @IsNumberString()
    id: number;

    @ApiProperty({example: 'Haki', description: 'Name group'})
    @IsString()
    name: string;
}
