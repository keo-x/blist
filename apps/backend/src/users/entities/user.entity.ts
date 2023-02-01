import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column('varchar', {unique: true})
  email!: string

  @Column('varchar', {nullable: true})
  displayName?: string

  @Column('varchar', {nullable: true})
  fristName?: string

  @Column('varchar', {nullable: true})
  lastName?: string

  @Column('timestamptz', {nullable: true})
  onboardedAt?: Date

  @CreateDateColumn({type: 'timestamptz'})
  createdAt!: Date

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt!: Date
}
