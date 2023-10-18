import {AllowNull, AutoIncrement, Column, HasMany, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import DubbingOfVideo from "@src/dubbing-of-video/dubbing-of-video.model";

export interface DubbingStudioCreateAttr {
    name: string;
}

@Table({tableName: 'dubbing-studio'})
class DubbingStudio extends Model<DubbingStudio, DubbingStudioCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @HasMany(() => DubbingOfVideo)
    dubbingOfVideo: DubbingOfVideo[];
}

export default DubbingStudio;
