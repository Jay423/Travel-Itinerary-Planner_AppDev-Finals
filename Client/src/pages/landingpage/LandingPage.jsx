import React from 'react';
import './LandingPage.css'; // Import the CSS file for styling

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          {/* <img src='/HomepagePic.png' alt='homepage' className='bgpic'></img> */}
            
            <section className="topbutton">
                <button><a href='/home'>home</a></button>
                <button><a href='/'>contact</a></button>
                <button><a href='/'>Download the app</a></button>
            </section>

            <div className="logoland"><img src="/VISTALOGO.png" alt="Logoland" /></div>

            <h1>Turn your <br /> travel dreams <br /> into reality</h1>
            <section className="startbutton">
                <div className="button-container">
                    <button><a href='/login'>Login</a></button>
                    <button><a href='/register'>Sign Up</a></button>
                </div>
            </section>
        </div>
      </section>

        <div className="box"></div>

      <section className="PlanTrips">
        <p>Plan trips<br /> with Vista</p>
      </section>
      <section className="Welcome">
      <p>Est. 2024</p>
      <br />
      <br />
      <br />
      <p>Welcome to Vista, where your travel journey begins with a breathtaking perspective.</p> 
      <p>Our platform offers carefully curated itineraries designed to unlock the best of<br />
      every destination, guiding you through unforgettable experiences. </p>
      <p>Whether you're planning a scenic getaway or a cultural adventure, Vista<br />
        provides you with a comprehensive view of what's possible, helping you plan<br />
        your dream trip with ease. From popular places to hidden gems - let us be your<br />
        guide as you explore the world one moment at a time.</p>
      </section>

      <section className='planease'>
        <div className='planeaseimg'><img src="/SMOLER.png" alt="smoler" /></div>
        <div className="planeasetxt">
        <h2>Plan with ease</h2>
        <p>No more juggling multiple<br/>
          tabs to plan your trips. Our<br/>
          platform offers an<br/>
          integrated map and an<br/>
          easy-to-use planner,<br/>
          making travel planning<br/>
          simple and stress-free.</p>
        </div>  
      </section>

      <section className="Features">
        <h1>Key Features made simple</h1>
        <img src="/Create.png" className="create" alt='create'></img>
        <section className="createtxt">
          <h2>Create</h2>
          <p>Build your perfect travel itinerary, tailored to your style,<br/>
            complete with budget tracking, checklists,<br/>
            and suggestions from us.</p>
            <img src='/calendar.png' alt='calendar'></img>
        </section>

        <img src="/Collaborate.png" className="Col" alt='collaborate'></img>
        <section className='coltxt'>
          <h2>Collaborate</h2>
          <p>Plan together, share ideas, and make every detail count with<br/>
            our system, which allows effortless collaboration anytime,<br/>
            anywhere, with your friends.</p>
            <img src='/multi-user.png' alt='multi'></img>
        </section>


        
        <img src="/Commence.png" className="Comms" alt='commence'></img>
        <section className='commstxt'>
          <h2>Commence</h2>
          <p>
          Start your adventure with everything in place,<br/>
          ready to explore, while staying organized with our<br/>
          integrated task management feature.
          </p>
          <img src='/plane-up.png' alt='plane'></img>
        </section>
      </section>

      <section className="Browse">
        <img src="/RecommendTrips.png" alt='Browse!'></img>
        <button><a href='/'>Let's do it</a></button>
      </section>
      <section className='footer'>
      <img src='/BotDisplay.png' alt='botdisp'></img>
      </section>
    </div>
  );
};

export default LandingPage;
