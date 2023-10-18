import {AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import UserListView from "@src/user-list-view/user-list-view.model";
import Video from "@src/video/video.model";

export interface ListViewCreateAttr {
    userListViewId: number;
    videoId: number;
}

@Table({tableName: 'list-view', createdAt: false, updatedAt: false})
class ListView extends Model<ListView, ListViewCreateAttr> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(()=> Video)
    @Column
    videoId: number;
    @BelongsTo(()=> Video)
    video: Video

    @AllowNull(false)
    @ForeignKey(()=> UserListView)
    @Column
    userListViewId: number;
    @BelongsTo(()=> UserListView)
    userListView: UserListView
}


export default ListView;
