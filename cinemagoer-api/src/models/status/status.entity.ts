import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";

@Entity({name: 'status'})
class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'text'})
    description: string;

    @OneToMany(() => Video, video => video.status)
    video: Video[];
}

export default Status;