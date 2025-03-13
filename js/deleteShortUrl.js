const deleteShortUrl = async (id) => {
    const url = `https://www.shorten-url-api.infobrains.club/api/private/urls/${id}`;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const jsonResponse = await response.json();
        console.log('Delete response:', jsonResponse);

        if (response.status === 401) {
            alert('Unauthorized');
            localStorage.removeItem('token');
            window.location.href = '/index.html';
        } else if (!response.ok) {
            alert('Failed to delete URL: ' + (jsonResponse.message || 'Unknown error'));
        } else {
            alert('URL deleted successfully');
            window.location.reload();
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
};
