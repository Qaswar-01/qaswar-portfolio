import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Home, User, Briefcase, Mail, Palette, Menu, X } from 'lucide-react';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }
`;

const NavToggle = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.chrome};
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  color: ${props => props.theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px ${props => props.theme.shadow},
              0 0 20px ${props => props.theme.chrome}30;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 40px ${props => props.theme.shadowHover},
                0 0 30px ${props => props.theme.gold}50;
    border-color: ${props => props.theme.gold};
    color: ${props => props.theme.gold};
  }
`;

const NavMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.theme.chrome}40;
  border-radius: 20px;
  padding: 1rem;
  box-shadow: 0 8px 32px ${props => props.theme.shadow},
              0 0 30px ${props => props.theme.gold}25;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 18px;
    background: linear-gradient(135deg, ${props => props.theme.gold}08, transparent, ${props => props.theme.chrome}08);
    pointer-events: none;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  text-decoration: none;
  color: ${props => props.theme.text};
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => props.theme.gradient};
    color: white;
    transform: translateX(4px);
  }

  &.active {
    background: ${props => props.theme.gradient};
    color: white;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const ThemeSelector = styled(motion.div)`
  position: relative;
`;

const ThemeToggle = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.accent}50;
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  color: ${props => props.theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px ${props => props.theme.shadow},
              0 0 15px ${props => props.theme.accent}25;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 40px ${props => props.theme.shadowHover},
                0 0 25px ${props => props.theme.accent}50;
    border-color: ${props => props.theme.accent};
    color: ${props => props.theme.accent};
  }
`;

const ThemeMenu = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 60px;
  display: flex;
  gap: 0.5rem;
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.theme.chrome}40;
  border-radius: 15px;
  padding: 0.5rem;
  box-shadow: 0 8px 32px ${props => props.theme.shadow};
`;

const ThemeOption = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &.active {
    border-color: ${props => props.theme.accent};
    transform: scale(1.1);
  }

  &:hover {
    transform: scale(1.05);
    border-color: ${props => props.theme.accent}80;
  }
`;

const Navigation = ({ currentTheme, changeTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const location = useLocation();

  const themeOptions = [
    { key: 'light', name: 'Light', bg: 'linear-gradient(135deg, #f7e8d3 0%, #ffe1d0 100%)' },
    { key: 'dark', name: 'Dark', bg: 'linear-gradient(135deg, #112d4e 0%, #18181b 100%)' },
    { key: 'jewel', name: 'Jewel', bg: 'linear-gradient(135deg, #112d4e 0%, #137dc5 100%)' },
    { key: 'earthy', name: 'Earthy', bg: 'linear-gradient(135deg, #c99383 0%, #266150 100%)' },
  ];

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/projects', icon: Briefcase, label: 'Projects' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/contact', icon: Mail, label: 'Contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -20,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <NavContainer>
      <ThemeSelector>
        <ThemeToggle
          onClick={() => setShowThemes(!showThemes)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Palette size={20} />
        </ThemeToggle>

        <AnimatePresence>
          {showThemes && (
            <ThemeMenu
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {themeOptions.map((theme) => (
                <ThemeOption
                  key={theme.key}
                  className={currentTheme === theme.key ? 'active' : ''}
                  style={{ background: theme.bg }}
                  onClick={() => {
                    changeTheme(theme.key);
                    setShowThemes(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={theme.name}
                />
              ))}
            </ThemeMenu>
          )}
        </AnimatePresence>
      </ThemeSelector>

      <NavToggle
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </NavToggle>

      <AnimatePresence>
        {isOpen && (
          <NavMenu
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.path}
                  variants={itemVariants}
                  custom={index}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <NavItem
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavItem>
                </motion.div>
              );
            })}
          </NavMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navigation;