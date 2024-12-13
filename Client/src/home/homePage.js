function App() {

    const redirectLogin = () => {
        window.location.href = '/login';
    };

    const redirectRegister = () => {
        window.location.href = '/register';
    };

  return (
    <div className="register_container">
      <h1>Landing Page</h1>
        <button onClick={redirectLogin}>Login</button>
        <button onClick={redirectRegister}>Register</button>
    </div>
  );
}

export default App;