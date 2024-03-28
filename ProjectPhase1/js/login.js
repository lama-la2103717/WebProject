const userFile="/json/users.json";
let users = [];

const loginB=document.querySelector('#form');

loginB.addEventListener('submit',goToMain);

document.addEventListener('DOMContentLoaded', async () => {
    if (localStorage.getItem('users')) {
        users = JSON.parse(localStorage.getItem('users'));
    } else {
        try {
            const response = await fetch(userFile);
            users = await response.json();
            localStorage.setItem('users', JSON.stringify(users));
        } catch (error) {
            console.error("Failed to load users:", error);
        }
    }
});



function goToMain(e){
    e.preventDefault(); 
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const user = users.find(user => user.username == username && user.password == password);
    console.log(`username ${username}, pass: ${password}, user ${user}`);
    if(user){
        if(user.type=="customer"){
            window.location.href = `main.html?type=${encodeURIComponent(user.type)}`;
        }
        else if (user.type=="seller") {
            
            window.location.href = `main.html?type=${encodeURIComponent(user.type)}?brand=${encodeURIComponent(user.company_name)}`;
        }
    }
    else{
       alert("no such user")
    }
}
