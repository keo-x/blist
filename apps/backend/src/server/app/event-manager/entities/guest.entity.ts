import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import {UserEntity} from '../../users/entities/user.entity'
import {Event} from './event.entity'

@Entity('guests')
@Unique(['event', 'promoter', 'lastName', 'fristName'])
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @ManyToOne(() => Event, (event) => event.guests)
  @JoinColumn({name: 'event_uuid'})
  event!: Event

  @Column({name: 'event_uuid', type: 'varchar'})
  eventUuid!: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'promoter_uuid'})
  promoter!: UserEntity

  @Column({name: 'promoter_uuid', type: 'varchar'})
  promoterUuid!: string

  @Column('varchar')
  fristName!: string

  @Column('varchar')
  lastName!: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({name: 'created_by_uuid'})
  createdBy!: UserEntity

  @Column({name: 'created_by_uuid', type: 'varchar'})
  createdByUuid!: string

  @Column({type: 'timestamptz', nullable: true})
  arrivedAt?: Date

  @CreateDateColumn({type: 'timestamptz'})
  createdAt!: Date

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt!: Date
}
