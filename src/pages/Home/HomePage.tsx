import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { containerStyles, contentWrapperStyles } from './styles/HomePageStyles';
import AppGlobalStyles from './styles/GlobalStyles';
import BrandHeader from './components/BrandHeader';
import SearchBar from './components/SearchBar';
import StatsSection, { type Stat } from './components/StatsSection';
import DecorativeElements from './components/DecorativeElements';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const stats: Stat[] = [
    { number: '10K+', label: 'Properties' },
    { number: '50+', label: 'Cities' },
    { number: '25K+', label: 'Happy Students' },
  ];

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    // Navigate to search results page with query parameter
    navigate(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <>
      <AppGlobalStyles />
      <Box sx={containerStyles}>
        <DecorativeElements />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={contentWrapperStyles}>
            <BrandHeader />
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearch={handleSearch}
            />
            <StatsSection stats={stats} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
