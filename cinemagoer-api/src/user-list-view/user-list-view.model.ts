import {
    AllowNull, AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import ListViewState from "@src/list-view-state/list-view-state.model";
import User from "@users/users.model";
import ListView from "@src/list-view/list-view.model";

export interface UserListViewCreateAttr {
    name: string;
    userId: number;
    listViewStateId: number;
}

@Table({tableName: 'user-list-view'})
class UserListView extends Model<UserListView, UserListViewCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @Column
    description: string;

    @AllowNull(false)
    @ForeignKey(() => ListViewState)
    @Column({type: DataType.INTEGER})
    listViewStateId: number;
    @BelongsTo(() => ListViewState)
    listViewState: ListViewState;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;
    @BelongsTo(() => User)
    user: User;

    @HasMany(() => ListView)
    listView: ListView[];
}


export default UserListView;
