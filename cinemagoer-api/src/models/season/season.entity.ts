import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";
import VideoSeries from "@models/video-series/video-series.entity";

@Entity({name: 'season'})
class Season {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Video, video => video.season)
    video: Video;
    @Column()
    videoId: number;

    @Column()
    name: string;

    @Column()
    number: number;

    @OneToMany(() => VideoSeries, series => series.season)
    videoSeries: VideoSeries[];
}


export default Season;
