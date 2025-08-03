import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Code, Palette, Zap, Heart, Coffee, Music, Activity, Leaf } from 'lucide-react';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 4rem 4rem;
  background: ${props => props.theme.background};
  
  @media (max-width: 768px) {
    padding: 4rem 2rem 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StorySection = styled(motion.div)`
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.theme.gradient};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const StoryText = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SkillCard = styled(motion.div)`
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.gradient};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.1;
  }
`;

const SkillIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  position: relative;
  z-index: 2;
`;

const SkillTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
`;

const SkillDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  position: relative;
  z-index: 2;
`;

const TimelineSection = styled(motion.div)`
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 40px;
    bottom: -20px;
    width: 2px;
    background: ${props => props.theme.gradient};
    opacity: 0.3;
  }
  
  &:last-child::before {
    display: none;
  }
`;

const TimelineDot = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  flex-shrink: 0;
  margin-top: 0.5rem;
  position: relative;
  z-index: 2;
`;

const TimelineContent = styled.div`
  flex: 1;
`;



const TimelineTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin: 0.5rem 0;
`;

const TimelineDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
`;

const FunSection = styled(motion.div)`
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
`;

const FunGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FunItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.gradient};
    color: white;
    transform: translateY(-5px);
  }
`;

const FunIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.gold};
`;

const FunText = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const skills = [
  {
    icon: Code,
    title: "Frontend & Backend Development",
    description: "React.js, Node.js, Express.js for building full-stack web applications with modern JavaScript frameworks and responsive user interfaces."
  },
  {
    icon: Palette,
    title: "API Integration & Database Management",
    description: "RESTful API Integration and Database Management with MongoDB for seamless data flow and storage solutions."
  },
  {
    icon: Zap,
    title: "Responsive UI/UX & PWA Development",
    description: "Responsive UI/UX Design with Modern JavaScript, CSS Frameworks, and PWA Cross-device platforms for optimal user experiences."
  }
];

const timeline = [
  {
    title: "Full Stack Developer",
    description: "Developed end-to-end web solutions using React, Node.js, and cloud technologies. Collaborated with design teams to create exceptional user experiences."
  },
  {
    title: "Intern/Web Development Trainee",
    description: "Gained hands-on experience with the MERN stack and contributed to responsive, team-based web projects at CORVIT SYSTEM TECH."
  },
  {
    title: "Frontend Developer",
    description: "Started my professional journey building responsive websites and learning modern JavaScript frameworks."
  },
  {
    title: "Bachelor's Degree",
    description: "Pursued a Bachelor of Science in Software Engineering, building a strong foundation in software development and collaborative projects."
  }
];

const funFacts = [
  { icon: Coffee, text: "Coffee Addict" },
  { icon: Music, text: "Music Lover" },
  { icon: Activity, text: "Runner" },
  { icon: Leaf, text: "Plant Parent" }
];

const About = () => {

  return (
    <AboutContainer>
      <ContentWrapper>
        <Header>
          <Title
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get to know the person behind the code - my journey, passions, and what drives me to create amazing digital experiences.
          </Subtitle>
        </Header>

        <MainContent>
          <StorySection
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SectionTitle>
              <Heart size={24} />
              My Story
            </SectionTitle>
            <StoryText>
              I'm a passionate developer and designer who believes in the power of technology to create meaningful experiences. My journey began with curiosity about how websites work, which led me down the rabbit hole of web development.
            </StoryText>
            <StoryText>
              Through my academic pursuit of Software Engineering and a dedication to hands-on learning.Exploring the MERN stack and user interface concepts, I focus on creating practical solutions and always look for ways to improve my craft.
            </StoryText>
            <StoryText>
              I am driven by a commitment to continuous growth, actively seeking out new challenges and opportunities to learn. Whether experimenting with personal projects or collaborating with peers, my aim is to build digital experiences that are thoughtful, effective, and impactful.
            </StoryText>
          </StorySection>

          <TimelineSection
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SectionTitle>
              <Zap size={24} />
              My Journey
            </SectionTitle>
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <TimelineDot />
                <TimelineContent>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>{item.description}</TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </TimelineSection>
        </MainContent>

        <SkillsGrid>
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <SkillCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <SkillIcon>
                  <Icon size={32} />
                </SkillIcon>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillDescription>{skill.description}</SkillDescription>
              </SkillCard>
            );
          })}
        </SkillsGrid>

        <FunSection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <SectionTitle>
            <Coffee size={24} />
            Fun Facts About Me
          </SectionTitle>
          <FunGrid>
            {funFacts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <FunItem
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FunIcon>
                    <Icon size={32} />
                  </FunIcon>
                  <FunText>{fact.text}</FunText>
                </FunItem>
              );
            })}
          </FunGrid>
        </FunSection>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About;