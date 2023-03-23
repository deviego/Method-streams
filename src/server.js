import http from "node:http";
import json from "./middleware/json.js";
import { Routes } from "./routes.js";
import { extractParams } from "./utils/extract-query-param.js";





const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);
  const route = Routes.find( route => {return route.method === method && route.path.test(url)})

  if(route){
    const routeParams = req.url.match(route.path)
    const { query,  ...params} = routeParams.groups
    req.params = params
    req.query = query ? extractParams(query):{}
    return route.handle(req, res)
  }else{
    return res.writeHead(404).end()
  }
});
server.listen(3333);