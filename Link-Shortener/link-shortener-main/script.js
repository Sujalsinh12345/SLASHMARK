document.getElementById('shorten-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const shortenedUrl = shortenUrl(url);
    document.getElementById('shortened-url').innerHTML = `<a href="${shortenedUrl}" target="_blank">${shortenedUrl}</a>`;
    document.getElementById('result').classList.remove('hidden');
});

function shortenUrl(url) {
    // Mock URL shortening function
    const randomString = Math.random().toString(36).substring(7);
    return `https://short.ly/${randomString}`;
}
