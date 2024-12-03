import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  documents: './src/services/graphql/(queries|mutations|subscriptions)/**/*.ts',
  generates: {
    './src/services/graphql/codegen/': {
      preset: 'client',
    },
  },
  overwrite: true,
  schema: 'https://inctagram.work/api/v1/graphql',
}

export default config
