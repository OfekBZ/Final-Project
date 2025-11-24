import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <p>Book Explorer · Final project by Ofek Bar-Zeev</p>
      </div>
      <div className={styles.right}>
        <a
          className={styles.pill}
          href="https://www.linkedin.com/in/ofek-bar-zeev-63979a309/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile"
        >
          LinkedIn
        </a>
        <a
          className={styles.pill}
          href="https://www.instagram.com/ofek_bar_zeev/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram profile"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
