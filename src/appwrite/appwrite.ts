import { Account, Client, Databases, Models } from "appwrite";
import { from, Observable } from "rxjs";

export const AppWriteClient = {
    sdk: null,

    provider: (): {database: Databases, account: Account} => {
        if (AppWriteClient.sdk) {
            return AppWriteClient.sdk;
        }
        const appWrite = new Client() 
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('64bd6989c16ffc62b2e7');
            
        const account = new Account(appWrite);
        const database = new Databases(appWrite);
        
        AppWriteClient.sdk = {database, account};
        
        return AppWriteClient.sdk;
    },
    login: (email: string, password: string): Observable<Models.Session> => {
        return from(AppWriteClient.provider().account.createEmailSession(email, password));
    }
};
