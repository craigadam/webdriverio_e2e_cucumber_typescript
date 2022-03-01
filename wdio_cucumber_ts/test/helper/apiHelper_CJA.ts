import request from "supertest";

/**
 * See where the supertest comes from
 *  ../../node_modules/@types/supertest/index
 * if open will see what methods are available
 *    type SuperAgentTest = SuperTest<Test> &
        Pick<
            Request,
            | 'use'
            | 'on'
            | 'set'
            | 'query'
            | 'type'
            | 'accept'
            | 'auth'
            | 'withCredentials'
            | 'retry'
            | 'ok'
            | 'redirects'
            | 'timeout'
            | 'buffer'
            | 'serialize'
            | 'parse'
            | 'ca'
            | 'key'
            | 'pfx'
            | 'cert'
        >;
        now can search on lower level api page:
        https://visionmedia.github.io/superagent/

        GET requests
The .query() method accepts objects, which when used with the GET method will form a query-string. The following will produce the path /search?query=Manny&range=1..5&order=desc.

 request
   .get('/search')
   .query({ query: 'Manny' })
   .query({ range: '1..5' })
   .query({ order: 'desc' })
   .then(res => {

   });

 *
 */

// understand what external package does
// console.log(`typeof(request) ${typeof request}`); // typeof(request) function

// know it is a function can get number of args
// console.log(`>>>>> Number of args: ${request.length}`); // >>>>> Number of args: 1
// request(app); // can see from intellisense it requires app: any

// console.log(`>>>>> The definition of the function: ${request.toString()}`);
/**>>>>> The definition of the function: 
 function(app) {
  const obj = {};

  if (typeof app === 'function') {
    app = http.createServer(app); // eslint-disable-line no-param-reassign
  }

  methods.forEach(function(method) {
    obj[method] = function(url) {
      return new Test(app, method, url);
    };
  });

  // Support previous use of del
  obj.del = obj.delete;

  return obj;
} */

/** demo site https://reqres.in/
  https://reqres.in/api/users?page=2
 {"page":2,"per_page":6,"total":12,"total_pages":2,"data":[{"id":7,"email":"michael.lawson@reqres.in","first_name":"Michael","last_name":"Lawson","avatar":"https://reqres.in/img/faces/7-image.jpg"},{"id":8,"email":"lindsay.ferguson@reqres.in","first_name":"Lindsay","last_name":"Ferguson","avatar":"https://reqres.in/img/faces/8-image.jpg"},{"id":9,"email":"tobias.funke@reqres.in","first_name":"Tobias","last_name":"Funke","avatar":"https://reqres.in/img/faces/9-image.jpg"},{"id":10,"email":"byron.fields@reqres.in","first_name":"Byron","last_name":"Fields","avatar":"https://reqres.in/img/faces/10-image.jpg"},{"id":11,"email":"george.edwards@reqres.in","first_name":"George","last_name":"Edwards","avatar":"https://reqres.in/img/faces/11-image.jpg"},{"id":12,"email":"rachel.howell@reqres.in","first_name":"Rachel","last_name":"Howell","avatar":"https://reqres.in/img/faces/12-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}
 
 */

// not within a class so create functon
// can surround with {...} to make an async into self calling function

async function GET(
  baseUrl: string,
  endPoint: string
): Promise<request.Response> {
  let response = await request(baseUrl) //

    .get(endPoint) //
    .query({}) //
    .auth("", "") //
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")

  if (!response) {
    throw new Error("result is falsey [89]");
  }

  return response;
}

async function runGet() {
  let baseUrl = "https://reqres.in";
  let endPoint = "/api/users?page=2";
  let getResponse = await GET(baseUrl, endPoint);

  console.log(`result: \n ${JSON.stringify(getResponse)}`);
  console.log(`\n\n`);
  console.log(`body: \n ${JSON.stringify(getResponse.body)}`);
}

runGet();
