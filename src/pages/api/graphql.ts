import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { AccountsDataSource } from '../../db/datasources';
import resolvers from '../../graphql/resolvers';
import typeDefs from '../../graphql/type-defs'

export interface MyContext {
    dataSources: {
      accountsAPI: AccountsDataSource;
    };
  }
  
const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
});

export default startServerAndCreateNextHandler<MyContext>(server, {
    context: async () => {
      return {
        dataSources: {
          accountsAPI: new AccountsDataSource(),
        },
      };
    },
  });