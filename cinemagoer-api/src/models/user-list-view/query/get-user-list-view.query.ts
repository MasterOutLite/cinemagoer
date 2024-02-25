import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetUserListViewQuery {

    @ApiProperty({example: 1, description: 'Id user owner'})
    @IsNumber()
    userId: number;
}
