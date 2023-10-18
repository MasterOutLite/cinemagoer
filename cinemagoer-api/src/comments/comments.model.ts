import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Video from "@src/video/video.model";
import User from "@users/users.model";
import CommentsRate from "@src/comments-rate/comments-rate.model";

export interface CommentsCreateAttr {
    videoId: number;
    userId: number;
    comment: string;
}

@Table({tableName: 'comments'})
class Comments extends Model<Comments, CommentsCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => Video)
    @Column
    videoId: number;
    @BelongsTo(() => Video)
    video: Video;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number;
    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @Column
    comment: string;

    @ForeignKey(()=> Comments)
    @Column
    commentId: number;
    @BelongsTo(() => Comments)
    commentsOne: Comments;


    @ForeignKey(() => User)
    @Column
    userAnswerId: number;
    @BelongsTo(() => User,'answer')
    userAnswer: User;

    @HasMany(()=> CommentsRate,)
    commentsRate: CommentsRate[];

    @HasMany(()=> Comments)
    comments: Comments[];
}

export default Comments;
