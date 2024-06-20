document.addEventListener("DOMContentLoaded", function() {
    const commentBtns = document.querySelectorAll('.comment-btn');

    commentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const commentInput = btn.parentElement.querySelector('.comment-input'); 
            const commentList = btn.parentElement.querySelector('.comment-list'); 
            commentInput.classList.toggle('show-comment-input');
            commentList.classList.toggle('show-comment-list');
        });
    });
});

document.getElementById('image-input').addEventListener('change', function(event) {
    var imagePreview = document.getElementById('image-preview');
    imagePreview.innerHTML = ''; // Clear any existing content

    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var img = document.createElement('img');
            img.src = e.target.result;
            img.alt = 'Selected Image';
            img.style.maxWidth = '100px';
            img.style.maxHeight = '200px';
            imagePreview.appendChild(img);
        };

        reader.readAsDataURL(file);

        // Alternatively, you can display a message if you prefer
         //imagePreview.innerText = 'Image selected: ' + file.name;
    } else {
        imagePreview.innerText = 'No image selected';
    }
});