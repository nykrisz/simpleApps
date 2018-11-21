//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
    //get form values
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    //validation
    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    //bookmark informations
    let bookmark = {
        name: siteName,
        url: siteUrl
    };

    //using localStorage
    //test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //init bookmarks array
        let bookmarks = [];
        //add item to bookmarks
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }else{
        //get bookmarks from localstorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add item to bookmarks
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //reset form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();

    e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
    console.log(123);
    //get bookmarks from localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.forEach((bm,i) =>{
        if(bm.url == url){
            bookmarks.splice(i,1);
        }
    });
    //re-set back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //re-fetch bookmars
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
    //get bookmarks from localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output id
    var bookmarksResult = document.getElementById('bookmarksResults');
    //build output
    bookmarksResult.innerHTML = '';
    bookmarks.forEach(bm => {
        let name = bm.name;
        let url = bm.url;

        bookmarksResults.innerHTML += 
        '<div class="card bg-light text-dark card-body">' + 
            '<h3>' + name +
            '<a class = "btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
            '<a onclick="deleteBookmark(\''+url+'\')" class = "btn btn-danger" href="#">Delete</a> ' +
            '</h3>' +
        '</div>';
    });
}

//form validation
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }
    //regexp for valid url
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    let regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid url')
        return false;
    }

    return true;
}