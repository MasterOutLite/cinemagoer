
import {ApiProperty} from "@nestjs/swagger";
import Comments from "@models/comments/comments.entity";
import {ResponseCommentsDto} from "@models/comments/dto/response-comments.dto";


export class ResponseCountCommentsDto {
    constructor(count: number, rows: Comments[]) {
        this.rows = rows.map(value => new ResponseCommentsDto(value));
        this.count = count;
    }

    @ApiProperty({example: 10, description: 'Count comments'})
    readonly count: number;

    @ApiProperty({description: 'Comments arr'})
    readonly rows: ResponseCommentsDto[]
}
