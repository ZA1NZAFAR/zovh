async function fetchRepos() {
    const username = document.getElementById('username').value;
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const reposContainer = document.getElementById('repos');
        reposContainer.textContent = '';

        data.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('repo');

            const repoName = document.createElement('h2');
            repoName.textContent = repo.name;

            const repoDescription = document.createElement('p');
            repoDescription.textContent = repo.description;

            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = 'View on GitHub';

            repoDiv.appendChild(repoName);
            repoDiv.appendChild(repoDescription);
            repoDiv.appendChild(repoLink);

            reposContainer.appendChild(repoDiv);
        });
    } catch (error) {
        console.error(error);
    }
}
