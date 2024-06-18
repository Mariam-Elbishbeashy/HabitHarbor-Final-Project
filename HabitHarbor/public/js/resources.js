document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-form').submit();
    }
});

function handleArrowButtonClick() {
    window.location.href = '/resources';
  }