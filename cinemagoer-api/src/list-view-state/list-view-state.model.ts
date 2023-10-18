import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import UserListView from "@src/user-list-view/user-list-view.model";

export interface ListViewStateCreateAttr {
    name: string;
}

@Table({tableName: 'list-view-state', createdAt: false, updatedAt: false})
class ListViewState extends Model<ListViewState, ListViewStateCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @Column
    description: string;

    @HasMany(()=> UserListView)
    userListView: UserListView[];

}


export default ListViewState;
