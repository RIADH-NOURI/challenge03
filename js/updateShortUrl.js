const updateShortUrl = async (id) => {
    const url = document.getElementById(`update-input-${id}`).value.trim();

    if (!url) {
        alert("URL cannot be empty!");
        return;
    }

    const token = localStorage.getItem('token');
    const shortenUrl = `https://www.shorten-url-api.infobrains.club/api/private/urls/${id}`;

    const response = await fetch(shortenUrl, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ url })
    });

    if (response.ok) {
        alert("URL updated successfully!");
        getShortUrls(); // Refresh the list after updating
    } else {
        alert("Failed to update URL. Please try again.");
    }
};
