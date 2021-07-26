import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signout, useSession } from "next-auth/client";

import styles from "./styles.module.scss";

export function ButtonLogged() {
  const [session] = useSession();

  return (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signout()}
    >
      <FaGithub color="#04d361" onClick={() => signout()} />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  );
}
