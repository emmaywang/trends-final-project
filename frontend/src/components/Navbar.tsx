import { Link, Outlet } from "react-router-dom";


const Navbar=()=> {
  return (
    <>
      <header className="navbar">
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <Link to="/update">Update</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default Navbar;
