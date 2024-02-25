
import Video from "@models/video/video.entity";
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";



@Entity({name:'age-rating'})
class AgeRating  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @OneToMany(()=> Video, video=> video.ageRating)
    video: Video[];
}

export default AgeRating;
