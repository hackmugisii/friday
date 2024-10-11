import React, { useEffect, useState } from 'react';
import './App.css';
import { AuthClient } from "@dfinity/auth-client";
import { backend } from './declarations/backend';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [treeType, setTreeType] = useState('');
  const [growthStage, setGrowthStage] = useState('');
  const [co2Prediction, setCo2Prediction] = useState(null);
  const [credits, setCredits] = useState(null); // State for credits

  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const login = async () => {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        checkAuth();
      },
    });
  };

  const checkAuth = async () => {
    try {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Error on check auth ", error);
    }
  };

  const logout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data = { treeType, growthStage };

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setCo2Prediction(result.co2Prediction);
      setCredits(result.credits); // Set credits from response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <h2>EcoLedger</h2>
        </div>
        <ul className="nav-links">
          <li><a onClick={() => scrollToSection('home')}>Home</a></li>
          <li><a onClick={() => scrollToSection('about')}>About</a></li>
          <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
        </ul>
        {isAuthenticated && (
          <button className="logout-button" onClick={logout}>Logout</button>
        )}
      </nav>

      <section id="home" className="section home-section">
        <h1>Welcome to EcoLedger</h1>
        <p>Tracking carbon credits with AI and Blockchain</p>
        <button className="start-button" onClick={isAuthenticated ? logout : login}>
          {isAuthenticated ? 'Logout' : 'Get Started'}
        </button>
      </section>
      <section id="about" className="section about-section">
  <h2>About Us</h2>
  <div className="about-container">
    <div className="about-item mission">
      <div className="about-text">
        <h3>Our Mission</h3>
        <p>We aim to create a sustainable future by leveraging technology to track and offset carbon footprints.</p>
      </div>
      <div className="about-image" style={{ backgroundImage: 'url(/images/image1.jpg)' }}></div>
    </div>

    <div className="about-item blockchain reverse">
      <div className="about-image" style={{ backgroundImage: 'url(/images/image2.jpg)' }}></div>
      <div className="about-text">
        <h3>Blockchain Technology</h3>
        <p>Our platform uses blockchain to ensure transparency and efficiency in carbon credit tracking.</p>
      </div>
    </div>

    <div className="about-item ai">
      <div className="about-text">
        <h3>Artificial Intelligence</h3>
        <p>AI enhances the accuracy of emission tracking and carbon credit calculations.</p>
      </div>
      <div className="about-image" style={{ backgroundImage: 'url(/images/image3.jpg)' }}></div>
    </div>

    <div className="about-item global-impact reverse">
      <div className="about-image" style={{ backgroundImage: 'url(/images/image4.jpg)' }}></div>
      <div className="about-text">
        <h3>Global Impact</h3>
        <p>We are expanding globally, helping businesses across borders manage their carbon footprints.</p>
      </div>
    </div>
  </div>
</section>



{/* Prediction Section */}
<section id="prediction" className="section prediction-section">
      <h2>CO2 Prediction</h2>
      <form onSubmit={handleSubmit}>
        <select onChange={(e) => setTreeType(e.target.value)} required>
          <option value="">Select Tree Type</option>
          <option value="TreeType1">Tree Type 1</option>
          <option value="TreeType2">Tree Type 2</option>
          <option value="TreeType3">Tree Type 3</option>
        </select>
        <select onChange={(e) => setGrowthStage(e.target.value)} required>
          <option value="">Select Growth Stage</option>
          <option value="Sapling">Sapling</option>
          <option value="Mature">Mature</option>
          <option value="Old">Old</option>
        </select>
        <button type="submit">Get CO2 Prediction</button>
      </form>
      {co2Prediction !== null && (
        <div className="prediction-result">
          <h3>CO2 Prediction: {co2Prediction} kg</h3>
          <h3>Carbon Credits Earned: {credits} credits</h3>
          
          
        </div>
      )}
    </section>

      <section id="founders" className="section founders-section">
        <h2>Meet Our Founders</h2>
        <div className="founders-container">
          <div className="founder founder1">
            <div className="founder-image"></div>
            <h3>MATOKE DANCAN</h3>
            <p>Full stack developer <br />Advisor</p>
            
          </div>
          <div className="founder founder2">
            <div className="founder-image"></div>
            <h3>PAUL MUMO</h3>
            <p>Backend developer</p>
          </div>
          <div className="founder founder3">
            <div className="founder-image"></div>
            <h3>JUANITA KALUNDE</h3>
            <p>Backend developer</p>
          </div>
          <div className="founder founder4">
            <div className="founder-image"></div>
            <h3>MUTURI ALICE </h3>
            <p>Frontend developer</p>
          </div>
          <div className="founder founder5">
            <div className="founder-image"></div>
            <h3>MUSUNDI TERENCE</h3>
            <p></p>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      
    </div>
  );
}

export default App;
