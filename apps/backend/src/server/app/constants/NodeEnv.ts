export enum NodeEnv {
  PRODUCTION = 'production',
  DEVELOP = 'development',
  TEST = 'test',
}

const parseNodeEnv = (): NodeEnv => {
  switch (process.env.NODE_ENV) {
    case 'production': {
      return NodeEnv.PRODUCTION
    }
    case 'test': {
      return NodeEnv.TEST
    }
    default: {
      return NodeEnv.DEVELOP
    }
  }
}

const NODE_ENV: NodeEnv = parseNodeEnv()

export const getNodeEnv = (): NodeEnv => NODE_ENV
