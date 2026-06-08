// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import LeftToolbar from "../components/LeftToolbar";
// import TextPanel from "./TextPanel";
// import ImagePanel from "./ImagePanel";
// import LinkPanel from "./LinkPanel";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// type Mode = "text" | "image" | "link";

// export default function MainApp() {
//   const location = useLocation();
//   const [mode, setMode] = useState<Mode>("text");

//   useEffect(() => {
//     // safer extraction of state
//     const state = location.state as { mode?: Mode } | null;
//     if (state?.mode && ["text", "image", "link"].includes(state.mode)) {
//       setMode(state.mode);
//     }
//   }, [location.state]);

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-900 text-gray-100">
//       <Header />

//       <div className="flex flex-col md:flex-row flex-1 border-t border-cyan-500/20">
//         <div className="w-full md:w-[20%] bg-gradient-to-b from-gray-900 via-purple-900 to-gray-950 text-white shadow-xl shadow-cyan-500/10 p-4">
//           <LeftToolbar mode={mode} setMode={setMode} />
//         </div>

//         <div className="w-full md:w-[80%] flex-1 p-8 bg-gradient-to-br from-gray-900 via-purple-950 to-indigo-950 rounded-tl-3xl shadow-inner shadow-cyan-500/10 border-l border-cyan-500/10 transition-all duration-500">
//           {mode === "text" && <TextPanel />}
//           {mode === "image" && <ImagePanel />}
//           {mode === "link" && <LinkPanel />}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }




import { useState, useEffect, useCallback, memo } from "react";
import { useLocation } from "react-router-dom";
import LeftToolbar from "../components/LeftToolbar";
import TextPanel from "./TextPanel";
import ImagePanel from "./ImagePanel";
import LinkPanel from "./LinkPanel";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Mode = "text" | "image" | "link";

// Memoized status indicator to prevent unnecessary re-renders
const StatusIndicator = memo(() => (
  <div className="mt-6 p-3 bg-gray-900/30 rounded-lg border border-gray-700">
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">System Status</span>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-xs text-green-400 font-medium">Active</span>
      </div>
    </div>
    <div className="mt-1 text-xs text-gray-500">v2.1.4</div>
  </div>
));

StatusIndicator.displayName = 'StatusIndicator';

export default function MainApp() {
  const location = useLocation();
  const [mode, setMode] = useState<Mode>("text");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Debounce mode change to prevent rapid re-renders
  const handleModeChange = useCallback((newMode: Mode) => {
    if (mode === newMode) return;
    
    setIsTransitioning(true);
    setMode(newMode);
    
    // Small delay for visual feedback
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [mode]);

  useEffect(() => {
    const state = location.state as { mode?: Mode } | null;
    if (state?.mode && ["text", "image", "link"].includes(state.mode)) {
      handleModeChange(state.mode);
    }
  }, [location.state, handleModeChange]);

  const modeTitles = {
    text: "Text Analysis",
    image: "Image Analysis", 
    link: "Link Analysis"
  };

  const modeDescriptions = {
    text: "Paste or type text to analyze for misinformation",
    image: "Upload an image to check for manipulated content",
    link: "Enter a URL to verify news article authenticity"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 overflow-hidden">
      <Header />

      <div className="flex flex-col md:flex-row flex-1 min-h-0">
        {/* Left Sidebar - Simplified */}
        <div className="w-full md:w-64 bg-gray-900 border-r border-gray-800 p-5 md:p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-200 mb-1">
              Detection Method
            </h2>
            <p className="text-xs text-gray-500">
              Choose analysis type
            </p>
          </div>
          
          <LeftToolbar 
            mode={mode} 
            setMode={handleModeChange}
          />
          
          <StatusIndicator />
        </div>

        {/* Main Content Area - Optimized */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Fixed header */}
          <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  {modeTitles[mode]}
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  {modeDescriptions[mode]}
                </p>
              </div>
              <div className="hidden sm:block px-3 py-1.5 bg-gray-800 rounded-lg border border-gray-700">
                <span className="text-xs font-medium text-cyan-400">AI Powered</span>
              </div>
            </div>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-4 md:p-6">
              {/* Main panel - No heavy gradients */}
              <div className={`
                bg-gray-900/50 rounded-xl border border-gray-800 
                p-4 md:p-6 min-h-[400px]
                ${isTransitioning ? 'opacity-50' : 'opacity-100'}
                transition-opacity duration-300
              `}>
                {mode === "text" && <TextPanel />}
                {mode === "image" && <ImagePanel />}
                {mode === "link" && <LinkPanel />}
              </div>

              {/* Features - Simplified */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                  <h4 className="text-sm font-medium text-gray-200 mb-1">
                    High Accuracy
                  </h4>
                  <p className="text-xs text-gray-500">
                    Advanced AI models
                  </p>
                </div>
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                  <h4 className="text-sm font-medium text-gray-200 mb-1">
                    Fast Results
                  </h4>
                  <p className="text-xs text-gray-500">
                    Analysis in seconds
                  </p>
                </div>
                <div className="p-3 bg-gray-900/30 rounded-lg border border-gray-800">
                  <h4 className="text-sm font-medium text-gray-200 mb-1">
                    Secure & Private
                  </h4>
                  <p className="text-xs text-gray-500">
                    Data never stored
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}