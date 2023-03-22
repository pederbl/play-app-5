import { readdirSync } from 'fs';
import { Resolvers } from './generated-types';

const dirNames = readdirSync('./src/graphql/resources');
const resourceResolvers: Resolvers[] = await Promise.all(
  dirNames.map(async (dirName) => (await import("./resources/" + dirName + "/resolvers")).default)
);

const resolvers: Resolvers = {
  Mutation: {}, 
  Query: {}
};
resourceResolvers.forEach((resourceResolver) => {
  resolvers.Mutation = { ...resolvers.Mutation, ...resourceResolver.Mutation }
  resolvers.Query = { ...resolvers.Query, ...resourceResolver.Query }
}); 

export default resolvers;
