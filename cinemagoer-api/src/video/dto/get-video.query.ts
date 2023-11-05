import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString} from "class-validator";

export class GetVideoQuery {
    @ApiProperty({example: 1, description: 'What video you need'})
    @IsNumberString()
    id: number;
}
