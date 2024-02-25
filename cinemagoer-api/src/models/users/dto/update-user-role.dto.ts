import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserRoleDto {

    @ApiProperty({example: 1, description: 'Id user for update role'})
    @IsNumber()
    userId: number;

    @ApiProperty({example: 1, description: 'Id roles for add role'})
    @IsNumber({}, {each: true})
    roleIds: number[];
}
