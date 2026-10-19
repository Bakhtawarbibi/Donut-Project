import "./App.css";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import icon from "./assets/icon.png";
import pink from "./assets/pink.png";
import blue from "./assets/blue.png";
import brown from "./assets/brown.png";

const donuts = [
  {
    id: "strawberry",
    name: "Strawberry",
    desc: "Raised ring donut with strawberry frosting and colorful round sprinkles.",
    color: "#e2a6b1",
    accent: "#dd266f",
    shadow: "0 20px 90px rgba(221, 38, 111, 0.45)",
    size: "600px",
    image: pink,
  },
  {
    id: "chocolate",
    name: "Chocolate",
    desc: "Raised ring donut with chocolate frosting and colorful round sprinkles.",
    color: "#d3a57b",
    accent: "#422218",
    shadow: "0 20px 100px rgba(66, 34, 24, 0.65)",
    size: "600px",
    image: brown,
  },
  {
    id: "blueberry",
    name: "Blueberry",
    desc: "Raised ring donut with blueberry frosting and colorful round sprinkles.",
    color: "#a8d8ea",
    accent: "#2a7fff",
    shadow: "0 20px 90px rgba(42, 127, 255, 0.5)",
    size: "550px",
    image: blue,
  },
];

export default function DonutHero() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const container = useRef(null);
  const bigDonutRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);
  const menuRef = useRef(null);
  const isAnimating = useRef(false);

  // Navbar icon animation
  useGSAP(() => {
    gsap.fromTo(
      iconRef.current,
      {
        opacity: 0,
        scale: 0.4,
        rotation: -180,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      }
    );

    gsap.to(iconRef.current, {
      y: -5,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.2,
    });
  }, []);

  // Mobile menu animation
  useGSAP(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }
  }, [menuOpen]);

  // Change donut with GSAP
  const changeDonut = (index) => {
    if (index === active || isAnimating.current) return;

    isAnimating.current = true;

    const next = donuts[index];
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    tl.to(textRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.04,
      duration: 0.3,
      ease: "power2.in",
    })
      .to(
        bigDonutRef.current,
        {
          scale: 0.5,
          rotation: -90,
          y: 70,
          opacity: 0,
          duration: 0.45,
          ease: "power3.in",
        },
        "<"
      )
      .to(
        container.current,
        {
          backgroundColor: next.color,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "<"
      )
      .add(() => {
        setActive(index);
      })
      .fromTo(
        bigDonutRef.current,
        {
          scale: 0.5,
          rotation: 90,
          y: -70,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
        }
      )
      .fromTo(
        textRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.45,
          ease: "power3.out",
        },
        "-=0.4"
      );
  };

  const current = donuts[active];

  return (
    <div
      ref={container}
      className="donut-page"
      style={{ backgroundColor: current.color }}
    >
      {/* Navbar */}
      <header className="navbar">
        <nav className="nav-inner">
          <a href="#home" className="logo-link" aria-label="Donut home">
            <img
              ref={iconRef}
              src={icon}
              alt="Donut logo"
              className="logo"
            />
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <ul
            ref={menuRef}
            className={`nav-links ${menuOpen ? "menu-open" : ""}`}
          >
            <li>
              <a href="#home" onClick={() => setMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#menu" onClick={() => setMenuOpen(false)}>
                Menu
              </a>
            </li>
            <li>
              <a href="#story" onClick={() => setMenuOpen(false)}>
                Our Story
              </a>
            </li>
          </ul>

          <a href="#contact" className="contact-btn">
            Contact Us
          </a>
        </nav>
      </header>

      {/* Hero section */}
      <main className="hero" id="home">
        <section className="hero-content" ref={textRef}>
          <p className="eyebrow">Fresh • Sweet • Delicious</p>

          <h1>
            {current.name}
            <br />
            Donut<span className="pink-dot">.</span>
          </h1>

          <p className="description">{current.desc}</p>

          <div className="hero-buttons">
            <a
              href="#contact"
              className="order-btn"
              style={{ backgroundColor: current.accent }}
            >
              Order Now <span>→</span>
            </a>

            <a href="#menu" className="menu-btn">
              View Menu
            </a>
          </div>

          {/* Donut selectors */}
          <div className="donut-selectors" id="menu">
            <p className="selector-label">CHOOSE YOUR FLAVOR</p>

            <div className="selector-list">
              {donuts.map((donut, index) => (
                <button
                  key={donut.id}
                  onClick={() => changeDonut(index)}
                  className={`donut-option ${
                    index === active ? "selected" : ""
                  }`}
                  aria-label={`Select ${donut.name} donut`}
                  aria-pressed={index === active}
                >
                  <img src={donut.image} alt="" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main donut image */}
        <div className="donut-visual">
          <div
            className="donut-glow"
            style={{
              backgroundColor: current.accent,
              opacity: 0.2,
            }}
          />

          <img
            ref={bigDonutRef}
            src={current.image}
            alt={`${current.name} donut`}
            className="main-donut"
            style={{
              width: current.size,
              height: current.size,
              filter: `drop-shadow(${current.shadow})`,
            }}
          />

          <span className="floating-star star-one">✦</span>
          <span className="floating-star star-two">✧</span>
          <span className="floating-star star-three">✦</span>
        </div>
      </main>

      {/* Bottom text */}
      <footer className="page-footer" id="story">
        <p>MADE WITH LOVE & SPRINKLES</p>
        <p>Every bite is a little happiness ♡</p>
      </footer>

      <div id="contact" />
    </div>
  );
}

