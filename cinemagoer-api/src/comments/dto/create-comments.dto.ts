import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsNumberString, IsOptional, IsString} from "class-validator";

export class CreateCommentsDto {
    @ApiProperty({example: 1, description: 'ID video'})
    @IsNumber()
    readonly videoId: number;

    @ApiProperty({example: "I liked the video!!!", description: 'Your comment'})
    @IsString()
    readonly comment: string;

    @ApiProperty({example: 1, description: 'ID comment main'})
    @IsNumber()
    @IsOptional()
    readonly commentId?: number;

    @ApiProperty({example: 1, description: 'ID answer to user'})
    @IsNumber()
    @IsOptional()
    readonly userAnswerId?: number;
}
