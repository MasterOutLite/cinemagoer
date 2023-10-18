import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import Role from "@role/role.model";
import User from "@users/users.model";

@Table({tableName: 'user-roles', createdAt: false, updatedAt: false})
class UserRole extends Model<UserRole> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => Role)
    @Column
    roleId: number;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number;

}

export default UserRole;
