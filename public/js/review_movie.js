async function show_reviews() {
    try{
        const reviews = document.getElementById("review_option")
        reviews.innerHTML = ""

        const res = await fetch(`/api/movies/${movie_id}/reviews`)
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

        div.innerHTML = `
            <div>
                <div class="for_dn">${rev.firstname}</div>
                <p class="for_coms">${rev.comment}</p>
                <div class="for_dn">${new Date(rev.created_at).toLocaleDateString("en-US", {day: "2-digit",month: "long",year: "numeric"})}</div>
            </div>
        `
        reviews.appendChild(div)
    })
}

show_reviews()


async function create_review(){
    try{
        const comment = document.getElementById("comments").value

        const res = await fetch(`/api/movies/${movie_id}/reviews`,{
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

document.getElementById("comment_form").addEventListener("submit",function(e){
    e.preventDefault()
    create_review()
})