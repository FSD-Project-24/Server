const loginButton = document.getElementById('log-in');
const logoutButton = document.getElementById('log-out');
var loginModal = document.getElementById('loginModal');
loginModal.style.display = "none";
const logginFormbtn = document.getElementById('login-form-btn');

if (logginFormbtn) {
    logginFormbtn.addEventListener('click', (e) => {
        e.preventDefault();
        const formBody = {
            "username": document.getElementById('username').value,
            "email": document.getElementById('email').value,
            "password": document.getElementById('password').value
        };
        fetch('../api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formBody)
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/discuss/home';
                } else {
                    // Check if response is JSON
                    return response.json().then(data => {
                        if (data && data.message) {
                            throw new Error(data.message);
                        } else {
                            throw new Error('Unknown error occurred');
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Login request error:', error);
                alert('Login request error: ' + error.message);
            });
    });
}
if(logoutButton){
    logoutButton.addEventListener('click',(e)=>{
        fetch('../api/auth/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/discuss/home'; 
            } else {
                console.error('Logout request failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Logout request error:', error);
        }); 
    });
}

if(loginButton){
    loginButton.addEventListener('click',()=>{
        if(loginModal.style.display == "none")
            loginModal.style.display = "block";
    })
}

window.addEventListener('click', function(e){
    if(loginButton === null || loginButton.contains(e.target)){
        return;
    }
    var loginModal = document.getElementById('loginModal');
    if (loginModal.contains(e.target)){
    } else {
        if(loginModal.style.display == "block") {
            loginModal.style.display = "none";
        }   
    }
});

const creatPostButton = document.querySelector('.create-post-btn-container');


creatPostButton.addEventListener('click',()=>{
    window.location.href = "communities/create"
})
