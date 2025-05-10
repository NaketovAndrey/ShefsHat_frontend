
import React from 'react';

import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


import styles from './Header.module.scss';
import Container from '@mui/material/Container';

import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth  = useSelector(selectIsAuth)

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    };
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Chef’s hat</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/searchTo" style={{ textDecoration: 'none' }}>
                <Button variant="text" startIcon={<SearchIcon />}>
                  Поиск
                </Button>
                </Link>
                <Link to="/">
                  <Button href="#text-buttons">Все рецепты</Button>
                </Link>
                <Link to="/myRecipes">
                  <Button href="#text-buttons">Мои рецепты</Button>
                </Link>
                <Link to="/add-post">
                  <Button variant="contained">Опубликовать рецепт</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button href="#text-buttons">Все рецепты</Button>
                </Link>
                <Link to="/login">
                  <Button href="#text-buttons">Мои рецепты</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
