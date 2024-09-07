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
let messageForm = document.querySelector("[name='leave message']");
let messageSection = document.getElementById('message-section');
let messageList = messageSection.querySelector('ul');
messageSection.hidden = true;
let idCounter = 0;

function makeId() {
    let id = 'entry' + idCounter++;
    return id;
}
let entryById={};

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;

    console.log('Name:', name);
    console.log('Email:' , email);
    console.log('Message' , message);
    let uid = makeId();
    let newMessage = document.createElement('li');
    newMessage.classList.add('message-item');

    newMessage.innerHTML = `<a href="mailto:${email} ">${name} </a><span>wrote: ${message} </span>`;
    newMessage.setAttribute('id' , uid);

    entryById[uid] = {usersName: name, usersEmail: email, usersMessage: message};
    newMessage.appendChild(makeEditButton());
    newMessage.appendChild(makeRemoveButton());

    messageList.appendChild(newMessage);
    messageForm.reset();
    messageSection.hidden = false;
});

function makeRemoveButton(){
    let removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click' , () => {
        let entry = removeButton.parentNode;
        let uidi = entry.getAttribute('id');
        delete entryById[uidi];
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.hidden = true;
        };
        });
        return removeButton;
    };

function makeEditButton(){
    let editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.type = 'button';
    editButton.className = 'edit-button';
    editButton.addEventListener('click' , () => {
        
        let entry = editButton.parentNode;

        let oldEditButton = entry.querySelector('button.remove-button');
        oldRemoveButton.hidden = true;

        let uid = entry.getAttribute('id');
        let clonedForm = messageForm.cloneNode(true);
        clonedForm.className = "edit-message-form";
        clonedForm.usersName.value = entryById[uid].usersName;
        clonedForm.usersEmail.value = entryById[uid].usersEmail;
        clonedForm.usersMessage.value = entryById[uid].usersMessage;
        entry.appendChild(clonedForm);
        clonedForm.addEventListener('submit' , function editMessage(event){
            event.preventDefault();
            entryById[uid].usersName = event.target.usersName.value;
            entryById[uid].usersEmail = event.target.usersEmail.value;
            entryById[uid].usersMessage = event.target.usersMessage.value;
            let newEntry = document.createElement('li');
            newEntry.classList.add('message-item');
            newEntry.setAttribute('id' , uid);
            newEntry.innerHTML = `<a href="mailto:${entryById[uid].usersEmail}">${entryById[uid].usersName}</a><span>wrote: ${message}`;
            newEntry.appendChild(makeEditButton());
            newEntry.appendChild(makeRemoveButton());
            entry.parentNode.replaceChild(newEntry, entry);
        });
    }); 
    return editButton; 
};
