async function show(){
    try{
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")
        const container = document.getElementById("about_cartoons")

        if(!id){
            container.innerHTML = "<h2>Cartoon Not Found</h2>"
            return
        }

        const res = await fetch(`/api/cartoons/${id}`, {credentials: "include"})
        const object = await res.json()

        if(!object){
            container.innerHTML = "<h2>Cartoon Not FOund</h2>"
            return
        }

        const image = object.image || "/img/default.avif"
        container.innerHTML = `
            <div class="main_block">
                <div class=main1>
                    <img src="${image}" alt="${object.title}">
                    <div>
                        <div class="title"><p class="rating">${object.rating}</p><p>${object.title}</p></div>
                        <div class="info1">
                            <div><span class="shr">release year:</span> <span class="sha">${object.release_year}</span></div>
                            <div><span class="shr">country:</span> <span class="sha">${object.country}</span></div>
                            <div><span class="shr">genre:</span> <span class="sha">${object.genre}</span></div>
                            <div><span class="shr">episodes:</span> <span class="sha">${object.number_of_episods}</span></div>
                            <div><span class="shr">main characters:</span> <span class="sha">${object.main_characters}</span></div>
                            <div><span class="shr">style:</span> <span class="sha">${object.style}</span></div>
                        </div>
                    </div>
                </div>
                <hr style="width:90%;margin-top:20px">
                <div class="main2">
                    <p>${object.description}</p><br>
                </div>
            </div>
        `
    }catch{
        document.getElementById("about_movie").innerHTML = "Failed to load cartoon"
    }
}

show()

async function update(){
    try{
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        const title = document.getElementById("title").value
        const genre = document.getElementById("genre").value
        const country = document.getElementById("country").value

        const release = document.getElementById("release_year").value
        const release_year = Number(release)

        const number_of_episodes = document.getElementById("number_of_episodes").value
        const number_of_episods = Number(number_of_episodes)

        const rat = document.getElementById("rating").value
        const rating = Number(rat)

        const description = document.getElementById("description").value
        const image = document.getElementById("image").value
        const main_characters = document.getElementById("main_characters").value
        const style =document.getElementById("style").value

        const genres = genre.split(",").map(g => g.trim()).filter(g=>g !== "")
        const countries = country.split(",").map(c => c.trim()).filter(c=>c !== "")

        const body = {}
        if(title){
            body.title = title
        }
        if(genre){
            body.genre = genres
        }
        if(country){
            body.country = countries
        }
        if(release_year){
            body.release_year = release_year
        }
        if(number_of_episods){
            body.number_of_episods = number_of_episods
        }
        if(rating){
            body.rating = rating
        }
        if(description){
            body.description = description
        }
        if(image){
            body.image = image
        }
        if(main_characters){
            body.main_characters = main_characters
        }
        if(style){
            body.style = style
        }

        if(Object.keys(body).length === 0){
            alert("Atleast one field must filled")
            return
        }

        const res = await fetch(`/api/cartoons/${id}`,{
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