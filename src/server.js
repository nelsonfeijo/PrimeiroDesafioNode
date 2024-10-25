import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    // para processar o corpo da requisição em json
    await json(req, res)

    //localiza a rota e verifica se o method da req e a url estão definidas em "routes"
    const route = routes.find(route => {
      return route.method === method && route.path.test(url)
    })


    // se a rota for encontrada 
    if (route) {
      const routeParams = req.url.match(route.path) //cria um objeto com groups com os parametros de route
  
      const { query, ...params } = routeParams.groups //desestruturando groups para obter a query e outros parametros
      
      req.params = params //atribui os params extraidos ao req
      req.query = query ? extractQueryParams(query) : {} // se tiver uma query, extrai ela e foloca em um objeto
  
      return route.handler(req, res)
    }
  
    return res.writeHead(404).end() // se a rota não tiver valor
  })
  
  server.listen(3333)