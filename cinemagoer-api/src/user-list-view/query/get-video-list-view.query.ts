import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsNumberString} from "class-validator";

export class GetVideoListViewQuery {
    @ApiProperty({example: 1, description: 'Id video'})
    @IsNumberString()
    videoId: number;
}
