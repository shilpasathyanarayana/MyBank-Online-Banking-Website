const apiUrl = 'http://localhost:3000/';

function func() {
    window.location.assign("login.html");
}

function signup() {
    console.log("you clicked signup btn");
    window.location.assign("signup.html");
}

function closemywindow() {
    console.log("close button working");
    window.location.assign("index1.html");
}

function activate(target) {
    try {
        let sbArray = document.getElementsByClassName('sb');
        for (let i = 0; i < sbArray.length; i++) {
            let sb = sbArray[i];
            sb.style.display = 'none';
        }
        document.getElementById(target).style.display = 'block';
    } catch (e) {
        console.error(e)
    }
}
activate('dashboard');



// This is the login Function that reads username and password from the HTML
// This send username and password to Login API 

async function loginfunc() {
    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;
    const val = document.querySelector('input').value;
    console.log(username);
    console.log(password);
    const response = await fetch(apiUrl + "login/" + username + '/' + password);
    var data = await response.json();
    console.log(data);
    // If valid combnation of username and password then the API will return 
    // verification=1 
    if (data.accountnumber) {
        // Storing a value in a session storage - This means the value will be lost when browser closed.
        // In this case we are storing account number in session storage once customer logs in and 
        // access the same account number from session storage in another HTML file.
        sessionStorage.setItem("acc_number", data.accountnumber);
        window.location.assign("transaction.html");

    }
    else
        alert("Invalid Login Credentials");
}
// --------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------


// This is the getBalance function which returns the balance for the account 
// that logged in
async function getBalance() {
    console.log("getting balance");
    let account_number = sessionStorage.getItem("acc_number");
    console.log(account_number);
    const response = await fetch(apiUrl + "account" + '/' + account_number);
    var data = await response.json();
    if (data && data.length > 0) {


        console.log(data);

        let abdiv = document.getElementsByClassName('accnum');
        for (var i = 0; i < abdiv.length; i++) {
            abdiv[i].innerHTML = "Your Account number is " + data[0].accountnumber;
        }

        let first = document.getElementsByClassName('first');
        for (var i = 0; i < first.length; i++) {
            first[i].innerHTML = "" + data[0].first_name;
        }
        let last = document.getElementsByClassName('last');
        for (var i = 0; i < last.length; i++) {
            last[i].innerHTML = " " + data[0].last_name;
        }
        let email = document.getElementById('email');
        let cardnum = document.getElementById('cardnum');
        let balance = document.getElementById('balance');
        let amount = document.getElementById('amount');
        email.innerHTML = "e-mail address " + data[0].e_mail_address;
        cardnum.innerHTML = "Card number " + data[0].card_number;
        balance.innerHTML = "Current Balance " + data[0].balance;
        amount.innerHTML = "Opening amount " + data[0].account_opening_amount;
    }
}
getBalance();
// -------------------------------------------------------------------------


// // This is the getTransaction function which returns the transaction details 
// of the given account_number

async function getTransaction() {
    console.log("Hello");
    let from_account = sessionStorage.getItem("acc_number");
    console.log(from_account);
    const response = await fetch(apiUrl + "transactions" + '/' + from_account);
    var data = await response.json();
    console.log(data);
    if (data && data.length > 0) {
        let numOfTransactions = data.length;
        console.log("number of transactions =" + numOfTransactions);
        // To create the table to print transaction history in the website using Java Script
        var table = document.getElementById("myTable");
        for (var i = 0; i <= data.length; i++) {
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = data[i].from_account;
            cell2.innerHTML = data[i].to_account;
            cell3.innerHTML = data[i].amount;
        }
    }
    // Created a table with 3 cells
}
getTransaction();

// This function will make an API call to perform transaction from one account to another

async function TransferMoney() {
    console.log("Hello");
    let from_account = sessionStorage.getItem("acc_number");
    console.log(from_account);
    let to_account = document.getElementById("to_account").value;
    console.log(to_account);
    let transfer_amount = document.getElementById("transfer_amount").value;
    console.log(transfer_amount);

    const response = await fetch(apiUrl + "transfer" + '/' + from_account + '/' + to_account + '/' + transfer_amount);
    var data = await response;
    console.log("transaction completed");
    getBalance();
}

// -------------------------------------------------------------------------------------



// -------------------------------------------------------------------------
// This code is for pop-up page on HTML
const section = document.querySelector("section"),
    overlay = document.querySelector(".overlay"),
    showBtn = document.querySelector(".show-modal"),
    closeBtn = document.querySelector(".close-btn");
showBtn && showBtn.addEventListener("click", () => section.classList.add("active"));
overlay && overlay.addEventListener("click", () =>
    section.classList.remove("active")
);
closeBtn && closeBtn.addEventListener("click", () =>
    section.classList.remove("active")
);
// -----------------------------------------------------------------------------

function logout() {
    sessionStorage.clear();
    window.location.assign("index.html");
}







