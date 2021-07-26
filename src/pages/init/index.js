/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Container, Row } from "reactstrap";
import { getSession, session, useSession } from "next-auth/client"
import { ButtonLogged } from "../../components/ButtonLogged";
import { useEffect, useState } from "react";
import api from '../../services/api';

import styles from './styles.module.scss';

export default function Init({props}) {
  session = useSession()

  // const [inputUser, setInputUser] = useState('');
  // const [user, setUser] = useState('');

  // useEffect((
  //   api.get(`/users/${inputUser}`).then((response) => {
  //     setUser(response.data)
  //   })
  // ), [inputUser, user])

  return(
    <Container>
      <Row className={styles.header}>
        <ButtonLogged />
        <form>
          <input
          // value={inputUser}
          // onChange={(e) => setInputUser(e.target.value)}
          placeholder="Digite o nome do usuário"
          />

          <button type="submit">Pesquisar</button>
        </form>
      </Row>
    </Container>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      }
    }
  }

  return {
    props: { session }
  }
}
