import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import DubbingOfVideo from "@models/dubbing-of-video/dubbing-of-video.entity";

@Entity({name: 'dubbing-studio'})
class DubbingStudio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @OneToMany(() => DubbingOfVideo, dubbing => dubbing.dubbingStudio)
    dubbingOfVideo: DubbingOfVideo[];
}

export default DubbingStudio;
