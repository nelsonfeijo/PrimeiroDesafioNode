import { Buffer } from 'node:buffer';

export async function json(req, res) {
    const buffers = []
    //Leitura do corpo da requisição
    for await (const chunk of req) {
        buffers.push(chunk)
    }
    // transforma em json
    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }
    res.setHeader('Content-type', 'application/json')
}