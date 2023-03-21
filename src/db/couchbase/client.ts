import { createCouchbaseCluster } from "./connection";

export async function getCouchbaseClient() {
    const cluster = await createCouchbaseCluster()
  
    const bucket = cluster.bucket("main");
    const scope = bucket.scope("play");
    const accountsCollection = scope.collection("accounts"); 
  
    return {
      cluster,
      bucket,
      scope,
      accountsCollection
    }
}
