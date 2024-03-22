import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <div className='nav'>
      <Link to='/'>
        <div className='mainPage'></div>
      </Link>
      <Link to='/Login'>
        <div></div>
      </Link>
     
      
    </div>
  );
}


export default NavBar;