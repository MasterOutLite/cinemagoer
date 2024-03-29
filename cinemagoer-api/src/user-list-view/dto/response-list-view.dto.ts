import {ApiProperty} from "@nestjs/swagger";
import ListView from "@src/list-view/list-view.model";
import {StateAction} from "@src/user-list-view/dto/state-action";

export class ResponseListViewDto {
    constructor(entity: ListView, add: boolean, state: StateAction) {
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

    @ApiProperty({example: 'create', description: 'State action'})
    state: StateAction;
}
