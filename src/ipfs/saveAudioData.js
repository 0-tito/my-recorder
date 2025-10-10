import { initHelia } from "./heliaService"
import { generateKeyPair } from '@libp2p/crypto/keys'
import * as dagCborCodec from '@ipld/dag-cbor'
import { CID } from 'multiformats/cid'
import blobToUint8Array from "./utilityFunctions/blobToUint8Array"

export async function getAllAudiosFromHelia(cidString, helia) {

     const cid = CID.parse(cidString)
    // get cid from helia
    
    const byte = await helia.blockstore.get(cid) || null
    // decode cbor into js object
    if(byte === null) return
    const audios = dagCborCodec.decode(byte)
    audios.forEach(audio => {
        // turn Uint8Array back into a Blob
        const blob = new Blob([audio.file], { type: "audio/webm" })
        const url = URL.createObjectURL(blob)
        audio.file = blob
        audio.url = url
    })
    return audios
}



export default async function saveAudioData(metaData, audioBlob) {
  if (!metaData || !audioBlob) return
  const { dagCbor, ipns, helia } = await initHelia()

  try {
    // 🎵 Convert new audio blob into Uint8Array
    const uint8Array = await blobToUint8Array(audioBlob)
    const newAudio = {
      ...metaData,
      file: uint8Array
    }

    let cid
    const storedCid = JSON.parse(localStorage.getItem("existingAudiosCid"))

    if (!storedCid) {
      // First time: just add this one
      cid = await dagCbor.add([newAudio])
      localStorage.setItem("existingAudiosCid", JSON.stringify(cid.toString()))
    } else {
      // Get existing audios from Helia
      const existingAudios = await getAllAudiosFromHelia(storedCid, helia)

      // Ensure every file is Uint8Array (convert blobs back)
      const normalized = await Promise.all(
        existingAudios.map(async audio => ({
          ...audio,
          file: audio.file instanceof Uint8Array
            ? audio.file
            : await blobToUint8Array(audio.file)
        }))
      )

      // Merge & dedupe by id
      const merged = [...normalized, newAudio].filter(
        (item, index, self) =>
          index === self.findIndex(r => r.id === item.id)
      )

      // Save merged array back into DAG-CBOR
      cid = await dagCbor.add(merged)
      localStorage.setItem("existingAudiosCid", JSON.stringify(cid.toString()))
    }

    // 🔑 Generate IPNS key & publish
    const allAudiosKey = await generateKeyPair("Ed25519")
    await ipns.publish(allAudiosKey, cid)

    // 🔎 Resolve back to verify
    const result = await ipns.resolve(allAudiosKey.publicKey)
    console.log(result.cid)
    const audiosArr = await getAllAudiosFromHelia(result.cid.toString(), helia)

    console.log(audiosArr)
    return audiosArr
  } catch (error) {
    console.error("saveAudioData error:", error)
  }
}
