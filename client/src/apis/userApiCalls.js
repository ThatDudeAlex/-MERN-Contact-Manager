const headers = {
    "Content-Type": "application/json"
}

export function createNewUser(email, password){
    return fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
}