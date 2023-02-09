import {config} from 'dotenv'
import {join} from 'path'
import {DataSource} from 'typeorm'
import {getDatabaseConfig} from './database.config'

config()

export default new DataSource({
  ...getDatabaseConfig(),
  migrations: [join(process.cwd(), 'src/database/migrations/*{.ts,.js}')],
})
