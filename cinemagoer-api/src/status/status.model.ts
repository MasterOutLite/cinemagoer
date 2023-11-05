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
import Video from "@src/video/video.model";

export interface StatusCreateAttr {
    name: string;
    description: string;
}

@Table({tableName: 'status', createdAt: false, updatedAt: false})
class Status extends Model<Status, StatusCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @Column({type: DataType.TEXT})
    description: string;

    @HasMany(()=> Video)
    video: Video[];
}

export default Status;
