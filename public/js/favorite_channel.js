let current_page4 = 1
let limit4 = 3
let total_pages4 = 1

async function show_fav_channels(){
    try{
        const params = new URLSearchParams({
            page:current_page4,
            limit:limit4
        })

        const res = await fetch(`/api/fav_channels?${params}`,{
            credentials:"include"
        })
        const data = await res.json()

        render_channels(data.channels)

        total_pages4 = data.total_pages || 1

        document.getElementById("prev4").disabled = current_page4 === 1
        document.getElementById("next4").disabled = current_page4 >= total_pages4 
    }catch(err){
        console.log(err)
        document.getElementById("channels").innerHTML = "<h2>Failed to load favorite channels</h2>"
    }
}

function render_channels(data){
    const channels = document.getElementById("channels")
    channels.innerHTML = ""

    if(data.length === 0){
        channels.innerHTML = "<h2>Favorite Channels Not Found</h2>"
        return
    }

    data.forEach(channel => {
        const image = channel.image || "/img/default.avif"
        const div = document.createElement("div")

        div.classList.add("card")
        div.innerHTML = `
            <div class="for_ch_image" onclick="window.location.href='/for_channels?id=${channel._id}'">
                <img src="${image}" alt="${channel.title}">
                <div class="overlay">
                    <div class="overlay_text">category: <b>${channel.category}</b></div>
                    <div class="overlay_text2">country: <b>${channel.country}</b></div>
                    <div class="overlay_text2">status: <b>${channel.status}</b></div>
                </div>
            </div>
        `
        channels.appendChild(div)
    })
}

document.getElementById("prev4").addEventListener("click",()=>{
    if(current_page4 > 1){
        current_page4--
        show_fav_channels()
    }
})

document.getElementById("next4").addEventListener("click",()=>{
    if(current_page4 < total_pages4){
        current_page4++
        show_fav_channels()
    }
})

show_fav_channels()