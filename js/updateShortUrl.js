

const updateShortUrl = async(id)=>{
    const url = document.querySelector('update-short-url').value;
    e.preventDefault();
    const token = localStorage.getItem('token');

    const shortenUrl = 'https://www.shorten-url-api.infobrains.club/api/private/urls';

    const response = await fetch(shortenUrl, {
        method: 'PACTH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url })
    });

     await response.json();


}