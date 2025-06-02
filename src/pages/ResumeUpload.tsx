import NavBar from "../components/Navbar";
import "./styles.css";
const ResumeUpload = () => {
  return (
    <div>
        <NavBar />
        <div className="hero_resume">
          <h1>Upload Your Resume</h1>
          <p>Upload your current resume to get started with AI-powered optimization and cover letter generation.</p>
          <div className="upload-section">
            <div className="upload-container">
              <button className="upload-button" onClick={()=> document.getElementById('fileInput')?.click()}>
                <input
                  type="file"
                  id="fileInput"
                  accept=".pdf,.doc,.docx"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log(`File selected: ${file.name}`);
                    }
                  }}
                />
                <h3>Drag and drop your resume here</h3>
                <h4>or</h4>
                <span className="upload-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="upload-icon"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                    <polyline points="16 5 12 1 8 5"></polyline>
                  </svg>
                  Browse Files</span>
              </button>
              <div className="upload-info">
                <p>
                  Supported formats: PDF, DOC, DOCX.
                </p>
                <p>
                  Maximum file size: 5MB.
                </p>

              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
export default ResumeUpload;