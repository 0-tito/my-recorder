export default async function blobToUint8Array(blob) {
    const arrayBuffer = await blob.arrayBuffer()
    const unit8Array = new Uint8Array(arrayBuffer)
    return unit8Array
}