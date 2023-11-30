import Logo from '../logo_180x180 1.png'
import '../css/header.css'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



function Header() {


    const [isMenuOpen, setMenuOpen] = useState(false);

    // 加入螢幕尺寸判定 >1000  isMenuOpen false

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
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
                    <img src={Logo}></img>
                    <nav className='nav'>
                        {navlist.map((nav) => {
                            return (
                                <>
                                    <NavLink className="NavLink" to={nav.url} key={nav.title}>
                                        {nav.title}
                                    </NavLink>
                                </>
                            )
                        })
                        }
                    </nav>
                </section>

                <button className='login'>登入</button>
                <FontAwesomeIcon
                    icon={isMenuOpen ? faXmark : faBars}
                    className='moible-login'
                    onClick={toggleMenu}
                />



                {isMenuOpen && (
                    <div className='menu'>

                        {/* 需要往右移+pad or mar */}
                        <div className='menu-nav'>
                            {/* 上方區塊 mar top down 32*/}
                            <nav>
                                {/* gap 32 */}
                                {navlist.map((nav) => {
                                    return (
                                        <>
                                            <NavLink className="NavLink" to={nav.url} key={nav.title}>
                                                {nav.title}
                                            </NavLink>
                                        </>
                                    )
                                })
                                }
                            </nav>
                            {/* 下方 */}
                            <button>登入</button>
                        </div>
                    </div>
                )}
            </header >

        </>
    );
}

export default Header;
