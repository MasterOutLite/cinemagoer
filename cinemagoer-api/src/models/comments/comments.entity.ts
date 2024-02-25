import Video from "@models/video/video.entity";
import User from "@models/users/users.entity";
import CommentsRate from "@models/comments-rate/comments-rate.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'comments'})
class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Video, video => video.comments)
    video: Video;
    @Column()
    videoId: number;

    @ManyToOne(() => User, user => user.comments)
    user: User;
    @Column()
    userId: number;

    @Column()
    comment: string;

    @ManyToOne(() => Comments, comments => comments.comments)
    commentsOne: Comments;
    @Column()
    commentId: number;

    @ManyToOne(() => User, user => user.commentsAnswer)
    userAnswer: User;
    @Column()
    userAnswerId: number;

    @OneToMany(() => CommentsRate, rate => rate.comments)
    commentsRate: CommentsRate[];

    @OneToMany(() => Comments, comments => comments.commentsOne)
    comments: Comments[];
    createdAt: string;
}

export default Comments;
