import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    Default,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Video from "@src/video/video.model";
import DubbingOfVideo from "@src/dubbing-of-video/dubbing-of-video.model";
import Season from "@src/season/season.model";
import DayOfWeek from "@src/video-series/day-of-week.model";

export interface VideoSeriesCreateAttr {
    videoId: number;
    series: number;
    name: string;
    dateRelease: Date;
    release: boolean;
    seasonId: number;
}

@Table({tableName: 'video-series'})
class VideoSeries extends Model<VideoSeries, VideoSeriesCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => Video)
    @AllowNull(false)
    @Column
    videoId: number;
    @BelongsTo(() => Video)
    video: Video;

    @AllowNull(false)
    @Column
    series: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    dateRelease: Date;

    @AllowNull(false)
    @Default(false)
    @Column
    release: boolean;

    @ForeignKey(() => Season)
    @Column
    seasonId: number;
    @BelongsTo(() => Season)
    season: Season;

    @ForeignKey(() => DayOfWeek)
    @Column
    dayShowId: number;
    @BelongsTo(() => DayOfWeek)
    dayShow: DayOfWeek;

    @HasMany(() => DubbingOfVideo)
    dubbingOfVideo: DubbingOfVideo[];
}

export default VideoSeries;
