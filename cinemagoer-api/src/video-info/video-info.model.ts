import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import Video from "@src/video/video.model";

export interface VideoInfoCreateAttr {
    videoId: number;
    description: string;
    mainCharacters: string[];
    trailers: string[];
    countSeries: number;
    pictures: string[];
    duration: string;
}

@Table({tableName: 'video-info'})
class VideoInfo extends Model<VideoInfo, VideoInfoCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @ForeignKey(() => Video)
    @Column
    videoId: number;
    @BelongsTo(() => Video)
    video: Video;

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    description: string;

    @Column({type: DataType.ARRAY(DataType.STRING)})
    mainCharacters: string[];

    @Column({type: DataType.ARRAY(DataType.STRING)})
    trailers: string[];

    @Column
    countSeries: number;

    @Column({type: DataType.ARRAY(DataType.STRING)})
    pictures: string[];

    @Column
    duration: string;
}

export default VideoInfo;
