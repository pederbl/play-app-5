import { readFileSync, readdirSync } from "fs";

const filenames = readdirSync('src/graphql/resources');
const models = filenames.map(filename => readFileSync('src/graphql/resources/' + filename + "/schema.graphql", { encoding: 'utf-8' }))

const typeDefs = models.join("\n");

export default typeDefs;
