import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class CreateGroupDto {

    @ApiProperty({example: 'Haki', description: 'Name group'})
    @IsString()
    @Length(3, 255)
    name: string;
}
