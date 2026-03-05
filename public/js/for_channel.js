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