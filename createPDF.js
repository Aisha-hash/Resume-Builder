'use strict';

import pdf from 'html-pdf';
import template1 from './template1.js';
import template2 from './template2.js';
import template3 from './template3.js';

let htmlTemplate;

const createPDF = {
    async create(data) {
        let currentTemplate = data.template;

        if (currentTemplate) {
            if (currentTemplate == 'template2') {
                htmlTemplate = template2.template(data);
            } else if (currentTemplate == 'template3') {
                htmlTemplate = template3.template(data);
            } else {
                htmlTemplate = template1.template(data);
            }
        }

        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
            timeout: 30000, // Timeout in milliseconds (optional)
        };

        // Convert HTML to PDF
        return new Promise((resolve, reject) => {
            pdf.create(htmlTemplate, options).toBuffer((err, buffer) => {
                if (err) {
                    return reject(err);
                }
                resolve(buffer);
            });
        });
    }
}

export default createPDF;