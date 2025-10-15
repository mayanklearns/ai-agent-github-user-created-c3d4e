document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-user-23f3004197');
    const usernameInput = document.getElementById('username-input');
    const githubCreatedAtDiv = document.getElementById('github-created-at');
    const errorMessageDiv = document.getElementById('error-message');

    // Helper function to format date to YYYY-MM-DD UTC
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0] + ' UTC';
    };

    // Function to get query parameter from URL
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        githubCreatedAtDiv.style.display = 'none'; // Hide previous results
        errorMessageDiv.style.display = 'none';     // Hide previous errors

        const username = usernameInput.value.trim();
        if (!username) {
            errorMessageDiv.textContent = 'Please enter a GitHub username.';
            errorMessageDiv.style.display = 'block';
            return;
        }

        const token = getQueryParam('token');
        let headers = {};
        if (token) {
            headers['Authorization'] = `token ${token}`;
        }

        const apiUrl = `https://api.github.com/users/${username}`;

        try {
            const response = await fetch(apiUrl, { headers: headers });
            const data = await response.json();

            if (response.ok) {
                if (data.created_at) {
                    githubCreatedAtDiv.textContent = `Account created on: ${formatDate(data.created_at)}`;
                    githubCreatedAtDiv.style.display = 'block';
                } else {
                    errorMessageDiv.textContent = 'Could not find creation date for this user.';
                    errorMessageDiv.style.display = 'block';
                }
            } else {
                errorMessageDiv.textContent = data.message || 'Failed to fetch GitHub user data.';
                errorMessageDiv.style.display = 'block';
            }
        } catch (error) {
            errorMessageDiv.textContent = 'Network error or unable to connect to GitHub API.';
            errorMessageDiv.style.display = 'block';
            console.error('Fetch error:', error);
        }
    });
});
