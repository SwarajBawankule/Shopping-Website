function registerUser() {
    document.getElementById("fullNameError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("mobileError").textContent = "";
        document.getElementById("usernameError").textContent = "";
        document.getElementById("passwordError").textContent = "";

        // Get form values
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        let valid = true;

        // Validate Full Name
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
        // if (username === "") {
        //   document.getElementById("usernameError").textContent = "Username cannot be empty.";
        //   valid = false;
        // } else if (!/^[a-z0-9@]{5,10}$/.test(username)) {
        //   document.getElementById("usernameError").textContent = "Username must be 5-10 characters long and contain lowercase letters, numbers, and '@'.";
        //   valid = false;
        // }

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
          displayUserData();
      } else {
          document.getElementById("message").textContent = "";
      }
  }
  
  function storeUser(user) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
  }
  
  function displayUserData() {
      const users = JSON.parse(localStorage.getItem("users"));
      const tableBody = document.getElementById("userDataTableBody");
      tableBody.innerHTML = "";
      users.forEach((user, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${user.fullName}</td>
              <td>${user.email}</td>
              <td>${user.mobile}</td>
              <td>${user.username}</td>
              <td>${user.password}</td>
          `;
          tableBody.appendChild(row);
      });
  }
  
  function redirectToUserTable() {
      window.location.href = "userTable.html";
  }
  
  // Hide the button on page load
  window.onload = function() {
      document.getElementById("showTableButton").style.display = "none";
      displayUserData(); // Display user data on page load
  };
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
