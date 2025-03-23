import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

// Import chart library
import * as echarts from 'echarts';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [isVisible, setIsVisible] = useState({});
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const chartRef = useRef<HTMLDivElement>(null);
  const observerRefs = useRef<IntersectionObserver[]>([]);
  
  // Function to handle subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailInput || !emailInput.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: "You've been subscribed to our newsletter.",
    });
    
    setEmailInput('');
  };
  
  // Initialize chart
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      
      const option = {
        grid: {
          left: '5%',
          right: '5%',
          top: '10%',
          bottom: '10%',
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 4,
            color: '#2ECC71'
          },
          itemStyle: {
            color: '#2ECC71',
            borderWidth: 2,
            borderColor: '#fff'
          },
          emphasis: {
            itemStyle: {
              color: '#fff',
              borderColor: '#2ECC71',
              borderWidth: 4,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 10
            }
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(46, 204, 113, 0.3)'
              }, {
                offset: 1,
                color: 'rgba(46, 204, 113, 0.05)'
              }]
            }
          },
          animationDuration: 2000,
          animationEasing: 'elasticOut'
        }],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#eee',
          borderWidth: 1,
          textStyle: {
            color: '#333'
          },
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#2ECC71',
              width: 2
            }
          }
        }
      };
      
      // Handle window resize
      const resizeHandler = () => {
        chart.resize();
      };
      
      window.addEventListener('resize', resizeHandler);
      
      chart.setOption(option);
      
      // Animate chart on scroll into view
      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target === chartRef.current) {
            chart.setOption(option);
          }
        });
      };
      
      const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
      if (chartRef.current) {
        observer.observe(chartRef.current);
      }
      
      return () => {
        chart.dispose();
        window.removeEventListener('resize', resizeHandler);
        observer.disconnect();
      };
    }
  }, []);
  
  // Scroll animations using Intersection Observer
  useEffect(() => {
    const sections = document.querySelectorAll('.animate-on-scroll');
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });
    
    sections.forEach(section => {
      if (section.id) {
        observer.observe(section);
      }
    });
    
    observerRefs.current.push(observer);
    
    return () => {
      observerRefs.current.forEach(obs => obs.disconnect());
    };
  }, []);
  
  // Header scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Animation variants for Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Features data
  const features = [
    {
      icon: 'M19.555 9.543L5.555 2.376c-1.232-.629-2.692.116-2.692 1.473v14.344c0 1.357 1.46 2.102 2.692 1.473l14-7.167a1.6 1.6 0 000-2.956z',
      title: 'Task Management',
      description: 'Organize tasks with intuitive Kanban boards and checklists'
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates and comments'
    },
    {
      icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      title: 'Progress Tracking',
      description: 'Monitor project progress with visual analytics and reports'
    },
    {
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      title: 'Smart Notifications',
      description: 'Stay updated with intelligent alerts and reminders'
    }
  ];
  
  // Benefits data
  const benefits = [
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Boost Productivity',
      description: 'Complete projects faster with streamlined workflows and automation'
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: 'Reliable & Secure',
      description: 'Your project data is safe with enterprise-grade security'
    },
    {
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l-6.16-3.422a12.083 12.083 0 00-.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 016.824-2.998 12.078 12.078 0 00-.665-6.479L12 14z',
      title: 'Academic Focus',
      description: 'Specially designed features for academic project management'
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      text: "ProjectFlow has transformed how our team manages research projects. The intuitive interface and powerful features make collaboration effortless.",
      author: "Emily Thompson",
      role: "Graduate Student, Stanford University"
    },
    {
      text: "As a computer science student, I appreciate how ProjectFlow streamlines our group assignments. It's been a game-changer for our capstone project.",
      author: "Michael Chen",
      role: "CS Student, MIT"
    },
    {
      text: "The progress tracking features help us stay on top of deadlines. It's the perfect tool for managing complex academic projects.",
      author: "Sarah Martinez",
      role: "Research Assistant, Harvard University"
    }
  ];
  
  // Current testimonial state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white overflow-x-hidden"
    >
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${hasScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-projectflow-green transition-transform hover:scale-105">ProjectFlow</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-projectflow-green transition-colors">Features</a>
            <a href="#why-choose" className="text-gray-600 hover:text-projectflow-green transition-colors">Why Choose Us</a>
            <a href="#pricing" className="text-gray-600 hover:text-projectflow-green transition-colors">Pricing</a>
            <Link to="/login" className="px-6 py-2 text-gray-600 border border-gray-300 rounded-button transition-all hover:bg-gray-50 hover:border-gray-400">
              Login
            </Link>
            <Link to="/login?tab=signup" className="px-6 py-2 bg-projectflow-orange text-white rounded-button transition-all hover:bg-projectflow-orange/90 btn-hover-effect">
              Get Started
            </Link>
          </nav>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 left-0 w-full bg-white shadow-lg md:hidden z-40"
        >
          <div className="flex flex-col p-6 space-y-4">
            <a href="#features" className="text-gray-600 py-2 hover:text-projectflow-green transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#why-choose" className="text-gray-600 py-2 hover:text-projectflow-green transition-colors" onClick={() => setIsMenuOpen(false)}>Why Choose Us</a>
            <a href="#pricing" className="text-gray-600 py-2 hover:text-projectflow-green transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <Link 
              to="/login" 
              className="w-full px-6 py-3 text-center text-gray-600 border border-gray-300 rounded-button transition-all hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/login?tab=signup" 
              className="w-full px-6 py-3 text-center bg-projectflow-orange text-white rounded-button transition-all hover:bg-projectflow-orange/90"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="animate-on-scroll"
            id="hero-text"
          >
            <span className="px-3 py-1 bg-projectflow-green/10 text-projectflow-green rounded-full text-sm font-medium mb-6 inline-block">
              Project Management for Students
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">Manage Student Projects with Ease</h2>
            <p className="text-xl text-gray-600 mb-8">The smart way to organize, track, and collaborate on academic projects. Boost your productivity and achieve better results.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/login?tab=signup" 
                className="px-8 py-3 bg-projectflow-orange text-white text-lg font-semibold rounded-button transition-all hover:bg-projectflow-orange/90 text-center btn-hover-effect"
              >
                Get Started Free
              </Link>
              <a 
                href="#features" 
                className="px-8 py-3 border border-gray-300 text-gray-600 text-lg font-semibold rounded-button transition-all hover:bg-gray-50 hover:border-gray-400 text-center"
              >
                Learn More
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-projectflow-green/5 rounded-2xl transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="ProjectFlow Dashboard"
              className="rounded-lg shadow-2xl relative z-10 transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)]"
              loading="lazy"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-projectflow-orange/10 rounded-full filter blur-2xl z-0"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-projectflow-green/10 rounded-full filter blur-xl z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-projectflow-green/10 text-projectflow-green rounded-full text-sm font-medium mb-3 inline-block"
            >
              Features
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-4"
            >
              Key Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Everything you need to manage your academic projects efficiently and effectively
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg feature-card"
              >
                <div className="w-16 h-16 bg-projectflow-green bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-projectflow-green" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-projectflow-green/10 text-projectflow-green rounded-full text-sm font-medium mb-3 inline-block"
            >
              Benefits
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-4"
            >
              Why Students Choose ProjectFlow
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our platform is designed specifically for academic needs
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto bg-projectflow-green bg-opacity-10 rounded-full flex items-center justify-center mb-6">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-projectflow-green" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Analytics Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white p-8 rounded-2xl shadow-xl mb-16 glass"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">Project Completion Trends</h3>
            <div ref={chartRef} style={{ height: '400px' }} className="w-full"></div>
          </motion.div>

          {/* Testimonials */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute top-0 left-0 w-20 h-20 -mt-10 -ml-10">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.8 46.4C32.8 41.3333 31.4667 37.4667 28.8 34.8C26.1333 32.1333 22.5333 30.8 18 30.8C15.2 30.8 12.6667 31.4667 10.4 32.8C8.13333 34.1333 6.26667 36 4.8 38.4C3.33333 40.8 2.4 43.6 2 46.8C1.6 49.8667 1.6 53.0667 2 56.4C2.4 59.7333 3.33333 62.8 4.8 65.6C6.26667 68.4 8.4 70.6667 11.2 72.4C14 74.1333 17.6 75 22 75L24 67.8C20.6667 67.4 18 66.1333 16 64C14 61.8667 12.8 59.3333 12.4 56.4C17.2 56.4 21.3333 54.9333 24.8 52C28.2667 49.0667 30.6667 45.2 32 40.4H34.4C33.3333 42.5333 32.8 44.5333 32.8 46.4ZM74.8 46.4C74.8 41.3333 73.4667 37.4667 70.8 34.8C68.1333 32.1333 64.5333 30.8 60 30.8C57.2 30.8 54.6667 31.4667 52.4 32.8C50.1333 34.1333 48.2667 36 46.8 38.4C45.3333 40.8 44.4 43.6 44 46.8C43.6 49.8667 43.6 53.0667 44 56.4C44.4 59.7333 45.3333 62.8 46.8 65.6C48.2667 68.4 50.4 70.6667 53.2 72.4C56 74.1333 59.6 75 64 75L66 67.8C62.6667 67.4 60 66.1333 58 64C56 61.8667 54.8 59.3333 54.4 56.4C59.2 56.4 63.3333 54.9333 66.8 52C70.2667 49.0667 72.6667 45.2 74 40.4H76.4C75.3333 42.5333 74.8 44.5333 74.8 46.4Z" fill="rgba(46, 204, 113, 0.1)"/>
                </svg>
              </div>
              
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-10 rounded-xl text-center shadow-lg"
              >
                <p className="text-xl text-gray-600 mb-8 italic">{testimonials[currentTestimonial].text}</p>
                <div>
                  <p className="font-semibold text-lg">{testimonials[currentTestimonial].author}</p>
                  <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
                </div>
              </motion.div>
              
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'bg-projectflow-green scale-125' : 'bg-gray-300'}`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="px-3 py-1 bg-projectflow-green/10 text-projectflow-green rounded-full text-sm font-medium mb-3 inline-block"
            >
              Pricing
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Choose the plan that works best for your needs
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Free",
                price: "$0",
                description: "Perfect for individual students",
                features: [
                  "Up to 3 projects",
                  "Basic task management",
                  "File sharing up to 100MB",
                  "2 team members",
                  "Email support"
                ],
                cta: "Get Started",
                popular: false
              },
              {
                title: "Pro",
                price: "$10",
                period: "/month",
                description: "Great for small teams",
                features: [
                  "Unlimited projects",
                  "Advanced task management",
                  "File sharing up to 10GB",
                  "10 team members",
                  "Priority email support",
                  "Analytics dashboard",
                  "Custom fields"
                ],
                cta: "Get Started",
                popular: true
              },
              {
                title: "Team",
                price: "$29",
                period: "/month",
                description: "Best for larger academic teams",
                features: [
                  "Everything in Pro",
                  "Unlimited team members",
                  "Unlimited storage",
                  "Advanced analytics",
                  "24/7 phone support",
                  "Custom integrations",
                  "Dedicated success manager"
                ],
                cta: "Contact Us",
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-2 border-projectflow-green transform scale-105 z-10 bg-white' : 'bg-white'}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-projectflow-green text-white px-4 py-1 text-sm font-semibold">
                    Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                  <div className="flex items-end mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="w-5 h-5 text-projectflow-green mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/login?tab=signup" 
                    className={`w-full block text-center py-3 rounded-button transition-all ${plan.popular ? 'bg-projectflow-green text-white hover:bg-projectflow-green/90' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <Link to="/" className="text-xl font-bold text-projectflow-green mb-6 inline-block">ProjectFlow</Link>
              <p className="text-gray-600 mb-6">Empowering students to achieve more through smart project management.</p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-projectflow-green transition-colors" aria-label="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-projectflow-green transition-colors" aria-label="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
                <button className="text-gray-400 hover:text-projectflow-green transition-colors" aria-label="GitHub">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Product</h4>
              <ul className="space-y-4">
                <li><a href="#features" className="text-gray-600 hover:text-projectflow-green transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-600 hover:text-projectflow-green transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-projectflow-green transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-600 hover:text-projectflow-green transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-600 hover:text-projectflow-green transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-projectflow-green transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-600 hover:text-projectflow-green transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-projectflow-green transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
              <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates and tips.</p>
              <form onSubmit={handleSubscribe} className="flex">
                <Input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="rounded-r-none focus-visible:ring-projectflow-green"
                />
                <Button
                  type="submit"
                  className="bg-projectflow-green hover:bg-projectflow-green/90 rounded-l-none"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 mb-4 md:mb-0">© 2025 ProjectFlow. All rights reserved.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="text-gray-600 hover:text-projectflow-green transition-colors">Privacy Policy</button>
                <button className="text-gray-600 hover:text-projectflow-green transition-colors">Terms of Service</button>
                <button className="text-gray-600 hover:text-projectflow-green transition-colors">Cookie Policy</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Index;
