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

export interface TypeCreateAttr {
    name: string;
    description: string;
}

@Table({tableName: 'types', createdAt: false, updatedAt: false})
class Type extends Model<Type, TypeCreateAttr> {
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

    @HasMany(() => Video)
    video: Video[];
}

export default Type;
