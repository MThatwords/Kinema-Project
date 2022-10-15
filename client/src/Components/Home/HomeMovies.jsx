import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import {
  clearMovies,
  getMovies,
  getAllGenres,
  getMovieGenreByID,
} from '../../Redux/actions';
import DataList from '../DataList/DataList';
import { Flex } from '@chakra-ui/react';
import Loader from '../Loader/LoaderCards';

export default function HomeMovies() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const allGenres = useSelector((state) => state.allgenres);
  const [genero, setGenero] = useState('All');
  const [page, setPage] = useState(1);
  const [moviesToShow, setMoviesToShow] = useState([]);

  useEffect(() => {
    if (genero === 'All' && page !== 1) {
      dispatch(getMovies(page));
    } else if (page !== 1) {
      dispatch(getMovieGenreByID(genero, page));
    }
  }, [page]);

  useEffect(() => {
    dispatch(getAllGenres());
  }, []);

  useEffect(() => {
    setMoviesToShow([]);
    if (genero === 'All') {
      dispatch(getMovies(page));
    } else {
      dispatch(getMovieGenreByID(genero, page));
    }
    return () => dispatch(clearMovies());
  }, [genero]);

  useEffect(() => {
    setMoviesToShow((prev) => prev.concat(movies));
  }, [movies]);

  function handleGenres(e) {
    e.preventDefault();
    let variable = '';
    for (let i = 0; i < allGenres.length; i++) {
      if (allGenres[i].name === e.target.value) {
        variable = allGenres[i].id;
      }
    }
    setPage(1);
    setGenero(variable);
  }

  return (
    <Flex direction="column">
      <Flex as="header" position="fixed" w="100%" zIndex={200}>
        <NavBar />
      </Flex>
      <Flex as="main" mt={16} w="100%" direction="column">
        <select onChange={(e) => handleGenres(e)}>
          <option>All</option>
          {allGenres.map((g) => (
            <option value={g.name} key={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        {moviesToShow.length === 0 ? (
          <Loader />
        ) : (
          <DataList data={moviesToShow} next={setPage} />
        )}
        <Footer />
      </Flex>
    </Flex>
  );
}
