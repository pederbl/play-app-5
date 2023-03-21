import { Resolvers } from '../generated-types';
import queries from './queries';
import mutations from './mutations';

const resolvers: Resolvers = { ...queries, ...mutations };

export default resolvers;
