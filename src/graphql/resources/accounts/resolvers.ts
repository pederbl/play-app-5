import { QueryResolvers, Resolvers } from '../../generated-types';
import { MyContext } from '../../../pages/api/graphql';
import { AccountCreateInput, MutationResolvers } from '../../generated-types';

const mutations: MutationResolvers = {
    Mutation: {
        accountCreate: async (_: any, { account }: { account: AccountCreateInput }, { dataSources }: MyContext) => {
            return await dataSources.accounts.accountCreate(account.content);
        },
    },
};

const queries: QueryResolvers = {
    Query: {
        accounts: async (_: any, __: any, { dataSources }: MyContext) => {
            return await dataSources.accounts.accountsGet();
        },
    },
};

const resolvers: Resolvers = { ...queries, ...mutations };

export default resolvers;