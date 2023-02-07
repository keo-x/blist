import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum UserRole {
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
  MANAGER = 'MANAGER',
  PROMOTER = 'PROMOTER',
}

export const EVENT_ORGANIZER_ROLES = [UserRole.ADMIN, UserRole.ORGANIZER]

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PROMOTER,
  })
  role!: UserRole

  @Column('varchar', {nullable: true})
  lastName?: string

  @Column('timestamptz', {nullable: true})
  onboardedAt?: Date

  @CreateDateColumn({type: 'timestamptz'})
  createdAt!: Date

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt!: Date
}
