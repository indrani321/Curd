let para = document.createElement("p");
let pasba=document.getElementById('password').parentElement;
    let showbtn = document.createElement("button");
    showbtn.textContent = "Show";
    pasba.appendChild(showbtn);

    

        showbtn.addEventListener('click', function show(event){
        event.preventDefault();
        let p = document.getElementById("password");
        if(p.type == 'password')
        {
            showbtn.textContent="Hide";
            p.type='text';
        }
        else
        {
            p.type='password';
            showbtn.textContent="Show"
        }
        
    })

document.getElementById('submit').addEventListener('click', function saveData(e) {
    e.preventDefault();
    
    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpassword= document.getElementById('cnfpassword').value;
    let cnfpassword= document.getElementById('cnfpassword').parentElement;

    if(password==cpassword && password.length>=5)
{
    let obj = {
        "FULLNAME": fullname,
        "EMAIL": email,
        "PASSWORD": password
    }

    axios.post('https://crudcrud.com/api/c6a154e93efe4802ad02200d5827b13a/data', obj)
         .then((response)=>console.log(response))
         .catch((error)=>console.error(error))
         
    para.textContent="";
    let Name = document.getElementById("fullname");
    let Email = document.getElementById("email");
    let Password = document.getElementById("password");
    let cnfPassword = document.getElementById("cnfpassword");

    Name.value = "";
    Email.value = "";
    Password.value = "";
    cnfPassword.value = "";    

    let count = localStorage.getItem("UserCount") || 0;
    count++;
    let key = "USER" + count;
    let objstr = JSON.stringify(obj);
    localStorage.setItem("UserCount", count);
    localStorage.setItem(key, objstr);
    let input = localStorage.getItem(key);
    let ans = JSON.parse(input);
    console.log(ans);

    let userInfo = document.getElementById("user-info");
    let listItem = document.createElement("li");
    let text = document.createTextNode(key + " - " + fullname + " - " + email);
    listItem.appendChild(text);
    userInfo.appendChild(listItem);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete User";
    deleteButton.setAttribute("id", "btn" + count);
    listItem.appendChild(deleteButton);

    let editButton = document.createElement("button");
    editButton.textContent = "Edit User";
    editButton.setAttribute("id", "btn1");
    listItem.appendChild(editButton);

    deleteButton.addEventListener('click', function deleteUser(event) {
        listItem.remove();
        let d = event.target.parentNode.firstChild.textContent.split(" - ")[1];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = JSON.parse(localStorage.getItem(key));
            if (value.FULLNAME === d) {
                localStorage.removeItem(key);
                break;
            }
        }
        console.log(d);
    });
    editButton.addEventListener('click', function editUser(event) {
        event.preventDefault();
         listItem.remove();
        //  let c = localStorage.getItem("UserCount");
        //  c--;
        //  localStorage.setItem("UserCount",c);
        let e = event.target.parentNode.firstChild.textContent.split(" - ")[1];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = JSON.parse(localStorage.getItem(key));
            if (value.FULLNAME === e) {
                localStorage.removeItem(key);
                break;
            }
        }
        console.log(fullname.value);

        let nambu = document.querySelector("#fullname")
        let mailbu = document.querySelector('#email')
        let passbu= document.querySelector('#password')
        nambu.value=obj.FULLNAME
        mailbu.value=obj.EMAIL
        passbu.value=obj.PASSWORD

    });
}
    else

        {
            para.textContent = "password does not match!";
            para.style.color="red";
            cnfpassword.appendChild(para);
        }
    
});


