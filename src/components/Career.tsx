import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          MY <span>EXPERIENCE</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>UI/UX Designer Intern</h4>
                <h5>Arjun Vision Tech Solutions, Guindy</h5>
              </div>
              <h3>Jun 2024 – Jul 2024</h3>
            </div>
            <p>
              Owned end-to-end UI/UX prototyping in Figma for Genie (e-Sevai app) — designed login, dashboard, and booking interaction flows, delivering a production-ready prototype with validated usability across 3 core screens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
