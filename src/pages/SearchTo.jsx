import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Post } from '../components/Post';
import { fetchPosts } from '../redux/slices/posts';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const SearchTo = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [onlySelected, setOnlySelected] = useState(false);

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const allIngredients = posts.items.reduce((acc, post) => {
    if (post.ingredients && Array.isArray(post.ingredients)) {
      return acc.concat(post.ingredients);
    }
    return acc;
  }, []);

  const uniqueIngredients = [...new Set(allIngredients)];

  const filteredPosts = posts.items.filter(post => {
    if (onlySelected) {
      // Проверяем, что все ингредиенты поста содержатся в выбранных ингредиентах
      return post.ingredients.every(ingredient => selectedIngredients.includes(ingredient));
    }
    // Если фильтр выключен, показываем посты с хотя бы одним совпадающим ингредиентом
    return selectedIngredients.length === 0 || 
           post.ingredients.some(ingredient => selectedIngredients.includes(ingredient));
  });

  return (
    <>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={uniqueIngredients}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        onChange={(event, value) => setSelectedIngredients(value)} // Обновляем состояние при выборе
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          );
        }}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label="Выбор ингредиентов" placeholder=""
          style={{ marginBottom: '8px' }}
           />
        )}
      />
      <FormControlLabel 
        control={
          <Checkbox 
            checked={onlySelected} 
            onChange={() => setOnlySelected(!onlySelected)} 
          />
        } 
        label="Только выбранные ингредиенты" 
        style={{ marginBottom: '8px' }}
      />
      
      <Grid container spacing={2}>
        <Grid xs={12} item>
          {(isPostsLoading ? [...Array(5)] : filteredPosts).map((obj, index) => 
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
                ingredients={obj.ingredients.join(', ')}
                description={obj.description}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};
