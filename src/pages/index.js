/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import Head from 'next/head'
import { signIn, useSession } from "next-auth/client";
import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';


import styles from '../styles/Login.module.scss';

export default function Login() {
  const router = useRouter();
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      router.push('/init');
    }
  }, [session, router]);
  

  return(
    <Container className={styles.Container}>
      <Head>
        <title>GitRepos Login</title>
      </Head>
      
      <Row className={styles.Content}>
        <div>
          <img src="/assets/logo.png" alt="logo" />
          <h1>Github Repos</h1>
        </div>

        <button type="button" onClick={() => signIn()}>
          <FaGithub color="red"/>
          Sign in with Github
        </button>    
      </Row>
    </Container>
  );
}
