import { transcode } from "node:buffer";
import { stringify } from "node:querystring";
import { Readable, Writable, Transform} from "node:stream";



class InvertNumberStream extends Transform{
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -10
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable{
  _write(chunk, encoding, callback){
    console.log(chunk.toString())
    callback()
  }
}

new OneToHundredStream()
.pipe(new InvertNumberStream())  
.pipe(new MultiplyByTenStream());
