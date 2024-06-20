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
