import styles from '../styles/Home.module.css';
import Link from 'next/link';

const NavBar = () => (
    <div className={styles.topnav}>
        <div>
            <Link href="/"><h1 className={styles.navlogo}>Almanac of Naval Ravikant: Chatbot</h1></Link>
        </div>
        <div className={styles.navlinks}>
            <a
                href="https://www.navalmanack.com/"
                target="_blank"
                rel="noreferrer"
            >
                Book
            </a>
            <a
                href="https://github.com/progremir/navalmanac"
                target="_blank"
                rel="noreferrer"
            >
                GitHub
            </a>
        </div>
    </div>
);

export default NavBar;