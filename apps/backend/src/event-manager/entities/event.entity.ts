import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {User} from '../../users/entities/user.entity'

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

  @CreateDateColumn({type: 'timestamptz'})
  createdAt!: Date

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt!: Date
}
