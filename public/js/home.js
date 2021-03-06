$.ajax({
    type: 'post',
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    },
    url: '/api/feed',
    success: function(data) {
        console.log(data);
        data.forEach(post => {
            let htmlstring = "";
            htmlstring += `
                <div class="post">
                    <div class="top-row">
                        <span>
                            <img id="pfp" src="/img/${post.post.profile_pic}" />
                            <a href="/profile/${post.post.user_id}">${post.post.firstname} ${post.post.surname}</a>
                        </span>
                        <span>
                            ${post.post.uploaded_at}
                        </span>
                    </div>
                    <div class="middle-row">
                        <a href="/post/${post.post.p_id}">
                        <img class="feed-pic" src="/img/${post.post.img}" alt="">
                        </a>
                    </div>
                    <div class="bottom-row">
                        <span class="bottom-span">
                            <h1 id="likes${post.post.p_id}">
                                ${post.post.likes}
                            </h1>
            `;
            if(post.isLiked){
                htmlstring += `
                            <svg id="${post.post.p_id}" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="like bi bi-suit-heart-fill" viewBox="0 0 16 16">
                                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chat-left-dots" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                            </svg>
                        </span>
                        <span class="caption"><strong>${post.post.firstname} ${post.post.surname}</strong>: ${post.post.caption}</span>
                    </div>
                </div>
                `;
            }else{
                htmlstring += `
                            <svg id="${post.post.p_id}" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="like bi bi-suit-heart" viewBox="0 0 16 16">
                                <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                            </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chat-left-dots" viewBox="0 0 16 16">
                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                </svg>
                        </span>
                        <span class="caption"><strong>${post.post.firstname} ${post.post.surname}</strong>: ${post.post.caption}</span>
                    </div>
                </div>
                `;
            }
            document.getElementById('feed-wrapper').innerHTML += htmlstring;
        });
    }
})

$('body').delegate('.like','click',function(){
    console.log(this.id);
    let id = this.id;
    $.ajax({
        type: 'post',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/api/like/' + id,
        success: function(data) {
            console.log(data);
            document.getElementById(`likes${id}`).innerHTML = data.amount;
            if(data.status == 'like'){
                document.getElementById(id).innerHTML = '<path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>';
            }else{
                document.getElementById(id).innerHTML = '<path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>';
            }
        }
    });

});

document.getElementById('search').addEventListener('keyup', ()=>{
    let search = document.getElementById('search').value;
    $.ajax({
        type: 'post',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: '/api/search/' + search,
        success: function(data) {
            document.getElementById('output').innerHTML = "";
            data.forEach(user => {
                document.getElementById('output').innerHTML += `

                <div class="result">
                    <a href="/profile/${user.id}">
                    <span>
                        <img src="/img/${user.profile_pic}" alt="">
                        <p>${user.firstname} ${user.surname}</p>
                    </span>
                    </a>
                </div>

                `;
            });
        }
    });
});
