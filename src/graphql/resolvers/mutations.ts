import { MyContext } from '../../pages/api/graphql';
import { AccountCreateInput, MutationResolvers } from '../generated-types';

const mutations: MutationResolvers = {
  Mutation: {
    createAccount: async (_: any, { account }: { account: AccountCreateInput }, { dataSources }: MyContext) => {
      console.log(account);
      return await dataSources.accountsAPI.createAccount(account.content);
    },
  },
};

export default mutations;
