const footer = document.createElement("footer");
const body= document.querySelector("body")
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement('p');
copyright.innerHTML = `© ${thisYear} James Simpko`; 
footer.appendChild(copyright);
document.body.appendChild(copyright);

const skills = ["JavaScript","HTML","CSS","Github"];
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

for (let i = 0; i < skills.length; i++) {
    
    const skill = document.createElement('li');
    const listItem = document.createElement('li');
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
}
