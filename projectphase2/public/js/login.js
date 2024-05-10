const userFile="/json/users.json";
let users = [];

const loginB=document.querySelector('#form');

loginB.addEventListener('submit',goToMain);


document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/users',{ method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        users = await response.json();
    } catch (error) {
        console.error("Failed to load users:", error);
    }
});
function goToMain(e) {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const user = users.find(user => user.username == username && user.password == password);

    if (user) {
        if (user.type == "customer") {
            const params = new URLSearchParams({
                type: user.type,
                username: username,
                balance: user.balance,
                shipping_address: user.shipping_address
            });

            const deturl = params.toString().split("&").join('?');
            window.location.href = `main.html?${deturl}`;
        } else if (user.type == "seller") {
            window.location.href = `main.html?type=${encodeURIComponent(user.type)}?brand=${encodeURIComponent(user.username)}`;
        }
    } else {
        alert("No such user");
    }
}


