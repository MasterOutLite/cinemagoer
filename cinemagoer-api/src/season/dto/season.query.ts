import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class SeasonQuery {

    @ApiProperty({example: '1', description: 'ID video'})
    @IsNumber({}, {message: 'Is not number'})
    readonly videoId: number;
}
