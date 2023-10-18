import {AllowNull, AutoIncrement, BelongsToMany, Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import Video from "@src/video/video.model";
import GroupVideo from "@src/group/group-video.model";

export interface GroupCreateAttr {
    name: string;
}

@Table({tableName: 'group'})
class Group extends Model<Group, GroupCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @BelongsToMany(()=> Video, ()=> GroupVideo)
    video: Video[];
}

export default Group;
