import React, { useEffect, useState } from 'react';
import getAllProducts from './fauna/get-all-products.js'


function App() {

  const [data, setData] = useState('')

  useEffect(() => {
    getAllProducts.then(data =>  setData(data))
  }, [])
  return (
    <div className="App">
      <pre>
        {JSON.stringify(data, null, 1 )}
      </pre>
    </div>
  );
}

export default App;
