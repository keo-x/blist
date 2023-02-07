import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({name: 'events'})
export class Event {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column('varchar')
  name!: string

  @Column('timestamptz')
  date!: Date

  @CreateDateColumn({type: 'timestamptz'})
  createdAt!: Date

  @UpdateDateColumn({type: 'timestamptz'})
  updatedAt!: Date
}
