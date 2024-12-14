// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import cl from './Navbar.module.css'
//
// export default function Navbar() {
//
//   const location = useLocation();
//   const [activeLink, setActiveLink] = useState(location.pathname);
//
//   const handleLinkClick = (path) => {
//     setActiveLink(path);
//   };
//
//   useEffect(()=>{
//     setActiveLink(activeLink);
//   },[])
//
//   return (
//     <div className={cl.navbar}>
//       <div className={cl.navbar_Link}>
//         <Link
//           className={activeLink === "/about" ? [cl.nav_tem,cl.nav_item_cur].join(' ') : cl.nav_tem}
//           to="/about"
//           onClick={() => handleLinkClick("/about")}
//         >
//           О нас
//         </Link>
//         <Link
//           className={activeLink === "/posts" ? [cl.nav_tem,cl.nav_item_cur].join(' ') : cl.nav_tem}
//           to="/posts"
//           onClick={() => handleLinkClick("/posts")}
//         >
//           Посты
//         </Link>
//       </div>
//     </div>
//
//
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cl from './Navbar.module.css';

export default function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [menuOpen, setMenuOpen] = useState(false); // Состояние для гамбургер-меню

  const handleLinkClick = (path) => {
    setActiveLink(path);
    setMenuOpen(false); // Закрытие меню после клика на ссылку
  };

  useEffect(() => {
    setActiveLink(activeLink);
  }, []);

  return (
      <div className={cl.navbar}>
        <div className={cl.navbar_Link}>
          <Link
              className={
                activeLink === '/about'
                    ? [cl.nav_tem, cl.nav_item_cur].join(' ')
                    : cl.nav_tem
              }
              to="/about"
              onClick={() => handleLinkClick('/about')}
          >
            О нас
          </Link>
          <Link
              className={
                activeLink === '/posts'
                    ? [cl.nav_tem, cl.nav_item_cur].join(' ')
                    : cl.nav_tem
              }
              to="/posts"
              onClick={() => handleLinkClick('/posts')}
          >
            Посты
          </Link>
        </div>

        {/* Гамбургер-меню для мобильных устройств */}
        <div className={cl.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <div className={cl.hamburger_line}></div>
          <div className={cl.hamburger_line}></div>
          <div className={cl.hamburger_line}></div>
        </div>

        {/* Меню для мобильных устройств */}
        {menuOpen && (
            <div className={cl.mobileMenu}>
              <Link
                  className={activeLink === '/about' ? cl.nav_item_cur : cl.nav_tem}
                  to="/about"
                  onClick={() => handleLinkClick('/about')}
              >
                О нас
              </Link>
              <Link
                  className={activeLink === '/posts' ? cl.nav_item_cur : cl.nav_tem}
                  to="/posts"
                  onClick={() => handleLinkClick('/posts')}
              >
                Посты
              </Link>
            </div>
        )}
      </div>
  );
}
