import { API_VERSION, greet } from 'shared'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Frontend App</h1>
      <p>{greet('User')}</p>
      <p>API Version: {API_VERSION}</p>
    </div>
  );
}

export default App;