import {ApiProperty} from "@nestjs/swagger";
import DubbingStudio from "@src/dubbing-studio/dubbing-studio.model";

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
