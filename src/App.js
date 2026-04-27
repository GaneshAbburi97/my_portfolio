import './App.css';
import { useState, useEffect, useRef } from 'react';

// FIX 1: Moved roles outside the component so it doesn't trigger the useEffect dependency warning
const roles = ['Web Developer', 'AI Enthusiast', 'React Developer', 'Problem Solver'];

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  
  const roleIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    const lag = setInterval(() => {
      setCursorPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15,
      }));
    }, 16);
    return () => clearInterval(lag);
  }, [mousePos]);

  useEffect(() => {
    const tick = () => {
      const current = roles[roleIndex.current];
      if (isDeleting.current) {
        charIndex.current--;
        setTypedText(current.substring(0, charIndex.current));
        if (charIndex.current === 0) {
          isDeleting.current = false;
          roleIndex.current = (roleIndex.current + 1) % roles.length;
        }
      } else {
        charIndex.current++;
        setTypedText(current.substring(0, charIndex.current));
        if (charIndex.current === current.length) {
          isDeleting.current = true;
        }
      }
    };
    const delay = isDeleting.current ? 55 : charIndex.current === roles[roleIndex.current]?.length ? 1500 : 100;
    const t = setTimeout(tick, delay);
    return () => clearTimeout(t);
  }, [typedText]);

  useEffect(() => {
    const handler = () => {
      ['home','about','skills','projects','contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(id);
        }
      });
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const skills = [
    { icon: '⚛️', name: 'React', tags: ['Hooks', 'Context', 'Redux'] },
    { icon: '⚡', name: 'JavaScript', tags: ['ES6+', 'Async/Await', 'DOM'] },
    { icon: '🐍', name: 'Python', tags: ['ML', 'FastAPI', 'NumPy'] },
    { icon: '☕', name: 'Java', tags: ['Spring', 'Hibernate'] },
    { icon: '🧠', name: 'AI / ML', tags: ['TensorFlow', 'OpenAI', 'LangChain'] },
    { icon: '🎨', name: 'UI / CSS', tags: ['Tailwind', 'SASS', 'Animations'] },
    { icon: '🗄️', name: 'Backend', tags: ['Node.js', 'REST APIs', 'SQL'] },
  ];

  const projects = [
    { num: '01', title: 'MaxiRelief', desc: 'A Patient-Centered Digital Therapeutic System for Temporomandibular Disorder.', stack: ['HTML', 'CSS','JavaScript', 'Three.js'] },
    { num: '02', title: 'Portfolio Builder', desc: 'Drag-and-drop portfolio generator with live preview, custom themes, and one-click Vercel deployment.', stack: ['React', 'TypeScript', 'Vercel'] },
    { num: '03', title: 'UI-UX Design', desc: 'User interface and user experience design for web and mobile applications.', stack: ['Figma', 'JavaScript', 'CSS'] },
    { num: '04', title: 'Dev Dashboard', desc: 'Unified developer productivity hub — GitHub activity, Jira tickets, and standup notes in one clean view.', stack: ['React', 'GitHub API', 'REST'] },
  ];

  return (
    <div className="portfolio">
      <div className="cursor-dot" style={{ left: mousePos.x, top: mousePos.y }} />
      <div className="cursor-ring" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div className="bg-noise" />
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-grid" />

      {/* NAV */}
      <nav className="navbar">
        <div className="nav-inner">
          <span className="nav-logo">GA<span className="accent">.</span></span>
          <ul className="nav-links">
            {['home','about','skills','projects','contact'].map(s => (
              <li key={s}>
                <button className={`nav-btn ${activeSection === s ? 'active' : ''}`} onClick={() => scrollTo(s)}>
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <span className="hero-label"><span className="label-line" />Available for work</span>
              <h1>
                <span className="h1-line anim-1">Hey, I'm</span>
                <span className="h1-line h1-name anim-2">Ganesh</span>
                <span className="h1-line h1-name h1-accent anim-3">Abburi</span>
              </h1>
              <p className="hero-role">
                <span className="role-text">{typedText}</span>
                <span className="cursor-blink">|</span>
              </p>
              <p className="hero-desc anim-4">
                I build performant web experiences and explore the cutting edge of AI —
                turning complex ideas into clean, intuitive products.
              </p>
              <div className="hero-cta anim-5">
                <button className="btn btn-primary" onClick={() => scrollTo('projects')}>View Projects <span>→</span></button>
                <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>Get in Touch</button>
              </div>
            </div>
            <div className="hero-right anim-4">
              <div className="hero-card">
                <div className="card-glow" />
                <div className="avatar-area">
                  <img src="/profile.jpg" alt="Profile" className="avatar-image" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                  <div className="status-pill">
                    <span className="status-dot" />Open to opportunities
                  </div>
                </div>
                <div className="card-info">
                  <div className="card-row"><span className="card-label">Location</span><span className="card-val">India 🇮🇳</span></div>
                  <div className="card-row"><span className="card-label">Focus</span><span className="card-val">Web + AI</span></div>
                  <div className="card-row"><span className="card-label">Stack</span><span className="card-val">React · Python</span></div>
                </div>
              </div>
              <div className="float-badge b1">⚛️ React</div>
              <div className="float-badge b2">🤖 AI/ML</div>
              <div className="float-badge b3">🐍 Python</div>
            </div>
          </div>
          <div className="stats-row anim-5">
            {[['2+','Years Exp'],['15+','Projects Built'],['10+','Tech Stack'],['100%','Passion']].map(([n,l]) => (
              <div key={l} className="stat">
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div>
              {/* FIX 2: Wrapped text-comments in {""} */}
              <span className="section-tag">{"// about me"}</span>
              <h2>Building the <span className="accent">future</span>,<br />one commit at a time.</h2>
              <div className="divider" />
            </div>
            <div className="about-body">
              <p>I'm Ganesh Abburi — a web developer and AI enthusiast who loves crafting clean, meaningful digital experiences. I bridge the gap between design and engineering, bringing both creativity and technical depth to every project.</p>
              <p>When I'm not coding, I'm experimenting with language models, studying AI research, or contributing to open source. I believe the best software feels invisible — it just works, beautifully.</p>
              <div className="about-tags">
                {['React','Next.js','Python','TensorFlow','Node.js','TypeScript','REST APIs','Git'].map(t => (
                  <span key={t} className="about-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{"// skills"}</span>
            <h2>What I <span className="accent">work with</span></h2>
            <div className="divider" />
          </div>
          <div className="skills-grid">
            {skills.map(s => (
              <div key={s.name} className="skill-card">
                <span className="skill-icon">{s.icon}</span>
                <h3 className="skill-name">{s.name}</h3>
                <div className="skill-tags">
                  {s.tags.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">{"// projects"}</span>
            <h2>Selected <span className="accent">work</span></h2>
            <div className="divider" />
          </div>
          <div className="projects-grid">
            {projects.map(p => (
              <div key={p.num} className="project-card">
                <span className="proj-arrow">↗</span>
                <span className="proj-num">{p.num}</span>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-stack">
                  {p.stack.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-wrap">
            <span className="section-tag">{"// contact"}</span>
            <h2>Let's <span className="accent">connect</span></h2>
            <div className="divider" />
            <p className="contact-sub">Have a project in mind or want to collaborate? I'd love to hear from you.</p>
            <a href="mailto:ganeshabburi97@gmail.com" className="contact-email">ganeshabburi97@gmail.com <span>→</span></a>
            <div className="socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
              <span className="sep">·</span>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
              <span className="sep">·</span>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">Twitter</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <span className="nav-logo">Eren Yeager<span className="accent">.</span></span>
            <span className="footer-copy">© 2026 Ganesh Abburi. Built with React.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;