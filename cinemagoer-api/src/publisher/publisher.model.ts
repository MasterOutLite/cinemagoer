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

export interface PublisherCreateAttr {
    name: string;
}

@Table({tableName: 'publisher', createdAt: false, updatedAt: false})
class Publisher extends Model<Publisher, PublisherCreateAttr> {
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

export default Publisher;
