import {ApiProperty} from "@nestjs/swagger";
import UserListView from "@models/user-list-view/user-list-view.entity";
import Video from "@models/video/video.entity";

export class ResponseUserListViewDto {

    constructor(entity: UserListView) {
        this.id = entity.id;
        this.name = entity.name;
        this.userId = entity.userId;
        this.listViewStateId = entity.listViewStateId;
    }

    @ApiProperty({example: 1, description: 'Id user list view'})
    id: number;

    @ApiProperty({example: 1, description: 'Id state list view'})
    listViewStateId: number;

    @ApiProperty({example: 1, description: 'Id user owner'})
    userId: number;

    @ApiProperty({example: 'Watch now', description: 'Name list view'})
    name: string;

    video?: ResponseVideoFromListView[];
}

export class ResponseVideoFromListView {
    constructor(entity: Video) {
        this.id = entity.id;
        this.name = entity.name;
        this.icon = entity.icon;
        this.videoCategoryId = entity.videoCategoryId;

    }

    @ApiProperty({example: '1', description: 'Id video.'})
    id: number;

    @ApiProperty({example: '1', description: 'Id video category.'})
    videoCategoryId: number;

    @ApiProperty({example: '["Wolf", "Вовк"]', description: 'Name video.'})
    name: string[];

    @ApiProperty({example: 'pictures/bfb73574-64dc-4fb6-97a7-9dfe9ac4aa5f.jpg4', description: 'Icon video.'})
    icon: string;
}
