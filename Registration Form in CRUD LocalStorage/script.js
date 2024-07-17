let editIndex = null; // Variable to store the index of the user being edited

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Reset previous error messages
    resetErrorMessages();

    // Validate full name
    if (fullName === "") {
        document.getElementById("fullNameError").textContent = "Full Name cannot be empty.";
        valid = false;
      } else if (!/^[A-Z]/.test(fullName)) {
        document.getElementById("fullNameError").textContent = "Full Name must start with an uppercase letter.";
        valid = false;
      }

      // Validate Email
      if (email === "") {
        document.getElementById("emailError").textContent = "Email ID cannot be empty.";
        valid = false;
      } else if (!/.+@.+\..+/.test(email)) {
        document.getElementById("emailError").textContent = "Email ID must contain '@' and '.com'.";
        valid = false;
      }

      // Validate Mobile Number
      if (mobile === "") {
        document.getElementById("mobileError").textContent = "Mobile Number cannot be empty.";
        valid = false;
      } else if (!/^[7-9]\d{9}$/.test(mobile)) {
        document.getElementById("mobileError").textContent = "Mobile Number must start with 7, 8, or 9 and have 10 digits.";
        valid = false;
      }

      // Validate Username
      if (username === "") {
        document.getElementById("usernameError").textContent = "Username cannot be empty.";
        valid = false;
      } else if (!/^[a-z0-9@]{5,10}$/.test(username)) {
        document.getElementById("usernameError").textContent = "Username must be 5-10 characters long and contain lowercase letters, numbers, and '@'.";
        valid = false;
      }

      // Validate Password
      if (password === "") {
        document.getElementById("passwordError").textContent = "Password cannot be empty.";
        valid = false;
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}/.test(password)) {
        document.getElementById("passwordError").textContent = "Password must be at least 10 characters long and contain uppercase letters, lowercase letters, numbers, and special characters.";
        valid = false;
      }

      // If all fields are valid, store data and display success message
      if (valid) {
        const user = { fullName, email, mobile, username, password };
        storeUser(user);
        document.getElementById("message").textContent = "User registered successfully!";
        document.getElementById("showTableButton").style.display = "block"; // Show the button to display the table
      } else {
        document.getElementById("message").textContent = "";
      }
    


    // If in edit mode, update existing user; otherwise, add new user
    if (editIndex !== null) {
        saveUser(editIndex);
    } else {
        const newUserData = {
            fullName: fullName,
            email: email,
            mobile: mobile,
            username: username,
            password: password
        };

        let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
        usersData.push(newUserData);
        localStorage.setItem('usersData', JSON.stringify(usersData));

        displaySuccessMessage('User registered successfully');
        displayUserData(usersData);

        document.getElementById('registrationForm').reset();
    }
});

function displayErrorMessage(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function resetErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });
}

function displaySuccessMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = 'green';
    setTimeout(function() {
        messageElement.textContent = '';
    }, 3000);
}
///////


function displayUserData(usersData) {
    const userDataTableBody = document.querySelector('#userDataTable tbody');
    userDataTableBody.innerHTML = usersData.map((userData, index) => `
        <tr data-index="${index}">
            <td><span class="view">${userData.fullName}</span><input class="edit username-input" type="text" value="${userData.fullName}" style="display:none;"></td>
            <td><span class="view">${userData.email}</span><input class="edit username-input" type="email" value="${userData.email}" style="display:none;"></td>
            <td><span class="view">${userData.mobile}</span><input class="edit username-input" type="tel" value="${userData.mobile}" style="display:none;"></td>
            <td><span class="view">${userData.username}</span><input class="edit username-input" type="text" value="${userData.username}" style="display:none;"></td>
            <td><span class="view">${userData.password}</span><input class="edit username-input" type="password" value="${userData.password}" style="display:none;"></td>
            <td class="action-buttons">
                <button class="view" onclick="editUser(${index})">Edit</button>
                <button class="edit" onclick="saveUser(${index})" style="display:none;">Save</button>
                <button class="edit" onclick="cancelEdit(${index})" style="display:none;">Cancel</button>
                <button class="view" onclick="deleteUser(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function editUser(index) {
    const row = document.querySelector(`tr[data-index="${index}"]`);
    // Hide view elements, show edit elements
    row.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    row.querySelectorAll('.edit').forEach(el => el.style.display = 'inline');

    // Populate form with current user data
    document.getElementById('fullname').value = row.querySelector('td:nth-child(1) input').value;
    document.getElementById('email').value = row.querySelector('td:nth-child(2) input').value;
    document.getElementById('mobile').value = row.querySelector('td:nth-child(3) input').value;
    document.getElementById('username').value = row.querySelector('td:nth-child(4) input').value;
    document.getElementById('password').value = row.querySelector('td:nth-child(5) input').value;

    editIndex = index; // Set editIndex to current index
}

function saveUser(index) {
    const row = document.querySelector(`tr[data-index="${index}"]`);
    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Get users data from localStorage
    let usersData = JSON.parse(localStorage.getItem('usersData'));

    // Update user data
    usersData[index] = {
        fullName: fullName,
        email: email,
        mobile: mobile,
        username: username,
        password: password
    };

    // Save updated users data to localStorage
    localStorage.setItem('usersData', JSON.stringify(usersData));

    // Re-display updated user data
    displayUserData(usersData);

    // Reset editIndex after save
    editIndex = null;
}

function cancelEdit(index) {
    const row = document.querySelector(`tr[data-index="${index}"]`);
    row.querySelectorAll('.view').forEach(el => el.style.display = 'inline');
    row.querySelectorAll('.edit').forEach(el => el.style.display = 'none');

    // Clear form and reset editIndex
    document.getElementById('registrationForm').reset();
    editIndex = null;
}

function deleteUser(index) {
    let usersData = JSON.parse(localStorage.getItem('usersData'));
    usersData.splice(index, 1);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    displayUserData(usersData);

    // Reset editIndex after delete if needed
    if (editIndex === index) {
        document.getElementById('registrationForm').reset();
        editIndex = null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const storedUsersData = JSON.parse(localStorage.getItem('usersData'));
    if (storedUsersData) {
        displayUserData(storedUsersData);
    }
});



