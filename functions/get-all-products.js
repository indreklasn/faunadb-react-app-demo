const faunadb = require('faunadb');

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context) => {
  console.log('Lambda Function `products-read-all` invoked')
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_products'))))
    .then((response) => {
      const productRefs = response.data

      // create new query out of todo refs. 
      // https://docs.fauna.com/fauna/current/api/fql/
      const getAllProductDataQuery = productRefs.map((ref) => {
        return q.Get(ref)
      })

      // query the refs

      return client.query(getAllProductDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })

    }).catch((error) => {
      console.log('error', error.message)
      return {
        statusCode: 400,
        body: JSON.stringify(error.message)
      }
    })
}