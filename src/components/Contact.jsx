import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, Loader2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 4rem 4rem;
  background: ${props => props.theme.background};

  @media (max-width: 1024px) {
    padding: 5rem 3rem 3rem;
  }

  @media (max-width: 768px) {
    padding: 4rem 1.5rem 2rem;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem 2rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 1024px) {
    gap: 3rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const ContactInfo = styled(motion.div)`
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  height: fit-content;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;

const InfoText = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.7;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  &:hover {
    background: ${props => props.theme.gradient};
    color: white;
    transform: translateX(10px);
    ${props => props.clickable && `
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      transform: translateX(15px) scale(1.02);
    `}
  }

  ${props => props.clickable && `
    &:active {
      transform: translateX(12px) scale(0.98);
    }
  `}

  @media (max-width: 768px) {
    padding: 0.875rem;
    margin-bottom: 1.25rem;
    gap: 0.875rem;

    &:hover {
      transform: translateX(5px);
      ${props => props.clickable && `
        transform: translateX(8px) scale(1.01);
      `}
    }

    ${props => props.clickable && `
      &:active {
        transform: translateX(6px) scale(0.99);
      }
    `}
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin-bottom: 1rem;
    gap: 0.75rem;
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
  }
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ContactValue = styled.div`
  font-weight: 700;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-top: 1.25rem;
  }
`;

const SocialLink = styled(motion.a)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.text};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.gradient};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
  }

  @media (max-width: 480px) {
    width: 42px;
    height: 42px;
  }
`;

const ContactForm = styled(motion.form)`
  background: ${props => props.theme.surfaceGlass};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 15px;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.text};
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 1.5rem;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;

const FormLabel = styled(motion.label)`
  position: absolute;
  left: 1rem;
  top: 1rem;
  color: ${props => props.theme.textSecondary};
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s ease;
  transform-origin: left;
  
  &.focused {
    transform: translateY(-1.5rem) scale(0.8);
    color: ${props => props.theme.accent};
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.hasError ? '#ef4444' : `${props.theme.chrome}40`};
  border-radius: 15px;
  background: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px ${props => props.hasError ? '#ef444415' : `${props.theme.chrome}15`};

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : props.theme.gold};
    background: ${props => props.theme.surfaceGlass};
    box-shadow: 0 0 20px ${props => props.hasError ? '#ef444440' : `${props.theme.gold}40`};
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-1.5rem) scale(0.8);
    color: ${props => props.hasError ? '#ef4444' : props.theme.gold};
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 16px; /* Prevents zoom on iOS */
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => props.hasError ? '#ef4444' : `${props.theme.chrome}40`};
  border-radius: 15px;
  background: ${props => props.theme.surface};
  color: ${props => props.theme.text};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  box-shadow: 0 0 10px ${props => props.hasError ? '#ef444415' : `${props.theme.chrome}15`};

  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : props.theme.gold};
    background: ${props => props.theme.surfaceGlass};
    box-shadow: 0 0 20px ${props => props.hasError ? '#ef444440' : `${props.theme.gold}40`};
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-1.5rem) scale(0.8);
    color: ${props => props.hasError ? '#ef4444' : props.theme.gold};
  }

  @media (max-width: 768px) {
    padding: 0.875rem;
    font-size: 16px; /* Prevents zoom on iOS */
    min-height: 100px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    min-height: 90px;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 15px;
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
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    border-radius: 12px;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #10b981;
  color: white;
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled(motion.div)`
  background: #ef4444;
  color: white;
  padding: 1rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const FieldError = styled(motion.div)`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "qaswarhussain135@gmail.com",
    clickable: true,
    action: () => {
      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=qaswarhussain135@gmail.com&su=${encodeURIComponent('Contact from Portfolio')}&body=${encodeURIComponent('Hi Qaswar,\n\nI would like to get in touch with you.\n\nBest regards')}`;
      const mailtoUrl = `mailto:qaswarhussain135@gmail.com?subject=${encodeURIComponent('Contact from Portfolio')}&body=${encodeURIComponent('Hi Qaswar,\n\nI would like to get in touch with you.\n\nBest regards')}`;
      
      try {
        const newWindow = window.open(gmailComposeUrl, '_blank');
        if (!newWindow) {
          window.location.href = mailtoUrl;
        }
      } catch (error) {
        window.location.href = mailtoUrl;
      }
    }
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 301 7767638",
    clickable: true,
    action: () => {
      window.location.href = `tel:+923017767638`;
    }
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pakistan, M.Garh",
    clickable: false
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    // Initialize EmailJS with working public key
    emailjs.init('lgJNGqRjMkuHtQrFe');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Show what would be sent
    console.log('Form data that would be sent:', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    });
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This will always fail because EmailJS needs proper setup
      throw new Error('EmailJS not configured - falling back to email client');
      
    } catch (error) {
      console.log('Falling back to email client...');
      
      // Fallback: Open email client with pre-filled message
      try {
        const subject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
        const body = encodeURIComponent(
          `Hi Qaswar,\n\n` +
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n\n` +
          `Subject: ${formData.subject}\n\n` +
          `Message:\n${formData.message}\n\n` +
          `---\nSent from your portfolio contact form`
        );
        
        // Try Gmail web compose first, then fallback to mailto
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=qaswarhussain135@gmail.com&su=${subject}&body=${body}`;
        const mailtoUrl = `mailto:qaswarhussain135@gmail.com?subject=${subject}&body=${body}`;
        
        console.log('Opening Gmail compose with URL:', gmailComposeUrl);
        
        // Try Gmail web compose first
        try {
          const newWindow = window.open(gmailComposeUrl, '_blank');
          if (!newWindow) {
            // If popup blocked, try mailto
            window.location.href = mailtoUrl;
          }
        } catch (error) {
          // Fallback to mailto
          window.location.href = mailtoUrl;
        }
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFieldErrors({});
        
        setTimeout(() => setIsSubmitted(false), 5000);
        
      } catch (fallbackError) {
        console.error('Email client fallback failed:', fallbackError);
        setIsSubmitting(false);
        setSubmitError('Please set up EmailJS or contact me directly at: qaswarhussain135@gmail.com');
        
        // Auto-copy email to clipboard as final fallback
        try {
          navigator.clipboard.writeText('qaswarhussain135@gmail.com');
          setSubmitError('Email address copied to clipboard: qaswarhussain135@gmail.com');
        } catch (clipboardError) {
          // Ignore clipboard error
        }
        
        // Hide error message after 8 seconds
        setTimeout(() => setSubmitError(''), 8000);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  return (
    <ContactContainer>
      <ContentWrapper>
        <Header>
          <Title
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Let's Connect
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have a project in mind or just want to chat? I'd love to hear from you. 
            Let's create something amazing together!
          </Subtitle>
        </Header>

        <MainContent>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <InfoTitle>Get in Touch</InfoTitle>
            <InfoText>
              I'm always excited to work on new projects and collaborate with creative minds. 
              Whether you have a specific project in mind or just want to explore possibilities, 
              don't hesitate to reach out!
            </InfoText>
            
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <ContactItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={item.clickable ? item.action : undefined}
                  style={{ cursor: item.clickable ? 'pointer' : 'default' }}
                >
                  <ContactIcon>
                    <Icon size={20} />
                  </ContactIcon>
                  <ContactDetails>
                    <ContactLabel>{item.label}</ContactLabel>
                    <ContactValue>{item.value}</ContactValue>
                  </ContactDetails>
                </ContactItem>
              );
            })}
            
            <SocialLinks>
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
                  console.log('Email icon clicked in social links');
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
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <FormTitle>Send Message</FormTitle>
            
            <AnimatePresence>
              {isSubmitted && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <CheckCircle size={20} />
                  Gmail compose opened! Please sign in to Gmail and click send.
                </SuccessMessage>
              )}
              {submitError && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <AlertCircle size={20} />
                  {submitError}
                </ErrorMessage>
              )}
            </AnimatePresence>

            <FormGroup>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder=" "
                hasError={!!fieldErrors.name}
                required
              />
              <FormLabel className={formData.name ? 'focused' : ''}>
                Your Name
              </FormLabel>
              {fieldErrors.name && (
                <FieldError
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle size={16} />
                  {fieldErrors.name}
                </FieldError>
              )}
            </FormGroup>

            <FormGroup>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder=" "
                hasError={!!fieldErrors.email}
                required
              />
              <FormLabel className={formData.email ? 'focused' : ''}>
                Email Address
              </FormLabel>
              {fieldErrors.email && (
                <FieldError
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle size={16} />
                  {fieldErrors.email}
                </FieldError>
              )}
            </FormGroup>

            <FormGroup>
              <FormInput
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder=" "
                hasError={!!fieldErrors.subject}
                required
              />
              <FormLabel className={formData.subject ? 'focused' : ''}>
                Subject
              </FormLabel>
              {fieldErrors.subject && (
                <FieldError
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle size={16} />
                  {fieldErrors.subject}
                </FieldError>
              )}
            </FormGroup>

            <FormGroup>
              <FormTextarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder=" "
                hasError={!!fieldErrors.message}
                required
              />
              <FormLabel className={formData.message ? 'focused' : ''}>
                Your Message
              </FormLabel>
              {fieldErrors.message && (
                <FieldError
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle size={16} />
                  {fieldErrors.message}
                </FieldError>
              )}
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 size={20} />
                  </motion.div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </SubmitButton>
          </ContactForm>
        </MainContent>
      </ContentWrapper>
    </ContactContainer>
  );
};

export default Contact;