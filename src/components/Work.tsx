import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { createPortal } from "react-dom";

gsap.registerPlugin(useGSAP);

const myProjects = [
  {
    name: "ATHLENTIQ",
    category: "Mobile App / AI-Powered Fitness",
    tools: "Android Studio, Kotlin, Java, Google MediaPipe, XML",
    image: "/images/athlentiq_cover.png",
    link: "https://github.com/vinothmp21102005/KSSEM-HIO25-065-athlentiq",
    problemStatement: "Athletes and fitness enthusiasts lack real-time, AI-driven feedback on their exercise form and posture, leading to injuries, inefficient workouts, and slow progress without access to a personal trainer.",
    objective: "To build an intelligent mobile application that leverages Google MediaPipe's pose estimation to provide real-time body tracking, form correction, and performance analytics for athletes.",
    systemOverview: "A native Android mobile application built with Kotlin and Java in Android Studio, utilizing Google MediaPipe's pose landmark detection to track body movements in real-time via the device camera. The app analyzes exercise form, counts repetitions, and provides instant visual feedback overlays.",
    features: ["Real-time pose estimation via Google MediaPipe", "Exercise form analysis and correction", "Rep counting and workout tracking", "Visual skeleton overlay and feedback"],
    results: "Successfully demonstrates real-time pose detection and exercise tracking on Android devices, providing accurate form feedback that enhances workout quality without needing a personal trainer."
  },
  {
    name: "ECONAV",
    category: "Smart Route Optimization System",
    tools: "Node.js, JavaScript, APIs",
    image: "/images/econav_cover.png",
    link: "https://github.com/vinothmp21102005/marine-matrix",
    problemStatement: "Marine transportation consumes significant fuel due to inefficient route planning, leading to increased operational costs and environmental impact.",
    objective: "To optimize marine routes using data-driven intelligence to reduce fuel consumption, emissions, and travel time.",
    systemOverview: "A smart route optimization system that analyzes maritime parameters such as distance, traffic, and environmental conditions to recommend fuel-efficient navigation paths.",
    features: ["Route optimization", "Fuel consumption estimation", "Environmental impact reduction analysis", "Decision-support dashboard"],
    results: "Demonstrates measurable improvements in route efficiency and fuel savings under simulated conditions."
  },
  {
    name: "FLOOD GUARD",
    category: "Flood Warning & Alert System",
    tools: "Python, JavaScript",
    image: "/images/floodguard_cover.png",
    link: "https://github.com/sanjitp-23/Floodguard",
    problemStatement: "Flood disasters cause severe damage due to lack of early detection and timely alerts, especially in vulnerable regions.",
    objective: "To provide an intelligent flood monitoring and alerting system using predictive analysis.",
    systemOverview: "The system collects environmental data and applies threshold-based and predictive logic to detect flood risks and issue alerts.",
    features: ["Flood risk detection", "Early warning alerts", "Environmental data analysis", "Dashboard visualization"],
    results: "Successfully identifies potential flood conditions and generates timely alerts for disaster management."
  },
  {
    name: "TAXONOMIST",
    category: "NLP/AI Classification",
    tools: "Python, NLP",
    image: "/images/taxonomist_cover.png",
    link: "https://github.com/sanjitp-23/taxonomist",
    problemStatement: "Manual classification of data is time-consuming and error-prone in large-scale systems.",
    objective: "To automate classification and taxonomy generation using intelligent data processing.",
    systemOverview: "Provides automated categorization of datasets using structured classification logic and NLP techniques.",
    features: ["Automated classification", "Dynamic taxonomy creation", "Scalable data processing", "Text similarity measures"],
    results: "Reduces manual effort by accurately auto-categorizing complex data architectures."
  },
  {
    name: "ECO-SUSTAIN",
    category: "Sustainability Dashboard",
    tools: "AI Insights",
    image: "/images/ecosustain_cover.png",
    link: "https://github.com/sanjitp-23/AMITY-78-SUSTAIN-AI-THON",
    problemStatement: "Lack of intelligent systems to monitor and promote sustainable practices.",
    objective: "To encourage sustainability using AI-driven insights and monitoring.",
    systemOverview: "ECO-SUSTAIN tracks sustainability metrics and provides actionable recommendations for green initiatives.",
    features: ["Sustainability monitoring", "AI-based insights", "Awareness dashboards"],
    results: "Effectively monitors metrics to provide users with actionable intelligence for sustainable practices."
  },
  {
    name: "SPORTS",
    category: "Full Stack Web Hub",
    tools: "HTML, CSS, JS, Java, Node.js",
    image: "/images/sports_cover.png",
    link: "https://github.com/sanjitp-23/SPORT_MINI_PROJECT",
    problemStatement: "Enthusiasts struggle to find a centralized platform that combines tournaments, skill development, and networking. Existing solutions are fragmented.",
    objective: "To develop a unified digital platform connecting players, organizers, and institutions for easy access to sports opportunities.",
    systemOverview: "A centralized hub for sports activities allowing users to explore tournaments, register for events, and interact with the community.",
    features: ["Tournament discovery and registration", "Skill development resources", "User profile management", "Community interaction"],
    results: "Successfully demonstrates a functional prototype capable of managing sports-related information, reducing manual effort."
  },
  {
    name: "ATTENDX",
    category: "Management System",
    tools: "HTML, CSS, JS, Python, Node.js",
    image: "/images/attendx_cover.png",
    link: "https://github.com/vinothmp21102005/attendx",
    problemStatement: "Conventional attendance systems are manual, time-consuming, error-prone, and susceptible to proxy attendance.",
    objective: "To develop a smart and reliable attendance management system automating records while ensuring accuracy and transparency.",
    systemOverview: "A digital attendance tracking system enabling secure marking, systematic record storage, and efficient data retrieval.",
    features: ["Digital attendance marking", "Secure user authentication", "Attendance history and reporting", "Centralized data management"],
    results: "Significantly improves attendance accuracy and reduces administrative workload compared to manual systems."
  },
  {
    name: "Focus Flow",
    category: "Operations Optimizer",
    tools: "React.js, Next.js, LangChain, Python",
    image: "/images/focusflow_cover.png",
    link: "https://github.com/sanjitp-23/smart-focus-planner",
    problemStatement: "Small businesses struggle to organize daily tasks, prioritize urgent work, and keep distractions at bay without deep technical setups.",
    objective: "To use advanced AI to detect, explain, and automatically resolve operational bottlenecks in real-time.",
    systemOverview: "An AI-powered operations optimizer that not only automates workflows but also proactively detects and resolves bottlenecks.",
    features: ["Live Bottleneck Detection", "Conversational Workflow Mapping", "Root Cause Explanations", "Auto-Generated Automations"],
    results: "Combines intelligent detection and instant automation to revolutionize operational efficiency."
  },
  {
    name: "Stream Fix",
    category: "AI-Driven OTT Testing",
    tools: "Python, TensorFlow, React, FastAPI",
    image: "/images/streamfix_cover.png",
    link: "https://github.com/Karthickraja23006120/StreamFIX",
    problemStatement: "OTT platforms face massive device fragmentation and UI changes, making traditional testing slow and brittle.",
    objective: "To automate, optimize, and enhance end-to-end testing using an AI-driven testing framework.",
    systemOverview: "An AI-driven automated platform handling OTT complexities. Continuously analyzes UIs using CV and ML to adapt test cases automatically.",
    features: ["AI-generated test cases", "Self-healing test scripts", "Deep-learning visual regression detection", "Predictive test optimization"],
    results: "Enables faster releases, higher accuracy, reduced maintenance, and improved streaming quality."
  }
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flexRef = useRef<HTMLDivElement>(null);

  // Allow scrolling so every project can be fully visible (last project can be first in view)
  const maxIndex = myProjects.length - 1;

  const goNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  // Keyboard arrow support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedProject) return; // Don't navigate when modal is open
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev, selectedProject]);

  // Calculate the CSS transform offset
  const getBoxWidth = () => {
    if (window.innerWidth <= 900) return 350;
    if (window.innerWidth <= 1400) return 450;
    return 600;
  };

  const translateX = -(currentIndex * getBoxWidth());

  // Scroll entrance animation
  useGSAP(() => {
    // Parallax background text
    gsap.to(".work-bg-text", {
      x: -300,
      scrollTrigger: {
        trigger: ".work-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Marquee animation
    gsap.to(".work-marquee-inner", {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "none",
    });

    gsap.fromTo(".work-header", 
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-section",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    gsap.fromTo(".work-slider-viewport", 
      { opacity: 0, y: 80 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2,
        scrollTrigger: {
          trigger: ".work-section",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    gsap.fromTo(".work-dots", 
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4,
        scrollTrigger: {
          trigger: ".work-section",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );

    // Staggered entrance for work boxes
    gsap.fromTo(".work-box",
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-slider-viewport",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-bg-text">PROJECTS</div>

      {selectedProject && createPortal(
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={e => e.stopPropagation()}>
            <div className="project-modal-glow"></div>
            
            <div className="modal-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="modal-border2">
              <svg width="100%">
                <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
                <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              </svg>
            </div>

            <button 
              className="close-modal" 
              style={{ zIndex: 9999 }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(null);
              }}
            >
              <MdClose />
            </button>

            <div className="project-modal-content">
              <h2 className="modal-title">{selectedProject.name.split(' — ')[0]}</h2>
              
              <h4 className="modal-subtitle">Description</h4>
              <p className="modal-desc">{selectedProject.problemStatement}</p>
              <p className="modal-desc">{selectedProject.systemOverview}</p>

              <h4 className="modal-subtitle">Skillset & tools</h4>
              <div className="modal-tags-container">
                {selectedProject.tools.split(',').map((t: string, i: number) => <div className="what-tags" key={i}>{t.trim()}</div>)}
                {selectedProject.features.map((f: string, i: number) => <div className="what-tags" key={'f'+i}>{f}</div>)}
              </div>
              
              <div style={{ marginTop: '50px' }}>
                <a href={selectedProject.link} target="_blank" rel="noreferrer" className="modal-github-btn">
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            MY <span>WORKS</span>
          </h2>
          <div className="work-nav">
            <span className="work-counter">{String(currentIndex + 1).padStart(2, '0')} / {String(myProjects.length).padStart(2, '0')}</span>
            <button
              className="work-arrow"
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="Previous project"
              data-cursor="disable"
            >
              <MdChevronLeft />
            </button>
            <button
              className="work-arrow"
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next project"
              data-cursor="disable"
            >
              <MdChevronRight />
            </button>
          </div>
        </div>
        <div className="work-slider-viewport">
          <div
            className="work-flex"
            ref={flexRef}
            style={{ transform: `translateX(${translateX}px)`, transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
          >
            {myProjects.map((project, index) => (
              <div className="work-box" key={index} onClick={() => setSelectedProject(project)} style={{ cursor: "pointer" }}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>

                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                </div>
                <WorkImage image={project.image} alt={project.name} />
              </div>
            ))}
          </div>
        </div>
        <div className="work-dots">
          {myProjects.map((_, i) => (
            <button
              key={i}
              className={`work-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(Math.min(i, maxIndex))}
              aria-label={`Go to project ${i + 1}`}
              data-cursor="disable"
            />
          ))}
        </div>
      </div>

      <div className="work-marquee">
        <div className="work-marquee-inner">
          <span>THE TECH STACK — INNOVATING THE FUTURE — CRAFTING WITH PRECISION — THE TECH STACK — INNOVATING THE FUTURE — CRAFTING WITH PRECISION — </span>
          <span>THE TECH STACK — INNOVATING THE FUTURE — CRAFTING WITH PRECISION — THE TECH STACK — INNOVATING THE FUTURE — CRAFTING WITH PRECISION — </span>
        </div>
      </div>
    </div>
  );
};

export default Work;
