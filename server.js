'use strict';

import express from 'express';
import formidable from 'formidable';
import createPDF from './createPDF.js';

const server = express();

server.use(express.static('public', {
    extensions: ['html']
}));

function parseFormData(formData) {
    const data = {};

    // Extract simple fields
    const simpleFields = ['firstname', 'lastname', 'email', 'phoneno', 'street', 'plz', 'city', 'git', 'linkedin', 'website', 'template'];
    simpleFields.forEach(field => {
        data[field] = formData[field] ? formData[field][0] : '';
    });

    // Extract grouped fields
    data.experiences = parseGroup(formData, 'group-a');
    data.education = parseGroup(formData, 'group-b');
    data.projects = parseGroup(formData, 'group-c');
    data.skills = parseGroup(formData, 'group-d');

    return data;
}

// Helper function to parse groups
function parseGroup(formData, groupName) {
    const group = [];
    Object.keys(formData).forEach(key => {
        const match = key.match(new RegExp(`${groupName}\\[(\\d+)\\]\\[(.+)\\]`));
        if (match) {
            const index = match[1];
            const field = match[2];

            if (!group[index]) {
                group[index] = {};
            }

            group[index][field] = Array.isArray(formData[key]) ? formData[key][0] : formData[key];
        }
    });
    return group.filter(Boolean); // Remove undefined entries
}

server.post('/saveContent', (request, response) => {
    let myForm = formidable();

    myForm.parse(request, async (err, fields) => {
        if (err) {
            console.log(err);
            response.status(500).send(err);
        } try {

            const structuredData = parseFormData(fields);

            // Generate PDF from the received fields and return it as an ArrayBuffer
            const pdfBuffer = await createPDF.create(structuredData);

            response.status(200).contentType('application/pdf').send(Buffer.from(pdfBuffer));  // Send the PDF buffer as the response
        } catch (error) {
            console.error('Error generating PDF:', error);
            response.status(500).send('Failed to generate PDF');
        }
    });
});

// Start the server
const init = () => {
    server.listen(80, err => console.log(err || 'HTTP-webserver is running'));
};

init();
