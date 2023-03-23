import crypto from 'crypto'; 
import { QueryResolvers, Resolvers } from '../../generated-types';
import { MyContext } from '../../../pages/api/graphql';
import { AccountCreateInput, MutationResolvers } from '../../generated-types';
import { getCouchbaseClient } from '@/data/couchbase/client';

const mutations: MutationResolvers = {
    Mutation: {
        accountCreate: async (_: any, { account }: { account: AccountCreateInput }, context: MyContext) => {
            const content = account.content;
            const { accountsCollection } = await getCouchbaseClient();
            const id = "acc" + crypto.randomUUID(); 
            await accountsCollection.insert(id, content);
            return {
              code: '200',
              success: true,
              message: 'Account created!',
              account: {
                id: id, 
                content: content
              },
            };
        },
    },
};

const queries: QueryResolvers = {
    Query: {
        accounts: async (_: any, __: any, context: MyContext) => {
            const { cluster } = await getCouchbaseClient();
            const query = "SELECT META().id, * FROM main.play.accounts";
            const response = await cluster.query(query);
            const outputRecords = response.rows.map((row: any) => { return { id: row.id, content: row.accounts } });
            return outputRecords;
        },
    },
};

const resolvers: Resolvers = { ...queries, ...mutations };

export default resolvers;



// GET: async (req, res) => {
//   const { cluster } = await getCouchbaseClient();
//   const query = "SELECT META().id, * FROM main.play.accounts";
//   const response = await cluster.query(query);    
//   const outputRecords = response.rows.map((row) => { return { id: row.id, content: row.accounts } });
//   res.status(200).json({ status: "SUCCESS", data: { records: outputRecords }});
// },
// POST: async (req, res) => {
//   const { accountsCollection } = await getCouchbaseClient();
//   const conflictingIds = []; 
//   for (const inputRecord of req.body.records) {
//       try {
//           await accountsCollection.insert(inputRecord.id, sanitizeAccountInputContent(inputRecord.content));
//       } catch (err) {
//           if (err instanceof DocumentExistsError) {
//               conflictingIds.push(inputRecord.id);
//           } else {
//               throw err;
//           }
//       }
//   }  
//   if (conflictingIds.length === 0) {
//       res.status(201).json({ status: "SUCCESS" }); 
//   } else {
//       res.status(409).json({ status: "ERROR", message: "Some of the specified ids already exist.", error: { conflictingIds } });
//   }
// },
// PUT: async (req, res) => {
//   const { accountsCollection } = await getCouchbaseClient();
//   const notFoundIds = []; 
//   for (const inputRecord of req.body.records) {
//       try {
//           await accountsCollection.replace(inputRecord.id, sanitizeAccountInputContent(inputRecord.content));
//       } catch (err) {
//           if (err instanceof DocumentNotFoundError) {
//               notFoundIds.push(inputRecord.id); 
//           } else {
//               throw err; 
//           }
//       } 
//   }
//   if (notFoundIds.length === 0) {
//       res.status(200).json({ status: "SUCCESS" });
//   } else {
//       res.status(422).json({ status: "ERROR", message: "Some of the specified ids do not exist.", error: { notFoundIds }})
//   }
// },
// PATCH: async (req, res) => {
//   const { accountsCollection } = await getCouchbaseClient();
//   const notFoundIds = []; 
//   for (const inputRecord of req.body.records) {
//       const valuesToUpdate = sanitizeAccountInputContent(inputRecord.content);
//       const mutateInOperations = [];
//       for (const key in valuesToUpdate) {
//           mutateInOperations.push(MutateInSpec.upsert(key, valuesToUpdate[key]))
//       }
//       try {
//           await accountsCollection.mutateIn(inputRecord.id, mutateInOperations); 
//       } catch (err) {
//           if (err instanceof DocumentNotFoundError) {
//               notFoundIds.push(inputRecord.id); 
//           } else {
//               throw err; 
//           }
//       }
//   }
//   if (notFoundIds.length === 0) {
//       res.status(200).json({ status: "SUCCESS" });
//   } else {
//       res.status(422).json({ status: "ERROR", message: "Some of the specified ids do not exist.", error: { notFoundIds }})
//   }
// },
// DELETE: async (req, res) => {
//   const { accountsCollection } = await getCouchbaseClient();

//   const notFoundIds = []; 
//   for (const inputId of req.body.ids) {
//       try {
//           await accountsCollection.remove(inputId);
//       } catch (err) {
//           if (err instanceof DocumentNotFoundError) {
//               notFoundIds.push(inputId); 
//           } else {
//               throw err; 
//           }
//       }
//   }
//   if (notFoundIds.length === 0) {
//       res.status(204).json({ status: "SUCCESS" });
//   } else {
//       res.status(422).json({ status: "ERROR", message: "Some of the specified ids do not exist.", error: { notFoundIds }})
//   }
// }