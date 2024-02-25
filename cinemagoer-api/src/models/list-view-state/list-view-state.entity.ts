import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import UserListView from "@models/user-list-view/user-list-view.entity";

@Entity({name: 'list-view-state'})
class ListViewState {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @OneToMany(() => UserListView, list => list.listViewState)
    userListView: UserListView[];

}


export default ListViewState;
