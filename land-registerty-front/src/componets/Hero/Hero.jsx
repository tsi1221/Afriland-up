import React from 'react';
import './Hero.css';
import logo from '../../assets/image.png';
import Body from '../body/Body';
import Customer from '../custemerssay/Custemer';
import Footer from '../footer/Footer';

const CheckCircle = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const Hero = () => {
  const solutions = [
    'DIDs and inspectors enable secure mobile ownership.',
    'Fraud detection via Cardano.',
    'Cardano enables low-cost permanent ownership.',
    'Afriland automates fast, secure remote transactions.',
  ];

  return (
    <section className="hero-section">
      <header className="hero-header">
        <nav className="navbar">
          <div className="logo-container">
            <img src={logo} alt="Afriland Logo" className="logo" />
            <span className='logoname'>Afriland</span>
          </div>
          <div className="wallet-button-container">
            <button className="wallet-button">Connect Wallet</button>
          </div>
        </nav>
      </header>

      <h2 className="hero-headline">
        Secure Land Registry Empowering African Communities via{' '}
        <span className="highlight">Cardano</span>.
      </h2>

      {/* <p className="hero-subheading">
        Building trust and prosperity through <strong>decentralized</strong> and{' '}
        <strong>immutable</strong> land ownership records on the blockchain.
      </p> */}

      <div className="solution-grid">
        {solutions.map((solution, index) => (
          <div key={index} className="solution-card">
            <CheckCircle className="solution-icon" />
            <p className="solution-text">{solution}</p>
          </div>
        ))}
      </div>
    <div className=""><Body/></div>
    <div className="customer"><Customer/></div>
    <div className="footer">< Footer/></div>
    </section>
  );
};

export default Hero;