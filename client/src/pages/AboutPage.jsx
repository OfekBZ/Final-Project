import styles from '../styles/About.module.css';

const AboutPage = () => {
  return (
    <section>
      <h1>About Book Explorer</h1>
      <p>
        Book Explorer is built with a clean, modular architecture to manage books, favorites, reviews, and admin
        workflows. The backend uses Express, MongoDB Atlas, JWT auth, and role-based access. The frontend is a
        React SPA with routing, protected flows, and responsive UI.
      </p>

      <h2>About the developer</h2>
      <p>
        Book Explorer was built as a full-stack final project by Ofek Bar-Zeev. It showcases authentication, book
        catalog browsing, favorites, reviews, and admin features.
      </p>

      <h3>Find me online</h3>
      <ul className={styles.links}>
        <li>
          <a
            href="https://www.linkedin.com/in/ofek-bar-zeev-63979a309/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/ofek_bar_zeev/" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </li>
      </ul>
    </section>
  );
};

export default AboutPage;
