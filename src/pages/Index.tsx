import "./styles.css"
import NavBar from "../components/Navbar";

const cardData = [
  { "Heading": "Resume Optimization", "Description": "Enhance your resume with AI-driven suggestions to stand out to employers." },
  { "Heading": "Cover Letter Generation", "Description": "Craft personalized cover letters that highlight your skills and experiences." },
  { "Heading": "Job Matching", "Description": "Get matched to job opportunities that fit your profile and career goals." }
]

const workingData = [
  {"Heading": "Upload Your Resume", "Description": "Start by uploading your existing resume or creating a new one using our template." },
  {"Heading": "Choose your service", "Description": "Select the service you need, whether it's resume optimization, cover letter generation, or job matching." },
  {"Heading": "Get Results", "Description": "Receive AI-powered suggestions and documents tailored to your career needs." },
]

const Index = () => {
  return (
    <div>
        <NavBar/>
        <div className="hero">
          <div className="svg"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="blue" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-brain h-8 w-8 text-blue-600" data-lov-id="src/components/Navigation.tsx:15:12" data-lov-name="Brain" data-component-path="src/components/Navigation.tsx" data-component-line="15" data-component-file="Navigation.tsx" data-component-name="Brain" data-component-content="%7B%22className%22%3A%22h-8%20w-8%20text-blue-600%22%7D"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path><path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path><path d="M19.938 10.5a4 4 0 0 1 .585.396"></path><path d="M6 18a4 4 0 0 1-1.967-.516"></path><path d="M19.967 17.484A4 4 0 0 1 18 18"></path></svg>
          </div>
          <h1>ResuMatch AI</h1>
          {/* <p>Transform your career with AI-powered resume optimization and cover letter generation. Get matched to your dream job with intelligent document enhancement.</p> */}
          <div className="buttons">
            <a href="/upload" className="button">
              Get Started
              <svg width="34" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12H21M21 12L14 5M21 12L14 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
          <div className="cards-container">
            {cardData.map((card, index) => (
              <div className="cards" key={index}>
                <h2>{card.Heading}</h2>
                <p>{card.Description}</p>
              </div>
            ))}
          </div>
          <div className="working">
            <h2>How it works</h2>
            <div className="working-cards">
              {workingData.map((card, index) => (
                <div className="working-card" key={index}>
                  <h1>{index+1}</h1>
                  <h3>{card.Heading}</h3>
                  <p>{card.Description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};
export default Index;