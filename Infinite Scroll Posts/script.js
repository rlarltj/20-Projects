 const filter = document.getElementById('filter');
 const loading = document.querySelector('.loader');
 const postContainer = document.getElementById('post-container');

 let limit = 5;
 let page = 1;

//  Fetch posts from API
 async function getPosts(){
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json();
    return data;
 }

//  Show posts in DOM
async function showPosts(){
    const posts = await getPosts();
    
    posts.forEach(post => {
        const postEL = document.createElement('div');
        postEL.classList.add('post');
        postEL.innerHTML =`
        <div class="number">${post.id}</div>
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">
        ${post.body}
        </p>
    </div> `;
        postContainer.appendChild(postEL);

    })
}

// Filter posts by input;
function filterPosts(e){
    const term= e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach((post) =>{
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
    
        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            post.style.display = 'flex';
        }else{
            post.style.display = 'none';
        }
        
    }
    )
}

// Show loader & fetch more posts
function showLoading(){
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++
            showPosts();
        }, 300)
    }, 1000)
}

window.addEventListener('scroll', () =>{
    const{ scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(scrollHeight- scrollTop < clientHeight+7){
        showLoading();
    }
})
showPosts();

filter.addEventListener('input', filterPosts);

