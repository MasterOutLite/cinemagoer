import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Role from "@models/role/role.entity";
import UserListView from "@models/user-list-view/user-list-view.entity";
import VideoRate from "@models/video-rate/video-rate.entity";
import Comments from "@models/comments/comments.entity";
import CommentsRate from "@models/comments-rate/comments-rate.entity";


@Entity({name: 'users'})
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    nickname: string;

    @Column({nullable: true})
    avatar: string;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({name: 'user-roles'})
    role: Role[];

    @OneToMany(() => UserListView, list => list.user)
    userListView: UserListView[];

    @OneToMany(() => VideoRate, rate => rate.user)
    videoRate: VideoRate[];

    @OneToMany(() => Comments, comments => comments.user)
    comments: Comments[];

    @OneToMany(() => Comments, comments => comments.userAnswer)
    commentsAnswer: Comments[];

    @OneToMany(() => CommentsRate, rate => rate.user)
    commentsRate: CommentsRate[];
}


export default User;
