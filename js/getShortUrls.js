const shortenUrlList = document.getElementById('shorten-list');

const applyStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        #shorten-list {
            list-style: none;
            padding: 0;
        }
        .shorten-url {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .shorten-url a {
            color: #007bff;
            text-decoration: none;
            font-weight: bold;
        }
        .shorten-url__details {
            background: #eef;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
        }
        .details-btn, .update-btn, .delete-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 4px;
            margin-right: 5px;
        }
        .delete-btn {
            background: #dc3545;
        }
        .update-btn {
            background: #28a745;
        }
        .update-form {
            margin-top: 10px;
        }
        .update-form input {
            padding: 5px;
            margin-right: 5px;
        }
        .footer {
            position: fixed;
            bottom: 10px;
            right: 10px;
            font-size: 14px;
            font-weight: bold;
            color: #555;
        }
    `;
    document.head.appendChild(style);
};

const getShortUrls = async () => {
    const url = 'https://www.shorten-url-api.infobrains.club/api/private/urls';
    const token = localStorage.getItem('token');
    const page = 1;
    const limit = 10;

    const response = await fetch(`${url}?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const jsonResponse = await response.json();

    if (response.status === 500) {
        alert('Internal server error');
        return;
    }

    if (response.status === 401) {
        alert('Unauthorized');
        localStorage.removeItem('token');
        window.location.href = '/index.html';
        return;
    }

    if (response.status === 200) {
        const data = jsonResponse.data;
        shortenUrlList.innerHTML = '';

        data.forEach((shortUrl) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="shorten-url">
                    <div class="shorten-url__original-url">
                        <p><strong>Original:</strong> ${shortUrl.originalUrl}</p>
                    </div>
                    <div class="shorten-url__short-url">
                        <p><strong>Shortened:</strong> 
                            <a href="${shortUrl.shortUrl}" target="_blank" rel="noopener noreferrer">
                                ${shortUrl.shortUrl}
                            </a>
                        </p>
                    </div>
                    <button class="details-btn" onclick="toggleDetails('${shortUrl.id}')">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                    <div class="shorten-url__details" id="details-${shortUrl.id}" style="display: none;">
                        <div class="shorten-url__clicks">
                            <p><strong>Clicks:</strong> ${shortUrl.clicks}</p>
                        </div>
                        <div class="shorten-url__created-at">
                            <p><strong>Created At:</strong> ${new Date(shortUrl.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                    <button class="update-btn" onclick="showUpdateForm('${shortUrl.id}', '${shortUrl.originalUrl}')">
                        <i class="fas fa-edit"></i> Update
                    </button>
                    <button class="delete-btn" onclick="deleteShortUrl('${shortUrl.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                    
                </div>
            `;
            shortenUrlList.appendChild(li);
        });
    }
};

const toggleDetails = (id) => {
    const detailsDiv = document.getElementById(`details-${id}`);
    detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
};

const showUpdateForm = (id, originalUrl) => {
    let overlay = document.getElementById('update-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'update-overlay';
        overlay.className = 'update-overlay';
        document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
        <div class="update-form">
            <h3>Update URL</h3>
            <input type="text" id="update-input-${id}" value="${originalUrl}">
            <button class="update-btn" onclick="updateShortUrl('${id}')">Save</button>
            <button class="cancel-btn" onclick="closeUpdateForm()">Cancel</button>
        </div>
    `;

    overlay.style.display = 'flex';
};

const closeUpdateForm = () => {
    const overlay = document.getElementById('update-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
};


applyStyles();
getShortUrls();

const footer = document.createElement('div');
footer.className = 'footer';
footer.textContent = 'Created by V3NO & RIYADH';
document.body.appendChild(footer);
