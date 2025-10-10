import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { ipns } from '@helia/ipns'
import { createLibp2p } from 'libp2p'
import { keychain } from '@libp2p/keychain'
import { dagCbor } from '@helia/dag-cbor'
import { IDBDatastore } from 'datastore-idb'
import { BlockstoreDatastoreAdapter } from 'blockstore-datastore-adapter'

let heliaInstance;
let fsInstance;
let dagCborInstance;
let ipnsInstance;


export async function initHelia() {
  if (!heliaInstance) {
    const libp2p = await createLibp2p({
      services: {
        keychain: keychain()
      }
    })
    const datastore = new IDBDatastore("Helia-audio-store")
    await datastore.open().then((result) => console.log(result))
    heliaInstance = await createHelia({
      libp2p,
      blockstore: new BlockstoreDatastoreAdapter(datastore),
      datastore
    })
    fsInstance = unixfs(heliaInstance)
    dagCborInstance = dagCbor(heliaInstance)
    ipnsInstance = ipns(heliaInstance)
  }

  return { helia: heliaInstance, fs: fsInstance, dagCbor: dagCborInstance, ipns: ipnsInstance }
}
