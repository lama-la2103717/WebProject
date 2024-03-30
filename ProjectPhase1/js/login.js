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

function goToMain(e) {
    e.preventDefault(); 
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const user = users.find(user => user.username == username && user.password == password);

    if (user) {
    

        if (user.type == "customer") {
            let balance;
            let storedBalance = parseFloat(localStorage.getItem(`${username}_balance`));
            if (!isNaN(storedBalance)) {
                balance = storedBalance;
            } else {
                balance = user.balance;
                localStorage.setItem(`${username}_balance`, balance.toFixed(2)); 
            }
            const params = new URLSearchParams({
                type: user.type,
                username: username,
                balance: balance.toFixed(2),
                shipping_address: user.shipping_address
            });
            window.location.href = `main.html?${params.toString()}`;
            // window.location.href = `main.html?type=${encodeURIComponent(user.type)}&username=${encodeURIComponent(username)}&balance=${encodeURIComponent(balance.toFixed(2))}`;
        } else if (user.type == "seller") {
            window.location.href = `main.html?type=${encodeURIComponent(user.type)}&brand=${encodeURIComponent(user.company_name)}`;
        }
    } else {
        alert("No such user");
    }
}


