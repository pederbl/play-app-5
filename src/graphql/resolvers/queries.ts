import { MyContext } from '../../pages/api/graphql';
import { QueryResolvers } from '../generated-types';

const queries: QueryResolvers = {
  Query: {
    accounts: async (_: any, __: any, { dataSources }: MyContext) => {
      return await dataSources.accountsAPI.getAccounts();
    },
  },
};

export default queries;
