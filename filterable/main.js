window.onload = function(){
    loadUsers();
}
//load users
function loadUsers(){
    //initialize
    let xhr = new XMLHttpRequest();
    //open
    xhr.open('GET', 'https://api.github.com/users', true);
    //onload
    xhr.onload = function(){
        if(this.status == 200){
            let users = JSON.parse(this.responseText);
            let output = '';
            
            users.forEach(user => {
                output += 
                    `<li class="collection-item" style="text-align: center; list-style: none">
                        <p style="margin: 0; padding:0 0 5px 0">${user.login}</p>
                        <a href="${user.html_url}" target="_blank"><img src="${user.avatar_url}" width="70" height="70"></a>
                    </li>`;        
            });
            
            document.getElementById('output').innerHTML = output;
        }
    }
    //onerror
    xhr.onerror = () =>{
    };
    //send
    xhr.send();
}

//get input field
let filterInput = document.getElementById('filterInput');
//add eventlistener
filterInput.addEventListener('keyup',filterNames);

function filterNames(){
    //Get value of input
    let filterValue = filterInput.value.toUpperCase();
    //Get names ul
    let ul = document.getElementById('output');
    //Get li's from ul 
    let lis = ul.querySelectorAll('li.collection-item');
    //loop throug li
    lis.forEach(li => {
        let chars = li.innerText.toUpperCase();
        //if character match
        if(chars.indexOf(filterValue) > -1){
            li.style.display = '';
        } else{
            li.style.display = 'none';
        }
    });
}



















