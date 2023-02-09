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
import {User} from '../../users/entities/user.entity'
import {Guest} from './guest.entity'

@Entity({name: 'events'})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column('varchar')
  name!: string

  @Column('timestamptz')
  date!: Date

  @ManyToOne(() => User)
  @JoinColumn({name: 'created_by_uuid'})
  createdBy!: User

  @Column({name: 'created_by_uuid', type: 'varchar'})
  createdByUuid!: string

  @OneToMany(() => Guest, (guest) => guest.event)
  guests?: Guest[]

  @CreateDateColumn({type: 'timestamptz'})
  createdAt!: Date

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt!: Date
}
