import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Achieve Your Goals with GoalGetter</h1>
          <p>Stay organized, track progress, and reach success effortlessly.</p>
          <Link to="/signup" className="cta-btn">Get Started</Link>
        </div>
      </section>

      <section className="benefits">
        <h2>Why Choose GoalGetter?</h2>
        <div className="benefit-cards">
          <div className="card">
            <img src="/images/task-management.png" alt="Task Management" />
            <h3>Effortless Task Management</h3>
            <p>Organize your daily tasks and stay on top of your goals.</p>
          </div>
          <div className="card">
            <img src="/images/progress-tracking.png" alt="Progress Tracking" />
            <h3>Track Your Progress</h3>
            <p>See your improvements and stay motivated every day.</p>
          </div>
          <div className="card">
            <img src="/images/productivity.png" alt="Boost Productivity" />
            <h3>Boost Productivity</h3>
            <p>Focus on what matters most and get things done faster.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works?</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <p>Sign up and create an account.</p>
          </div>
          <div className="step">
            <span>2</span>
            <p>Add your tasks and goals.</p>
          </div>
          <div className="step">
            <span>3</span>
            <p>Track progress and complete tasks.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;