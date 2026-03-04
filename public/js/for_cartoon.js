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
        document.getElementById("about_movie").innerHTML = "Failed to load movie"
    }
}

show()