import faunadb from 'faunadb';

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  console.log("Function `warehouses-read-all` invoked")
  return client.query(q.Paginate(q.Match(q.Ref("indexes/warehouses"))))

  .then((response) => {
    const warehouseRefs = response.data
    console.log("warehouse refs", warehouseRefs)
    console.log(`${warehouseRefs.length} todos found`)

    // create new query out of warehouse refs. 
    // https://docs.fauna.com/fauna/current/api/fql/

    const getAllWarehouseDataQuery = warehouseRefs.map((ref) => {
      return q.Get(ref)
    })

    // then query the refs
    return client.query(getAllWarehouseDataQuery).then((ret) => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(ret)
      })
    })  
  })
  
  .catch((error) => {
    console.log("error", error.message)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}