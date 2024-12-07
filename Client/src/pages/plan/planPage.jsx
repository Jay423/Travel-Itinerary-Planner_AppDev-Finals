import Navbar from '../../components/navbar/navBar';

function App() {

    const redirectLogin = () => {
        window.location.href = '/login';
    };

    const redirectRegister = () => {
        window.location.href = '/register';
    };

  return (
    <div className="items-center justify-center">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="register_container flex-grow mt-16">
        <h1>Landing Page</h1>
        <button onClick={redirectLogin}>Login</button>
        <button onClick={redirectRegister}>Register</button>
      </div>
    </div>
  );
}

export default App;