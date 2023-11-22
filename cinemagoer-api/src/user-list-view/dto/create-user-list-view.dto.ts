import {IsNumber, IsString} from "class-validator";

export class CreateUserListViewDto {

    @IsNumber()
    userId: number;

    @IsNumber()
    listViewStateId: number;

    @IsString()
    name: string;
}
