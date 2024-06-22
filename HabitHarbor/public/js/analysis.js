function toggle(component, clickedBtn) {
    const buttons = document.querySelectorAll('.switch-container');
    const components = document.querySelectorAll('.content > div');

    buttons.forEach(btn => {
        if (btn === clickedBtn) {
            btn.classList.add('active'); // Add active class to clicked button
        } else {
            btn.classList.remove('active'); // Remove active class from other buttons
        }
    });

    components.forEach(comp => {
        if (comp.classList.contains(component)) {
            if (component === "history") {
                comp.style.display = 'grid';
                comp.style.gridTemplateColumns = '1fr 1fr';
                comp.style.gridTemplateRows = '0.2fr 0.9fr 0.2fr 1fr 0.2fr 1.4fr';
                comp.style.gap = '10px 10px';
                comp.style.gridAutoFlow = 'row';
                comp.style.gridTemplateAreas = `
                    "title title"
                    "daily-challenges daily-challenges"
                    "ttitle ttitle"
                    "weekly-challenges weekly-challenges"
                    "Title Title"
                    "monthly-challenges monthly-challenges"
                `;
                comp.style.overflowY = 'auto'; // Enable scrolling only on this part
            }
            else{
                comp.style.display = 'block';
            }
        } else {
            comp.style.display = 'none';
        }
    });
}

function updateTotalHabits(){
    const usernameDiv = document.querySelector('.square-row');
    const username = usernameDiv.getAttribute('username');
    document.addEventListener("DOMContentLoaded", function() {
        fetch(`/analysis/countHabits/${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('num').textContent = data.count;
        })
        .catch(error => console.error('Error fetching habit count:', error));
    });
}

function fetchUserHabits(username) {
    fetch(`/analysis/habits/${username}`)
        .then(response => response.json())
        .then(habits => {
            // Once habits are fetched, format them for Google Charts
            const data = new google.visualization.DataTable();
            data.addColumn('string', 'Category');
            data.addColumn('number', 'Count');
            
            // Iterate over habits to populate data table
            habits.forEach(habit => {
                data.addRow([habit.habitCategory, habit.monthOfCompletion]);
            });

            // Draw the chart
            const options = {
                title: 'User Habits Overview',
                pieHole: 0.4, // Make it a donut chart
            };
            const chart = new google.visualization.PieChart(document.getElementById('donut_chart'));
            chart.draw(data, options);
        })
        .catch(error => console.error('Error fetching user habits:', error));
}

function fetchTotalHabitsPerMonth() {
    const usernameDiv = document.querySelector('.square-row');
    const username = usernameDiv.getAttribute('username');

    fetch(`/analysis/totalHabitsPerMonth/${username}`)
    .then(response => response.json())
    .then(data => {
        // Google Charts: Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        // Function to convert month number to name
        function getMonthName(month) {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return months[month - 1]; // Month number is 1-based in Date object, adjust if needed
        }
        
        function drawChart() {
            const dataTable = new google.visualization.DataTable();
            dataTable.addColumn('string', 'Month');
            dataTable.addColumn('number', 'Total Habits');

            data.forEach(item => {
                dataTable.addRow([getMonthName(item.month), item.totalHabits]);
            });

            const options = {
                title: 'Total Habits per Month',
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            const chart = new google.visualization.LineChart(document.getElementById('line_chart'));
            chart.draw(dataTable, options);
        }
    })
    .catch(error => console.error('Error fetching total habits per month:', error));
}