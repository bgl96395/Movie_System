let current_user = null

async function show_username(){
    try{
        const res = await fetch("/api/user",{
            credentials: "include"
        })
        const user = await res.json()
        current_user = user
    }catch(err){
        console.log(err)
    }
}

async function show_reviews() {
    try{
        const reviews = document.getElementById("review_option")
        reviews.innerHTML = ""

        const res = await fetch(`/api/series/${series_id}/reviews`)
        const data = await res.json()

        render(data)
    }catch(err){
        console.log(err)
        document.getElementById("review_option").innerHTML = "<h2>Failed to load</h2>"
    }
}

function render(data){
    const reviews = document.getElementById("review_option")
    reviews.innerHTML = ""

    if(data.length === 0){
        reviews.innerHTML = "<h2>Reviews Not Found</h2>"
        return
    }

    data.forEach(rev => {
        const div = document.createElement("div")
        div.classList.add("com")

        const is_owner = current_user && current_user.id === rev.user_id
        const is_admin = current_user.role === "admin"
        div.innerHTML = `
            <div>
                <div class="for_dn">${rev.firstname} ${rev.lastname}</div>
                <p class="for_coms">${rev.comment}</p>
                <div class="for_dn">${new Date(rev.created_at).toLocaleDateString("en-US", {day: "2-digit",month: "long",year: "numeric"})}</div>
                <div class=for_btn>
                    ${is_owner ? `
                        <button class="green" class="btn_rev" onclick="update_review('${rev._id}','${rev.user_id}')">Edit</button>
                    `:""}
                    ${is_owner || is_admin ? `
                        <button class="red" class="btn_rev" onclick="delete_review('${rev._id}')">Delete</button>
                    `:""}
                </div>
            </div>
        `
        reviews.appendChild(div)
    })
}

async function create_review(){
    try{
        const comment = document.getElementById("commentss").value
        if(!comment){
            return
        }

        const res = await fetch(`/api/series/${series_id}/reviews`,{
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
            document.getElementById("commentss").value = ""
            show_reviews()
        }
        else{
            alert("Failed to send!")
        }
    }catch(err){
        console.log(err)
        alert("Failed to send!!")
    }
}

async function update_review(id,user_id){
    try{
        const comment = prompt("Edit your comment: ")
        if(!comment){
            return
        }

        const res = await fetch(`/api/series/${series_id}/reviews/${id}`,{
            method:"PUT",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({comment,user_id})
        })

        if(res.ok){
            show_reviews()
        }
    }catch(err){
        console.log(err)
        alert("Failed to edit")
    }
}

async function delete_review(id) {
    try{
        if(!confirm("Delete this comment?")){
            return
        }

        const res = await fetch(`/api/series/${series_id}/reviews/${id}`,{
            method:"DELETE",
            credentials:"include"
        })

        if(res.ok){
            show_reviews()
        }
    }catch(err){
        console.log(err)
        alert("Failed to delete")
    }
}

document.getElementById("comment_forms").addEventListener("submit",function(e){
    e.preventDefault()
    create_review()
})

async function init() {
    await show_username()
    show_reviews()
}

init()