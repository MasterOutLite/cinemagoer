import {ApiProperty} from "@nestjs/swagger";
import {ResponseVideoFromListView} from "@models/user-list-view/dto/response-user-list-view.dto";

export class ResponseListViewArrDto {
    constructor() {
    }

    @ApiProperty({example: 1, description: 'Id user list view'})
    userListViewId: number;

    @ApiProperty({example: [{id: 1, name: ['Name', 'filo'], icon: 'pictures/sdsfds88.png'}], description: 'List video'})
    video: ResponseVideoFromListView[]
}


