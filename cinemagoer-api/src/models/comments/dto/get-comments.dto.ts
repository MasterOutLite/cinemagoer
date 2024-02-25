import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString, IsOptional,} from "class-validator";

export class GetCommentsDto {
    @ApiProperty({example: 1, description: 'Number page'})
    @IsNumberString()
    page: number;

    @ApiProperty({example: 10, description: 'Count comments', required: false})
    @IsNumberString()
    @IsOptional()
    count: number;

    @ApiProperty({example: 1, description: 'Id video'})
    @IsNumberString()
    videoId: number;

    @ApiProperty({example: 1, description: 'Id comment', required: false})
    @IsNumberString()
    @IsOptional()
    commentId?: number;
}
