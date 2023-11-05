import {ResponseCommentsDto} from "@src/comments/dto/response-comments.dto";
import {ApiProperty} from "@nestjs/swagger";
import Comments from "@src/comments/comments.model";

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
