import { initHelia } from "./heliaService";
// import { verifiedFetch, createVerifiedFetch } from '@helia/verified-fetch'
import * as dagCborCodec from '@ipld/dag-cbor'
import { CID } from 'multiformats/cid'
// import { sha256 } from 'multiformats/hashes/sha2'
import getBlobFromCid from "./utilityFunctions/getBlobFromCid";

// get cid for the actual blob file recorded
export async function addressAudioFile(audioBlob, name) {
    if (!audioBlob) return
    try {
        const { fs } = await initHelia()
        const arrayBuffer = await audioBlob.arrayBuffer()
        const unit8Array = new Uint8Array(arrayBuffer)
        // encode the file with unixfs
        const cid = await fs.addBytes(unit8Array)
        
        localStorage.setItem(name, JSON.stringify(cid.toString()))
    } catch (error) {
        console.log(error)
    }
}

// get cid for audio data
export async function addressAudioData(metaData, audioBlob) {
    if (!metaData || !audioBlob) return
    try {
        const { helia, dagCbor } = await initHelia()
        // convert audio blob to unit8Array
        const arrayBuffer = await audioBlob.arrayBuffer()
        const unit8Array = new Uint8Array(arrayBuffer)

        const audioObject = {
            ...metaData,
            file: unit8Array
        }
        // // Encode object to bytes
        // const bytes = dagCborCodec.encode(audioObject)

        // // Create CID manually
        // const hash = await sha256.digest(bytes)
        // const cid = CID.createV1(dagCborCodec.code, hash)

        // Store bytes with that CID
        // await helia.blockstore.put(cid, bytes)
        const cid = await dagCbor.add(audioObject)
        localStorage.setItem('audioAddres', JSON.stringify(cid.toString()))
    } catch (error) {
        console.log(error)
    }
}


// get fs encoded file
export async function retrieveAudioFile(audioCid) {
    if (!audioCid) return
    try {
        // const response = await verifiedFetch(`ipfs://${audioCid}`)
        // const audioBlob = await response.blob()
        // console.log(audioBlob)
        const { fs } = await initHelia()
        const audioBlod = await getBlobFromCid(fs, audioCid)
        console.log("audio blobRetrived",audioBlod)
        return audioBlod
    } catch (error) {
        console.log(error)
    }
}


// get cbor encoded object
export async function getAudioData(cidString) {
    if (!cidString) return null
    try {
        // create cid object from string
        const cid = CID.parse(cidString)
        const { helia } = await initHelia()
        // fetch raw bytes from ipfs blockstore 
        const byte = await helia.blockstore.get(cid)
        // decode cbor into js object
        const data = dagCborCodec.decode(byte)
        // convert file from unit8Array to blob
        const blob = new Blob([data.file], { type: "audio/webm" })
        data.file = blob
        console.log({ ...data })
        return {
            ...data
        }
    } catch (error) {
        console.log(error)
    }
}
