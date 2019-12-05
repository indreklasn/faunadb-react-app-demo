import React, { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState('')

  useEffect(() => {
    fetch('/.netlify/functions/hello-world')
    .then((response) => response.json())
    .then(data => setData(data))
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
