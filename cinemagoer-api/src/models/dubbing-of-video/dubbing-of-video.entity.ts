import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import DubbingStudio from "@models/dubbing-studio/dubbing-studio.entity";
import VideoSeries from "@models/video-series/video-series.entity";


@Entity({name: 'dubbing-of-video'})
class DubbingOfVideo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => DubbingStudio, dubbing => dubbing.dubbingOfVideo)
    dubbingStudio: DubbingStudio;
    @Column()
    dubbingStudioId: number;

    @ManyToOne(() => VideoSeries, series => series.dubbingOfVideo)
    videoSeries: VideoSeries;
    @Column()
    videoSeriesId: number;

    @Column()
    video: string;
}

export default DubbingOfVideo;
