import { CID } from 'multiformats/cid'
import * as codec from '@ipld/dag-json'
import { sha256 } from 'multiformats/hashes/sha2'

class DefaultDAGJSON {
  constructor(components) {
   this.components = components
  }

  async add(obj, options = {}) {
    try {
    const buf = codec.encode(obj,options)
    const hash = await (options.hasher ?? sha256).digest(buf)
    const cid = CID.createV1(codec.code, hash)
    await this.components.blockstore.put(cid, buf,options)
    return cid
    } catch (error) {
        console.log("dagJson.add error",error)
    }
  }

  async get(cid, options = {}) {
    try {
    const buf = await this.components.blockstore.get(cid,options)
    return codec.decode(buf)
    } catch (error) {
        console.log("dagJson.get error",error)
    }
  }
}

/**
 * Create a DAGJSON instance for use with Helia
 */
export  default function dagJson(helia) {
  return new DefaultDAGJSON(helia)
}