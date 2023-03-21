import crypto from "crypto";
import { CreateAccountMutationResponse, Account, AccountCreateInput, AccountContent, AccountContentInput } from '../graphql/generated-types';
import { getCouchbaseClient } from './couchbase/client';

export class AccountsDataSource {
  accounts: Account[] = [
    {
      id: "acc1", 
      content: {
        name: 'Data Talks',
        phone: '555-555 55 55'
      }
    },
    {
      id: "acc2",
      content: {
        name: 'Couchbase'
      } 
    },
  ];

  async getAccounts(): Promise<Account[]> {
    const { cluster } = await getCouchbaseClient();
    const query = "SELECT META().id, * FROM main.play.accounts";
    const response = await cluster.query(query);
    const outputRecords = response.rows.map((row: any) => { return { id: row.id, content: row.accounts } });
    return outputRecords;
  }

  async createAccount(content: AccountContentInput): Promise<CreateAccountMutationResponse> {
    const { accountsCollection } = await getCouchbaseClient();
    const id = "acc" + crypto.randomUUID(); 
    console.log(id, content);
    await accountsCollection.insert(id, content);
    return {
      code: '200',
      success: true,
      message: 'New account added!',
      account: {
        id: id, 
        content: content
      },
    };
  }
}
