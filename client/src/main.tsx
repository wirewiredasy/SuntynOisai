import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Scroll to top on page load
window.scrollTo({ top: 0, behavior: "smooth" });

// Add event listener for all link clicks
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  // Check if clicked element is a link or inside a link
  const link = target.closest('a');
  if (link) {
    // Small delay to ensure navigation happens first
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }
});

// Also handle programmatic navigation
window.addEventListener('popstate', () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

createRoot(document.getElementById("root")!).render(<App />);
