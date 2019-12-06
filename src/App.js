import React, { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState('')

  useEffect(() => {
    fetch('/.netlify/functions/get-all-products')
    .then((response) => response.json())
    .then(data => setData(data))
    .catch(err => console.warn(err.message))
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
