 export default async function getBlobFromCid(fs, cid) {
    // Collect all Uint8Array chunks
    const chunks = []
    for await (const chunk of fs.cat(cid)) {
        chunks.push(chunk) // Each chunk is a Uint8Array
    }

    // Merge chunks into one Uint8Array
    const fullFile = new Uint8Array(chunks.reduce((acc, curr) => acc + curr.length, 0))
    let offset = 0
    for (const chunk of chunks) {
        fullFile.set(chunk, offset)
        offset += chunk.length
    }

    // Convert to Blob (adjust MIME type to your file)
    return new Blob([fullFile], { type: 'audio/webm' })
}