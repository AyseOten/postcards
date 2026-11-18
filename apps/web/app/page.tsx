import { getMessages } from '@postcards/i18n';
import styles from './page.module.css';

export default function Home() {
  const messages = getMessages();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{messages.app.name}</h1>
      <p className={styles.tagline}>{messages.app.tagline}</p>
      <p className={styles.note}>{messages.home.comingSoon}</p>
    </main>
  );
}
