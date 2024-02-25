import {ApiProperty} from "@nestjs/swagger";
import SeasonOfYear from "@models/video/season-of-year.entity";

export default class ResponseSeasonOfYearDto {
    constructor(entity: SeasonOfYear) {
        this.id = entity.id;
        this.name = entity.name;
    }

    @ApiProperty({example: '1', description: 'Id video.'})
    id: number;
    @ApiProperty({example: 'Winter', description: 'Name season'})
    name: string;
}
