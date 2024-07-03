import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/webpack';

const PDFViewer = ({ pdfUrl }) => {
    const [pdf, setPdf] = useState(null);
    const canvasRefs = useRef([]);

    useEffect(() => {
        const loadPdf = async () => {
            const loadingTask = pdfjsLib.getDocument(pdfUrl);
            const pdfDoc = await loadingTask.promise;
            setPdf(pdfDoc);
        };

        loadPdf();
    }, [pdfUrl]);

    useEffect(() => {
        if (pdf) {
            const renderPage = async (pageNum) => {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = canvasRefs.current[pageNum - 1];
                const context = canvas.getContext('2d');

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                await page.render(renderContext).promise;
            };

            for (let i = 1; i <= pdf.numPages; i++) {
                renderPage(i);
            }
        }
    }, [pdf]);

    return (
        <div>
            <div id="the-canvas" className="S-policy">
                {Array.from({ length: pdf ? pdf.numPages : 0 }, (_, i) => (
                    <canvas
                        key={i}
                        ref={(el) => (canvasRefs.current[i] = el)}
                        id={`canvas${i + 1}`}
                        height="1263"
                        width="892"
                    ></canvas>
                ))}
            </div>
        </div>
    );
};

export default PDFViewer;
