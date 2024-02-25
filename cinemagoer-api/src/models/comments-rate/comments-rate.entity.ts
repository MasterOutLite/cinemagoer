import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "@models/users/users.entity";
import Comments from "@models/comments/comments.entity";

@Entity({name: 'comments-rate'})
class CommentsRate {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.commentsRate)
    user: User;
    @Column()
    userId: number;

    @ManyToOne(() => Comments, comments => comments.commentsRate)
    comments: Comments;
    @Column()
    commentsId: number;

    @Column()
    rate: boolean
}

export default CommentsRate;
