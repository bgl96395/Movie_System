async function show(){
    try{
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")
        const container = document.getElementById("about_channels")

        if(!id){
            container.innerHTML = "<h2>Channel Not Found</h2>"
            return
        }

        const res = await fetch(`/api/tv-channel/${id}`, {credentials: "include"})
        const object = await res.json()

        if(!object){
            container.innerHTML = "<h2>Channel Not Found</h2>"
            return
        }

        const image = object.image || "/img/default.avif"
        container.innerHTML = `
            <div class="chan1">
                <img src="${image}" alt="${object.title}">
                <div class="chan2">
                    <div class="head_title">${object.title}</div>
                    <div class="chan3">
                        <span class="ob">Category: <b>${object.category}</b></span>
                        <span class="ob">Country: <b>${object.country}</b></span>
                        <span class="ob">Status: <b>${object.status}</b></span>
                        <span class="ob">Launch year: <b>${object.launch_year}</b></span>
                    </div>
                    <hr>
                    <div>${object.description}</div>
                    <hr>
                    <div class="chan4">
                        <div><b>Owner:</b> ${object.owner}</div>
                        <div><b>Official site:</b> <a href="${object.website}">${object.website}</a></div>
                    </div>
                <div>
            </div>
        `
    }catch{
        document.getElementById("about_channel").innerHTML = "Failed to load channel"
    }
}

show()

async function update(){
    try{
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        const title = document.getElementById("title").value
        const category = document.getElementById("category").value
        const country = document.getElementById("country").value

        const launch = document.getElementById("launch_year").value
        const launch_year = Number(launch)

        const description = document.getElementById("description").value
        const image = document.getElementById("image").value
        const status = document.getElementById("status").value
        const owner =document.getElementById("owner").value
        const website = document.getElementById("website").value

        const body = {}
        if(title){
            body.title = title
        }
        if(category){
            body.category = category
        }
        if(country){
            body.country = country
        }
        if(launch_year){
            body.launch_year = launch_year
        }
        if(owner){
            body.owner = owner
        }
        if(status){
            body.status = status
        }
        if(description){
            body.description = description
        }
        if(image){
            body.image = image
        }
        if(website){
            body.website = website
        }

        if(Object.keys(body).length === 0){
            alert("Atleast one field must filled")
            return
        }

        const res = await fetch(`/api/tv-channel/${id}`,{
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        })

        if(res.ok){
            alert("Updated Successfully")
        }
        else{
            alert("Failed to update")
        }
    }catch(err){
        console.log(err)
        alert("Failed to update!")
    }
}

document.getElementById("updating").addEventListener("submit",function(e){
    e.preventDefault()
    update()
})