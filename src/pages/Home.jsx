import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from 'react-icons/fa';
import AnimatedTitle from '../components/AnimatedTitle/AnimatedTitle';
import OmSymbol from '../assets/images/om-symbol.svg';
// You may need to create these SVG assets
import VedicSpecialSection from "../components/VedicSpecialSection/VedicSpecialSection.jsx";

const Home = () => {
  // Create animation references for various elements
  const controls = useAnimation();
  const heroRef = useRef(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Parallax scroll effect for decorative elements
  const { scrollY } = useScroll();
  const yFloat1 = useTransform(scrollY, [0, 500], [0, -50]);
  const yFloat2 = useTransform(scrollY, [0, 500], [0, -80]);
  const backgroundY = useTransform(scrollY, [0, 500], [0, -30]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);
  
  // Initialize window height for responsive animations
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start the sequence animation
    const startAnimation = async () => {
      await controls.start('visible');
      setAnimationComplete(true);
    };
    
    startAnimation();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [controls]);
  
  // Particles for decorative elements
  const [particles, setParticles] = useState([]);
  const [omSymbols, setOmSymbols] = useState([]);
  
  useEffect(() => {
    // Create decorative floating particles
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // position in vw units
        y: Math.random() * 100, // position in vh units
        size: Math.random() * 7 + 3, // size in pixels
        duration: Math.random() * 15 + 10, // animation duration
        delay: Math.random() * 5
      });
    }
    setParticles(newParticles);
    
    // Create Om symbols for background with enhanced variety
    const newOmSymbols = [];
    // Create a moderate number of Om symbols for the background
    for (let i = 0; i < 20; i++) {
      // Create smaller sizes for a subtler effect
      const size = i < 3 
        ? Math.random() * 80 + 60 // Medium symbols (60-140px)
        : Math.random() * 40 + 30;  // Smaller symbols (30-70px)
        
      // Distribute symbols across the screen more strategically
      // Ensuring they cover different areas of the screen with better spacing
      
      // Use a grid system to ensure better spacing (5x4 grid = 20 cells)
      const gridX = i % 5; // 5 columns
      const gridY = Math.floor(i / 5); // 4 rows
      
      // Calculate ranges based on grid position with some padding
      const xRange = [gridX * 20, (gridX + 1) * 20 - 5]; // Each column is 20% wide with 5% padding
      const yRange = [gridY * 25, (gridY + 1) * 25 - 5]; // Each row is 25% high with 5% padding
      
      // Add some randomness within the quadrant
      const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
      const y = Math.random() * (yRange[1] - yRange[0]) + yRange[0];
      
      newOmSymbols.push({
        id: i,
        x: x, // position within the determined quadrant
        y: y, // position within the determined quadrant
        size: size, // variable size for depth
        rotation: Math.random() * 40 - 20, // rotation (-20 to 20 degrees)
        duration: Math.random() * 8 + 6, // Moderate animation durations (6-14s) for visible but meditative movement
        delay: Math.random() * 5, // Staggered start times
        // Add unique properties for each Om symbol
        pulseStrength: Math.random() * 0.4 + 1.0, // How much it pulses (1.0-1.4) - more noticeable
        glowIntensity: Math.random() * 0.6 + 0.4, // Glow intensity variance (0.4-1.0) - brighter glow
        floatDistance: Math.random() * 30 + 15, // How far it floats (15-45px) - more movement
        // Additional movement paths for more complex animations
        pathRadius: Math.random() * 25 + 10, // Larger radius of movement path (10-35px) - more visible floating
        pathSpeed: Math.random() * 8 + 6, // Moderate speed of path movement
      });
    }
    setOmSymbols(newOmSymbols);
  }, []);
  
  // Animation variants for staggered animations
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5, 
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(59, 46, 30, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0px 2px 8px rgba(59, 46, 30, 0.2)",
      transition: {
        duration: 0.2
      }
    }
  };

  // Add effect for tech circuit animations
  const [circuits, setCircuits] = useState([]);
  
  useEffect(() => {
    // Create circuit path elements
    const newCircuits = [];
    for (let i = 0; i < 8; i++) {
      newCircuits.push({
        id: i,
        pathLength: Math.random() * 0.5 + 0.3, // Between 0.3 and 0.8
        x: Math.random() * 100, // Position as percentage
        y: Math.random() * 100,
        size: Math.random() * 80 + 40,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 5,
        color: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#98761C' : '#C19A29'
      });
    }
    setCircuits(newCircuits);
  }, []);
  
  // Create Sanskrit incantation effect
  const [scriptLines, setScriptLines] = useState([]);
  
  useEffect(() => {
    // Create floating Sanskrit text lines
    const newScriptLines = [];
    for (let i = 0; i < 5; i++) {
      newScriptLines.push({
        id: i,
        x: i * 20 + Math.random() * 10,
        y: i * 15 + Math.random() * 10,
        opacity: Math.random() * 0.2 + 0.1,
        scale: Math.random() * 0.3 + 0.7,
        rotate: (Math.random() - 0.5) * 10,
        delay: Math.random() * 3
      });
    }
    setScriptLines(newScriptLines);
  }, []);
  
  return (
    <div className="w-full">
      <section 
        ref={heroRef}
        className="h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #3b2e1e 0%, #2c1810 50%, #3b2e1e 100%)'
        }}
      >
        {/* Starfield Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.8 + 0.2,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Cosmic Nebula Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 20% 30%, 
              rgba(59, 46, 30, 0.15) 0%, 
              transparent 50%), 
            radial-gradient(ellipse at 80% 70%, 
              rgba(90, 70, 49, 0.12) 0%, 
              transparent 50%),
            radial-gradient(ellipse at 50% 50%, 
              rgba(212, 175, 55, 0.08) 0%, 
              transparent 70%)`,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Ancient Sanskrit Matrix Rain Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`matrix-${i}`}
              className="absolute font-mono text-sm opacity-30"
              style={{
                left: `${(i * 5) + Math.random() * 5}%`,
                fontSize: `${Math.random() * 8 + 10}px`,
                color: 'rgba(212, 175, 55, 0.6)',
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 6 + 10,
                repeat: Infinity,
                delay: Math.random() * 15,
                ease: "linear"
              }}
            >
              {/* Mix of Sanskrit characters and tech symbols */}
              {i % 4 === 0 ? "ॐ नमः शिवाय" : 
               i % 4 === 1 ? "01010011 ॐ" :
               i % 4 === 2 ? "वेद = {code}" :
               "धर्म.map()"}
            </motion.div>
          ))}
        </div>

        {/* Tech circuit animations - creates glowing circuit traces */}
        {circuits.map((circuit) => (
          <motion.div
            key={`circuit-${circuit.id}`}
            className="absolute pointer-events-none"
            style={{
              top: `${circuit.y}%`,
              left: `${circuit.x}%`,
              width: `${circuit.size}px`,
              height: `${circuit.size}px`,
              opacity: 0.2,
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d={`M${20 + Math.random() * 10},${20 + Math.random() * 10} 
                   Q${50 + Math.random() * 20},${Math.random() * 20} ${80 + Math.random() * 10},${20 + Math.random() * 10} 
                   T${80 + Math.random() * 10},${80 + Math.random() * 10}
                   Q${50 - Math.random() * 20},${100 - Math.random() * 20} ${20 + Math.random() * 10},${80 - Math.random() * 10}`}
                stroke={circuit.id % 3 === 0 ? '#D4AF37' : circuit.id % 3 === 1 ? '#F59E0B' : '#FBBF24'}
                strokeWidth="1"
                fill="transparent"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: circuit.pathLength,
                  opacity: [0, 0.8, 0.2],
                  strokeDashoffset: [0, -20, -50, -100],
                }}
                transition={{
                  pathLength: { 
                    delay: circuit.delay,
                    duration: circuit.duration,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  },
                  opacity: {
                    delay: circuit.delay,
                    duration: circuit.duration * 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  },
                  strokeDashoffset: {
                    delay: circuit.delay,
                    duration: circuit.duration * 3,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                style={{ 
                  strokeDasharray: "5,5",
                  filter: `drop-shadow(0 0 4px ${circuit.id % 3 === 0 ? '#D4AF37' : circuit.id % 3 === 1 ? '#F59E0B' : '#FBBF24'})`
                }}
              />
              <motion.circle 
                cx={25 + Math.random() * 50} 
                cy={25 + Math.random() * 50} 
                r={2 + Math.random() * 3}
                fill={circuit.id % 3 === 0 ? '#D4AF37' : circuit.id % 3 === 1 ? '#F59E0B' : '#FBBF24'}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 1.5, 0]
                }}
                transition={{
                  delay: circuit.delay + 1,
                  duration: circuit.duration / 2,
                  repeat: Infinity,
                  repeatDelay: circuit.duration / 2
                }}
                style={{
                  filter: `drop-shadow(0 0 6px ${circuit.id % 3 === 0 ? '#D4AF37' : circuit.id % 3 === 1 ? '#F59E0B' : '#FBBF24'})`
                }}
              />
            </svg>
          </motion.div>
        ))}
        
        {/* Sanskrit script background - subtle ancient texts */}
        {scriptLines.map(line => (
          <motion.div
            key={`line-${line.id}`}
            className="absolute pointer-events-none"
            style={{
              top: `${line.y}%`,
              left: `${line.x}%`,
              opacity: line.opacity,
              width: '70%',
              height: '25px',
              background: `linear-gradient(to right, 
                transparent, 
                rgba(212, 175, 55, ${line.opacity * 0.7}),
                transparent
              )`,
              transform: `rotate(${line.rotate}deg) scale(${line.scale})`,
            }}
          >
            <motion.div 
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [line.opacity, line.opacity * 1.2, line.opacity],
                x: [0, 6, 0]
              }}
              transition={{
                duration: 15 + line.id * 4,
                repeat: Infinity,
                delay: line.delay,
                ease: "easeInOut"
              }}
            >
              {/* Sanskrit-inspired characters - use web-safe characters that resemble devanagari */}
              <div className="text-white text-opacity-20 text-sm tracking-widest whitespace-nowrap">
                ॐ नमः शिवाय ॐ सत्यम् शिवम् सुंदरम् ॐ तत् सत् ॐ शांतिः शांतिः शांतिः
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Sacred Geometry Background - more detailed and interactive */}
        <motion.div
          className="absolute w-full h-full"
          style={{ opacity: 0.15 }}
        >
          {/* Sacred geometry outer circle */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[120vh] h-[120vh] border-2 rounded-full"
            style={{
              x: "-50%",
              y: "-50%",
              borderColor: "rgba(212, 175, 55, 0.3)"
            }}
            animate={{ 
              rotate: 360,
              scale: [1, 1.01, 0.99, 1]
            }}
            transition={{
              rotate: { duration: 150, repeat: Infinity, ease: "linear" },
              scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Tech hexagonal grid */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[115vh] h-[115vh]"
            style={{ 
              x: "-50%", 
              y: "-50%",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='rgba(212, 175, 55, 0.15)' stroke-width='0.7' d='M30 10L55 10M10 30L10 55M30 90L55 90M90 30L90 55M30 10L10 30M55 10L90 30M10 55L30 90M90 55L55 90'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "50px 50px"
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 220, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Sri Yantra geometric figure - central sacred geometry */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[60vh] h-[60vh]"
            style={{ 
              x: "-50%", 
              y: "-50%",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpolygon fill='none' stroke='rgba(212, 175, 55, 0.2)' points='50,5 95,90 5,90' /%3E%3Cpolygon fill='none' stroke='rgba(212, 175, 55, 0.2)' points='50,15 85,85 15,85' /%3E%3Cpolygon fill='none' stroke='rgba(212, 175, 55, 0.2)' points='50,25 75,80 25,80' /%3E%3Ccircle fill='none' stroke='rgba(212, 175, 55, 0.3)' cx='50' cy='50' r='30' /%3E%3Ccircle fill='rgba(212, 175, 55, 0.1)' cx='50' cy='50' r='5' /%3E%3C/svg%3E")`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.03, 1]
            }}
            transition={{ 
              rotate: { duration: 120, repeat: Infinity, ease: "linear" },
              scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </motion.div>

        {/* Animated particles - existing code */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-20 pointer-events-none"
            style={{
              left: `${particle.x}vw`,
              top: `${particle.y}vh`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Animated Om Symbols - existing code */}
        {omSymbols.map((om) => (
          <motion.div
            key={`om-${om.id}`}
            className="absolute pointer-events-none z-0"
            style={{
              left: `${om.x}vw`,
              top: `${om.y}vh`,
              width: `${om.size}px`,
              height: `${om.size}px`,
              filter: `drop-shadow(0 0 ${5 * om.glowIntensity}px rgba(255, 255, 255, ${0.6 * om.glowIntensity}))`,
            }}
            initial={{ 
              opacity: 0,
              rotate: om.rotation,
              scale: 0.8
            }}
            animate={{
              opacity: [0.3, 0.7 * om.pulseStrength, 0.3], // More visible opacity range
              rotate: [om.rotation, om.rotation + 5, om.rotation - 3, om.rotation], // More noticeable rotation
              x: [0, om.pathRadius * -0.2, om.pathRadius * 0.2, 0], // Larger floating movement
              y: [0, om.pathRadius * -0.15, om.pathRadius * 0.15, 0], // More vertical float
              scale: [0.9, 1.0 * om.pulseStrength, 0.95, 0.9], // More noticeable breathing effect
              filter: [
                `drop-shadow(0 0 ${6 * om.glowIntensity}px rgba(255, 255, 255, ${0.5 * om.glowIntensity}))`, 
                `drop-shadow(0 0 ${15 * om.glowIntensity}px rgba(255, 255, 255, ${0.8 * om.glowIntensity}))`, 
                `drop-shadow(0 0 ${6 * om.glowIntensity}px rgba(255, 255, 255, ${0.5 * om.glowIntensity}))`
              ]
            }}
            transition={{
              duration: om.duration * 1.5, // Balanced timing - visible but still meditative (9-21s cycles)
              repeat: Infinity,
              delay: om.delay,
              ease: "easeInOut"
            }}
          >
            <img 
              src={OmSymbol}
              alt="Om Symbol"
              className="w-full h-full object-contain"
              style={{
                opacity: om.id % 2 === 0 ? 1 : 0.8,
                filter: 'brightness(1.2) contrast(1.2)'
              }}
            />
          </motion.div>
        ))}
        
        {/* Digital coding particles - resembling code fragments */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`code-${i}`}
              className="absolute text-xs font-mono"
              style={{
                color: i % 3 === 0 ? 'rgba(212, 175, 55, 0.7)' : 'rgba(244, 232, 203, 0.5)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0,
                fontSize: `${Math.random() * 8 + 8}px`
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                y: [0, 250],
                x: i % 2 === 0 ? [0, 15, -8, 3] : [0, -12, 3, -3]
              }}
              transition={{
                duration: Math.random() * 12 + 18,
                repeat: Infinity,
                delay: Math.random() * 25,
                ease: "linear"
              }}
            >
              {/* Sanskrit-tech hybrid code symbols */}
              {i % 4 === 0 ? "ॐ = true;" : 
               i % 4 === 1 ? "const dharma = () => {}" :
               i % 4 === 2 ? "if(karma > 0) {}" :
               "import { veda } from 'ancient';"}
            </motion.div>
          ))}
        </div>
        
        {/* Hero content with staggered animations - existing code enhanced */}
        <motion.div 
          className="text-center z-20 max-w-3xl px-8 py-12 rounded-lg backdrop-blur-sm"
          style={{
            background: 'rgba(59, 46, 30, 0.7)',
            boxShadow: '0 4px 30px rgba(212, 175, 55, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          }}
          variants={heroVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Decorative Sanskrit lotus at top */}
          <motion.div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70"
            animate={{
              y: [0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="80" height="40" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C40 15 30 25 10 25C30 25 40 45 50 45C60 45 70 25 90 25C70 25 60 15 50 0Z" fill="rgba(212, 175, 55, 0.5)" />
              <path d="M50 10C45 20 40 25 25 25C40 25 45 40 50 40C55 40 60 25 75 25C60 25 55 20 50 10Z" fill="rgba(245, 158, 11, 0.7)" />
              <circle cx="50" cy="25" r="5" fill="rgba(251, 191, 36, 0.7)" />
            </svg>
          </motion.div>

          <motion.div variants={itemVariants}>
            <AnimatedTitle 
              englishText="CODEVEDA" 
              hindiText="कोड वेदा" 
              className="text-5xl md:text-6xl font-bold mb-4 tracking-wider text-white uppercase"
              speed={0.1} 
              delayBetween={2} 
            />
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-normal mb-6 text-white text-opacity-90"
            variants={itemVariants}
          >
            Where Ancient Wisdom Meets Modern Technology
          </motion.h2>
          
          <motion.p 
            className="text-lg max-w-xl mx-auto mb-8 text-white text-opacity-80"
            variants={itemVariants}
          >
            Join us for a unique hackathon experience blending Vedic knowledge with cutting-edge innovation
          </motion.p>
          
          {/* Digital circuit decoration around buttons */}
          <motion.div 
            className="relative mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <svg 
              className="absolute pointer-events-none" 
              style={{ 
                top: '-15px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                width: '90%', 
                height: '120%',
                opacity: 0.4,
                zIndex: -1
              }} 
              viewBox="0 0 500 150" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path 
                d="M50,75 H150 A10,10 0 0 1 160,85 V110 A10,10 0 0 0 170,120 H330 A10,10 0 0 0 340,110 V85 A10,10 0 0 1 350,75 H450" 
                stroke="rgba(212, 175, 55, 0.7)" 
                strokeWidth="2"
                fill="transparent"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              <motion.circle cx="50" cy="75" r="5" fill="rgba(212, 175, 55, 0.7)" 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <motion.circle cx="450" cy="75" r="5" fill="rgba(212, 175, 55, 0.7)" 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.7] }}
                transition={{ duration: 2, delay: 0.5 }}
              />
            </svg>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-4 mb-12 md:flex-row flex-col mx-auto md:w-auto w-4/5 relative z-10"
            variants={itemVariants}
          >
            <motion.button
              className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-amber-900 text-lg font-semibold py-3 px-8 rounded cursor-pointer relative overflow-hidden group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              style={{ 
                boxShadow: "0px 4px 10px rgba(212, 175, 55, 0.3)",
                transition: "all 0.3s ease"
              }}
            >
              {/* Tech circuit animation inside button */}
              <motion.span 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0">
                  <motion.path 
                    d="M0,50 H20 C30,50 30,30 40,30 H60 C70,30 70,50 80,50 H100" 
                    stroke="rgba(59, 46, 30, 0.5)" 
                    strokeWidth="1" 
                    fill="transparent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </svg>
              </motion.span>
              
             <a href="https://vision.hack2skill.com/event/codeveda" target='_blank'><span className="relative z-10">Register Now</span></a> 
              
              {/* Radial gradient hover effect */}
              <motion.span 
                className="absolute inset-0 rounded bg-gradient-to-r from-yellow-400 to-amber-500"  
                style={{ 
                  background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.9) 0%, rgba(244, 232, 203, 0.5) 100%)",
                  opacity: 0 
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 0.5, scale: 2 }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
            
            <motion.button
              className="bg-transparent border-2 border-white text-white text-lg font-semibold py-3 px-8 rounded cursor-pointer relative overflow-hidden group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              style={{ 
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
                transition: "all 0.3s ease"
              }}
            >
              {/* Ancient script animation inside button */}
              <motion.span 
                className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.2 }}
              >
                <div className="whitespace-nowrap text-xs font-sans">
                  ॐ नमः शिवाय ॐ नमः शिवाय ॐ नमः शिवाय
                </div>
              </motion.span>
              
              <Link to="/why-code-veda" className="relative z-10">Learn More</Link>
              
              {/* Shimmer effect */}
              <motion.span 
                className="absolute inset-0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 1 }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                }}
              />
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="flex justify-center gap-8 mt-4 md:flex-row flex-col text-white relative z-10"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 2px 10px rgba(255, 255, 255, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaCalendarAlt className="text-xl text-white" />
              <span>September 13, 2025</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 2px 10px rgba(255, 255, 255, 0.2)" 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaMapMarkerAlt className="text-xl text-white" />
              <span>Microsoft, Gurugram</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 2px 10px rgba(255, 255, 255, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaTrophy className="text-xl text-white" />
              <span>₹5,00,000 Prize Pool</span>
            </motion.div>
          </motion.div>
          
          {/* Decorative Mandala at bottom */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[80px] h-[40px] opacity-50"
            animate={{
              y: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 0L50 20H30L40 0Z" fill="rgba(59, 130, 246, 0.6)" />
              <path d="M40 40L50 20H30L40 40Z" fill="rgba(59, 130, 246, 0.6)" />
              <path d="M0 20L20 30V10L0 20Z" fill="rgba(59, 130, 246, 0.6)" />
              <path d="M80 20L60 30V10L80 20Z" fill="rgba(59, 130, 246, 0.6)" />
              <circle cx="40" cy="20" r="5" fill="rgba(16, 185, 129, 0.7)" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Keep existing decorative elements */}
      </section>
      
      {/* Replace the existing "What Makes CodeVeda Special" section with our new component */}
      <VedicSpecialSection />
      
    
      
      <section className="py-20 px-8 relative" style={{ backgroundColor: '#3b2e1e' }}>
        <motion.div
          className="max-w-3xl mx-auto text-center z-10 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Join the Movement?</h2>
          <p className="text-lg text-white text-opacity-80 mb-8">Register now and be part of a revolutionary hackathon experience.</p>
          
          <a href='https://vision.hack2skill.com/event/codeveda' target='_blank'>
          <motion.button
            className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-amber-900 text-lg font-semibold py-3 px-10 rounded cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </motion.button>
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
