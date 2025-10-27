import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled, { useTheme } from 'styled-components';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InteractiveHero3D from './3D/InteractiveHero3D';
import '../styles/text-readability.css';

const HeroContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: ${props => props.theme.background};
`;

const ContentOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 4rem;
  gap: 4rem;
  z-index: 10;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    padding: 0.5rem;
    gap: 0.5rem;
    text-align: center;
    align-items: start;
    justify-items: center;
    overflow-y: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.25rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const LeftSection = styled(motion.div)`
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
    max-width: 100%;
    padding: 1rem;
    width: 100%;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const RightSection = styled(motion.div)`
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;

  @media (max-width: 768px) {
    order: -1;
    margin-bottom: 1rem;
  }
`;

const CircularHero = styled(motion.div)`
  position: relative;
  width: 450px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  
  /* Add subtle decorative elements */
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    right: -20px;
    width: 80px;
    height: 80px;
    border: 2px solid ${props => props.theme.accent}30;
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 60px;
    height: 60px;
    background: ${props => props.theme.accent}20;
    border-radius: 50%;
    animation: float 4s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @media (max-width: 768px) {
    width: 280px;
    height: 280px;

    &::before {
      width: 50px;
      height: 50px;
      top: -10px;
      right: -10px;
    }

    &::after {
      width: 35px;
      height: 35px;
      bottom: -15px;
      left: -15px;
    }
  }
`;

const DeveloperContainer = styled(motion.div)`
  width: 450px;
  height: 450px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.02);
  }
  
  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: opacity 0.3s ease;
`;

const SkillBadge = styled(motion.div)`
  position: absolute;
  padding: 8px 16px;
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.accent}30;
  border-radius: 25px;
  color: ${props => props.theme.text};
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 20px ${props => props.theme.shadow};
  white-space: nowrap;
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.75rem;
  }
`;

const OrbitingElement = styled(motion.div)`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${props => props.theme.accent};
  border-radius: 50%;
  box-shadow: 0 0 20px ${props => props.theme.accent}50;
`;

const InitialsFallback = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.1em;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;



const Greeting = styled(motion.h1)`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 1rem;
`;

const Name = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 800;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  line-height: 1.1;
  text-shadow: 0 0 30px ${props => props.theme.accent}30;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Title = styled(motion.h3)`
  font-size: 2rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 3rem;
  max-width: 500px;
  backdrop-filter: blur(10px);
  background: ${props => props.theme.surfaceGlass};
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid ${props => props.theme.chrome}30;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem;
    margin-bottom: 2rem;
    max-width: 90%;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    max-width: 300px;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    max-width: 280px;
    margin-bottom: 1rem;
  }
`;

const PrimaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  background: ${props => props.theme.gradient};
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px ${props => props.theme.shadow};
  white-space: nowrap;

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

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 15px 40px ${props => props.theme.shadowHover};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  border: 2px solid ${props => props.theme.accent};
  border-radius: 50px;
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  color: ${props => props.theme.accent};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.theme.accent};
    color: white;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 15px 40px ${props => props.theme.accent}30;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 1.25rem;
    margin-top: 1rem;
    flex-wrap: wrap;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
    margin-top: 0.75rem;
  }
`;

const SocialLink = styled(motion.a)`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.theme.chrome}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.text};
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 3px 12px ${props => props.theme.shadow};
  position: relative;
  z-index: 1;

  &:hover {
    background: ${props => props.theme.gradient};
    color: white;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px ${props => props.theme.shadowHover};
    z-index: 2;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
  
  @media (max-width: 480px) {
    width: 42px;
    height: 42px;
    
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const Hero3D = ({ currentTheme }) => {
  const controls = useAnimation();
  const theme = useTheme();
  const navigate = useNavigate();

  // Determine which profile image to use based on theme
  const getProfileImage = () => {
    // If currentTheme is undefined, default to light theme
    const safeTheme = currentTheme || 'light';

    // Light themes: light, earthy -> use profile.jpeg
    // Dark themes: dark, jewel -> use profile1.jpeg
    const isLightTheme = safeTheme === 'light' || safeTheme === 'earthy';

    return isLightTheme ? '/profile.jpeg' : '/profile1.jpeg';
  };

  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [currentImageSrc, setCurrentImageSrc] = React.useState('');

  // Handle theme changes more smoothly
  React.useEffect(() => {
    const newImageSrc = getProfileImage();
    if (newImageSrc !== currentImageSrc) {
      setCurrentImageSrc(newImageSrc);
      setImageError(false);
      // Don't reset imageLoaded immediately to prevent flickering
      console.log('Theme changed to:', currentTheme, 'Image will be:', newImageSrc);
    }
  }, [currentTheme, currentImageSrc]);



  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <HeroContainer>
      {/* 3D Background */}
      <InteractiveHero3D />

      {/* Content Overlay */}
      <ContentOverlay
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <LeftSection>
          <Greeting variants={itemVariants}>
            Hello, I'm
          </Greeting>

          <Name variants={itemVariants}>
            M Qaswar Hussain
          </Name>

          <Title variants={itemVariants}>
            Full-Stack MERN Developer
          </Title>

          <Description variants={itemVariants}>
            I craft scalable and maintainable full-stack web applications leveraging the MERN stack. My workflow prioritizes clean code, fast performance, and intuitive design to deliver reliable, elegant digital experiences.
          </Description>

          <ButtonGroup variants={itemVariants}>
            <PrimaryButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/projects')}
            >
              View My Work
            </PrimaryButton>

            <SecondaryButton
              as="a"
              href="/Simple-Resume.pdf"
              download="Qaswar_Hussain_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
              <Download size={20} />
            </SecondaryButton>
          </ButtonGroup>

          <SocialLinks variants={itemVariants}>
            <SocialLink
              href="https://github.com/Qaswar-01/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/qaswar-hussain?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </SocialLink>
            <SocialLink
              href="mailto:qaswarhussain135@gmail.com"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                console.log('Email icon clicked in home social links');
                const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=qaswarhussain135@gmail.com&su=${encodeURIComponent('Contact from Portfolio')}&body=${encodeURIComponent('Hi Qaswar,\n\nI found your portfolio and would like to get in touch with you.\n\nBest regards')}`;
                const mailtoUrl = `mailto:qaswarhussain135@gmail.com?subject=${encodeURIComponent('Contact from Portfolio')}&body=${encodeURIComponent('Hi Qaswar,\n\nI found your portfolio and would like to get in touch with you.\n\nBest regards')}`;

                try {
                  const newWindow = window.open(gmailComposeUrl, '_blank');
                  if (!newWindow) {
                    window.location.href = mailtoUrl;
                  }
                } catch (error) {
                  window.location.href = mailtoUrl;
                }
              }}
            >
              <Mail size={20} />
            </SocialLink>
          </SocialLinks>
        </LeftSection>

        <RightSection variants={itemVariants}>
          <CircularHero>
            <DeveloperContainer
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileImage
                src={currentImageSrc}
                alt="M Qaswar Hussain - MERN Stack Developer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </DeveloperContainer>



            {/* Skill Badges */}
            <SkillBadge
              style={{ top: '15%', right: '-10%' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              React
            </SkillBadge>

            <SkillBadge
              style={{ left: '-15%', top: '35%' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Node.js
            </SkillBadge>

            <SkillBadge
              style={{ bottom: '20%', right: '-5%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              MongoDB
            </SkillBadge>

            <SkillBadge
              style={{ bottom: '25%', left: '-10%' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              Express
            </SkillBadge>

            {/* Orbiting Elements */}
            <OrbitingElement
              style={{ top: '10%', left: '20%' }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            <OrbitingElement
              style={{ bottom: '15%', right: '25%' }}
              animate={{
                rotate: -360,
                scale: [1, 0.8, 1]
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </CircularHero>
        </RightSection>
      </ContentOverlay>
    </HeroContainer>
  );
};

export default Hero3D;
