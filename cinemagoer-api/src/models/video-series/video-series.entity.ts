import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";
import Season from "@models/season/season.entity";
import DayOfWeek from "@models/video-series/day-of-week.entity";
import DubbingOfVideo from "@models/dubbing-of-video/dubbing-of-video.entity";

@Entity({name: 'video-series'})
class VideoSeries {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Video, video => video.videoSeries)
    video: Video;
    @Column()
    videoId: number;

    @Column()
    series: number;

    @Column()
    name: string;

    @Column()
    dateRelease: Date;

    @Column({default: false})
    release: boolean;

    @ManyToOne(() => Season, season => season.videoSeries)
    season: Season;
    @Column()
    seasonId: number;

    @ManyToOne(() => DayOfWeek, dayOfWeekList => dayOfWeekList.videoSeries)
    dayShow: DayOfWeek;
    @Column()
    dayShowId: number;

    @OneToMany(() => DubbingOfVideo, dubbing => dubbing.videoSeries)
    dubbingOfVideo: DubbingOfVideo[];
}

export default VideoSeries;
