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

    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                if (user.DataType !== 'user') {
                    return; // Skip if not a user
                }

                const userDiv = document.createElement('div');
                userDiv.classList.add('user-item');

                const userName = document.createElement('span');
                userName.textContent = `${user.Firstname} ${user.Lastname}`;
                userDiv.appendChild(userName);

                const buttonsContainer = document.createElement('div');
                buttonsContainer.classList.add('buttons-container');

                const viewUserBtn = document.createElement('button');
                viewUserBtn.className = 'admin-btn';
                viewUserBtn.id = 'view-btn';
                viewUserBtn.innerHTML = `
                    <i class="bi bi-eye"></i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>
                `;
                

                const editUserBtn = document.createElement('button');
                editUserBtn.className = 'admin-btn';
                editUserBtn.id = 'edit-btn';
                editUserBtn.innerHTML = `
                    <i class="bi bi-pencil"></i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293z"/>
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
                    deleteUserForm(user);
                });

                addButton.addEventListener('click', function() {
                    addUser(user);
                });

                editUserBtn.addEventListener('click', function() {
                    editUser(user);
                });

                buttonsContainer.appendChild(viewUserBtn);
                buttonsContainer.appendChild(editUserBtn);
                buttonsContainer.appendChild(removeUserBtn);
                userDiv.appendChild(buttonsContainer);

                adminContent.appendChild(userDiv);
            });
        })
        .catch(err => console.error('Error fetching users:', err));
}

function displayAdmins() {
    const adminContent = document.getElementById('admin-content');

    // Clear the current content
    adminContent.innerHTML = '';

    const addButton = document.createElement('button');
    addButton.id = 'add-btn';
    addButton.className = 'admin-btn';
    addButton.classList.add('add-btn');
    addButton.textContent = 'Add';
    adminContent.appendChild(addButton);

    fetch('/api/admins')
        .then(response => response.json())
        .then(admins => {
            admins.forEach(admin => {
                if (admin.DataType !== 'admin') {
                    return; // Skip if not an admin
                }

                const adminDiv = document.createElement('div');
                adminDiv.classList.add('admin-item');

                const adminName = document.createElement('span');
                adminName.textContent = `${admin.Firstname} ${admin.Lastname}`;
                adminDiv.appendChild(adminName);

                const buttonsContainer = document.createElement('div');
                buttonsContainer.classList.add('buttons-container');

                const viewAdminBtn = document.createElement('button');
                viewAdminBtn.className = 'admin-btn';
                viewAdminBtn.id = 'view-btn';
                viewAdminBtn.innerHTML = `
                    <i class="bi bi-eye"></i>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>
                `;

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
                    deleteUserForm(admin);
                });

                addButton.addEventListener('click', function() {
                    addUser(admin);
                });

                editAdminBtn.addEventListener('click', function() {
                    editUser(admin);
                });

                buttonsContainer.appendChild(viewAdminBtn);
                buttonsContainer.appendChild(editAdminBtn);
                buttonsContainer.appendChild(removeAdminBtn);
                adminDiv.appendChild(buttonsContainer);

                adminContent.appendChild(adminDiv);
            });
        })
        .catch(err => console.error('Error fetching admins:', err));
}
function addUser(form) {
    Swal.fire({
        title: "Add User",
        html: `
            <form id="user-form">
                <label>Select User Type:</label>
                <select id="type-select" class="swal2-select" style="width: 80%;">
                    <option value="user">Select</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <label>First name:</label>
                <input id="fname" class="swal2-input" style="width: 80%;">
                <label>Last name:</label>
                <input id="lname" class="swal2-input" style="width: 80%;">
                <label>Email:</label>
                <input id="email" class="swal2-input" style="width: 80%;">
                <label>Phone Number:</label>
                <input id="phoneNumber" name="phoneNumber" type="tel" class="swal2-input" placeholder="ex:..+201234567890" style="width: 45%;">
                <label>Date of birth:</label>
                <input id="dateOfBirth" name="dateOfBirth" class="swal2-input" placeholder="DD/MM/YYY" style="width: 45%;">
                <label>Gender:</label>
                <select id="gender-select" class="swal2-select" style="width: 45%;"">
                    <option value="male">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label>Weight (Kg):</label>
                <input id="weight" name="weight" type="number" class="swal2-input" style="width: 45%;">
                <label>Height (cm):</label>
                <input id="height" name="height" type="number" class="swal2-input" style="width: 45%;">
                <label>Username:</label>
                <input id="username" class="swal2-input" style="width: 80%;">
                <label>Password:</label>
                <input id="password" type="password" class="swal2-input" style="width: 80%;">
                <label>Confirm password:</label>
                <input id="cpassword" type="password" class="swal2-input" style="width: 80%;">
            </form>
        `,
        
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Add</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const type = document.getElementById("type-select").value;
            const fname = document.getElementById("fname").value;
            const lname = document.getElementById("lname").value;
            const email = document.getElementById("email").value;
            const phoneNumber = document.getElementById("phoneNumber").value;
            const dateOfBirth = document.getElementById("dateOfBirth").value;
            const gender = document.getElementById("gender-select").value;
            const weight = document.getElementById("weight").value;
            const height = document.getElementById("height").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const cpassword = document.getElementById("cpassword").value;

            if (!type || !fname || !lname || !email || !phoneNumber || !dateOfBirth|| !gender || !weight || !height || !username || !password) {
                Swal.showValidationMessage("Please fill in all fields.");
                return false;
            } 
            if(cpassword!==password){
                Swal.showValidationMessage("Passwords do not match!");
                return false;
            }
    
            return { type, fname, lname, email, phoneNumber, dateOfBirth, gender, weight, height, username, password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const {  type, fname, lname, email, phoneNumber, dateOfBirth, gender, weight, height, username, password } = result.value;

            //Swal.fire(`Category: ${category}, Challenge: ${challenge}, Age Range ${ageMin}-${ageMax}, BMI Range ${bmiMin}-${bmiMax}, Intensity: ${intensity}`, "", "success");
            const form = document.createElement('form');
            form.action = '/admin/adduser';
            form.method = 'post';
            form.style.display = 'none';

            const typeInput = document.createElement('input');
            typeInput.name = 'DataType';
            typeInput.value = type;
            form.appendChild(typeInput);

            const fnameInput = document.createElement('input');
            fnameInput.name = 'Firstname';
            fnameInput.value = fname;
            form.appendChild(fnameInput);

            const lnameInput = document.createElement('input');
            lnameInput.name = 'Lastname';
            lnameInput.value = lname;
            form.appendChild(lnameInput);

            const emailInput = document.createElement('input');
            emailInput.name = 'Email';
            emailInput.value = email;
            form.appendChild(emailInput);

            const phoneNumberInput = document.createElement('input');
            phoneNumberInput.name = 'phone';
            phoneNumberInput.value = phoneNumber;
            form.appendChild(phoneNumberInput);

            const dateOfBirthInput = document.createElement('input');
            dateOfBirthInput.name = 'DateofBirth';
            dateOfBirthInput.value = dateOfBirth;
            form.appendChild(dateOfBirthInput);

            const genderInput = document.createElement('input');
            genderInput.name = 'Gender';
            genderInput.value = gender;
            form.appendChild(genderInput);

            const weightInput = document.createElement('input');
            weightInput.name = 'Weight';
            weightInput.value = weight;
            form.appendChild(weightInput);

            const heightInput = document.createElement('input');
            heightInput.name = 'Height';
            heightInput.value = height;
            form.appendChild(heightInput);

            const usernameInput = document.createElement('input');
            usernameInput.name = 'Username';
            usernameInput.value = username;
            form.appendChild(usernameInput);

            const passwordInput = document.createElement('input');
            passwordInput.name = 'Password';
            passwordInput.value = password;
            form.appendChild(passwordInput);

            const imageInput = document.createElement('input');
            imageInput.name = 'Image';
            imageInput.value = "images/contact icon.png";
            form.appendChild(imageInput);

            document.body.appendChild(form);
            form.submit();

        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
}

function editUser(user) {
    Swal.fire({
        title: "Edit User",
        html: `
            <form id="user-form">
                <label>User Type:</label>
                <select value="${user.DataType}" id="type-select" class="swal2-select" style="width: 80%;">
                    <option value="user"  ${user.DataType === 'user' ? 'selected' : ''}>User</option>
                    <option value="admin"  ${user.DataType === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
                <label>First name:</label>
                <input value="${user.Firstname}" id="fname" class="swal2-input" style="width: 80%;">
                <label>Last name:</label>
                <input value="${user.Lastname}" id="lname" class="swal2-input" style="width: 80%;">
                <label>Email:</label>
                <input value="${user.Email}" id="email" class="swal2-input" style="width: 80%;">
                <label>Phone Number:</label>
                <input value="${user.phone}" id="phoneNumber" name="phoneNumber" type="tel" class="swal2-input" placeholder="ex:..+201234567890" style="width: 45%;">
                <label>Date of birth:</label>
                <input value="${user.DateofBirth}" id="dateOfBirth" name="dateOfBirth" class="swal2-input" placeholder="DD/MM/YYY" style="width: 45%;">
                <label>Gender:</label>
                <select value="${user.Gender}" id="gender-select" class="swal2-select" style="width: 45%;">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label>Weight (Kg):</label>
                <input value="${user.Weight}" id="weight" name="weight" type="number" class="swal2-input" style="width: 45%;">
                <label>Height (cm):</label>
                <input value="${user.Height}" id="height" name="height" type="number" class="swal2-input" style="width: 45%;">
                <label>Username:</label>
                <input value="${user.Username}" id="username" class="swal2-input" style="width: 80%;">
                <label>Password:</label>
                <input value="${user.Password}" id="password" type="password" class="swal2-input" style="width: 80%;">
                <label>Confirm password:</label>
                <input value="${user.Password}" id="cpassword" type="password" class="swal2-input" style="width: 80%;">
            </form>
        `,
        
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Save</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const type = document.getElementById("type-select").value;
            const fname = document.getElementById("fname").value;
            const lname = document.getElementById("lname").value;
            const email = document.getElementById("email").value;
            const phoneNumber = document.getElementById("phoneNumber").value;
            const dateOfBirth = document.getElementById("dateOfBirth").value;
            const gender = document.getElementById("gender-select").value;
            const weight = document.getElementById("weight").value;
            const height = document.getElementById("height").value;
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const cpassword = document.getElementById("cpassword").value;

            if (!type || !fname || !lname || !email || !phoneNumber || !dateOfBirth|| !gender || !weight || !height || !username || !password) {
                Swal.showValidationMessage("Please fill in all fields.");
                return false;
            } 
            if(cpassword!==password){
                Swal.showValidationMessage("Passwords do not match!");
                return false;
            }
    
            return { type, fname, lname, email, phoneNumber, dateOfBirth, gender, weight, height, username, password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { type, fname, lname, email, phoneNumber, dateOfBirth, gender, weight, height, username, password } = result.value;

            const form = document.createElement('form');
            form.action = `/admin/editusers/${user._id}?_method=PUT`;
            form.method = 'POST';
            form.style.display = 'none';

            const methodInput = document.createElement('input');
            methodInput.name = '_method';
            methodInput.value = 'PUT';
            form.appendChild(methodInput);

            const inputs = {
                DataType: type,
                Firstname: fname,
                Lastname: lname,
                Email: email,
                phone: phoneNumber,
                DateofBirth: dateOfBirth,
                Gender: gender,
                Weight: weight,
                Height: height,
                Username: username,
                Password: password,
            };

            for (const [name, value] of Object.entries(inputs)) {
                const input = document.createElement('input');
                input.name = name;
                input.value = value;
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
}

function deleteUserForm(user) {
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
            console.log("User confirmed deletion");

            const form = document.createElement('form');
            form.action = `/admin/deleteusers/${user._id}?_method=DELETE`; 
            form.method = 'POST'; 

            const methodInput = document.createElement('input');
            methodInput.type = 'hidden';
            methodInput.name = '_method';
            methodInput.value = 'DELETE';
            form.appendChild(methodInput);

            const userIdInput = document.createElement('input');
            userIdInput.type = 'hidden';
            userIdInput.name = '_id';
            userIdInput.value = user._id;
            form.appendChild(userIdInput);

            document.body.appendChild(form);

            form.submit();
            console.log("Form submitted");

        } else {
            console.log("User canceled deletion");
        }
    });
}

async function displayDailyChallenges(category) {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = '';
    const addButton = document.createElement('button');
    addButton.id = 'add-btn';
    addButton.className = 'admin-btn';
    addButton.classList.add('add-btn');
    addButton.textContent = 'Add';
    adminContent.appendChild(addButton);
  
    try {
      const response = await fetch('/api/activities');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const activities = await response.json();
  
      // Filter activities based on category
      const filteredActivities = activities.filter(activity => activity.category === category);
  
      filteredActivities.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.classList.add('activity-item');
  
        const activityName = document.createElement('span');
        activityName.textContent = activity.content; 
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
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1-.708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        `;
        removeActivityBtn.addEventListener('click', function() {
         
          deleteActivityForm(activity); 
        });
  
        addButton.addEventListener('click', function() {
          addChallenge(activity.name);
        });
  
        editActivityBtn.addEventListener('click', function() {
            editChallenge(activity);
        });
  
        buttonsContainer.appendChild(editActivityBtn);
        buttonsContainer.appendChild(removeActivityBtn);
        activityDiv.appendChild(buttonsContainer);
  
        adminContent.appendChild(activityDiv);
      });
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
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
                    <option value="well-being">Well-being</option>
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
        confirmButtonText: '<swal-button type="confirm">Add</swal-button>',
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
function editChallenge(activity) {
    Swal.fire({
        title: "Edit Activity",
        html: `
            <form id="activity-form">
                <label>Category:</label>
                <select id="category-select" value="${activity.category}" class="swal2-select" style="width: 80%;">
                    <option value="physical" ${activity.category === 'physical' ? 'selected' : ''}>Physical</option>
                    <option value="well-being" ${activity.category === 'well-being' ? 'selected' : ''}>Well-being</option>
                    <option value="nutrition" ${activity.category === 'nutrition' ? 'selected' : ''}>Nutrition</option>
                </select>
                <label>Challenge:</label>
                <input id="swal-input1" value="${activity.content}" class="swal2-input" style="width: 80%;">
                <label>Age Range:</label>
                <div style="display: flex; justify-content: center; width: 80%;">
                    <input id="age-min" value="${activity.ageRange.min}" name="age_min" type="number" class="swal2-input" placeholder="Min" style="width: 45%;">
                    <input id="age-max" value="${activity.ageRange.max}" name="age_max" type="number" class="swal2-input" placeholder="Max" style="width: 45%;">
                </div>
                
                <label>BMI Range:</label>
                <div style="display: flex; justify-content: center; width: 80%;">
                    <input id="bmi-min" value="${activity.bmiRange.min}" name="bmi_min" type="number" class="swal2-input" placeholder="Min" style="width: 45%;">
                    <input id="bmi-max" value="${activity.bmiRange.max}" name="bmi_max" type="number" class="swal2-input" placeholder="Max" style="width: 45%;">
                </div>
                
                <label>Intensity:</label>
                <select id="intensity-select" name="intensity" class="swal2-select" style="width: 80%;">
                    <option value="low"  ${activity.intensity === 'low' ? 'selected' : ''}>Low</option>
                    <option value="medium" ${activity.intensity === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="high" ${activity.intensity === 'high' ? 'selected' : ''}>High</option>
                </select>
            </form>
        `,
        
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Save</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const category = document.getElementById("category-select").value;
            const content = document.getElementById("swal-input1").value;
            const minAge = document.getElementById("age-min").value;
            const maxAge = document.getElementById("age-max").value;
            const minBMI = document.getElementById("bmi-min").value;
            const maxBMI = document.getElementById("bmi-max").value;
            const intensity = document.getElementById("intensity-select").value;

            if (!category || !content || !minAge || !maxAge || !minBMI || !maxBMI || !intensity) {
                Swal.showValidationMessage("Please fill in all fields.");
                return false;
            } 
    
            return { category, content, ageRange: { min: minAge, max: maxAge }, bmiRange: { min: minBMI, max: maxBMI }, intensity };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { category, content, ageRange, bmiRange, intensity } = result.value;

            const form = document.createElement('form');
            form.action = `/admin/editactivity/${activity._id}?_method=PUT`;
            form.method = 'POST';
            form.style.display = 'none';

            const methodInput = document.createElement('input');
            methodInput.name = '_method';
            methodInput.value = 'PUT';
            form.appendChild(methodInput);

            const inputs = {
                category: category,
                content: content,
                'ageRange.min': ageRange.min,
                'ageRange.max': ageRange.max,
                'bmiRange.min': bmiRange.min,
                'bmiRange.max': bmiRange.max,
                intensity: intensity,
            };

            for (const [name, value] of Object.entries(inputs)) {
                const input = document.createElement('input');
                input.name = name;
                input.value = value;
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
}

function deleteActivityForm(activity) {
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
            console.log("User confirmed deletion");

            const form = document.createElement('form');
            form.action = `/admin/deleteactivities/${activity._id}?_method=DELETE`; 
            form.method = 'POST'; 

            const methodInput = document.createElement('input');
            methodInput.type = 'hidden';
            methodInput.name = '_method';
            methodInput.value = 'DELETE';
            form.appendChild(methodInput);

            const activityIdInput = document.createElement('input');
            activityIdInput.type = 'hidden';
            activityIdInput.name = '_id';
            activityIdInput.value = activity._id;
            form.appendChild(activityIdInput);

            document.body.appendChild(form);

            form.submit();
            console.log("Form submitted");

        } else {
            console.log("User canceled deletion");
        }
    });
}

async function displayResources() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = '';
    const addButton = document.createElement('button');
    addButton.id = 'add-btn';
    addButton.className = 'admin-btn';
    addButton.classList.add('add-btn');
    addButton.textContent = 'Add';
    adminContent.appendChild(addButton);

    try {
        const response = await fetch('/api/resources');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const resources = await response.json();

        resources.forEach(resource => {
            const resourceDiv = document.createElement('div');
            resourceDiv.classList.add('activity-item'); // Ensure 'resource-item' is a valid CSS class

            const resourceName = document.createElement('a');
            resourceName.href = resource.URL; 
            resourceName.textContent = resource.URL; 
            resourceName.target = '_blank';
            resourceDiv.appendChild(resourceName);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttons-container');

            const editResourceBtn = document.createElement('button');
            editResourceBtn.className = 'admin-btn';
            editResourceBtn.id = 'edit-btn';
            editResourceBtn.innerHTML = `
                <i class="bi bi-pencil"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293z"/>
                </svg>
            `;

            const removeResourceBtn = document.createElement('button');
            removeResourceBtn.className = 'admin-btn';
            removeResourceBtn.id = 'remove-btn';
            removeResourceBtn.innerHTML = `
                <i class="bi bi-x-lg"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1-.708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            `;
            removeResourceBtn.addEventListener('click', function() {
                deleteResourceForm(resource); 
            });

            addButton.addEventListener('click', function() {
                addResource(resource);
              });

            editResourceBtn.addEventListener('click', function() {
                editResource(resource); 
            });

            buttonsContainer.appendChild(editResourceBtn);
            buttonsContainer.appendChild(removeResourceBtn);
            resourceDiv.appendChild(buttonsContainer);

            adminContent.appendChild(resourceDiv);
        });
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}

function addResource(form) {
    Swal.fire({
        title: "Add Resource",
        html: `
            <form id="resource-form">
                <label>Resource Title:</label>
                <input id="title" class="swal2-input" style="width: 80%;">
                <label>Resource Image:</label>
                <input id="image" class="swal2-input" type="file" style="width: 80%;">
                <label>Resource paragraph:</label>
                <input id="paragraph" type="textarea" class="swal2-input" style="width: 80%;">
                <label>Resource URL:</label>
                <input id="url" class="swal2-input" type="url" style="width: 80%;">
                <label>Select a category:</label>
                <select id="category-select" class="swal2-select" style="width: 80%;">
                    <option value="habits">Select</option>
                    <option value="habits">Habits</option>
                    <option value="nutritions">Nutritions</option>
                    <option value="health">Health</option>
                </select>
            </form>
        `,
        
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
        preConfirm: () => {
            const title = document.getElementById("title").value;
            const image = document.getElementById("image").value;
            const paragraph = document.getElementById("paragraph").value;
            const url = document.getElementById("url").value;
            const category = document.getElementById("category-select").value;

            if (!title || !image || !paragraph || !url || !category) {
                Swal.showValidationMessage("Please fill in all fields.");
                return false;
            } 
    
            return { title, image, paragraph, url, category };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { title, image, paragraph, url, category } = result.value;

            const form = document.createElement('form');
            form.action = '/admin/saverecource';
            form.method = 'post';
            form.style.display = 'none';

            const titleInput = document.createElement('input');
            titleInput.name = 'Title';
            titleInput.value = title;
            form.appendChild(titleInput);

            const imageInput = document.createElement('input');
            imageInput.name = 'Image';
            imageInput.value = image;
            form.appendChild(imageInput);

            const paragraphInput = document.createElement('input');
            paragraphInput.name = 'Paragraph';
            paragraphInput.value = paragraph;
            form.appendChild(paragraphInput);

            const urlInput = document.createElement('input');
            urlInput.name = 'URL';
            urlInput.value = url;
            form.appendChild(urlInput);

            const categoryInput = document.createElement('input');
            categoryInput.name = 'Category';
            categoryInput.value = category;
            form.appendChild(categoryInput);

            document.body.appendChild(form);
            form.submit();
        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
}

function editResource(resource) {
    Swal.fire({
        title: "Edit Activity",
        html: `
             <form id="resource-form">
                <label>Resource Title:</label>
                <input id="title" value="${resource.Title}" class="swal2-input" style="width: 80%;">
                <label>Resource Image:</label>
                <input id="image" value="${resource.Image}" class="swal2-input" type="file" style="width: 80%;">
                <label>Resource paragraph:</label>
                <input id="paragraph" value="${resource.Paragraph}" type="textarea" class="swal2-input" style="width: 80%;">
                <label>Resource URL:</label>
                <input id="url" value="${resource.URL}" class="swal2-input" type="url" style="width: 80%;">
                <label>Select a category:</label>
                <select id="category-select" value="${resource.Category}" class="swal2-select" style="width: 80%;">
                    <option value="habits" ${resource.Category === 'habits' ? 'selected' : ''}>Habits</option>
                    <option value="nutritions"  ${resource.Category === 'nutritions' ? 'selected' : ''}>Nutritions</option>
                    <option value="health"  ${resource.Category === 'health' ? 'selected' : ''}>Health</option>
                </select>
            </form>
        `,
        
        showCancelButton: true,
        confirmButtonText: '<swal-button type="confirm">Save</swal-button>',
        cancelButtonText: '<swal-button type="cancel">Cancel</swal-button>',
        focusConfirm: false,
        preConfirm: () => {
            const title = document.getElementById("title").value;
            const image = document.getElementById("image").value;
            const paragraph = document.getElementById("paragraph").value;
            const url = document.getElementById("url").value;
            const category = document.getElementById("category-select").value;

            if (!title || !image || !paragraph || !url || !category ) {
                Swal.showValidationMessage("Please fill in all fields.");
                return false;
            } 
    
            return { title, image, paragraph, url, category };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { title, image, paragraph: paragraph, url, category } = result.value;

            const form = document.createElement('form');
            form.action = `/admin/editresource/${resource._id}?_method=PUT`;
            form.method = 'POST';
            form.style.display = 'none';

            const methodInput = document.createElement('input');
            methodInput.name = '_method';
            methodInput.value = 'PUT';
            form.appendChild(methodInput);

            const inputs = {
                Title: title,
                Paragraph: paragraph,
                URL: url,
                Category: category,
            };

            for (const [name, value] of Object.entries(inputs)) {
                const input = document.createElement('input');
                input.name = name;
                input.value = value;
                form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
        } else if (result.isDenied) {
            Swal.fire("Changes discarded", "", "info");
        }
    });
}

function deleteResourceForm(resource) {
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
            console.log("User confirmed deletion");

            const form = document.createElement('form');
            form.action = `/admin/deleteresources/${resource._id}?_method=DELETE`; 
            form.method = 'POST'; 

            const methodInput = document.createElement('input');
            methodInput.type = 'hidden';
            methodInput.name = '_method';
            methodInput.value = 'DELETE';
            form.appendChild(methodInput);

            const resourceIdInput = document.createElement('input');
            resourceIdInput.type = 'hidden';
            resourceIdInput.name = '_id';
            resourceIdInput.value = resource._id;
            form.appendChild(resourceIdInput);

            document.body.appendChild(form);

            form.submit();
            console.log("Form submitted");

        } else {
            console.log("User canceled deletion");
        }
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

function hideOtherCategories() {
    const challengesCategory = document.querySelector('.challenges-category');
    const userCategory = document.querySelector('.user-category');
    userCategory.style.display = 'none';
    challengesCategory.style.display = 'none';
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










