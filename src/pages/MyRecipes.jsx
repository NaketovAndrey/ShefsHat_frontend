import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { fetchPosts } from '../redux/slices/posts';

export const MyRecipes = () => {
  const dispatch = useDispatch();
  
  const userData = useSelector(state => state.auth.data);
  const { posts } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  
  // Фильтруем посты по идентификатору пользователя
  const myPosts = posts.items.filter(post => post.user._id === userData?._id);

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} item>
          {isPostsLoading ? (
            [...Array(5)].map((_, index) => (
              <Post key={index} isLoading={true} />
            ))
          ) : myPosts.length === 0 ? (
            <h2>У вас нет рецептов.</h2>
          ) : (
            myPosts.map((obj) => (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                timeCount={obj.time}
                ingredients={obj.ingredients.join(', ')}
                description={obj.description}
                isEditable={userData?._id === obj.user._id}
              />
            ))
          )}
        </Grid>
      </Grid>
    </>
  );
};