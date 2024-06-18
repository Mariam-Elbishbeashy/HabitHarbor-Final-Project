function displayUsers() {
    const adminContent = document.getElementById('admin-content');

    // Clear the current content
    adminContent.innerHTML = '';
    const addButton = document.createElement('button');
    addButton.id = 'add-btn';
    addButton.className = 'admin-btn';
    addButton.classList.add('add-btn');
    addButton.textContent = 'Add';
    adminContent.appendChild(addButton);

    const users = ['Laura Lucas', 'Mariam Bishbeashy','Sama Ahmed', 'Sondos Ahmed', 'Ahmed Hesham'];
    users.forEach(user => {
        // Create a div for each user
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-item');

        // Add user name
        const userName = document.createElement('span');
        userName.textContent = user;
        userDiv.appendChild(userName);

        // Add buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        const editUserBtn = document.createElement('button');
        editUserBtn.className = 'admin-btn';
        editUserBtn.id='edit-btn';
        editUserBtn.innerHTML=`
            <i class="bi bi-pencil"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
            </svg>
        `;

        const removeUserBtn = document.createElement('button');
        removeUserBtn.className = 'admin-btn';
        removeUserBtn.id = 'remove-btn';
        removeUserBtn.innerHTML = `
            <i class="bi bi-person-dash"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
            </svg>
        `;
        removeUserBtn.addEventListener('click', function() {
            // Call deleteForm function when remove button is clicked
            deleteForm(user);
        });
        addButton.addEventListener('click', function() {
            addUser(user);
        });

        editUserBtn.addEventListener('click', function() {
            editUser(user);
        });
       
        buttonsContainer.appendChild(editUserBtn);
        buttonsContainer.appendChild(removeUserBtn);
        userDiv.appendChild(buttonsContainer);
       
        adminContent.appendChild(userDiv);
    });
}
function displayAdmins() {
    const adminContent = document.getElementById('admin-content');
    
    adminContent.innerHTML = '';

    const addButton = document.createElement('button');
    addButton.id = 'add-btn';
    addButton.className = 'admin-btn';
    addButton.classList.add('add-btn');
    addButton.textContent = 'Add';
    adminContent.appendChild(addButton);

    const admins = ['Lara Khaled'];

    admins.forEach(admin => {

        const adminDiv = document.createElement('div');
        adminDiv.classList.add('admin-item');

        const adminName = document.createElement('span');
        adminName.textContent = admin;
        adminDiv.appendChild(adminName);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        const editAdminBtn = document.createElement('button');
        editAdminBtn.className = 'admin-btn';
        editAdminBtn.id = 'edit-btn';
        editAdminBtn.innerHTML = `
            <i class="bi bi-pencil"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293z"/>
            </svg>
        `;
        
        const removeAdminBtn = document.createElement('button');
        removeAdminBtn.className = 'admin-btn';
        removeAdminBtn.id = 'remove-btn';
        removeAdminBtn.innerHTML = `
            <i class="bi bi-person-dash"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
            </svg>
        `;
        
        removeAdminBtn.addEventListener('click', function() {
            deleteForm(admin);
        });

        addButton.addEventListener('click', function() {
            addAdmin(admin);
        });

        editAdminBtn.addEventListener('click', function() {
            editAdmin(admin);
        });
        buttonsContainer.appendChild(editAdminBtn);
        buttonsContainer.appendChild(removeAdminBtn);
        adminDiv.appendChild(buttonsContainer);

        adminContent.appendChild(adminDiv);
    });
}

function displayDailyChallenges(category) {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = '';
    const addButton = document.createElement('button');
    addButton.id = 'add-btn';
    addButton.className = 'admin-btn';
    addButton.classList.add('add-btn');
    addButton.textContent = 'Add';
    adminContent.appendChild(addButton);

    const dailyChallenges = {
        Physical: ['Run for an hour', 'Swim for 30 minutes'],
        WellBeing: ['Meditate for 20 minutes', 'Practice yoga for 30 minutes'],
        Nutrition: ['No sugar for today', 'Eat 5 servings of fruits and vegetables']
    };

    
    const challenges = dailyChallenges[category];

    
    challenges.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.classList.add('activity-item');

        const activityName = document.createElement('span');
        activityName.textContent = activity;
        activityDiv.appendChild(activityName);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        const editActivityBtn = document.createElement('button');
        editActivityBtn.className = 'admin-btn';
        editActivityBtn.id = 'edit-btn';
        editActivityBtn.innerHTML = `
            <i class="bi bi-pencil"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293z"/>
            </svg>
        `;

        const removeActivityBtn = document.createElement('button');
        removeActivityBtn.className = 'admin-btn';
        removeActivityBtn.id = 'remove-btn';
        removeActivityBtn.innerHTML = `
            <i class="bi bi-x-lg"></i>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
        `;
        removeActivityBtn.addEventListener('click', function() {
            // Call deleteForm with the necessary parameters
            deleteForm(activity);
        });

        addButton.addEventListener('click', function() {
            addChallenge(activity);
        });

        editActivityBtn.addEventListener('click', function() {
            editChallenge(activity);
        });

        buttonsContainer.appendChild(editActivityBtn);
        buttonsContainer.appendChild(removeActivityBtn);
        activityDiv.appendChild(buttonsContainer);

        adminContent.appendChild(activityDiv);
    });
}

// Function to show or hide the User category buttons
function showUserCategory() {
    const userCategory = document.querySelector('.user-category');
    userCategory.style.display = userCategory.style.display === 'none' || userCategory.style.display === '' ? 'block' : 'none';
    const challengesCategory = document.querySelector('.challenges-category');
    challengesCategory.style.display = 'none';
}

// Function to show or hide the Daily Challenges category buttons
function showChallengesCategory() {
    const challengesCategory = document.querySelector('.challenges-category');
    challengesCategory.style.display = challengesCategory.style.display === 'none' || challengesCategory.style.display === '' ? 'block' : 'none';
    const userCategory = document.querySelector('.user-category');
    userCategory.style.display = 'none';
}

// Function to activate a button and add the active state
function activateButton(buttonId) {
    const buttons = document.querySelectorAll('.admin-btn');

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = document.getElementById(buttonId);
    activeButton.classList.add('active');
}
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

function addChallenge(form) {
    Swal.fire({
        title: "Add challenge",
        html: `
            <form id="challenge-form">
                <label>Select a category:</label>
                <select id="category-select" class="swal2-select" style="width: 80%;">
                    <option value="physical">Select</option>
                    <option value="physical">Physical</option>
                    <option value="well_being">Well-being</option>
                    <option value="nutrition">Nutrition</option>
                </select>
                <label>Challenge:</label>
                <input id="swal-input1" class="swal2-input" style="width: 80%;">
                <label>Age Range:</label>
                <div style="display: flex; justify-content: centre; width: 80%;">
                    <input id="age-min" name="age_min" type="number" class="swal2-input" placeholder="Min" style="width: 45%;">
                    <input id="age-max" name="age_max" type="number" class="swal2-input" placeholder="Max" style="width: 45%;">
                </div>
                
                <label>BMI Range:</label>
                <div style="display: flex; justify-content: centre; width: 80%;">
                    <input id="bmi-min" name="bmi_min" type="number" class="swal2-input" placeholder="Min" style="width: 45%;">
                    <input id="bmi-max" name="bmi_max" type="number" class="swal2-input" placeholder="Max" style="width: 45%;">
                </div>
                
                <label>Intensity:</label>
                <select id="intensity-select" name="intensity" class="swal2-select" style="width: 80%;">
                    <option value="" disabled selected>Select</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </form>
        `,
        
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Save As</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const category = document.getElementById("category-select").value;
            const challenge = document.getElementById("swal-input1").value;
            const ageMin = document.getElementById("age-min").value;
            const ageMax = document.getElementById("age-max").value;
            const bmiMin = document.getElementById("bmi-min").value;
            const bmiMax = document.getElementById("bmi-max").value;
            const intensity = document.getElementById("intensity-select").value;

            if (!category || !challenge || !ageMin || !ageMax || !bmiMin || !bmiMax || !intensity) {
                Swal.showValidationMessage("Please fill in all fields.");
                return false;
            } 
    
            return { category, challenge, ageMin, ageMax, bmiMin, bmiMax, intensity };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { category, challenge, ageMin, ageMax, bmiMin, bmiMax, intensity } = result.value;

            Swal.fire(`Category: ${category}, Challenge: ${challenge}, Age Range ${ageMin}-${ageMax}, BMI Range ${bmiMin}-${bmiMax}, Intensity: ${intensity}`, "", "success");
            const form = document.createElement('form');
            form.action = '/admin';
            form.method = 'post';
            form.style.display = 'none';

            const categoryInput = document.createElement('input');
            categoryInput.name = 'category';
            categoryInput.value = category;
            form.appendChild(categoryInput);

            const challengeInput = document.createElement('input');
            challengeInput.name = 'content';
            challengeInput.value = challenge;
            form.appendChild(challengeInput);

            const ageMinInput = document.createElement('input');
            ageMinInput.name = 'ageRange.min';
            ageMinInput.value = ageMin;
            form.appendChild(ageMinInput);

            const ageMaxInput = document.createElement('input');
            ageMaxInput.name = 'ageRange.max';
            ageMaxInput.value = ageMax;
            form.appendChild(ageMaxInput);

            const bmiMinInput = document.createElement('input');
            bmiMinInput.name = 'bmiRange.min';
            bmiMinInput.value = bmiMin;
            form.appendChild(bmiMinInput);

            const bmiMaxInput = document.createElement('input');
            bmiMaxInput.name = 'bmiRange.max';
            bmiMaxInput.value = bmiMax;
            form.appendChild(bmiMaxInput);

            const intensityInput = document.createElement('input');
            intensityInput.name = 'intensity';
            intensityInput.value = intensity;
            form.appendChild(intensityInput);

            document.body.appendChild(form);
            form.submit();

        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
}

function editChallenge(form) {
    Swal.fire({
        title: "Edit Challenge",
        html: `
            <label>Select a category:</label>
            <select id="category-select" class="swal2-select" style="width: 80%;">
                <option value="physical">Select</option>
                <option value="physical">Physical</option>
                <option value="well_being">Well-being</option>
                <option value="nutrition">Nutrition</option>
            </select>
            <label>Challenge:</label>
            <input id="swal-input1" class="swal2-input" style="width: 80%;">
        `,
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Save As</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const category = document.getElementById("category-select").value;
            const challenge = document.getElementById("swal-input1").value;

            if (!category || !challenge) {
                Swal.showValidationMessage("Please enter both category and challenge.");
                return false;
            }
            return { category, challenge };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { category, challenge } = result.value;
            Swal.fire(`Category: ${category}, Challenge: ${challenge}`, "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
}

function addUser(form) {
    Swal.fire({
        title: "Add User",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address",
        html: `
            <label>First Name:</label>
            <input id="swal-input1" class="swal2-input" style="width: 80%;">
            <label>Last Name:</label>
            <input id="swal-input2" class="swal2-input" style="width: 80%;">
        `,
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Save As</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const email = Swal.getPopup().querySelector('[type="email"]').value;
            const input1 = document.getElementById("swal-input1").value;
            const input2 = document.getElementById("swal-input2").value;
    
            if (!email || !input1 || !input2) {
                Swal.showValidationMessage("Please enter all fields.");
            }
    
            return { email, input1, input2 };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { email, input1, input2 } = result.value;
            Swal.fire(`Email: ${email}, First Name: ${input1}, Last Name: ${input2}`, "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });  
}

function editUser(form) {
    Swal.fire({
        title: "Edit User",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address",
        html: `
            <label>First Name:</label>
            <input id="swal-input1" class="swal2-input" style="width: 80%;">
            <label>Last Name:</label>
            <input id="swal-input2" class="swal2-input" style="width: 80%;">
        `,
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Save As</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const email = Swal.getPopup().querySelector('[type="email"]').value;
            const input1 = document.getElementById("swal-input1").value;
            const input2 = document.getElementById("swal-input2").value;
    
            if (!email || !input1 || !input2) {
                Swal.showValidationMessage("Please enter all fields.");
            }
    
            return { email, input1, input2 };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { email, input1, input2 } = result.value;
            Swal.fire(`Email: ${email}, First Name: ${input1}, Last Name: ${input2}`, "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
    
}

function addAdmin(form) {
    Swal.fire({
        title: "Add Admin",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address",
        html: `
            <label>First Name:</label>
            <input id="swal-input1" class="swal2-input" style="width: 80%;">
            <label>Last Name:</label>
            <input id="swal-input2" class="swal2-input" style="width: 80%;">
        `,
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Save As</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const email = Swal.getPopup().querySelector('[type="email"]').value;
            const input1 = document.getElementById("swal-input1").value;
            const input2 = document.getElementById("swal-input2").value;
    
            if (!email || !input1 || !input2) {
                Swal.showValidationMessage("Please enter all fields.");
            }
    
            return { email, input1, input2 };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { email, input1, input2 } = result.value;
            Swal.fire(`Email: ${email}, First Name: ${input1}, Last Name: ${input2}`, "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
    
}

function editAdmin(form) {
    Swal.fire({
        title: "Edit Admin",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address",
        html: `
            <label>First Name:</label>
            <input id="swal-input1" class="swal2-input" style="width: 80%;">
            <label>Last Name:</label>
            <input id="swal-input2" class="swal2-input" style="width: 80%;">
        `,
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Save As</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const email = Swal.getPopup().querySelector('[type="email"]').value;
            const input1 = document.getElementById("swal-input1").value;
            const input2 = document.getElementById("swal-input2").value;
    
            if (!email || !input1 || !input2) {
                Swal.showValidationMessage("Please enter all fields.");
            }
    
            return { email, input1, input2 };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { email, input1, input2 } = result.value;
            Swal.fire(`Email: ${email}, First Name: ${input1}, Last Name: ${input2}`, "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
    
}

