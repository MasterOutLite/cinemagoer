import {ApiProperty} from "@nestjs/swagger";
import ListView from "@src/list-view/list-view.model";

export class ResponseListViewDto {
    constructor(entity: ListView, add: boolean) {
        this.add = add;
        this.userListViewId = entity.userListViewId;
        this.videoId = entity.videoId;
    }

    @ApiProperty({example: 1, description: 'Id user list view'})
    userListViewId: number;

    @ApiProperty({example: 1, description: 'Id video'})
    videoId: number;

    @ApiProperty({example: true, description: 'Add to list or remove'})
    add: boolean;
}
