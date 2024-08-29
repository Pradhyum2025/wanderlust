  (() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
  })()


//login page information

let navbarLogin=document.getElementById("navbar-login");
navbarLogin.addEventListener("click",()=>{
  if(document.getElementById("loginPage").style.display!="flex"){
    document.getElementById("loginPage").style.display="flex";
    document.body.classList.add('freeze-background');
    document.getElementById("user_Info").style.display="none";

  }
})


let loginCancle=document.getElementById("hideLoginForm");

loginCancle.addEventListener("click",()=>{
document.getElementById("loginPage").style.display="none";
 document.body.classList.remove('freeze-background');

})


