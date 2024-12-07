
function App() {

    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    const handleRegisterClick = () => {
        window.location.href = '/register';
    };

  return (
    <div className="register_container">
      <h1>Landing Page</h1>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
}

export default App;
