import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { fetchPosts } from '../redux/slices/posts';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export const Home = () => {
  const dispatch = useDispatch();
  
  const userData = useSelector(state => state.auth.data);
  const { posts } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';

  // Состояние для текущей вкладки
  const [currentTab, setCurrentTab] = React.useState(0);

  // Эффект для загрузки постов
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Обработчик изменения вкладки
  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Сортировка постов в зависимости от выбранной вкладки
  const sortedPosts = [...posts.items].sort((a, b) => {
    if (currentTab === 0) {
      // Для вкладки "Новые" сортируем по дате создания
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      // Для вкладки "Популярные" сортируем по количеству просмотров
      return b.viewsCount - a.viewsCount;
    }
  });

  return (
    <>
      <Tabs 
        style={{ marginBottom: 15 }} 
        value={currentTab} 
        onChange={handleChange} 
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          {(isPostsLoading ? [...Array(5)] : sortedPosts).map((obj, index) => 
            isPostsLoading ? ( 
              <Post key={index} isLoading={true} /> 
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                timeCount={obj.time}
                description={obj.description}
                ingredients={obj.ingredients.join(', ')}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};
