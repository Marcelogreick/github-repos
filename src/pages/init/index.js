/* eslint-disable @next/next/no-img-element */
import { Button, Container, Row } from "reactstrap";
import { getSession } from "next-auth/client"
import { ButtonLogged } from "../../components/ButtonLogged";
import { useEffect, useState } from "react";
import api from '../../services/api';

import styles from './styles.module.scss';

export default function Init({props}) {
  const [inputUser, setInputUser] = useState('');
  const [user, setUser] = useState('');
  const [repository, setRepository] = useState([]);
  const [starred, setStarred] = useState([]);

  function handleUser(event) {
    event.preventDefault();

    api.get(`/users/${inputUser}`).then((response) => {
      setUser(response.data)
    }).catch((error) => {
      alert('O usuário não existe')
    })

    setStarred([])
    setRepository([])
  }

  async function handleRepository(event) {
    event.preventDefault();

    const response = await api.get(`/users/${user.login}/repos`)
    setRepository(response.data)
    setStarred([])
  }

  async function handleStared(event) {
    event.preventDefault();

    const response = await api.get(`/users/${user.login}/starred`)

    setStarred(response.data)
    setRepository([])
  }

  useEffect(() => {
    console.log(repository)
  }, [repository])

  return(
    <Container>
      <Row className={styles.content}>
        <ButtonLogged />
        <form onSubmit={handleUser}>
          <input
          value={inputUser}
          onChange={(e) => setInputUser(e.target.value)}
          placeholder="Digite o nome do usuário"
          />

          <button type="submit">Pesquisar</button>
        </form>
        
        {!!user ? (
          <>
            <h1>Usuário: {user.login}</h1> 
            <div>
              <Button size="lg" onClick={handleRepository}>Repositórios</Button>
              <Button size="lg" onClick={handleStared}>Mais visitados</Button>
            </div>
          </>
        ): ''}
      </Row>

      <Row>
        {repository.length !== 0 ? (
          <Row className={styles.repository}>
            {repository.map(repository => (
              <div key={repository.id}>
                <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                  <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                  </div>
              </div>
            ))}
          </Row>
          ) : ''}
      </Row>

      <Row>
        {starred.length !== 0 ? (
          <Row className={styles.repository}>
            {starred.map(repository => (
              <div key={repository.id}>
                <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
                  <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                  </div>
              </div>
            ))}
          </Row>
          ) : ''}
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
