import {AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import DubbingStudio from "@src/dubbing-studio/dubbing-studio.model";
import VideoSeries from "@src/video-series/video-series.model";

export interface DubbingOfVideoCreateAttr {
    dubbingStudioId: number;
    videoSeriesId: number;
    video: string;
}

@Table({tableName: 'dubbing-of-video'})
class DubbingOfVideo extends Model<DubbingOfVideo, DubbingOfVideoCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => DubbingStudio)
    @Column
    dubbingStudioId: number;
    @BelongsTo(() => DubbingStudio)
    dubbingStudio: DubbingStudio;

    @AllowNull(false)
    @ForeignKey(() => VideoSeries)
    @Column
    videoSeriesId: number;
    @BelongsTo(() => VideoSeries)
    videoSeries: VideoSeries;

    @AllowNull(false)
    @Column
    video: string;
}

export default DubbingOfVideo;
