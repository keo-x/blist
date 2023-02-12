import {config} from 'dotenv'
import {DataSource} from 'typeorm'
import {getDatabaseConfig} from './database.config'

config()

export default new DataSource({
  ...getDatabaseConfig(),
})
