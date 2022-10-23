import React, { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Flex } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const bg = useColorModeValue('gray.100', 'gray.800');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/home/search/?query=${search}`);
  };

  return (
    <Box>
      <form onSubmit={handleSearch}>
        <Flex>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray" />}
            />
            <Input
              type="text"
              placeholder="Search..."
              color={"gray"}
              bg={"transparent"}
              onChange={(e) => setSearch(e.target.value)}
              mr={4}
              h={9}
            />
          </InputGroup>
        </Flex>
      </form>
    </Box>
  );
};

export default SearchBar;
