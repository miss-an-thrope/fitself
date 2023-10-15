
// React tools
import { Link, NavLink } from 'react-router-dom';

// styles
import '../../../assets/scss/components/root/blocks/_header.scss';

export default function Header() {

   return (
      <>
         <header className='header'>

            <section className='header__logo logo'>
               <Link className='logo__link'>
                  <img className='logo__img' src="" alt="" />
               </Link>
            </section>
            
            <nav className='header__navbar navbar'>
               <ul className='navbar__list'>
                  <li className='navbar__item'>
                     <NavLink to='/' className='navbar__link'>Home</NavLink>
                  </li>
                  <li className='navbar__item'>
                     <NavLink className='navbar__link'>Products</NavLink>
                  </li>
                  <li className='navbar__item'>
                     <NavLink className='navbar__link'>Recepts</NavLink>
                  </li>
                  <li className='navbar__item'>
                     <NavLink to='calculator' className='navbar__link'>Calculator</NavLink>
                  </li>
                  <li className='navbar__item'>
                     <NavLink to='signup' className='navbar__link'>Sign up</NavLink>
                  </li>
                  <li className='navbar__item'>
                     <NavLink to='signin' className='navbar__link'>Sign in</NavLink>
                  </li>
               </ul>
            </nav>
            
            <section className='header__profile'>

            </section>
         </header>
      </>
   );
}