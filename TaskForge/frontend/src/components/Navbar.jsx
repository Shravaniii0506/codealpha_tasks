import logo from "../assets/taskforge-logo.png";

export default function Navbar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <img src={logo} />
        <span>TaskForge</span>
      </div>
      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}