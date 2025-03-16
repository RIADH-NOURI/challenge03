const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('#loginEmail').value;
    const password = loginForm.querySelector('#loginPass').value;

    const url = 'https://www.shorten-url-api.infobrains.club/api/public/auth/login'
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const jsonResponse = await result.json();

    if (result.status === 500) {
        alert('Internal server error');
    }

    if (result.status === 400) {
        alert(jsonResponse.error.details);
    }

    if (result.status === 200) {
        const token = jsonResponse.data.accessToken;
        localStorage.setItem('token', token);
        window.location.href = '../pages/shorten.html';
    }
});
