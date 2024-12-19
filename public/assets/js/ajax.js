'use strict';

import settings, { elements } from "./settings.js";

let payload;
let isRendering = false;

const ajax = {

    sendData(evt) {
        evt.preventDefault();
        payload = new FormData(elements.formContent);

        payload.append('template', settings.template);

        fetch('/saveContent', {
            method: 'POST',
            body: payload,
        }).then(response => {
            if (response.ok) {
                return response.blob(); // Get the PDF as a Blob
            }
            throw new Error('Failed to generate PDF');
        }).then(blob => {
            // Create a temporary link to trigger the download
            const blobURL = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobURL;
            link.download = 'lebenslauf.pdf';
            document.body.appendChild(link);
            link.click();  // Trigger the download
            document.body.removeChild(link);

            // Clean up after download
            URL.revokeObjectURL(blobURL);
        }).catch(error => {
            console.error('Error:', error);
        });
    },

    preview() {
        if (isRendering) return; // Prevent overlapping renders
        isRendering = true;

        let renderTask = null;
        const payload = new FormData(elements.formContent);
        payload.append('template', settings.template);

        fetch('/saveContent', {
            method: 'POST',
            body: payload,
        }).then(response => {
            if (response.ok) {
                return response.blob(); // Get the PDF as a Blob
            }
            throw new Error('Failed to generate PDF');
        }).then(blob => {
            const blobURL = URL.createObjectURL(blob);

            // Use PDF.js to render the PDF
            pdfjsLib.getDocument(blobURL).promise.then(pdf => {
                pdf.getPage(1).then(page => {
                    if (renderTask) {
                        renderTask.cancel().then(() => {
                            renderTask = null; // Clear previous renderTask
                        }).catch(err => {
                            if (err.name !== 'RenderingCancelledException') {
                                console.error('Error canceling render task:', err);
                            }
                        });
                    }

                    // Set up the canvas for rendering the PDF page
                    const context = elements.canvas.getContext('2d');
                    context.setTransform(1, 0, 0, 1, 0, 0);

                    const rotation = page.rotate || 0;
                    const viewport = page.getViewport({ scale: 0.8, rotation });

                    if (
                        elements.canvas.height !== viewport.height ||
                        elements.canvas.width !== viewport.width
                    ) {
                        elements.canvas.height = viewport.height;
                        elements.canvas.width = viewport.width;
                        context.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
                    }

                    renderTask = page.render({
                        canvasContext: context,
                        viewport: viewport,
                    });

                    renderTask.promise
                        .then(() => {
                            isRendering = false; // Release the flag
                        })
                        .catch(err => {
                            if (err.name !== 'RenderingCancelledException') {
                                console.error('Error during rendering:', err);
                            }
                            isRendering = false; // Release the flag
                        });
                });
            });
        }).catch(error => {
            console.error('Error:', error);
        });
    }
};

export default ajax;
