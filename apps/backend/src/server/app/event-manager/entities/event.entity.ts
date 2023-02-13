import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {UserEntity} from '../../users/entities/user.entity'
import {Guest} from './guest.entity'

@Entity({name: 'events'})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column('varchar')
  name!: string

  @Column('timestamptz')
  date!: Date

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'created_by_uuid'})
  createdBy!: UserEntity

  @Column({name: 'created_by_uuid', type: 'varchar'})
  createdByUuid!: string

  @OneToMany(() => Guest, (guest) => guest.event)
  guests?: Guest[]

  @CreateDateColumn({type: 'timestamptz'})
  createdAt!: Date

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt!: Date
}
