const form = document.getElementById("form");
const name = document.getElementById("name");
const prlNumber = document.getElementById("prlNumber");
const rollNumber = document.getElementById("rollNumber");
const email = document.getElementById("email");
const password = document.getElementById("password");
const department = document.getElementById("department");
const Class = document.getElementById("Class");
const div = document.getElementById("division");
const studentNumber = document.getElementById("studentNumber");
const parentNumber = document.getElementById("parentNumber");
const buffer = document.getElementById("buffer")
buffer.style.display = 'none'
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();
    buffer.style.display = 'block'
    const formData = {
        name: name.value,
        prlNumber: prlNumber.value,
        rollNumber: rollNumber.value,
        email: email.value,
        password: password.value,
        department: department.value,
        Class: Class.value,
        div: div.value,
        phoneNumber: [parentNumber.value, studentNumber.value]
    }

    // for (let i = 0; i < form.elements.length; i++) {
    //     form.elements[i].disabled = true;
    // }
    fetch('/api/v1/addStudents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                buffer.src = 'https://lottie.host/embed/f58c87a6-6cae-4ae2-a4bd-ee60bc0050cc/ToTkqYC8Hi.json'
                form.style.display = 'none'
            }
            console.log("good")

            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            if (data.success) {
                buffer.src = 'https://lottie.host/embed/f6c9f21a-aa10-4086-b227-24f232b9aae3/goWCgQhhie.json'
                form.style.display = 'none'
            }
            else {
                buffer.src = 'https://lottie.host/embed/f58c87a6-6cae-4ae2-a4bd-ee60bc0050cc/ToTkqYC8Hi.json'
                form.style.display = 'none'
            }

        })
        .catch(error => {
            buffer.src = 'https://lottie.host/embed/f58c87a6-6cae-4ae2-a4bd-ee60bc0050cc/ToTkqYC8Hi.json'
            form.style.display = 'none'
        });
})
let show = false;
let passwordShow = document.getElementById("passwordShow");
function passwordShowfunction() {
    if (show == false) {
        show = true;
        console.log(show)
        document.getElementById("password").type = 'text'
        passwordShow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>`
    }
    else {
        show = false;
        console.log(show)
        document.getElementById("password").type = 'password'
        passwordShow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-eye-slash" viewBox="0 0 16 16">
        <path
            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
        <path
            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
        <path
            d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
    </svg>`
    }
}