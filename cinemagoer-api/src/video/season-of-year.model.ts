import {AllowNull, AutoIncrement, Column, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import VideoSeries from "@src/video-series/video-series.model";
import Video from "@src/video/video.model";

export interface SeasonOfYearCreateAtr {
    id: number;
    name: string;
}

@Table({tableName: 'season-of-year', updatedAt: false, createdAt: false})
export default class SeasonOfYear extends Model<SeasonOfYear, SeasonOfYearCreateAtr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;


    @HasMany(() => Video)
    video: Video[];
}
