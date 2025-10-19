import React, { useState, useEffect, useCallback } from "react";
import "./Custemer.css";

// Inline SVG icons (no external dependency)
const ChevronLeft = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const testimonials = [
  {
    id: 1,
    quote:
      "Working with this team has been a complete game-changer. Their professionalism and consistency exceeded our expectations!",
    name: "Anya Sharma",
    role: "Product Designer",
    image: "https://placehold.co/100x100/10b981/ffffff?text=AS",
  },
  {
    id: 2,
    quote:
      "The customer service is phenomenal. Quick response and genuine care for user success. Highly recommended!",
    name: "Ben Carter",
    role: "Business Owner",
    image: "https://placehold.co/100x100/3b82f6/ffffff?text=BC",
  },
  {
    id: 3,
    quote:
      "We've seen huge engagement improvement. The interface is intuitive and beautifully responsive across devices.",
    name: "Chloe Davis",
    role: "Marketing Director",
    image: "https://placehold.co/100x100/f59e0b/ffffff?text=CD",
  },
  {
    id: 4,
    quote:
      "Their innovative solutions helped us automate and scale our workflow. Incredible product and team!",
    name: "Daniel Lee",
    role: "Software Engineer",
    image: "https://placehold.co/100x100/ef4444/ffffff?text=DL",
  },
  {
    id: 5,
    quote:
      "We love the simplicity and power of this platform. It just works perfectly for our business needs.",
    name: "Evelyn Chen",
    role: "Project Manager",
    image: "https://placehold.co/100x100/a855f7/ffffff?text=EC",
  },
  {
    id: 6,
    quote:
      "A top-tier experience. Everything from onboarding to customer support was flawless and efficient.",
    name: "Frank Johnson",
    role: "Tech Founder",
    image: "https://placehold.co/100x100/f97316/ffffff?text=FJ",
  },
];

const Customer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 3) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 3 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(next, 10000);
    return () => clearInterval(autoSlide);
  }, [next]);

  const visibleCards = testimonials.slice(currentIndex, currentIndex + 3);
  if (visibleCards.length < 3) {
    visibleCards.push(...testimonials.slice(0, 3 - visibleCards.length));
  }

  return (
    <section className="customer-section">
      <div className="customer-header">
        <h2>
          What Our <span>Customers Say</span>
        </h2>
        <p>Real stories from people who trust and love our platform.</p>
      </div>

      <div className="carousel-container">
        <button className="arrow-btn left" onClick={prev}>
          <ChevronLeft />
        </button>

        <div className="card-wrapper">
          {visibleCards.map((t) => (
            <div key={t.id} className="testimonial-card">
              <img src={t.image} alt={t.name} />
              <p className="quote">“{t.quote}”</p>
              <h4>{t.name}</h4>
              <p className="role">{t.role}</p>
            </div>
          ))}
        </div>

        <button className="arrow-btn right" onClick={next}>
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Customer;
