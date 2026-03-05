const translations = {
    en: {
        labels: {
            personalInfo: "Personal Info",
            experience: "Experience",
            education: "Education",
            languages: "Languages",
            skills: "Skills",
            contact: "Contact",
            profile: "Profile",
            projects: "Projects",
            activities: "Other Activities",
            references: "References",
            placeholderName: "Full Name",
            placeholderTitle: "Job Title",
            placeholderSummary: "Professional Summary..."
        },
        data: {
            name: "John Doe",
            title: "Software Engineer",
            email: "john@example.com",
            phone: "+1 234 567 890",
            location: "New York, USA",
            summary: "Experienced software engineer with a strong focus on frontend development.",
            skills: [{ name: 'JavaScript', level: 90 }, { name: 'React', level: 85 }, { name: 'Node.js', level: 75 }],
            experiences: [{ role: "Senior Developer", company: "Tech Solutions Inc.", date: "2020 - Present", desc: "Leading a team of 5 developers." }],
            educations: [{ degree: "B.Sc. Computer Science", school: "University of Technology", date: "2014 - 2018" }],
            languages: [{ lang: "English", level: "Native" }, { lang: "Spanish", level: "Intermediate" }],
            projects: [{ title: "E-commerce Platform", link: "github.com/johndoe/ecommerce", desc: "A full-stack e-commerce solution built with React and Node.js." }],
            activities: [{ title: "Open Source Contributor", role: "Volunteer", desc: "Contributing to various open-source projects on GitHub." }],
            references: [{ name: "Jane Smith", title: "CTO at Tech Solutions", contact: "jane.smith@techsolutions.com | +1 987 654 3210" }],
            photo: null
        }
    },
    fa: {
        labels: {
            personalInfo: "اطلاعات فردی",
            experience: "تجربه کاری",
            education: "تحصیلات",
            languages: "زبان‌ها",
            skills: "مهارت‌ها",
            contact: "تماس",
            profile: "درباره من",
            projects: "پروژه‌ها",
            activities: "فعالیت‌های دیگر",
            references: "معرف‌ها",
            placeholderName: "نام و نام خانوادگی",
            placeholderTitle: "عنوان شغلی",
            placeholderSummary: "خلاصه حرفه‌ای..."
        },
        data: {
            name: "علی رضایی",
            title: "مهندس نرم‌افزار",
            email: "ali.rezaei@example.com",
            phone: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
            location: "تهران، ایران",
            summary: "مهندس نرم‌افزار با تجربه با تمرکز قوی بر توسعه فرانت‌اند.",
            skills: [{ name: 'جاوااسکریپت', level: 90 }, { name: 'ری‌اکت', level: 85 }, { name: 'نود جی‌اس', level: 75 }],
            experiences: [{ role: "توسعه‌دهنده ارشد", company: "شرکت فناوری نوین", date: "۱۳۹۹ - اکنون", desc: "رهبری تیم ۵ نفره توسعه‌دهندگان." }],
            educations: [{ degree: "کارشناسی مهندسی کامپیوتر", school: "دانشگاه صنعتی شریف", date: "۱۳۳ - ۱۹۷" }],
            languages: [{ lang: "فارسی", level: "زبان مادری" }, { lang: "انگلیسی", level: "پیشرفته" }],
            projects: [{ title: "پلتفرم فروشگاهی", link: "github.com/alirezaei/ecommerce", desc: "یک راه‌حل فروشگاهی فول‌استک ساخته شده با ری‌اکت و نود جی‌اس." }],
            activities: [{ title: "مشارکت‌کننده متن‌باز", role: "داوطلب", desc: "مشارکت در پروژه‌های متن‌باز مختلف در گیت‌هاب." }],
            references: [{ name: "مریم احمدی", title: "مدیر فنی در شرکت فناوری نوین", contact: "maryam.ahmadi@novin-tech.ir | ۰۹۱۲ ۱۱۱ ۲۲۲۲" }],
            photo: null
        }
    }
};

let currentLang = 'en';
let cvData = {};

function init() {
    loadLanguageData('en');
    renderEditorInputs();
    renderPreview();
    updateLabels();
}

function setLanguage(lang) {
    currentLang = lang;
    loadLanguageData(lang);
    const html = document.documentElement;
    const editorPanel = document.getElementById('editor-panel');
    const langEn = document.getElementById('btn-en');
    const langFa = document.getElementById('btn-fa');

    if (lang === 'fa') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'fa');
        html.classList.add('font-fa');
        editorPanel.classList.add('border-l');
        editorPanel.classList.remove('border-r');
        langFa.classList.add('bg-blue-100', 'text-blue-700');
        langFa.classList.remove('hover:bg-gray-100');
        langEn.classList.remove('bg-blue-100', 'text-blue-700');
        langEn.classList.add('hover:bg-gray-100');
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        html.classList.remove('font-fa');
        editorPanel.classList.add('border-r');
        editorPanel.classList.remove('border-l');
        langEn.classList.add('bg-blue-100', 'text-blue-700');
        langEn.classList.remove('hover:bg-gray-100');
        langFa.classList.remove('bg-blue-100', 'text-blue-700');
        langFa.classList.add('hover:bg-gray-100');
    }

    updateLabels();
    renderEditorInputs();
    renderPreview();
}

function loadLanguageData(lang) {
    const t = translations[lang];
    cvData = JSON.parse(JSON.stringify(t.data));
    document.getElementById('inp-name').placeholder = t.labels.placeholderName;
    document.getElementById('inp-title').placeholder = t.labels.placeholderTitle;
    document.getElementById('inp-summary').placeholder = t.labels.placeholderSummary;

    const thumbImg = document.getElementById('thumb-img');
    const thumbPlaceholder = document.getElementById('thumb-placeholder');
    thumbImg.classList.add('hidden');
    thumbPlaceholder.classList.remove('hidden');
    document.getElementById('inp-photo').value = "";
}

function updateLabels() {
    const t = translations[currentLang].labels;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });
}

function handlePhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            cvData.photo = e.target.result;
            const thumbImg = document.getElementById('thumb-img');
            const thumbPlaceholder = document.getElementById('thumb-placeholder');
            thumbImg.src = cvData.photo;
            thumbImg.classList.remove('hidden');
            thumbPlaceholder.classList.add('hidden');
            renderPreview();
        };
        reader.readAsDataURL(file);
    }
}

function updateData() {
    cvData.name = document.getElementById('inp-name').value;
    cvData.title = document.getElementById('inp-title').value;
    cvData.email = document.getElementById('inp-email').value;
    cvData.phone = document.getElementById('inp-phone').value;
    cvData.location = document.getElementById('inp-location').value;
    cvData.summary = document.getElementById('inp-summary').value;
    renderPreview();
}

function updateItem(category, index, field, value) {
    if(cvData[category] && cvData[category][index]) {
        cvData[category][index][field] = value;
        renderPreview();
    }
}

function removeItem(category, index) {
    if(cvData[category]) {
        cvData[category].splice(index, 1);
        renderEditorInputs();
        renderPreview();
    }
}

function addExperience() { 
    if(!cvData.experiences) cvData.experiences = [];
    cvData.experiences.push({ role: "", company: "", date: "", desc: "" }); 
    renderEditorInputs(); 
    renderPreview(); 
}

function addEducation() { 
    if(!cvData.educations) cvData.educations = [];
    cvData.educations.push({ degree: "", school: "", date: "" }); 
    renderEditorInputs(); 
    renderPreview(); 
}

function addLanguage() { 
    if(!cvData.languages) cvData.languages = [];
    cvData.languages.push({ lang: "", level: "" }); 
    renderEditorInputs(); 
    renderPreview(); 
}

function addSkill() { 
    if (!cvData.skills) cvData.skills = []; 
    cvData.skills.push({ name: "", level: 50 }); 
    renderEditorInputs(); 
    renderPreview(); 
}

function addProject() { 
    if(!cvData.projects) cvData.projects = [];
    cvData.projects.push({ title: "", link: "", desc: "" }); 
    renderEditorInputs(); 
    renderPreview(); 
}

function addActivity() { 
    if(!cvData.activities) cvData.activities = [];
    cvData.activities.push({ title: "", role: "", desc: "" }); 
    renderEditorInputs(); 
    renderPreview(); 
}

function addReference() { 
    if(!cvData.references) cvData.references = [];
    cvData.references.push({ name: "", title: "", contact: "" }); 
    renderEditorInputs(); 
    renderPreview(); 
}

function renderEditorInputs() {
    const skillsContainer = document.getElementById('editor-skills-list');
    if (cvData.skills) {
        skillsContainer.innerHTML = cvData.skills.map((skill, index) => `
            <div class="flex gap-2 items-center">
                <input type="text" value="${skill.name}" oninput="updateItem('skills', ${index}, 'name', this.value)" class="flex-1 border rounded px-2 py-1 text-sm" placeholder="Skill">
                <input type="number" value="${skill.level}" min="0" max="100" oninput="updateItem('skills', ${index}, 'level', this.value)" class="w-16 border rounded px-2 py-1 text-sm">
                <button onclick="removeItem('skills', ${index})" class="text-red-400 hover:text-red-600"><i class="fas fa-times"></i></button>
            </div>
        `).join('');
    }

    const expContainer = document.getElementById('editor-experience-list');
    if(cvData.experiences) {
        expContainer.innerHTML = cvData.experiences.map((exp, index) => `
            <div class="bg-gray-50 p-3 rounded-lg border relative">
                <button onclick="removeItem('experiences', ${index})" class="absolute top-2 end-2 text-red-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
                <input type="text" value="${exp.role}" oninput="updateItem('experiences', ${index}, 'role', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm font-bold" placeholder="Role">
                <input type="text" value="${exp.company}" oninput="updateItem('experiences', ${index}, 'company', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm" placeholder="Company">
                <input type="text" value="${exp.date}" oninput="updateItem('experiences', ${index}, 'date', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm" placeholder="Date">
                <textarea oninput="updateItem('experiences', ${index}, 'desc', this.value)" class="w-full border rounded px-3 py-2 text-sm" rows="2" placeholder="Description">${exp.desc}</textarea>
            </div>
        `).join('');
    }

    const eduContainer = document.getElementById('editor-education-list');
    if(cvData.educations) {
        eduContainer.innerHTML = cvData.educations.map((edu, index) => `
            <div class="bg-gray-50 p-3 rounded-lg border relative">
                <button onclick="removeItem('educations', ${index})" class="absolute top-2 end-2 text-red-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
                <input type="text" value="${edu.degree}" oninput="updateItem('educations', ${index}, 'degree', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm font-bold" placeholder="Degree">
                <input type="text" value="${edu.school}" oninput="updateItem('educations', ${index}, 'school', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm" placeholder="School">
                <input type="text" value="${edu.date}" oninput="updateItem('educations', ${index}, 'date', this.value)" class="w-full border rounded px-3 py-2 text-sm" placeholder="Date">
            </div>
        `).join('');
    }

    const langContainer = document.getElementById('editor-language-list');
    if(cvData.languages) {
        langContainer.innerHTML = cvData.languages.map((lang, index) => `
            <div class="flex gap-2">
                <input type="text" value="${lang.lang}" oninput="updateItem('languages', ${index}, 'lang', this.value)" class="flex-1 border rounded px-2 py-2 text-sm" placeholder="Language">
                <input type="text" value="${lang.level}" oninput="updateItem('languages', ${index}, 'level', this.value)" class="flex-1 border rounded px-2 py-2 text-sm" placeholder="Level">
                <button onclick="removeItem('languages', ${index})" class="text-red-400 hover:text-red-600"><i class="fas fa-times"></i></button>
            </div>
        `).join('');
    }

    const projectsContainer = document.getElementById('editor-projects-list');
    if(cvData.projects) {
        projectsContainer.innerHTML = cvData.projects.map((project, index) => `
            <div class="bg-gray-50 p-3 rounded-lg border relative">
                <button onclick="removeItem('projects', ${index})" class="absolute top-2 end-2 text-red-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
                <input type="text" value="${project.title}" oninput="updateItem('projects', ${index}, 'title', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm font-bold" placeholder="Project Title">
                <input type="text" value="${project.link}" oninput="updateItem('projects', ${index}, 'link', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm" placeholder="Link (e.g., GitHub URL)">
                <textarea oninput="updateItem('projects', ${index}, 'desc', this.value)" class="w-full border rounded px-3 py-2 text-sm" rows="2" placeholder="Description">${project.desc}</textarea>
            </div>
        `).join('');
    }

    const activitiesContainer = document.getElementById('editor-activities-list');
    if(cvData.activities) {
        activitiesContainer.innerHTML = cvData.activities.map((activity, index) => `
            <div class="bg-gray-50 p-3 rounded-lg border relative">
                <button onclick="removeItem('activities', ${index})" class="absolute top-2 end-2 text-red-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
                <input type="text" value="${activity.title}" oninput="updateItem('activities', ${index}, 'title', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm font-bold" placeholder="Activity Title">
                <input type="text" value="${activity.role}" oninput="updateItem('activities', ${index}, 'role', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm" placeholder="Role">
                <textarea oninput="updateItem('activities', ${index}, 'desc', this.value)" class="w-full border rounded px-3 py-2 text-sm" rows="2" placeholder="Description">${activity.desc}</textarea>
            </div>
        `).join('');
    }

    const referencesContainer = document.getElementById('editor-references-list');
    if(cvData.references) {
        referencesContainer.innerHTML = cvData.references.map((ref, index) => `
            <div class="bg-gray-50 p-3 rounded-lg border relative">
                <button onclick="removeItem('references', ${index})" class="absolute top-2 end-2 text-red-400 hover:text-red-600"><i class="fas fa-trash"></i></button>
                <input type="text" value="${ref.name}" oninput="updateItem('references', ${index}, 'name', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm font-bold" placeholder="Reference Name">
                <input type="text" value="${ref.title}" oninput="updateItem('references', ${index}, 'title', this.value)" class="w-full mb-2 border rounded px-3 py-2 text-sm" placeholder="Title/Position">
                <input type="text" value="${ref.contact}" oninput="updateItem('references', ${index}, 'contact', this.value)" class="w-full border rounded px-3 py-2 text-sm" placeholder="Contact Info (Email/Phone)">
            </div>
        `).join('');
    }

    document.getElementById('inp-name').value = cvData.name || '';
    document.getElementById('inp-title').value = cvData.title || '';
    document.getElementById('inp-email').value = cvData.email || '';
    document.getElementById('inp-phone').value = cvData.phone || '';
    document.getElementById('inp-location').value = cvData.location || '';
    document.getElementById('inp-summary').value = cvData.summary || '';

    if (cvData.photo) {
        const thumbImg = document.getElementById('thumb-img');
        const thumbPlaceholder = document.getElementById('thumb-placeholder');
        thumbImg.src = cvData.photo;
        thumbImg.classList.remove('hidden');
        thumbPlaceholder.classList.add('hidden');
    }
}

function renderPreview() {
    const container = document.getElementById('cv-preview');
    const currentLayout = document.getElementById('templateSelector').value;
    const t = translations[currentLang].labels;
    
    const imgHTML = cvData.photo ? `<img src="${cvData.photo}" class="profile-img profile-img-circle">` : '';
    const imgSquareHTML = cvData.photo ? `<img src="${cvData.photo}" class="profile-img profile-img-square">` : '';
    const imgSmallHTML = cvData.photo ? `<img src="${cvData.photo}" class="profile-img profile-img-small">` : '';

    const skillsHTML = cvData.skills ? cvData.skills.map(skill => `
        <div class="mb-3">
            <div class="flex justify-between text-sm mb-1"><span>${skill.name}</span><span>${skill.level}%</span></div>
            <div class="w-full bg-gray-200 rounded-full h-2"><div class="theme-bg h-2 rounded-full skill-bar" style="width: ${skill.level}%"></div></div>
        </div>
    `).join('') : '';

    const expHTML = cvData.experiences ? cvData.experiences.map(exp => `
        <div class="mb-4">
            <div class="flex justify-between items-baseline flex-wrap gap-2">
                <h4 class="font-bold text-gray-800">${exp.role}</h4>
                <span class="text-xs text-gray-500">${exp.date}</span>
            </div>
            <div class="text-sm font-semibold theme-text mb-1">${exp.company}</div>
            <p class="text-sm text-gray-600 text-start">${exp.desc}</p>
        </div>
    `).join('') : '';

    const eduHTML = cvData.educations ? cvData.educations.map(edu => `
        <div class="mb-3 text-sm">
            <div class="font-bold">${edu.degree}</div>
            <div class="text-gray-600">${edu.school}</div>
            <div class="text-xs text-gray-400">${edu.date}</div>
        </div>
    `).join('') : '';

    const langHTML = cvData.languages ? cvData.languages.map(l => `<li class="flex justify-between text-sm"><span>${l.lang}</span><span class="font-bold">${l.level}</span></li>`).join('') : '';

    const projectsHTML = cvData.projects ? cvData.projects.map(p => `
        <div class="project-item mb-3">
            <div class="project-title font-bold text-gray-800">${p.title}</div>
            ${p.link ? `<div class="project-link text-xs text-blue-600 italic mb-1"><a href="${p.link}" target="_blank" class="hover:underline">${p.link}</a></div>` : ''}
            <p class="text-sm text-gray-600 text-start">${p.desc}</p>
        </div>
    `).join('') : '';

    const activitiesHTML = cvData.activities ? cvData.activities.map(a => `
        <div class="activity-item mb-3">
            <div class="activity-title font-bold text-gray-800">${a.title}</div>
            ${a.role ? `<div class="activity-role text-xs text-gray-500 italic mb-1">${a.role}</div>` : ''}
            <p class="text-sm text-gray-600 text-start">${a.desc}</p>
        </div>
    `).join('') : '';
    
    const referencesHTML = cvData.references ? cvData.references.map(r => `
        <div class="reference-item mb-3">
            <div class="reference-name font-bold text-gray-800">${r.name}</div>
            <div class="reference-title text-xs text-gray-600">${r.title}</div>
            <div class="reference-contact text-xs text-gray-500">${r.contact}</div>
        </div>
    `).join('') : '';

    if (currentLayout === 'layout-1') {
        container.innerHTML = `
            <div class="cv-sidebar space-y-6">
                <div class="mb-4">${imgHTML}</div>
                <div><h3 class="section-title">${t.contact}</h3><div class="text-sm text-start">${cvData.email}<br>${cvData.phone}<br>${cvData.location}</div></div>
                ${skillsHTML ? `<div><h3 class="section-title">${t.skills}</h3>${skillsHTML}</div>` : ''}
                <div><h3 class="section-title">${t.languages}</h3><ul class="text-sm space-y-1">${langHTML}</ul></div>
                <div><h3 class="section-title">${t.education}</h3>${eduHTML}</div>
            </div>
            <div class="cv-main">
                <div class="mb-6"><h1 class="text-3xl font-bold theme-text uppercase">${cvData.name}</h1><p class="text-lg text-gray-600">${cvData.title}</p></div>
                <div class="mb-6"><h3 class="section-title">${t.profile}</h3><p class="text-sm text-gray-600 text-start">${cvData.summary}</p></div>
                <div class="mb-6"><h3 class="section-title">${t.experience}</h3>${expHTML}</div>
                ${projectsHTML ? `<div class="mb-6"><h3 class="section-title">${t.projects}</h3>${projectsHTML}</div>` : ''}
                ${activitiesHTML ? `<div class="mb-6"><h3 class="section-title">${t.activities}</h3>${activitiesHTML}</div>` : ''}
                ${referencesHTML ? `<div class="mb-6"><h3 class="section-title">${t.references}</h3>${referencesHTML}</div>` : ''}
            </div>`;
    }
    else if (currentLayout === 'layout-2') {
        container.innerHTML = `
            <div class="cv-sidebar">
                <div class="mb-6">${imgHTML}</div>
                <div class="mb-8"><h1 class="text-2xl font-bold">${cvData.name}</h1><p class="text-sm opacity-75">${cvData.title}</p></div>
                <div class="mb-8"><h3 class="section-title">${t.contact}</h3><div class="text-sm">${cvData.email}<br>${cvData.phone}</div></div>
                <div><h3 class="section-title">${t.education}</h3>${eduHTML}</div>
            </div>
            <div class="cv-main">
                <div class="mb-8"><h3 class="section-title">${t.profile}</h3><p class="text-gray-600 text-start">${cvData.summary}</p></div>
                <div class="mb-8"><h3 class="section-title">${t.experience}</h3>${expHTML}</div>
                ${projectsHTML ? `<div class="mb-8"><h3 class="section-title">${t.projects}</h3>${projectsHTML}</div>` : ''}
                ${activitiesHTML ? `<div class="mb-8"><h3 class="section-title">${t.activities}</h3>${activitiesHTML}</div>` : ''}
                ${referencesHTML ? `<div class="mb-8"><h3 class="section-title">${t.references}</h3>${referencesHTML}</div>` : ''}
            </div>`;
    }
    else if (currentLayout === 'layout-3') {
        container.innerHTML = `
            <div class="cv-header-block">${imgSquareHTML}<div><h1>${cvData.name}</h1><p class="opacity-90">${cvData.title}</p></div><div class="ms-auto text-end text-sm">${cvData.email}<br>${cvData.phone}</div></div>
            <div class="cv-body">
                <div class="full-width"><h3 class="section-title">${t.profile}</h3><p class="text-gray-600 text-start mb-6">${cvData.summary}</p></div>
                <div><h3 class="section-title">${t.experience}</h3>${expHTML}</div>
                <div><h3 class="section-title">${t.education}</h3>${eduHTML}</div>
                ${projectsHTML ? `<div class="full-width"><h3 class="section-title">${t.projects}</h3>${projectsHTML}</div>` : ''}
                ${activitiesHTML ? `<div class="full-width"><h3 class="section-title">${t.activities}</h3>${activitiesHTML}</div>` : ''}
                ${referencesHTML ? `<div class="full-width"><h3 class="section-title">${t.references}</h3>${referencesHTML}</div>` : ''}
            </div>`;
    }
    else if (currentLayout === 'layout-4') {
        container.innerHTML = `
            <div class="cv-header"><div class="cv-header-left">${imgSmallHTML}<div><h1>${cvData.name}</h1><p>${cvData.title}</p></div></div><div class="text-end text-sm text-gray-500">${cvData.email}<br>${cvData.phone}</div></div>
            <div class="mb-8"><h3 class="section-title">${t.profile}</h3><p class="text-gray-600 text-start">${cvData.summary}</p></div>
            <div class="mb-8"><h3 class="section-title">${t.experience}</h3>${expHTML}</div>
            <div class="mb-8"><h3 class="section-title">${t.education}</h3>${eduHTML}</div>
            ${projectsHTML ? `<div class="mb-8"><h3 class="section-title">${t.projects}</h3>${projectsHTML}</div>` : ''}
            ${activitiesHTML ? `<div class="mb-8"><h3 class="section-title">${t.activities}</h3>${activitiesHTML}</div>` : ''}
            ${referencesHTML ? `<div class="mb-8"><h3 class="section-title">${t.references}</h3>${referencesHTML}</div>` : ''}
        `;
    }
    else if (currentLayout === 'layout-5') {
        container.innerHTML = `
            <div class="cv-header">${imgHTML}<h1 class="mt-4">${cvData.name}</h1><p class="text-gray-600">${cvData.title}</p><div class="text-sm text-gray-500 mt-2">${cvData.email} | ${cvData.phone}</div></div>
            <div class="content-grid">
                <div>
                    <h3 class="section-title">${t.profile}</h3><p class="text-sm text-start">${cvData.summary}</p>
                    <h3 class="section-title">${t.education}</h3>${eduHTML}
                </div>
                <div>
                    <h3 class="section-title">${t.experience}</h3>${expHTML}
                    ${projectsHTML ? `<h3 class="section-title">${t.projects}</h3>${projectsHTML}` : ''}
                </div>
            </div>
            ${activitiesHTML ? `<div class="mt-6"><h3 class="section-title">${t.activities}</h3>${activitiesHTML}</div>` : ''}
            ${referencesHTML ? `<div class="mt-6"><h3 class="section-title">${t.references}</h3>${referencesHTML}</div>` : ''}
        `;
    }
    else if (currentLayout === 'layout-6') {
        container.innerHTML = `
            <div class="cv-header">${imgSmallHTML}<div><h1>${cvData.name}</h1><p>${cvData.title}</p></div></div>
            <div class="mb-6"><h3 class="section-title">${t.profile}</h3><p class="text-gray-600 text-start">${cvData.summary}</p></div>
            <div class="mb-6"><h3 class="section-title">${t.experience}</h3>${expHTML}</div>
            <div class="grid grid-cols-2 gap-6">
                <div><h3 class="section-title">${t.education}</h3>${eduHTML}</div>
                <div><h3 class="section-title">${t.skills}</h3>${skillsHTML}</div>
            </div>
            ${projectsHTML ? `<div class="mt-6"><h3 class="section-title">${t.projects}</h3>${projectsHTML}</div>` : ''}
            ${activitiesHTML ? `<div class="mt-6"><h3 class="section-title">${t.activities}</h3>${activitiesHTML}</div>` : ''}
            ${referencesHTML ? `<div class="mt-6"><h3 class="section-title">${t.references}</h3>${referencesHTML}</div>` : ''}
        `;
    }
    else if (currentLayout === 'layout-7') {
        container.innerHTML = `
            <div class="cv-header">${imgHTML}<h1 class="mt-4">${cvData.name}</h1><p>${cvData.title}</p><div class="text-sm text-gray-500 mt-2">${cvData.email} | ${cvData.phone} | ${cvData.location}</div></div>
            <div class="content-wrapper">
                <h3 class="section-title">${t.profile}</h3><p class="text-gray-600 text-start mb-6">${cvData.summary}</p>
                <h3 class="section-title">${t.experience}</h3>${expHTML}
                <h3 class="section-title">${t.education}</h3>${eduHTML}
                ${projectsHTML ? `<h3 class="section-title">${t.projects}</h3>${projectsHTML}` : ''}
                ${activitiesHTML ? `<h3 class="section-title">${t.activities}</h3>${activitiesHTML}` : ''}
                ${referencesHTML ? `<h3 class="section-title">${t.references}</h3>${referencesHTML}` : ''}
            </div>`;
    }
    else if (currentLayout === 'layout-8') {
        container.innerHTML = `
            <div class="cv-header"><div><h1>${cvData.name}</h1><p class="opacity-90">${cvData.title}</p></div><div class="text-end text-sm opacity-90">${cvData.email}<br>${cvData.phone}</div></div>
            <div class="cv-body">
                <div class="cv-sidebar">
                    <h3 class="section-title">${t.contact}</h3><div class="text-sm text-gray-600">${cvData.location}</div>
                    <h3 class="section-title">${t.skills}</h3>${skillsHTML}
                    <h3 class="section-title">${t.languages}</h3><ul class="text-sm text-gray-600 space-y-1">${langHTML}</ul>
                </div>
                <div class="cv-main">
                    <h3 class="section-title">${t.profile}</h3><p class="text-gray-600 text-start">${cvData.summary}</p>
                    <h3 class="section-title">${t.experience}</h3>${expHTML}
                    <h3 class="section-title">${t.education}</h3>${eduHTML}
                    ${projectsHTML ? `<h3 class="section-title">${t.projects}</h3>${projectsHTML}` : ''}
                    ${activitiesHTML ? `<h3 class="section-title">${t.activities}</h3>${activitiesHTML}` : ''}
                    ${referencesHTML ? `<h3 class="section-title">${t.references}</h3>${referencesHTML}` : ''}
                </div>
            </div>`;
    }
    else if (currentLayout === 'layout-9') {
        container.innerHTML = `
            <div class="cv-header"><div><h1>${cvData.name}</h1><p>${cvData.title}</p></div><div class="text-end text-sm text-gray-500">${cvData.email}<br>${cvData.phone}<br>${cvData.location}</div></div>
            <div class="two-column">
                <div>
                    <h3 class="section-title">${t.profile}</h3><p class="text-gray-600 text-sm text-start">${cvData.summary}</p>
                    <h3 class="section-title">${t.experience}</h3>${expHTML}
                    ${projectsHTML ? `<h3 class="section-title">${t.projects}</h3>${projectsHTML}` : ''}
                </div>
                <div>
                    <h3 class="section-title">${t.education}</h3>${eduHTML}
                    <h3 class="section-title">${t.skills}</h3>${skillsHTML}
                    ${activitiesHTML ? `<h3 class="section-title">${t.activities}</h3>${activitiesHTML}` : ''}
                    ${referencesHTML ? `<h3 class="section-title">${t.references}</h3>${referencesHTML}` : ''}
                </div>
            </div>`;
    }
    else if (currentLayout === 'layout-10') {
        container.innerHTML = `
            <div class="cv-sidebar">
                <div class="sidebar-item">${imgHTML}</div>
                <div class="sidebar-item">
                    <h3 class="section-title">${t.contact}</h3>
                    <div class="contact-item"><i class="fas fa-envelope"></i> ${cvData.email}</div>
                    <div class="contact-item"><i class="fas fa-phone"></i> ${cvData.phone}</div>
                    <div class="contact-item"><i class="fas fa-map-marker-alt"></i> ${cvData.location}</div>
                </div>
                <div class="sidebar-item"><h3 class="section-title">${t.skills}</h3>${skillsHTML}</div>
                <div class="sidebar-item"><h3 class="section-title">${t.languages}</h3><ul class="text-sm space-y-1">${langHTML}</ul></div>
            </div>
            <div class="cv-main">
                <div class="mb-6"><h1 class="text-3xl font-bold" style="color: var(--primary-color)">${cvData.name}</h1><p class="text-lg text-gray-600">${cvData.title}</p></div>
                <div class="mb-6"><h3 class="section-title">${t.profile}</h3><p class="text-gray-600 text-start">${cvData.summary}</p></div>
                <div class="mb-6"><h3 class="section-title">${t.experience}</h3>${expHTML}</div>
                <div class="mb-6"><h3 class="section-title">${t.education}</h3>${eduHTML}</div>
                ${projectsHTML ? `<div class="mb-6"><h3 class="section-title">${t.projects}</h3>${projectsHTML}</div>` : ''}
                ${activitiesHTML ? `<div class="mb-6"><h3 class="section-title">${t.activities}</h3>${activitiesHTML}</div>` : ''}
                ${referencesHTML ? `<div class="mb-6"><h3 class="section-title">${t.references}</h3>${referencesHTML}</div>` : ''}
            </div>`;
    }
}

function changeTemplate() {
    const preview = document.getElementById('cv-preview');
    const layout = document.getElementById('templateSelector').value;
    preview.className = '';
    preview.classList.add(layout);
    renderPreview();
}

function changeColor() {
    const color = document.getElementById('colorPicker').value;
    document.documentElement.style.setProperty('--primary-color', color);
}

function saveCV() {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = (cvData.name || 'my_cv').replace(/\s+/g, '_') + '_CV.json';
    link.click();
    URL.revokeObjectURL(url);
    alert('CV Saved!');
}

function loadCV(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            cvData = JSON.parse(e.target.result);
            document.getElementById('inp-name').value = cvData.name || '';
            document.getElementById('inp-title').value = cvData.title || '';
            document.getElementById('inp-email').value = cvData.email || '';
            document.getElementById('inp-phone').value = cvData.phone || '';
            document.getElementById('inp-location').value = cvData.location || '';
            document.getElementById('inp-summary').value = cvData.summary || '';
            if (cvData.photo) {
                const thumbImg = document.getElementById('thumb-img');
                const thumbPlaceholder = document.getElementById('thumb-placeholder');
                thumbImg.src = cvData.photo;
                thumbImg.classList.remove('hidden');
                thumbPlaceholder.classList.add('hidden');
            }
            renderEditorInputs();
            renderPreview();
            alert('CV Loaded!');
        } catch (error) {
            alert('Error loading file');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function downloadWord() {
    try {
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + document.getElementById("cv-preview").innerHTML + footer;
        const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = (cvData.name || 'my_cv').replace(/\s+/g, '_') + '_CV.doc';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        alert('Error downloading Word file');
    }
}

window.addEventListener('DOMContentLoaded', init);