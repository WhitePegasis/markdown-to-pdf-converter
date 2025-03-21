import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import html2pdf from "html2pdf.js";
import "github-markdown-css";
import "./App.css";

function App() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown to PDF
This is a **Markdown to PDF Converter**.

- Supports **bold**, *italic*, \`inline code\`, and tables.
- Syntax-highlighted code blocks:
\`\`\`js
console.log("Hello, Markdown!");
\`\`\`

> Blockquotes and images work too!

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)
`);

  const previewRef = useRef(null);

  const generatePDF = () => {
    const element = previewRef.current;
    if (!element) return;

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: "markdown-document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save();
  };

  return (
    <div id="app">
      <header>
        <h1>Markdown to PDF Converter</h1>
      </header>

      <div id="container">
        {/* Markdown Input Section */}
        <div id="input-section">
          <h2>Markdown Input</h2>
          <textarea
            id="markdown-input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your markdown here..."
          />
        </div>

        {/* PDF Preview Section */}
        <div id="preview-section">
          <h2>Live Markdown Preview</h2>
          <div ref={previewRef} id="markdown-preview" className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>

          {/* Download PDF Button */}
          <button id="download-btn" onClick={generatePDF}>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
