function starRating() {
    var stars = document.getElementsByClassName("fas");
    var emoji = document.getElementById("emojis");
    var ratingInput = document.getElementById("ratingValue");

    for (let i = 0; i < stars.length; i++) {
        stars[i].onclick = function() {
            for (let j = 0; j < stars.length; j++) {
                if (j <= i) {
                    stars[j].style.color = "#CAF746";
                } else {
                    stars[j].style.color = "#e4e4e4";
                }
            }
            ratingInput.value = i + 1; 
            emoji.style.transform = `translateX(-${i * 100}px)`;
        };
    }
}