import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const CustomScrollbar = ({ children, className = "", ...props }) => {
  return (
    <div 
      className={`custom-scrollbar ${className}`}
      style={{ ...props.style }}
      {...props}
    >
      {children}
    </div>
  );
};

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState(`# Welcome to Code Review Assistant

Enter your code on the left and click **Review** to get detailed feedback, suggestions, and best practices.

## Features
- Code analysis
- Performance suggestions  
- Best practice recommendations
- Error detection`);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setReview("🔍 Analyzing your code...");
    try {
      const response = await fetch('https://ai-code-review-backend-one.vercel.app/api/get-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: code })
      });
      const data = await response.text();
      setReview(data);
    } catch (error) {
      setReview("❌ **Error:** Could not connect to review service. Please check your connection and try again.");
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-900">
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #475569 #0f172a;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #475569, #334155);
          border-radius: 6px;
          border: 2px solid #1e293b;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #64748b, #475569);
        }
      `}</style>

      <main className="min-h-screen w-full p-2 sm:p-4 flex flex-col lg:flex-row gap-4">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 h-[calc(50vh-1rem)] lg:h-[calc(100vh-2rem)] rounded-xl sm:rounded-2xl bg-slate-800 relative border border-slate-700 shadow-xl overflow-hidden">
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs sm:text-sm font-medium hidden sm:inline">Code Editor</span>
            </div>
          </div>

          <CustomScrollbar className="absolute inset-0 top-10 sm:top-12 bottom-16 sm:bottom-20 bg-slate-900 overflow-auto rounded-xl sm:rounded-2xl p-2">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={16}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: '13px',
                backgroundColor: 'transparent',
                color: '#e2e8f0',
                minHeight: '100%',
                width: '100%',
                outline: 'none',
                resize: 'none'
              }}
              textareaClassName="custom-scrollbar"
            />
          </CustomScrollbar>

          <button
            onClick={reviewCode}
            className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold cursor-pointer rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg transform hover:scale-105"
          >
            🚀 Review Code
          </button>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 h-[calc(50vh-1rem)] lg:h-[calc(100vh-2rem)] rounded-xl sm:rounded-2xl bg-slate-800 border border-slate-700 shadow-xl flex flex-col overflow-hidden">
          <div className="p-3 sm:p-6 border-b border-slate-700">
            <div className="flex items-center gap-2 text-slate-300">
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm sm:text-lg font-semibold">AI Code Review</span>
            </div>
          </div>

          <CustomScrollbar className="flex-1 p-3 sm:p-6 overflow-auto min-h-0">
            <div className="prose prose-sm sm:prose prose-invert prose-slate max-w-none">
              <Markdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 border-b border-slate-600 pb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg sm:text-xl font-semibold text-blue-300 mb-2 sm:mb-3 mt-4 sm:mt-6">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base sm:text-lg font-medium text-purple-300 mb-2 mt-3 sm:mt-4">{children}</h3>,
                  p: ({ children }) => <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-3 sm:mb-4 break-words">{children}</p>,
                  ul: ({ children }) => <ul className="text-sm sm:text-base text-slate-300 space-y-1 mb-3 sm:mb-4 list-disc list-inside">{children}</ul>,
                  ol: ({ children }) => <ol className="text-sm sm:text-base text-slate-300 space-y-1 mb-3 sm:mb-4 list-decimal list-inside">{children}</ol>,
                  li: ({ children }) => <li className="text-slate-300 break-words">{children}</li>,
                  code: ({ children, className, inline }) => {
                    if (!inline && className) {
                      return (
                        <div className="overflow-hidden bg-slate-900 rounded-lg my-3 sm:my-4 border border-slate-600">
                          <CustomScrollbar className="overflow-x-auto p-3 sm:p-4">
                            <pre className="text-xs sm:text-sm whitespace-pre">
                              <code className={`${className} block`}>{children}</code>
                            </pre>
                          </CustomScrollbar>
                        </div>
                      );
                    }
                    return <code className="bg-slate-700 text-green-300 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono break-words">{children}</code>;
                  },
                  pre: ({ children }) => (
                    <div className="overflow-hidden bg-slate-900 rounded-lg my-3 sm:my-4 border border-slate-600">
                      <CustomScrollbar className="overflow-x-auto p-3 sm:p-4">{children}</CustomScrollbar>
                    </div>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 bg-slate-800 pl-3 sm:pl-4 py-2 my-3 sm:my-4 italic text-sm sm:text-base text-slate-400 break-words">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {review}
              </Markdown>
            </div>
          </CustomScrollbar>
        </div>
      </main>
    </div>
  );
}

export default App;