// Get form elements
const postForm = document.getElementById('post-form');
const postTitleInput = document.getElementById('post-title');
const postContentInput = document.getElementById('post-content');
const postsContainer = document.querySelector('.posts-container');

// Function to fetch and display posts
async function fetchPosts() {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    postsContainer.innerHTML = ''; // Clear existing posts

    // Loop through each post and create HTML elements
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('reddit-post');
        postDiv.innerHTML = `
            <div class="post-header">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-meta">Posted by u/user • ${post.timestamp}</p>
            </div>
            <div class="post-body">
                <p class="post-content">${post.content}</p>
            </div>
        `;
        postsContainer.prepend(postDiv); // Add the new post to the top
    });
}

// Function to handle form submission
postForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const postData = {
        title: postTitleInput.value,
        content: postContentInput.value,
    };

    // Send the data to the server
    await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });

    // Clear the form and refresh the displayed posts
    postTitleInput.value = '';
    postContentInput.value = '';
    fetchPosts();
});

// Fetch posts when the page loads
fetchPosts();
