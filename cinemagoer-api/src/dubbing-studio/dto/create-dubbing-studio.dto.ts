import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class CreateDubbingStudioDto {

    @ApiProperty({example: 'FunnyTeam', description: 'Name studio'})
    @Length(0, 255)
    @IsString()
    name: string;
}
