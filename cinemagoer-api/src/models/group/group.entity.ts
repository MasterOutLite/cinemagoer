import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";

@Entity({name: 'group'})
class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Video, video => video.group)
        //@JoinTable({name: 'group-video'})
    videos: Video[];
}

export default Group;
