import React, { useState } from 'react'; // Import useState

function HomePage({
  numQuestions,
  setNumQuestions,
  startExam,
  maxQuestions,
  availableDomains,
  selectedDomains,
  setSelectedDomains
}) {
  const [showOptions, setShowOptions] = useState(false); // State for options visibility

  const handleDomainChange = (domain) => {
    setSelectedDomains(prevSelected => {
      if (prevSelected.includes(domain)) {
        // Prevent deselecting the last domain
        if (prevSelected.length === 1) {
          return prevSelected;
        }
        return prevSelected.filter(d => d !== domain);
      } else {
        return [...prevSelected, domain];
      }
    });
  };

  return (
    <div className="homepage-container">
      <div className="homepage-inner">
        {/* Removed text-center class from the main wrapper */}
        <div>
          <h1 className="exam-title text-center">Kubernetes Security KCSA Mock Exam</h1>

          {/* Exam Setup Card */}
          <div className="exam-setup-card">

            {/* Top row: Number input and Start button */}
            <div className="setup-top-row">
              {/* Input Group - Label and Input separated for flex alignment */}
              <div className="number-input-group">
                 <label htmlFor="num-questions-input" className="input-label">Number of questions:</label>
                 <input
                   id="num-questions-input"
                   type="number"
                   value={numQuestions}
                   onChange={(e) => setNumQuestions(Math.max(1, Math.min(maxQuestions, parseInt(e.target.value) || 0)))}
                   className="question-input"
                 />
     {/* Start Button */}
              <button
                onClick={startExam}
                className="start-button"
                disabled={selectedDomains.length === 0}
              >
                Start Exam
              </button>
              </div>
         
            </div>

            {/* Separator (Optional) */}
            {/* <hr className="setup-separator" /> */}

            {/* Extra Options Toggle - Moved below top row */}
            <div className="extra-options-toggle">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="options-toggle-button"
              >
                {showOptions ? 'Hide Extra Options' : 'Show Extra Options'}
              </button>
            </div>

            {/* Domain Selection Section (Conditional) - Remains below toggle */}
            {showOptions && availableDomains && availableDomains.length > 0 && (
              <div className="domain-options-card">
                {/* Added emoji to title */}
                <h3 className="domain-selection-title">✨ Select Exam Domains</h3>
                <p className="domain-selection-description">
                  Choose specific domains to focus your practice exam. Only questions from the selected domains will be included.
                </p>
                <div className="domain-checkboxes">
                {availableDomains.map(domain => (
                  <div key={domain} className="domain-checkbox-item" style={{ marginBottom: '5px' }}>
                    <input
                      type="checkbox"
                      id={`domain-${domain}`}
                      value={domain}
                      checked={selectedDomains.includes(domain)}
                      onChange={() => handleDomainChange(domain)}
                      className="domain-checkbox"
                    />
                    <label htmlFor={`domain-${domain}`} className="domain-label">
                      {/* Replaced underscore replacement with CSS text-transform potentially */}
                      {domain}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            )}
            {/* End Domain Selection Section */}

          </div>
          {/* End Exam Setup Card */}

        </div> {/* Close the wrapper div */}


        {/* Keep About, Creator, Community sections as they were */}
        <div className="about-container">
          <div className="about-header">
            <h2 className="section-title">About the App</h2>
          </div>
          <div className="about-content">
            <p className="about-text">
              This app is a mock exam for the Kubernetes Security (KCSA) certification. It consists of multiple-choice questions to test your knowledge of Kubernetes security concepts.
            </p>
            <p className="about-text">
              The exam is timed, and you will have 1 minute per question. You can flag questions to review later. Once you finish the exam, you can review your answers and see explanations for each question.
            </p>
          </div>
          {/* Invite people to contribute to the project on GitHub. */}
          <div className="about-footer">
            <p className="about-text">
              If you'd like to contribute to this project, please visit the GitHub repository.
            </p>
            <a
              href="https://github.com/thiago4go/kubernetes-security-kcsa-mock"
              className="github-link"
            >
              GitHub Repository
            </a>
          </div>
        </div>

        <div className="creator-container">
          <div className="creator-header">
            <h2 className="section-title">About the Creator</h2>
          </div>
          <div className="image-container">
  <img 
    src="/Kubestronaut.png" 
    alt="Kubestronaut" 
    className="responsive-image"
  />
</div>

          <div className="creator-content">
            <dl className="creator-details">
              <div className="detail-row">
                <dt className="detail-label">Name</dt>
                <dd className="detail-content">Thiago S Shimada Ramos</dd>
              </div>
              <div className="detail-row">
                <dt className="detail-label">Bio</dt>
                <dd className="detail-content">
                  Cloud Native BizDevOps | Solutions Engineer | Global Volunteer Advocate | Speaker | Tech Community Leader | Blogger
                </dd>
              </div>
              <div className="detail-row">
                <dt className="detail-label">About</dt>
                               

                <dd className="detail-content">
               
 
                  <p>I'm Thiago, an ICT developer who loves technology, specifically cloud-native applications.</p>
                  <p className="mt-2">I started coding in high school with assembly language. Even if life took me in other directions, those early days fostered a lifelong interest in computers and programming. 💻</p>
                  <p className="mt-2">With over a decade of tech expertise, I've explored many technologies, but Kubernetes is my current focus. My international upbringing—born in Brazil, spent years in Japan, and now in Australia—has profoundly impacted my approach to technology and problem-solving. 🌏</p>
                  <p className="mt-2">I co-host a Kubernetes User Group to discuss and demystify container orchestration. 👨‍💻</p>
                  <p className="mt-2">When I'm not working, playing Go and solving magic cubes improve my strategic thinking and problem-solving skills. These hobbies not only offer a mental escape but also enhance my technical abilities, which I apply in my day-to-day. 🧠</p>
               </dd>
              </div>
              <div className="detail-row">
                <dt className="detail-label">Links</dt>
                <dd className="detail-content">
                  <div className="links">
                    <a href="http://thiago4go.github.io/" className="link">Blog</a>
                    <a href="https://www.linkedin.com/in/thiago4go/" className="link">LinkedIn</a>
                    <a href="https://github.com/thiago4go" className="link">GitHub</a>
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="community-container">
          <div className="community-header">
            <h2 className="section-title">Community Involvement</h2>
          </div>
          <div className="community-content">
            <dl className="community-details">
              <div className="detail-row">
                <dt className="detail-label">Cloud Native Melbourne</dt>
                <dd className="detail-content">
                  <p>Chapter organiser for Cloud Native Melbourne...</p>
                  <a href="https://community.cncf.io/cloud-native-melbourne/" className="link">Visit Cloud Native Melbourne</a>
                  <div className="community-logo">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/yamljson-lj2aTJhd3a9ui4btKFBp3GeqODqXbP.png" alt="Cloud Native Melbourne Logo" />
                  </div>
                </dd>
              </div>
              <div className="detail-row">
                <dt className="detail-label">K8SUG</dt>
                <dd className="detail-content">
                  <p>Global Volunteer Advocate and Co-host for K8SUG...</p>
                  <a href="https://www.linkedin.com/company/k8sug/" className="link">Visit K8SUG on LinkedIn</a>
                  <div className="community-logo">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20k8sug-0pxBTWRLP0tcRUimu7hsY4JHEhv2ca.png" alt="K8SUG Logo" />
                  </div>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
