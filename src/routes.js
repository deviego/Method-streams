import { Database } from "./database.js";
import {randomUUID} from 'node:crypto'
import {buildRoutPath} from './utils/build-route-path.js'

const database = new Database();

export const Routes = [
  {
    method: 'GET',
    path:buildRoutPath('/users'),
    handle: (req, res) => {
      const {search} = req.params
      const users = database.select('users', {
        name:search,
        email:search,
      })
    return res.end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path:buildRoutPath('/users') ,
    handle: (req, res) => {
      const { name, email } = req.body;
      const user = {
        id: randomUUID(),
        name,
        email,
      };
  
      database.insert('users', user);
      return res.writeHead(201).end();
    }
  },
  {
    method:'DELETE',
    path: buildRoutPath('/users/:id'),
    handle:(req, res) => {
      const {id} = req.params
      console.log(id)
      database.delete('users', id)
      return res.writeHead(204).end()
    }
  },
  {
    method:'PUT',
    path: buildRoutPath('/users/:id'),
    handle:(req, res) => {
      const {id} = req.params
      const data = req.body

      console.log(id)
      database.update('users', id,  data)
      return res.writeHead(204).end()
    }
  }

]