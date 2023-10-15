
// React tools
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../../assets/js/firebase/firebase';
import AuthContext from '../../../assets/js/auth-context';
// styles
import '../../../assets/scss/components/root/blocks/_header.scss';
//hooks
import { useContext } from 'react';

export default function Header() {
   const authCtx = useContext(AuthContext);
   function logout(){
     auth.signOut().then(function() {
         console.log('Signed Out');
         authCtx.setIsLoggedIn(false);
       }, function(error) {
         console.error('Sign Out Error', error);
       });
   } 
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
                  {!authCtx.isLoggedIn && <NavLink to='signup' className='navbar__link'>Sign up</NavLink>}
                  </li>
                  <li className='navbar__item'>
                  {!authCtx.isLoggedIn && <NavLink to='signin' className='navbar__link'>Sign in</NavLink>}
                  {authCtx.isLoggedIn && <NavLink to='profile' className='navbar__link'>Your profile</NavLink>}
                  </li>
                  {authCtx.isLoggedIn && <li><button onClick={logout}>Log out</button></li> }
               </ul>
            </nav>
            
            <section className='header__profile'>

            </section>
         </header>
      </>
   );
}