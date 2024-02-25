import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import User from "@models/users/users.entity";

@Entity({name: 'role'})
class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @ManyToMany(() => User, user => user.role)
    //@JoinTable({name: 'user-roles'})
    users: User[];
}

export default Role;
