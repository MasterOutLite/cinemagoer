import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber} from "class-validator";

export class CreateCommentRateDto {
    @ApiProperty({example: 1, description: 'Comment id'})
    @IsNumber()
    commentId: number;

    @ApiProperty({example: true, description: 'Like(tre) or hate(false)'})
    @IsBoolean()
    rate: boolean;
}
