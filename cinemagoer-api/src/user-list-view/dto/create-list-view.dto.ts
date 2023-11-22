import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsNumber} from "class-validator";

export class CreateListViewDto {

    @ApiProperty({example: 1, description: 'Id user list view'})
    @IsNumber()
    userListViewId: number;

    @ApiProperty({example: 1, description: 'Id video'})
    @IsNumber()
    videoId: number;

    @ApiProperty({example: true, description: 'Add to list or remove'})
    @IsBoolean()
    add: boolean;
}
