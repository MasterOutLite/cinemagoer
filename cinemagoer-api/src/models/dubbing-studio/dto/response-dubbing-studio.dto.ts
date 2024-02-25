import {ApiProperty} from "@nestjs/swagger";
import DubbingStudio from "@models/dubbing-studio/dubbing-studio.entity";

export class ResponseDubbingStudioDto {

    constructor(entity: DubbingStudio) {
        this.id = entity.id;
        this.name = entity.name;
    }

    @ApiProperty({example: '1', description: 'ID'})
    id: number;

    @ApiProperty({example: 'Funny team', description: 'Name studio'})
    name: string;
}
