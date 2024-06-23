//event listener that shows the progress bar after clicking on the start button
document.addEventListener("click", function(event) {
    // Check if the clicked element is a start button with an ID starting with "start-btn-"
    if (event.target.matches('button[id^="start-btn-"]')) {
        var button = event.target;
        // Hide the start button
        button.style.display = "none";

        // Find the activity container
        var activityContainer = button.closest(".wactivity") || button.closest(".mactivity");

        if (activityContainer) {
            var loader = activityContainer.querySelector(".loader");
            var progress = activityContainer.querySelector(".progress");
            var completionBtn = activityContainer.querySelector(".completion-btn");

            // Show the elements
            if (loader) loader.style.visibility = "visible";
            if (progress) progress.style.visibility = "visible";
            if (completionBtn) completionBtn.style.visibility = "visible";

            var progressValue = 0;
            activityContainer.style.setProperty("--progress-value", progressValue + "%");
            if (progress) progress.innerHTML = progressValue + "%";
            if (loader) loader.style.setProperty("--progress-value", progressValue + "%");
        }
    }
});


function dailyValidate() {
    var inputTitle = document.querySelector("#input-title");
    var inputContent = document.querySelector("#input-content");

    // Check if either input is empty
    if (inputTitle.value === "" && inputContent.value === "") {
        alert("The challenge title and its content cannot be empty.");
    } else if (inputTitle.value === "") {
        alert("The challenge title cannot be empty.");
    } else if (inputContent.value === "") {
        alert("The challenge content cannot be empty.");
    }
}
function weeklyMonthlyValidate(){
    var input = document.querySelector("#custom-activity");
    if(input.value === ""){
        alert("The challenge content can not be empty")
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const prevMonthBtn = document.querySelector(".arrow:first-child");
    const nextMonthBtn = document.querySelector(".arrow:last-child");
    const monthNameElement = document.querySelector(".month-name");
    const currentDate = new Date();
    let selectedDate;

    // Function to render the calendar
    function renderCalendar(month, year) {
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        const firstDayOfWeek = firstDayOfMonth.getDay();

        const calendarDays = document.querySelectorAll('.date');
        let dayCounter = 1;

        calendarDays.forEach((day, index) => {
            if (index >= firstDayOfWeek && dayCounter <= daysInMonth) {
                day.textContent = dayCounter;
                dayCounter++;
                day.classList.remove('faded');
            } else {
                day.textContent = '';
                day.classList.add('faded');
            }

            // Mark today's date
            if (currentDate.getDate() === parseInt(day.textContent) && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                day.classList.add('today');
            } else {
                day.classList.remove('today');
            }

            // Mark selected date
            if (selectedDate && selectedDate.getDate() === parseInt(day.textContent) && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                day.classList.add('selected');
            } else {
                day.classList.remove('selected');
            }
        });

        // Update month and year display
        monthNameElement.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    // Initial render
    renderCalendar(currentDate.getMonth(), currentDate.getFullYear());

    // Event listeners for navigating months
    prevMonthBtn.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    nextMonthBtn.addEventListener("click", function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
    });

    // Event listener for selecting a date
    document.querySelectorAll('.date').forEach(function(day) {
        day.addEventListener('click', function() {
            const selectedDay = parseInt(day.textContent);
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
            renderCalendar(currentDate.getMonth(), currentDate.getFullYear());
        });
    });

    // Event listener for "Let's Go" button
    document.getElementById('start-btn').addEventListener('click', function() {
        document.querySelectorAll('.date').forEach(function(day) {
            day.style.borderColor = '';
        });

        document.querySelector('.today').style.borderColor = 'black';
    });
});

// function deleteForm(form){
//     Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//         if (result.isConfirmed) {
//         Swal.fire({
//             title: "Deleted!",
//             text: "Activity has been deleted.",
//             icon: "success"
//         });
//         }
//     });
// }

function modalForm(form){
    var currentUrl = window.location.href;
    var baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
    var imageUrl = baseUrl + "images/award.gif";
    Swal.fire({
        title: "Congratulations!",
        text: "You have completed this challenge",
        imageUrl: imageUrl,
        imageWidth: 400,
        imageHeight: 250,
        imageAlt: "Custom image"
      });
}

//for smoother navbar
document.addEventListener('DOMContentLoaded', function () {
    const iconContainers = document.querySelectorAll(".icon-container");

    iconContainers.forEach(function (container) {
        container.addEventListener('click', function (event) {
            const href = this.querySelector('a').getAttribute('href');
            const isActive = this.classList.contains('active');

            iconContainers.forEach(function (icon) {
                icon.classList.remove('active');
            });

            if (!isActive) {
                this.classList.add('active');
                window.location.href = href; 
            }
            event.preventDefault(); 
        });
    });
});
function addDailyCustomChallenge() {
    const title = document.getElementById('input-title').value.trim();
    const content = document.getElementById('input-content').value.trim();
    if(title === '' || content === ' '){
        return;
    }

    const newActivityContainer = document.createElement('div');
    newActivityContainer.classList.add('activity-container');

    const activityCard = document.createElement('div');
    activityCard.classList.add('activity', 'activity-custom');

    const frontSide = document.createElement('div');
    frontSide.classList.add('front');
    frontSide.textContent = title;

    const gifContainer = document.createElement('div');
    gifContainer.classList.add('gif-container'); 

    frontSide.appendChild(gifContainer);

    const backSide = document.createElement('div');
    backSide.classList.add('back');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('trash-btn');
    deleteButton.setAttribute('onClick', 'return deleteForm(this);');
    deleteButton.innerHTML = `
        <i class="bi bi-trash"></i>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
    `;

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description');
    descriptionDiv.textContent = content;

    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.classList.add('checkbox-wrapper');

    const roundCheckbox = document.createElement('div');
    roundCheckbox.classList.add('round');

    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.setAttribute('id', 'custom-checkbox');
    const checkboxLabel = document.createElement('label');
    checkboxLabel.setAttribute('for', 'custom-checkbox');

    roundCheckbox.appendChild(checkboxInput);
    roundCheckbox.appendChild(checkboxLabel);

    checkboxWrapper.appendChild(roundCheckbox);

    backSide.appendChild(deleteButton);
    backSide.appendChild(descriptionDiv);
    backSide.appendChild(checkboxWrapper);

    activityCard.appendChild(frontSide);
    activityCard.appendChild(backSide);

    newActivityContainer.appendChild(activityCard);

    // Insert new activity container before the "Add your custom challenge" container
    const dailyChallengesContainer = document.querySelector('.daily-challenges');
    const addCustomChallengeContainer = dailyChallengesContainer.querySelector('.activity-container:last-child');

    dailyChallengesContainer.insertBefore(newActivityContainer, addCustomChallengeContainer);
}

function addWeeklyCustomChallenge() {
    // Get input value
    const content = document.getElementById('custom-activity').value.trim();

    // Validate input
    if (content === '') {
        return;
    }

    // Create new activity container
    const newActivityContainer = document.createElement('div');
    newActivityContainer.classList.add('activity-container');

    // Create activity card structure
    const activityCard = document.createElement('div');
    activityCard.classList.add('wactivity');
    activityCard.style.setProperty('--progress-value', '0%');

    // Create challenge content div
    const challengeContent = document.createElement('div');
    challengeContent.classList.add('wchallenge-content');
    challengeContent.textContent = content;

    // Create delete button
    // const deleteButton = document.createElement('button');
    // deleteButton.classList.add('trash-btn');
    // deleteButton.setAttribute('onClick', 'return deleteForm(this);');
    // deleteButton.innerHTML = `
    //     <i class="bi bi-trash"></i>
    //     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    //         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
    //         <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    //     </svg>
    // `;

    // Create loader div and set it to be hidden initially
    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add('loader');
    loaderDiv.style.display = 'none';

    // Create progress div and set it to be hidden initially
    const progressDiv = document.createElement('div');
    progressDiv.classList.add('progress');
    progressDiv.textContent = '0%';
    progressDiv.style.display = 'none';

    // Create completion button
    const completionButton = document.createElement('button');
    completionButton.classList.add('activity-btn');
    completionButton.setAttribute('id', 'start-btn');
    completionButton.textContent = "Let's go!!";
    completionButton.addEventListener('click', function() {
        loaderDiv.style.display = 'block';
        progressDiv.style.display = 'block';
        completionButton.textContent = 'Day 0';
        completionButton.setAttribute('id', 'completion-btn');
    });

    // Append elements to activity card
    activityCard.appendChild(challengeContent);
    //activityCard.appendChild(deleteButton);
    activityCard.appendChild(loaderDiv);
    activityCard.appendChild(progressDiv);
    activityCard.appendChild(completionButton);

    // Append activity card to activity container
    newActivityContainer.appendChild(activityCard);

    // Insert new activity container before the "Add Weekly challenge" container
    const weeklyChallengesContainer = document.querySelector('.weekly-challenges');
    const addWeeklyChallengeContainer = weeklyChallengesContainer.querySelector('.activity-container:last-child');

    weeklyChallengesContainer.insertBefore(newActivityContainer, addWeeklyChallengeContainer);


}

function addMonthlyCustomChallenge() {
    // Get input value
    const content = document.getElementById('custom-activitym').value.trim();

    // Validate input
    if (content === '') {
        alert('Please enter the content for your custom monthly challenge.');
        return;
    }

    // Create new activity container
    const newActivityContainer = document.createElement('div');
    newActivityContainer.classList.add('activity-container');

    // Create activity card structure
    const activityCard = document.createElement('div');
    activityCard.classList.add('mactivity');
    activityCard.style.setProperty('--progress-value', '0%');

    // Create challenge content div
    const challengeContent = document.createElement('div');
    challengeContent.classList.add('mchallenge-content');
    challengeContent.textContent = content;

    // Create loader div and set it to be hidden initially
    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add('loader');
    loaderDiv.style.display = 'none';

    // Create progress div and set it to be hidden initially
    const progressDiv = document.createElement('div');
    progressDiv.classList.add('progress');
    progressDiv.textContent = '0%';
    progressDiv.style.display = 'none';

    // Create completion button
    const completionButton = document.createElement('button');
    completionButton.classList.add('activity-btn');
    completionButton.textContent = "Let's go!!";
    completionButton.addEventListener('click', function() {
        loaderDiv.style.display = 'block';
        progressDiv.style.display = 'block';
        completionButton.textContent = 'Day 0';
        completionButton.setAttribute('id', 'completion-btn');
    });

    // Append elements to activity card
    activityCard.appendChild(challengeContent);
    activityCard.appendChild(loaderDiv);
    activityCard.appendChild(progressDiv);
    activityCard.appendChild(completionButton);

    // Append activity card to activity container
    newActivityContainer.appendChild(activityCard);

    // Insert new activity container before the "Add Monthly challenge" container
    const monthlyChallengesContainer = document.querySelector('.monthly-challenges');
    const addMonthlyChallengeContainer = monthlyChallengesContainer.querySelector('.activity-container:last-child');

    monthlyChallengesContainer.insertBefore(newActivityContainer, addMonthlyChallengeContainer);


}



function logout(){
    window.location.href = "../index.html";
}
