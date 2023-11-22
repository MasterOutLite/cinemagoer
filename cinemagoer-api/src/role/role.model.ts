import {
    AllowNull,
    AutoIncrement,
    BelongsToMany,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table, Unique
} from "sequelize-typescript";
import User from "@users/users.model";
import UserRole from "@role/user-role.model";

export interface RoleCreateAttr {
    id: number;
    name: string;
    description: string;
}

@Table({tableName: 'role'})
class Role extends Model<Role, RoleCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @Column({type: DataType.TEXT})
    description: string;

    @BelongsToMany(()=> User, ()=> UserRole)
    users: User[];
}

export default Role;
