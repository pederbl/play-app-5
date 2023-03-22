import { AccountsDataSource } from "./resources/accounts/data-source";

export type MyDataSources = {
    accounts: AccountsDataSource;
};

export const dataSources = {
    accounts: new AccountsDataSource()
};
