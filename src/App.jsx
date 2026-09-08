import "./App.css";

function App() {
  return (
    <div className="dashboard">
      <header className="header">
        <h1>CloudOps Dashboard</h1>
        <p>CI/CD Pipeline Application</p>
      </header>

      <main className="cards">
        <div className="card">
          <h2>Application Status</h2>
          <p className="status">🟢 Running</p>
          <span>Application is healthy</span>
        </div>

        <div className="card">
          <h2>Docker</h2>
          <p className="status">🐳 Ready</p>
          <span>Container available</span>
        </div>

        <div className="card">
          <h2>AWS EKS</h2>
          <p className="status">☁️ Connected</p>
          <span>Cluster deployment ready</span>
        </div>

        <div className="card">
          <h2>Deployment</h2>
          <p className="status">🚀 Production</p>
          <span>Environment: Production</span>
        </div>
      </main>
    </div>
  );
}

export default App;