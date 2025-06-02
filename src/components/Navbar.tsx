import "./styles.css"
const NavBar = () => {
  return (
    <nav>
        <div className="logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="44" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-brain h-8 w-8 text-blue-600" data-lov-id="src/components/Navigation.tsx:15:12" data-lov-name="Brain" data-component-path="src/components/Navigation.tsx" data-component-line="15" data-component-file="Navigation.tsx" data-component-name="Brain" data-component-content="%7B%22className%22%3A%22h-8%20w-8%20text-blue-600%22%7D"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path><path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path><path d="M19.938 10.5a4 4 0 0 1 .585.396"></path><path d="M6 18a4 4 0 0 1-1.967-.516"></path><path d="M19.967 17.484A4 4 0 0 1 18 18"></path></svg>

            <h1>ResuMatch AI</h1>
        </div>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/upload">Upload Resume</a></li>
            <li><a href="/services">Services</a></li>
        </ul>
    </nav>
  );
};
export default NavBar;