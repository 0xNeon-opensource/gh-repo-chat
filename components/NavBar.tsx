import styles from '../styles/Home.module.css';
import Link from 'next/link';

const NavBar = () => (
    <div className={styles.topnav}>
        <div>
            <Link href="/"><h1 className={styles.navlogo}>Repo Chat</h1></Link>
        </div>
        <div className={styles.navlinks}>
            <a
                href="https://github.com/0xNeon-opensource/gh-repo-chat"
                target="_blank"
                rel="noreferrer"
            >
                GitHub
            </a>
        </div>
    </div>
);

export default NavBar;