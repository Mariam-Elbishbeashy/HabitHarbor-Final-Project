//event listener that shows the progress bar after clicking on the start button
document.addEventListener("click", function(event) {
    if (event.target.id === "start-btn") {
        var button = event.target;
        button.style.display = "none";
        var activityContainer = button.closest(".wactivity");
        var activityContainer2 = button.closest(".mactivity");

        if (activityContainer) {
            var loader = activityContainer.querySelector(".loader");
            var progress = activityContainer.querySelector(".progress");
            var completionBtn = activityContainer.querySelector("#completion-btn");

            loader.style.visibility = "visible";
            progress.style.visibility = "visible";
            completionBtn.style.visibility = "visible";

            var progressValue = 0;
            activityContainer.style.setProperty("--progress-value", progressValue + "%");
            progress.innerHTML = progressValue + "%";
            loader.style.setProperty("--progress-value", progressValue + "%");
        }
        else if(activityContainer2){
            var loader = activityContainer2.querySelector(".loader");
            var progress = activityContainer2.querySelector(".progress");
            var completionBtn = activityContainer2.querySelector("#completion-btn");

            loader.style.visibility = "visible";
            progress.style.visibility = "visible";
            completionBtn.style.visibility = "visible";

            var progressValue = 0;
            activityContainer2.style.setProperty("--progress-value", progressValue + "%");
            progress.innerHTML = progressValue + "%";
            loader.style.setProperty("--progress-value", progressValue + "%");
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
        alert("The challenge content can not be ampty")
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

function deleteForm(form){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: "Deleted!",
            text: "Activity has been deleted.",
            icon: "success"
        });
        }
    });
}

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

function logout(){
    window.location.href = "../index.html";
}
