/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'first_name'})
  firstName: string;

  @Column()
   email: string;

  @Column()
  password: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  updateAt: string;

  @DeleteDateColumn({name: 'deleted_at'})
  deleteAt: string;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
}
}
