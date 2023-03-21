import { readFileSync } from "fs";

const typeDefs = readFileSync('src/graphql/schema.graphql', { encoding: 'utf-8' });

export default typeDefs; 