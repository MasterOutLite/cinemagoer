import {AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import Video from "@src/video/video.model";
import Group from "@src/group/group.model";


@Table({tableName: 'group-video'})
class GroupVideo extends Model<GroupVideo> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => Group)
    @Column
    groupId: number;

    @AllowNull(false)
    @ForeignKey(() => Video)
    @Column
    videoId: number;
}

export default GroupVideo;
