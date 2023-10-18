import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import Role from "@role/role.model";
import UserRole from "@role/user-role.model";
import UserListView from "@src/user-list-view/user-list-view.model";
import VideoRate from "@src/video-rate/video-rate.model";
import Comments from "@src/comments/comments.model";
import CommentsRate from "@src/comments-rate/comments-rate.model";

export interface UserCreateAttr {
    email: string;
    password: string;
    nickname: string;
    avatar: string;
}

@Table({tableName: 'users'})
class User extends Model<User, UserCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column
    nickname: string;

    @Column
    avatar: string;

    @BelongsToMany(()=> Role, ()=> UserRole)
    role: Role[];

    @HasMany(()=> UserListView)
    userListView: UserListView[];

    @HasMany(()=> VideoRate)
    videoRate: VideoRate[];

    @HasMany(()=> Comments)
    comments: Comments[];

    @HasMany(()=> Comments,'answer')
    commentsAnswer: Comments[];

    @HasMany(()=> CommentsRate,)
    commentsRate: CommentsRate[];
}


export default User;
