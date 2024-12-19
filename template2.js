'use strict';

const template2 = {
    template(data) {

        let htmlTemplate = `<!DOCTYPE html>
    <html>

<head>
    <title>${data.firstname}'s Resume</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=210mm, initial-scale=1.0">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
   
    <style>
         * {
            box-sizing: border-box;
            transition: 0.35s ease;
            font-style: normal;
        }

        .main{
            width: 100%;
            display: block;
            position: relative;
            margin: 0;
            font-style: normal;
            overflow-wrap: break-word; 
            word-break: break-word;
}
        .rela-block {
            width: 100%;
            display: block;
            position: relative;
            margin: auto;
            font-style: normal;
            overflow-wrap: break-word; 
            word-break: break-word;
        }

        .abs-center {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            text-align: center;
            width: 88%;
            font-style: normal;
        }

        body {
            font-family: Helvetica, sans-serif;
            font-size: 16px;
            letter-spacing: 0px;
            font-weight: 400;
            line-height: 28px;
            background-size: cover;
            font-style: normal;
        }

        .caps {
            text-transform: uppercase;
        }

        .justified {
            text-align: justify;
        }

        p.light {
            color: #777;
            font-size: 14px;
            font-style: normal;
        }

        h2 {
            font-family: Helvetica, sans-serif;
            font-size: 30px;
            letter-spacing: 5px;
            font-weight: 600;
            line-height: 40px;
            color: #000;
            font-style: normal;
        }

        h3 {
            font-family: Helvetica, sans-serif;
            font-size: 21px;
            letter-spacing: 1px;
            font-weight: 600;
            line-height: 28px;
            color: #000;
        }

        .page {
            width: 90%;
            background-color: #fff;
        }

        .top-bar {
            height: 220px;
            background-color: #1d3557;
            color: #fff;
        }

        .name {
            height: 120px;
            text-align: center;
            font-family: Helvetica, sans-serif;
            font-size: 40px;
            letter-spacing: 8px;
            font-weight: 100;
            line-height: 60px;
            font-style: normal;
        }

        .name div {
            width: 94%;
        }

        .side-bar {
            position: absolute;
            top: 220px;
            bottom: 0;
            width: 380px;
            background-color: #cccccc;
            padding: 0 30px 50px;

        }

        .social {
            padding-left: 10px;
            cursor: pointer;
        }

        .side-header {
            font-family: Helvetica, sans-serif;
            font-size: 18px;
            letter-spacing: 4px;
            font-weight: 600;
            line-height: 28px;
            margin: 60px auto 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #888;
        }
        
        .side-header:first-of-type
        {
            margin:20px auto 10px;
        }

        .list-thing {
            padding-left: 20px;
            margin-bottom: 5px;
        }
        
        .content-container>* {
            margin: 0 auto 25px;
        }
        
        .content-container {
            margin-right: 0;
            width: calc(95% - 330px);
            padding: 25px 40px 50px;
        }

        .content-container>h3 {
            margin: 0 auto 5px;
        }

        .title {
            width: 80%;
            text-align: center;
        }

        .greyed {
            background-color: #ddd;
            width: 100%;
            max-width: 580px;
            text-align: center;
            font-family: Helvetica, sans-serif;
            font-size: 18px;
            letter-spacing: 6px;
            font-weight: 600;
            line-height: 28px;
        }

     @media screen and (max-width: 1150px) {
            .name {
                color: #fff;
                font-family: Helvetica, sans-serif;
                font-size: 30px;
                letter-spacing: 6px;
                font-weight: 100;
                line-height: 48px;
            }
        }
            
    </style>
</head>

<body>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        crossorigin="anonymous"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-BJeVnMlsc21pD1k6Da3Zm8vNng2oD1xvqXb8pDqb7x4gN91otGo4VyPbS2C/2RbBe5C0R0O2AxclZ9Ke/J20Lw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        crossorigin="anonymous"></script>
        
    <div class="main page">
        <div class="rela-block top-bar">
            <div class="caps name">
                <div class="abs-center">${data.firstname} ${data.lastname}</div>
            </div>
        </div>
        <div class=main-content>
        <div class="side-bar">
        
            <p class="rela-block caps side-header">Contact</p>

            <p class="mb-1"><span style="padding-right:10px;" class="fas fa-envelope"></span>${data.email}</p>`

        //contact info
        if (data.phoneno != "" && data.phoneno != null)

            htmlTemplate += `<p class="mb-1"><span style="padding-right:10px;" class="fas fa-phone-square-alt"></span>${data.phoneno}</p>`

        if ((data.street != "" && data.street != null) || (data.plz != "" && data.plz != null)) {
            htmlTemplate += `<p class="mb-1">`;

            if (data.street != "" && data.street != null) {
                htmlTemplate += `<span style="padding-right:10px;" class="fa-solid fa-house"></span>
                <span>${data.street}`
            }

            if (data.street != "" && data.street != null && data.plz != "" && data.plz != null) {
                htmlTemplate += `,`
            }

            if (data.plz != "" && data.plz != null) {
                htmlTemplate += `<span style="padding-right:10px;"></span>${data.plz} ${data.city}</span></p>`
            }
        }

        if (data.git != "" && data.git != null)
            htmlTemplate += `<p class="mb-1"><span style="padding-right:10px;" class="fab fa-github"></span>${data.git}</p>`

        if (data.linkedin != "" && data.linkedin != null)
            htmlTemplate += `<p class="mb-1"><span style="padding-right:10px;"
                        class="fa-brands fa-linkedin"></span>${data.linkedin}</p>`;
        if (data.website != "" && data.website != null)
            htmlTemplate += `<p class="mb-1"><span style="padding-right:10px;"
                        class="fa-solid fa-address-card"></span>${data.website}</p>`


        //Skills
        if (data.skills[0].skill != "" && data.skills[0].skill != null) {
            htmlTemplate += ` <p class="rela-block caps side-header">Skills</p>`;
            data.skills.forEach(skill => {

                htmlTemplate += ` <p class="rela-block list-thing">${skill.skill}</p>`
            })

            htmlTemplate += ` </div>`
        }
        htmlTemplate += `<div class="rela-block content-container">`

        //Experience
        if (data.experiences[0].exp_title != "" && data.experiences[0].exp_title != null) {
            htmlTemplate += `
            <div class="rela-block caps greyed">Experience</div>`
            data.experiences.forEach((exp) => {
                htmlTemplate += `
            <div>
            <h3>${exp.exp_title}</h3>
            <p class="text-muted light mt-1 mb-2" style="font-size:16px;">${exp.exp_organization}, ${exp.exp_location}</p>
            <p class="text-muted light mt-1 mb-2" style="font-size:14px;">${exp.exp_start_date} - ${exp.exp_end_date}</p>
            <p class="justified" style="font-size:16px;">${exp.exp_description}</p>
            </div>`
            })
        }

        //Education
        if (data.education[0].edu_degree != "" && data.education[0].edu_degree != null) {

            htmlTemplate += ` <div class="rela-block caps greyed">Education</div>`;
            data.education.forEach(education => {

                htmlTemplate += `
                <div>
                <h3 class="mb-0">${education.edu_degree}</h3>
                <p class="justified mt-0 mb-1" style="font-size: 16px;"><span class="text-muted light mt-0 mb-1">${education.edu_school}, ${education.edu_city}</span></p>
                <p class="text-muted light mt-0 mb-1">${education.edu_start_date}<span class="mx-2">to</span>${education.edu_graduation_date}</p>
                </div>`
            });
        }

        //Projects

        if (data.projects[0].proj_title != "" && data.projects[0].proj_title != null) {

            htmlTemplate += `<div class="rela-block caps greyed">Projects</div>`
            data.projects.forEach(project => {

                htmlTemplate += `
                <div>
                <h3>${project.proj_title}</h3>
                <p class="light mt-1 mb-2" style="font-size:16px;"><span class="mr-2"><i
                class="fas fa-link"></i></span>${project.proj_link}</p>
                <p class="justified" style="font-size:16px;">${project.proj_description}</p>
                </div>`
            });
        }

        htmlTemplate += `</div>
        </div>
        </div>
    </body>
</html>`
        return htmlTemplate;
    }
}
export default template2;