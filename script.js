document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const imageInput = document.getElementById('imageInput');
    const caption = document.getElementById('caption').value;

    if (imageInput.files.length === 0) {
        alert('Please select an image to upload.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        const imageURL = reader.result;

        const imageCard = document.createElement('div');
        imageCard.className = 'imageCard';

        imageCard.innerHTML = `
            <img src="${imageURL}" alt="Uploaded Image">
            <p>${caption}</p>
            <button class="likeBtn">Like <span class="likeCount">0</span></button>
            <textarea class="commentInput" placeholder="Add a comment..."></textarea>
            <div class="comments"></div>
        `;

        document.getElementById('imagesContainer').appendChild(imageCard);

        const likeBtn = imageCard.querySelector('.likeBtn');
        likeBtn.addEventListener('click', function () {
            const likeCount = likeBtn.querySelector('.likeCount');
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        });

        const commentInput = imageCard.querySelector('.commentInput');
        commentInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const comments = imageCard.querySelector('.comments');
                const commentText = commentInput.value;
                const comment = document.createElement('p');
                comment.textContent = commentText;
                comments.appendChild(comment);
                commentInput.value = '';
            }
        });
    };

    reader.readAsDataURL(imageInput.files[0]);
});
