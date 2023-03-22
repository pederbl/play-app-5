import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import resolvers from '../../graphql/resolvers';
import typeDefs from '../../graphql/type-defs';
import { dataSources, MyDataSources } from '../../graphql/data-sources'

export interface MyContext {
  dataSources: MyDataSources
};
  
const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  }
);

export default startServerAndCreateNextHandler<MyContext>(server, {
    context: async () => {
      return {
        dataSources: dataSources
      };
    },
  }
);