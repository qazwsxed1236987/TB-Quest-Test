import '../css/header.css'
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Logo from '../img/logo_180x180 1.png'

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        /*resize use*/
        const handleResize = () => {
            const screenW = window.innerWidth;
            if (screenW > 1150) {
                setMenuOpen(false)
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const list = [
        { 'title': '使用說明', 'url': '/howtouse' },
        { 'title': '收費方式', 'url': '/fee-methods' },
        { 'title': '站點資訊', 'url': '/' },
        { 'title': '最新消息', 'url': '/new-message' },
        { 'title': '活動專區', 'url': '/activity' },]

    const [navlist, setNavList] = useState(list)
    return (
        <>
            <header>
                <section className='navstyle'>
                    <img src={Logo} alt='Logo'></img>
                    <nav className='nav'>
                        {navlist.map((nav) => {
                            return (
                                <NavLink className="NavLink" to={nav.url} key={nav.title}>
                                    {nav.title}
                                </NavLink>
                            )
                        })
                        }
                    </nav>
                </section>

                <button className='login'>登入</button>
                <FontAwesomeIcon
                    icon={menuOpen ? faXmark : faBars}
                    className='moible-login'
                    onClick={toggleMenu}
                />
                {menuOpen && (
                    <div className='menu'>
                        <div className='menu-nav'>
                            <nav className='nav'>
                                {navlist.map((nav) => {
                                    return (
                                        <NavLink className="NavLink" to={nav.url} key={`${nav.title}.mobile`}>
                                            {nav.title}
                                        </NavLink>
                                    )
                                })}
                            </nav>
                            <button>登入</button>
                        </div>
                    </div>
                )}
            </header >
        </>
    );
}

export default Header;
