
const footer = document.createElement("footer");
document.body.appendChild(footer);


const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement('p');
copyright.innerHTML = `© ${thisYear} James Simpko`; 
footer.appendChild(copyright);


const skills = ["JavaScript", "HTML", "CSS", "GitHub"];
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');


skillsList.innerHTML = '';

skills.forEach(skill => {
    const listItem = document.createElement('li');
    skill.textContent = skills[i];
    skillsList.appendChild(skill);
    listItem.textContent = skill;
    skillsList.appendChild(listItem);
});


let messageForm = document.querySelector("[name='leave message']");
let messageSection = document.getElementById('message-section');
let messageList = messageSection.querySelector('ul');
messageSection.hidden = true;
let idCounter = 0;


function makeId() {
    return 'entry' + idCounter++;
}

let entryById = {};


messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    let uid = makeId();
    let newMessage = document.createElement('li');
    newMessage.classList.add('message-item');
    newMessage.setAttribute('id', uid);
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a><span>wrote: ${message}</span>`;
    newMessage.appendChild(makeEditButton());
    newMessage.appendChild(makeRemoveButton());

    entryById[uid] = { usersName: name, usersEmail: email, usersMessage: message };
    messageList.appendChild(newMessage);
    messageForm.reset();
    messageSection.hidden = false;
});


function makeRemoveButton() {
    let removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
        let entry = removeButton.parentNode;
        let uidi = entry.getAttribute('id');
        delete entryById[uidi];
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.hidden = true;
        }
    });
    return removeButton;
}


function makeEditButton() {
    let editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.type = 'button';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', () => {
        let entry = editButton.parentNode;
        let removeButton = entry.querySelector('button.remove-button');
        removeButton.hidden = true;

        let uid = entry.getAttribute('id');
        let clonedForm = messageForm.cloneNode(true);
        clonedForm.className = "edit-message-form";
        clonedForm.usersName.value = entryById[uid].usersName;
        clonedForm.usersEmail.value = entryById[uid].usersEmail;
        clonedForm.usersMessage.value = entryById[uid].usersMessage;
        entry.appendChild(clonedForm);

        clonedForm.addEventListener('submit', function editMessage(event) {
            event.preventDefault();
            entryById[uid].usersName = event.target.usersName.value;
            entryById[uid].usersEmail = event.target.usersEmail.value;
            entryById[uid].usersMessage = event.target.usersMessage.value;
            let newEntry = document.createElement('li');
            newEntry.classList.add('message-item');
            newEntry.setAttribute('id', uid);
            newEntry.innerHTML = `<a href="mailto:${entryById[uid].usersEmail}">${entryById[uid].usersName}</a><span>wrote: ${entryById[uid].usersMessage}</span>`;
            newEntry.appendChild(makeEditButton());
            newEntry.appendChild(makeRemoveButton());
            entry.parentNode.replaceChild(newEntry, entry);
        });
    });
    return editButton;
}


const userName = 'simpkoj';
fetch(`https://api.github.com/users/${userName}/repos`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch repositories");
        }
        return response.json();
    })
    .then((repositories) => { 
        console.log(repositories);  

        const projectSection = document.getElementById("projects");
        let projectList = document.createElement("ul");
        projectSection.appendChild(projectList);

        repositories.forEach(repository => {
            let project = document.createElement("li");
            project.innerText = repository.name;
            projectList.appendChild(project);
        });
    })
    .catch((error) => {
        if (error instanceof SyntaxError) {
            console.error("Unparsable response from server");
        } else {
            console.error("Error fetching data", error.message);
        }
    });