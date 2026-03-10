let current_user = null

async function show_username(){
    try{
        const user_name = document.getElementById("user_name")
        const res = await fetch("/api/user",{
            credentials: "include"
        })
        const user = await res.json()
        current_user = user
        user_name.innerHTML = `<i class="fa-solid fa-user"></i> ${user.username}`
    }catch(err){
        console.log(err)
        document.getElementById("user_name").innerHTML = "Failed to get user name"
    }finally{
        show_reviews()
    }
}

show_username()

let current_page = 1
let limit = 4
let total_pages = 1

async function show_reviews() {
    try{
        const reviews = document.getElementById("coms")
        reviews.innerHTML = ""

        const params = new URLSearchParams({
            page: current_page,
            limit: limit
        })

        const res = await fetch(`/api/review?${params}`)
        const data = await res.json()

        render(data.review)

        total_pages = data.total_pages || 1

        document.getElementById("prev").disabled = current_page === 1
        document.getElementById("next").disabled = current_page >= total_pages 

    }catch(err){
        console.log(err)
        document.getElementById("coms").innerHTML = "<h2>Failed to load</h2>"
    }
}

function render(data){
    const reviews = document.getElementById("coms")
    reviews.innerHTML = ""

    if(data.length === 0){
        reviews.innerHTML = "<h2>Reviews Not Found</h2>"
        return
    }

    data.forEach(rev => {
        const div = document.createElement("div")
        div.classList.add("comm")

        const is_owner = current_user && current_user.id === rev.user_id
        div.innerHTML = `
            <div>
                <div class="for_dn">${rev.user_name}</div>
                <p class="for_coms">${rev.comment}</p>
                <div class="for_dn">${new Date(rev.created_at).toLocaleDateString("en-US", {day: "2-digit",month: "long",year: "numeric"})}</div>
                <div class=for_btn>
                    ${is_owner ? `
                        <button class="green" class="btn_rev" onclick="update_review('${rev._id}','${rev.user_id}')">Edit</button>
                        <button class="red" class="btn_rev" onclick="delete_review('${rev._id}')">Delete</button>
                    `:""}
                </div>
            </div>
        `
        reviews.appendChild(div)
    })
}

document.getElementById("prev").addEventListener("click",()=>{
    if(current_page > 1){
        current_page--
        show_reviews()
    }
})

document.getElementById("next").addEventListener("click",()=>{
    if(current_page < total_pages){
        current_page++
        show_reviews()
    }
})

async function create_review(){
    try{
        const comment = document.getElementById("comments").value

        const res = await fetch("/api/review",{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comment    
            })
        })

        if(res.ok){
            alert("Sended Successfully")
        }
        else{
            alert("Failed to send!")
        }
    }catch(err){
        console.log(err)
        alert("Failed to send!!")
    }
}

document.getElementById("comment_form").addEventListener("submit",function(e){
    e.preventDefault()
    create_review()
})

async function update_review(id,user_id){
    try{
        const comment = prompt("Edit your review: ")
        if(!comment){
            return
        }

        const res = await fetch(`/api/review/${id}`,{
            method:"PUT",
            credentials:"include",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({comment,user_id})
        })

        if(res.ok){
            show_reviews()
        }
    }catch(err){
        console.log(err)
        alert("Failed to Edit")
    }
}

async function delete_review(id) {
    if(!confirm("Delete this review?")){
        return
    }

    const res = await fetch(`/api/review/${id}`,{
        method:"DELETE",
        credentials:"include"
    })

    if(res.ok){
        show_reviews()
    }
}