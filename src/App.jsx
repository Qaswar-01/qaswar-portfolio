import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navigation from './components/Navigation';
import Hero3D from './components/Hero3D';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import AbstractDigitalSculpture from './components/AbstractDigitalSculpture';
import { lightTheme, darkTheme, jewelTonesTheme, earthyLuxeTheme } from './styles/themes';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    overflow-x: hidden;
    transition: all 0.3s ease;
  }

  html {
    scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.accent};
    border-radius: 4px;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
`;

const themes = {
  light: lightTheme,
  dark: darkTheme,
  jewel: jewelTonesTheme,
  earthy: earthyLuxeTheme,
};

function App() {
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('theme', themeName);
  };

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Navigation currentTheme={currentTheme} changeTheme={changeTheme} />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Hero3D currentTheme={currentTheme} />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/sculpture" element={<AbstractDigitalSculpture />} />
            </Routes>
          </AnimatePresence>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;