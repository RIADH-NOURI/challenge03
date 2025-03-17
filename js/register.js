const registerForm = document.getElementById('signupForm');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = registerForm.querySelector('#signupUsername').value;
    const email = registerForm.querySelector('#signupEmail').value;
    const password = registerForm.querySelector('#signupPass').value;

    const url = 'https://www.shorten-url-api.infobrains.club/api/public/auth/register'

    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    })

    const jsonResponse = await result.json();

    if (result.status === 500) {
        alert('Internal server error');
    }

    if (result.status === 409) {
        alert('Email already exists');
    }

    if (result.status === 400) {
        alert(jsonResponse.error.details);
    }

    if (result.status === 201) {
        const token = jsonResponse.data.accessToken;
        localStorage.setItem('token', token);
        window.location.href = '../shorten.html';
    }
});
