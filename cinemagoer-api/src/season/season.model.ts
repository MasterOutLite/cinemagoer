import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Video from "@src/video/video.model";
import VideoSeries from "@src/video-series/video-series.model";

export interface SeasonCreateAttr {
    videoId: number;
    name: string;
    number: number;
}

@Table({tableName: 'season'})
class Season extends Model<Season, SeasonCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => Video)
    @Column
    videoId: number;
    @BelongsTo(() => Video)
    video: Video;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    number: number;

    @HasMany(()=> VideoSeries)
    videoSeries: VideoSeries[];
}


export default Season;
