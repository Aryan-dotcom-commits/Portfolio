"use client"

import React from "react"
import { useState, useEffect, useRef, useMemo } from "react"
import {
  Code,
  Rocket,
  Mail,
  User,
  Award,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Calendar,
  MapPin,
  Building,
} from "lucide-react"

export default function ProfilePage() {
  const introText = "Hi, I am Aryan Pradhan"
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [typingDone, setTypingDone] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Project data
  const projects = useMemo(() => [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/cover-ecommerce-features-small.webp",
      liveUrl: "#",
      githubUrl: "#",
      status: "In Development",
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with real-time data",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Chart.js"],
      image: "/social-media-dashboard.avif",
      liveUrl: "#",
      githubUrl: "#",
      status: "In Development",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      tech: ["React", "Firebase", "Tailwind", "Socket.io"],
      image: "/task-management-32-1.png",
      liveUrl: "#",
      githubUrl: "#",
      status: "In Development",
    },
    {
      title: "Real-time Chat Application",
      description: "WebSocket-based chat app with rooms, file sharing, and emoji reactions",
      tech: ["Socket.io", "Express", "React", "Redis"],
      image: "/in-app-chat-blog-cover-image.png",
      liveUrl: "#",
      githubUrl: "#",
      status: "In Development",
    },
    {
      title: "AI Content Generator",
      description: "OpenAI-powered content generation tool with custom templates",
      tech: ["OpenAI API", "Next.js", "Prisma", "Stripe"],
      image: "/ai-content-generators.webp",
      liveUrl: "#",
      githubUrl: "#",
      status: "In Development",
    },
    {
      title: "Cryptocurrency Tracker",
      description: "Real-time crypto price tracking with portfolio management features",
      tech: ["React", "CoinGecko API", "Chart.js", "LocalStorage"],
      image: "/ada19906-1d6e-4766-a066-64cc0cd98eaf.png",
      liveUrl: "#",
      githubUrl: "#",
      status: "In Development",
    },
  ], []);

  // Experience data
  const experiences = useMemo(() => [
    {
      company: "Codeyard",
      position: "Junior Full-Stack Developer",
      duration: "2024 - Present",
      location: "Tahachal, Kathmandu",
      description:
        "Led on client maintainance of existing site, creation on wix templates, and collaboration for a dashboard system on MERN.",
      achievements: [
        "Reduced application load time by 40% through code optimization",
        "Led team of 5 developers on major product redesign",
        "Implemented automated testing reducing bugs by 60%",
      ],
      tech: ["React", "Node.js", "AWS", "Docker","MongoDB"],
    },
  ], [])

  // Enhanced section data
  const sections = useMemo(() => [
    {
      title: "About Me",
      subtitle: "Full-Stack Developer & UI/UX Enthusiast",
      content:
        "I'm a passionate developer who loves creating amazing web experiences. With a keen eye for design and a love for clean code, I build applications that are both beautiful and functional. I believe in the power of technology to solve real-world problems.",
      icon: User,
      gradient: "from-slate-900 via-purple-900 to-slate-900",
      accent: "from-blue-400 to-cyan-400",
      skills: ["Problem Solving", "Creative Thinking", "Team Leadership", "Continuous Learning"],
      type: "skills",
      allowScroll: false,
    },
    {
      title: "My Skills",
      subtitle: "Technologies I Love Working With",
      content:
        "I specialize in modern web technologies and frameworks. From frontend magic to backend architecture, I enjoy the full spectrum of development. Always learning, always growing.",
      icon: Code,
      gradient: "from-gray-900 via-gray-800 to-black",
      accent: "from-emerald-400 to-teal-400",
      skills: ["React & Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "MongoDB"],
      type: "skills",
      allowScroll: false,
    },
    {
      title: "Projects",
      subtitle: "Building Digital Experiences",
      content:
        "I've built various applications ranging from e-commerce platforms to social networks. Each project teaches me something new and pushes the boundaries of what's possible on the web.",
      icon: Rocket,
      gradient: "from-neutral-900 via-stone-900 to-neutral-900",
      accent: "from-orange-400 to-red-400",
      data: projects,
      type: "projects",
      allowScroll: true,
    },
    {
      title: "Experience",
      subtitle: "Growing Through Challenges",
      content:
        "7+ months of experience on stage 1 level management, in maintainance of clients, and 2+ months of hands on experience on real-time MERN projects",
      icon: Award,
      gradient: "from-zinc-900 via-slate-800 to-zinc-900",
      accent: "from-violet-400 to-purple-400",
      data: experiences,
      type: "experience",
      allowScroll: true,
    },
    {
      title: "Let's Connect",
      subtitle: "Ready to Build Something Amazing?",
      content:
        "I'm always excited to work on new projects and meet fellow developers. Whether you have a project in mind or just want to chat about tech, feel free to reach out!",
      icon: Mail,
      gradient: "from-black via-gray-900 to-black",
      accent: "from-pink-400 to-rose-400",
      skills: ["Available for Projects", "Open to Collaborations", "Mentoring", "Speaking Opportunities"],
      type: "skills",
      allowScroll: false,
    },
  ], []);

  // Typewriter effect
  useEffect(() => {
    if (index < introText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + introText.charAt(index))
        setIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }

    if (index === introText.length) {
      setTimeout(() => {
        setTypingDone(true)
        setTimeout(() => setCurrentSection(1), 1000)
      }, 1000)
    }
  }, [index, introText.length])

  // Reset scroll position when section changes
  useEffect(() => {
    if (sectionRef.current && sections[currentSection - 1]?.allowScroll) {
      sectionRef.current.scrollTop = 0
    }
  }, [currentSection, sections])

  // Enhanced scroll handler with better logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (currentSection === 0 || isScrolling) return

      const currentSectionData = sections[currentSection - 1]

      // If current section doesn't allow scroll, handle navigation immediately
      if (!currentSectionData?.allowScroll) {
        e.preventDefault()
        setIsScrolling(true)

        if (e.deltaY > 0) {
          if (currentSection < sections.length) {
            setCurrentSection((prev) => prev + 1)
          }
        } else {
          if (currentSection > 1) {
            setCurrentSection((prev) => prev - 1)
          }
        }

        setTimeout(() => setIsScrolling(false), 1000)
        return
      }

      // For scrollable sections, check scroll position with better tolerance
      if (sectionRef.current) {
        const element = sectionRef.current
        const scrollTop = element.scrollTop
        const scrollHeight = element.scrollHeight
        const clientHeight = element.clientHeight

        const isAtTop = scrollTop <= 10
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10

        // Only navigate if we're definitely at the edge and trying to scroll further
        if (e.deltaY > 50 && isAtBottom && currentSection < sections.length) {
          e.preventDefault()
          setIsScrolling(true)
          setCurrentSection((prev) => prev + 1)
          setTimeout(() => setIsScrolling(false), 1000)
        } else if (e.deltaY < -50 && isAtTop && currentSection > 1) {
          e.preventDefault()
          setIsScrolling(true)
          setCurrentSection((prev) => prev - 1)
          setTimeout(() => setIsScrolling(false), 1000)
        }
        // Otherwise, allow normal scrolling within the section
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [currentSection, isScrolling, sections.length, sections])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentSection === 0 || isScrolling) return

      if (e.key === "ArrowRight" && currentSection < sections.length) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev + 1)
        setTimeout(() => setIsScrolling(false), 1000)
      } else if (e.key === "ArrowLeft" && currentSection > 1) {
        setIsScrolling(true)
        setCurrentSection((prev) => prev - 1)
        setTimeout(() => setIsScrolling(false), 1000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection, isScrolling, sections.length])

  return (
    <div className="overflow-hidden relative">
      {/* Minimalistic Background Animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse animation-delay-1000" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse animation-delay-2000" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent opacity-50 animate-fade-in-out" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-50 animate-fade-in-out animation-delay-3000" />
      </div>

      {/* Intro Section */}
      {currentSection === 0 && (
        <section className="flex flex-col items-center justify-center min-h-screen transition-all duration-700 text-center relative z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
          <div
            className={`relative z-20 transition-all duration-700 ease-in-out ${
              typingDone ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
          >
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-white to-gray-100 p-0.5 animate-gentle-pulse">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-light mb-6 text-white tracking-wide">Hi There</h1>
            <div className="relative">
              <span className="text-xl md:text-2xl text-white bg-white/5 backdrop-blur-sm px-8 py-4 rounded-full border border-white/10 shadow-2xl font-light tracking-wide">
                {text}
                <span className="animate-pulse text-blue-400">|</span>
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Main Sections */}
      {currentSection > 0 && currentSection <= sections.length && (
        <section
          ref={sectionRef}
          className={`transition-all duration-700 text-center relative z-10 ${
            sections[currentSection - 1]?.allowScroll
              ? "h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
              : "flex flex-col items-center justify-center min-h-screen"
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${sections[currentSection - 1].gradient}`} />

          <div
            className={`relative z-20 mx-auto px-6 transition-all duration-700 ease-in-out opacity-100 scale-100 transform ${
              sections[currentSection - 1]?.allowScroll ? "max-w-7xl py-20" : "max-w-7xl"
            }`}
          >
            {/* Icon */}
            <div className="mb-12 flex justify-center">
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-r ${sections[currentSection - 1].accent} p-0.5 animate-gentle-pulse`}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  {React.createElement(sections[currentSection - 1].icon, {
                    className: "w-8 h-8 text-white",
                  })}
                </div>
              </div>
            </div>

            {/* Title and Subtitle */}
            <h2 className="text-4xl md:text-6xl font-light mb-4 text-white tracking-wide animate-slide-up">
              {sections[currentSection - 1].title}
            </h2>
            <h3
              className={`text-lg md:text-xl bg-gradient-to-r ${sections[currentSection - 1].accent} bg-clip-text text-transparent mb-12 animate-slide-up animation-delay-200 font-medium tracking-wide`}
            >
              {sections[currentSection - 1].subtitle}
            </h3>

            {/* Content */}
            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-16 animate-slide-up animation-delay-400 font-light">
              {sections[currentSection - 1].content}
            </p>

            {/* Dynamic Content Based on Section Type */}
            {sections[currentSection - 1].type === "skills" && sections[currentSection - 1].skills && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
                {sections[currentSection - 1].skills?.map((skill, idx) => (
                  <div
                    key={skill}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 animate-slide-up"
                    style={{ animationDelay: `${600 + idx * 100}ms` }}
                  >
                    <span className="text-sm md:text-base font-light text-gray-200 tracking-wide">{skill}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Projects Cards */}
            {sections[currentSection - 1].type === "projects" && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {projects.map((project, idx) => (
                  <div
                    key={project.title}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 animate-slide-up group"
                    style={{ animationDelay: `${600 + idx * 200}ms` }}
                  >
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    
                    </div>

                    <h4 className="text-xl font-medium text-white mb-2">{project.title}</h4>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <a
                        href={project.liveUrl}
                        className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>

                       <div
                        className={`absolute bottom-5 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === "Live"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        }`}
                      >
                        {project.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Experience Cards */}
            {sections[currentSection - 1].type === "experience" && (
              <div className="space-y-6 mb-16 max-w-4xl mx-auto">
                {experiences.map((exp, idx) => (
                  <div
                    key={exp.company}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 animate-slide-up"
                    style={{ animationDelay: `${600 + idx * 200}ms` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-medium text-white mb-1">{exp.position}</h4>
                        <div className="flex items-center gap-2 text-gray-300 mb-2">
                          <Building className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end text-sm text-gray-400">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-white mb-2">Key Achievements:</h5>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Social Links for Contact Section */}
            {currentSection === sections.length && (
              <div className="flex justify-center space-x-6 mb-8">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Mail, href: "#", label: "Email" },
                ].map(({ icon: Icon, href, label }, idx) => (
                  <a
                    key={label}
                    href={href}
                    className="w-12 h-12 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${800 + idx * 100}ms` }}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-gray-300" />
                  </a>
                ))}
              </div>
            )}

            {/* Scroll indicator for scrollable sections */}
            {sections[currentSection - 1]?.allowScroll && (
              <div className="fixed bottom-24 right-8 text-gray-400 text-sm bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
                Scroll to explore • Reach bottom to continue
              </div>
            )}
          </div>

          {/* Rounded Navigation Indicators */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 z-30">
            <div className="flex space-x-2">
              {sections.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isScrolling) {
                      setIsScrolling(true)
                      setCurrentSection(idx + 1)
                      setTimeout(() => setIsScrolling(false), 1000)
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx + 1 === currentSection ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scroll Hint */}
          {currentSection === 1 && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 animate-gentle-bounce z-30">
              <p className="text-xs text-gray-400 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 font-light tracking-wide">
                Scroll or use arrow keys
              </p>
            </div>
          )}
        </section>
      )}

      {/* End Section */}
      {currentSection > sections.length && (
        <section className="flex flex-col items-center justify-center min-h-screen transition-all duration-700 text-center relative z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="relative z-20 transition-all duration-700 ease-in-out opacity-100 scale-100">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-400 to-blue-400 p-0.5 animate-gentle-pulse">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-light mb-6 text-white tracking-wide">Thank You!</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              You&apos;ve reached the end of my profile. Ready to start something amazing together?
            </p>
            <button
              onClick={() => setCurrentSection(1)}
              className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 font-light tracking-wide"
            >
              Explore Again
            </button>
          </div>
        </section>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gentle-pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes gentle-bounce {
          0%, 100% { 
            transform: translateY(0);
          }
          50% { 
            transform: translateY(-5px);
          }
        }
        
        @keyframes fade-in-out {
          0%, 100% { 
            opacity: 0.3;
          }
          50% { 
            opacity: 0.7;
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-gentle-pulse {
          animation: gentle-pulse 4s ease-in-out infinite;
        }
        
        .animate-gentle-bounce {
          animation: gentle-bounce 2s ease-in-out infinite;
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 8s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        
        .animation-delay-3000 {
          animation-delay: 3000ms;
        }
        
        /* Custom scrollbar styles */
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        
        .scrollbar-thumb-white\/20::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
        }
        
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </div>
  )
}
