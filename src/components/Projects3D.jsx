import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { ExternalLink, Github, ShoppingCart, CheckSquare, Cloud, Users, Palette, BarChart3, X, Eye } from 'lucide-react';

import '../styles/text-readability.css';

const ProjectsContainer = styled(motion.div)`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: ${props => props.theme.background};
`;

const ProjectsHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const ProjectsTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 1rem 0;
`;

const ProjectsSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${props => props.theme.textSecondary};
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.theme.chrome}40;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px ${props => props.theme.shadow};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px ${props => props.theme.shadowHover};
    border-color: ${props => props.theme.accent};
  }
`;

const HoverOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 2;
  
  ${ProjectCard}:hover & {
    opacity: 1;
    pointer-events: auto;
  }
`;

const ViewDetailsButton = styled.div`
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  box-sizing: border-box;
`;

const Modal = styled(motion.div)`
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  background: ${props => props.theme.surfaceGlass || 'rgba(255, 255, 255, 0.95)'};
  backdrop-filter: blur(20px);
  border: 2px solid ${props => props.theme.accent || '#667eea'};
  border-radius: 24px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
`;

const ModalHeader = styled.div`
  position: relative;
  height: 300px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  
  &:hover .modal-image-overlay {
    opacity: 1;
  }
`;

const ModalImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 5;
`;

const ViewFullImageButton = styled.div`
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  background: white;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 12px;
  image-rendering: -webkit-optimize-contrast;
  -webkit-image-smoothing: true;
  image-smoothing: smooth;
  filter: contrast(1.05) brightness(1.02) saturate(1.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
  background: ${props => props.theme.surface || '#ffffff'};
  max-height: calc(90vh - 300px);
  overflow-y: auto;
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.text || '#333333'};
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
`;

const ModalDescription = styled.p`
  color: ${props => props.theme.textSecondary || '#666666'};
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0 0 2rem 0;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  backdrop-filter: blur(5px);
`;

const FullImageModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.97);
  z-index: 1100;
  backdrop-filter: blur(8px);
  overflow: auto;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const FullImageContainer = styled.div`
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem 4rem 2rem;
  box-sizing: border-box;
`;

const FullImageHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  z-index: 1101;
  pointer-events: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  * {
    pointer-events: auto;
  }
`;

const FullImageTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
`;

const FullImageCloseButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const FullImage = styled(motion.img)`
  max-width: none;
  max-height: none;
  width: auto;
  height: auto;
  min-width: 300px;
  border-radius: 12px;
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  background: white;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
  
  /* Ensure image is displayed at its natural size or larger */
  @media (min-width: 768px) {
    min-width: 600px;
  }
  
  @media (min-width: 1200px) {
    min-width: 800px;
  }
`;





const ProjectImage = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  overflow: hidden;
  background: ${props => `linear-gradient(135deg, ${props.$color || '#667eea'} 0%, ${props.$color2 || '#764ba2'} 100%)`};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px 16px 0 0;
`;

const ProjectIcon = styled.div`
  color: white;
  opacity: 0.9;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
`;

const ProjectImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: white;
  padding: 0.25rem;
  box-sizing: border-box;
  border-radius: 12px;
  image-rendering: -webkit-optimize-contrast;
  -webkit-image-smoothing: true;
  image-smoothing: smooth;
  filter: contrast(1.05) brightness(1.02) saturate(1.1);
`;



const ProjectContent = styled.div`
  padding: 1.5rem;
  position: relative;
`;

const ProjectTitle = styled.h3`
  color: ${props => props.theme.text};
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  text-shadow: 0 1px 2px ${props => props.theme.shadow};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProjectTag = styled.span`
  background: ${props => props.theme.accent}15;
  color: ${props => props.theme.accent};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid ${props => props.theme.accent}25;
  transition: all 0.3s ease;
  
  ${ProjectCard}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.accent}20;
  }
`;

const ModalTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const ModalTag = styled.span`
  background: ${props => props.theme.accent}15;
  color: ${props => props.theme.accent};
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid ${props => props.theme.accent}25;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.75rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
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
  
  &.primary {
    background: ${props => props.theme.gradient};
    color: white;
    box-shadow: 0 4px 15px ${props => props.theme.accent}30;
    
    &:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 12px 35px ${props => props.theme.accent}50;
    }
  }
  
  &.secondary {
    background: ${props => props.theme.surfaceGlass};
    color: ${props => props.theme.text};
    border: 2px solid ${props => props.theme.chrome}40;
    backdrop-filter: blur(10px);
    
    &:hover {
      background: ${props => props.theme.chrome}15;
      border-color: ${props => props.theme.accent}60;
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 25px ${props => props.theme.shadow};
    }
  }
`;

const projects = [
  {
    title: "LearnHub",
    description: "Interactive learning platform with modern UI and comprehensive course management",
    fullDescription: "LearnHub is a comprehensive learning management system built with modern web technologies. It features interactive course content, progress tracking, user authentication, and a responsive design that works seamlessly across all devices. The platform includes features like course enrollment, progress tracking, and interactive learning modules.",
    image: "/learnhub.PNG",
    icon: BarChart3,
    color: "#667eea",
    color2: "#764ba2",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://learnhub-xi.vercel.app",
    githubUrl: "https://github.com/Qaswar-01/LearnHub"
  },
  {
    title: "Shophub E-Commerce",
    description: "Modern e-commerce platform with shopping cart and product management",
    fullDescription: "Shophub is a fully-featured e-commerce platform built with vanilla JavaScript and modern web technologies. It includes product catalog browsing, shopping cart functionality, user authentication, and responsive design. The platform offers a smooth shopping experience with intuitive navigation and clean, modern UI design.",
    image: "/ecommerce.PNG",
    icon: ShoppingCart,
    color: "#4facfe",
    color2: "#00f2fe",
    tags: ["JavaScript", "HTML5", "CSS3", "Responsive Design"],
    liveUrl: "https://qaswar-01.github.io/shopHub-E-commerce/",
    githubUrl: "https://github.com/Qaswar-01/shopHub-E-commerce"
  },
  {
    title: "EasySplit",
    description: "Smart expense tracking and bill splitting application with intuitive design",
    fullDescription: "EasySplit is a comprehensive expense tracking application that makes splitting bills and managing shared expenses effortless. Built with modern React architecture, it features real-time calculations, user-friendly interface, and detailed expense analytics. Perfect for roommates, friends, and group activities.",
    image: "/EasySplit.PNG",
    icon: CheckSquare,
    color: "#f093fb",
    color2: "#f5576c",
    tags: ["React", "JavaScript", "CSS3", "Local Storage"],
    liveUrl: "https://easy-split-eight.vercel.app/",
    githubUrl: "https://github.com/Qaswar-01/EasySplit"
  },
  {
    title: "YumYum Food Delivery",
    description: "Modern food delivery platform with real-time ordering and tracking",
    fullDescription: "YumYum is a comprehensive food delivery application built with modern web technologies. It features restaurant browsing, menu management, cart functionality, order tracking, and user authentication. The platform provides a seamless food ordering experience with intuitive navigation and responsive design.",
    image: "/YumYum.PNG",
    icon: Users,
    color: "#ff6b6b",
    color2: "#feca57",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    liveUrl: "https://yumyum-food-delivery.vercel.app/",
    githubUrl: "https://github.com/Qaswar-01/YumYum-Food-Delivery"
  }
];

const Projects3D = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [fullImageView, setFullImageView] = useState(null);

  const closeModal = () => {
    setSelectedProject(null);
  };

  const openFullImage = (imageUrl, title) => {
    setFullImageView({ image: imageUrl, title });
  };

  const closeFullImage = () => {
    setFullImageView(null);
  };

  return (
    <>
      <ProjectsContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <ProjectsHeader>
          <ProjectsTitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Featured Projects
          </ProjectsTitle>
          <ProjectsSubtitle
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A collection of projects that showcase my skills in modern web development, creative design, and innovative problem-solving.
          </ProjectsSubtitle>
        </ProjectsHeader>

        <ProjectsGrid>
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <ProjectCard
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                onClick={() => setSelectedProject(project)}
              >
                <ProjectImage $color={project.color} $color2={project.color2}>
                  <ProjectImageElement 
                    src={project.image} 
                    alt={project.title}
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <ProjectIcon style={{ display: 'none' }}>
                    <IconComponent size={60} />
                  </ProjectIcon>
                </ProjectImage>
                
                <HoverOverlay>
                  <ViewDetailsButton>
                    <Eye size={18} style={{ marginRight: '0.5rem' }} />
                    View Details
                  </ViewDetailsButton>
                </HoverOverlay>
                
                <ProjectContent>
                  <ProjectTitle className="dashboard-card-title">
                    {project.title}
                  </ProjectTitle>
                  <ProjectDescription>
                    {project.description}
                  </ProjectDescription>
                  <ProjectTags>
                    {project.tags.map((tag) => (
                      <ProjectTag key={tag}>{tag}</ProjectTag>
                    ))}
                  </ProjectTags>
                </ProjectContent>
              </ProjectCard>
            );
          })}
        </ProjectsGrid>


      </ProjectsContainer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            <ModalContainer>
              <Modal
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3 }}
              >
                <ModalHeader 
                  style={{ background: `linear-gradient(135deg, ${selectedProject.color} 0%, ${selectedProject.color2} 100%)` }}
                  onClick={() => openFullImage(selectedProject.image, selectedProject.title)}
                >
                  <CloseButton onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}>
                    <X size={20} />
                  </CloseButton>
                  <ModalImage 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <ProjectIcon style={{ display: 'none', position: 'absolute', zIndex: 2 }}>
                    <selectedProject.icon size={80} />
                  </ProjectIcon>
                  
                  <ModalImageOverlay className="modal-image-overlay">
                    <ViewFullImageButton>
                      <Eye size={16} />
                      View Full Image
                    </ViewFullImageButton>
                  </ModalImageOverlay>
                </ModalHeader>
                
                <ModalContent>
                  <ModalTitle>{selectedProject.title}</ModalTitle>
                  <ModalDescription>
                    {selectedProject.fullDescription}
                  </ModalDescription>
                  
                  <ModalTags>
                    {selectedProject.tags.map((tag) => (
                      <ModalTag key={tag}>{tag}</ModalTag>
                    ))}
                  </ModalTags>
                  
                  <ProjectLinks>
                    <ProjectLink
                      href={selectedProject.liveUrl}
                      className="primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </ProjectLink>
                    <ProjectLink
                      href={selectedProject.githubUrl}
                      className="secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      Source Code
                    </ProjectLink>
                  </ProjectLinks>
                </ModalContent>
              </Modal>
            </ModalContainer>
          </>
        )}
      </AnimatePresence>

      {/* Full Image Modal */}
      <AnimatePresence>
        {fullImageView && (
          <FullImageModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeFullImage}
          >
            <FullImageHeader>
              <FullImageTitle>{fullImageView.title}</FullImageTitle>
              <FullImageCloseButton onClick={(e) => {
                e.stopPropagation();
                closeFullImage();
              }}>
                <X size={20} />
              </FullImageCloseButton>
            </FullImageHeader>
            
            <FullImageContainer onClick={(e) => e.stopPropagation()}>
              <FullImage 
                src={fullImageView.image} 
                alt={fullImageView.title}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </FullImageContainer>
          </FullImageModal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects3D;