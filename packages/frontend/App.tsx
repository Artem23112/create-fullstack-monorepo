import { user } from 'shared'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Frontend App</h1>
      <p>Hello, {user}!</p>
      <p>API Version: 1.0.0</p>
    </div>
  );
}

export default App;