import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import Video from "@src/video/video.model";
import VideoGenre from "@src/genre/video-genre.model";

export interface GenreCreateAttr {
    name: string;
}

@Table({tableName: 'genre'})
class Genre extends Model<Genre, GenreCreateAttr> {
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

    @BelongsToMany(() => Video, () => VideoGenre)
    video: Video[];
}

export default Genre;
