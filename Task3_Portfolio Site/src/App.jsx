import React from 'react';
import Layout from './components/Layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Honors from './components/sections/Honors';
import Volunteer from './components/sections/Volunteer';
import Contact from './components/sections/Contact';

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Honors />
      <Volunteer />
      <Contact />
    </Layout>
  );
}

export default App;
