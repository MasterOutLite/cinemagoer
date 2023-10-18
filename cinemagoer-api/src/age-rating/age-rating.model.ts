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

export interface AgeRatingCreateAttr {
    name: string;
}

@Table({tableName: 'age-rating', createdAt: false, updatedAt: false})
class AgeRating extends Model<AgeRating, AgeRatingCreateAttr> {
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

    @HasMany(()=> Video)
    video: Video[];
}

export default AgeRating;
