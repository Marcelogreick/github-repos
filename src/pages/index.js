/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Container, Row } from 'reactstrap';
import Image from 'next/image'

import { FaGithub } from 'react-icons/fa';

import styles from '../styles/Login.module.scss';

export default function Login() {
  return(
    <Container className={styles.Container}>
      <Row className={styles.Content}>
        <div>
          <img src="/assets/logo.png" alt="logo" />
          <h1>Github Repos</h1>
        </div>

        <button type="button">
          <FaGithub color="red"/>
          Sign in with Github
        </button>    
      </Row>
    </Container>
  );
}
