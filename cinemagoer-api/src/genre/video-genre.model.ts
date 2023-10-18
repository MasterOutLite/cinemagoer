import {AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import Genre from "@src/genre/genre.model";
import Video from "@src/video/video.model";

@Table({tableName: 'video-genre', updatedAt: false, createdAt: false})
class VideoGenre extends Model<VideoGenre> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => Genre)
    @Column
    genreId: number;

    @AllowNull(false)
    @ForeignKey(() => Video)
    @Column
    videoId: number;

}

export default VideoGenre;
