import {AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import Video from "@src/video/video.model";
import User from "@users/users.model";
import Comments from "@src/comments/comments.model";

export interface CommentsRateCreateAttr {
    userId:number;
    commentId: number;
    rate: boolean;
}

@Table({tableName: 'comments-rate'})
class CommentsRate extends Model<CommentsRate, CommentsRateCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number;
    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @ForeignKey(() => Comments)
    @Column
    commentId: number;
    @BelongsTo(() => Comments)
    comments: Comments;

    @AllowNull(false)
    @Column
    rate: boolean
}

export default CommentsRate;
