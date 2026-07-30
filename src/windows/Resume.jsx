import { useState } from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Resume = () => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="resume" />
                <h2>Resume.pdf</h2>

                <a href="files/Dummy_Resume.pdf" download className="cursor-pointer" title="Download resume">
                    <Download className="icon" />
                </a>
                {/* <a href="files/resume.pdf" download className="cursor-pointer" title="Download resume">
                   <Download className="icon" />
               </a> */}
            </div>
            {/* <Document file="files/Dummy_Resume.pdf">
                {Array.from(new Array(numPages || 1), (_, i) => (
                    <Page key={i} pageNumber={i + 1} width={700} className="mb-4" />
                ))}
            </Document> */}

            {/* <Document file="files/Dummy_Resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages || 0), (_, i) => (
                    <Page
                        key={`page_${i + 1}`}
                        pageNumber={i + 1}
                        width={700}
                        className="mb-4"
                        renderTextLayer
                        renderAnnotationLayer
                    />
                ))}
            </Document> */}

            <div className="pdf-scroll">
                <Document file="files/Dummy_Resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages || 0), (_, i) => (
                        <Page
                            key={`page_${i + 1}`}
                            pageNumber={i + 1}
                            width={700}
                            className="mb-4"
                            renderTextLayer
                            renderAnnotationLayer
                        />
                    ))}
                </Document>
            </div>

            {/* <Document file="files/Dummy_Resume.pdf">
                <Page
                    pageNumber={1}
                    renderTextLayer
                    renderAnnotationLayer />
            </Document> */}
            {/* <Document file="files/resume.pdf">
                <Page
                    pageNumber={1}
                    renderTextLayer
                    renderAnnotationLayer />
            </Document> */}
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
