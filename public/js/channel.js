let current_page = 1
let limit = 3
let total_pages = 1

async function show(){

    const genre_value = document.getElementById("genre_filter").value
    const country_value = document.getElementById("country_filter").value
    const rating_value = document.getElementById("rating_filter").value

    const params = new URLSearchParams({
        page: current_page,
        limit: limit
    })

    if(genre_value){
        params.append("category",genre_value)
    }
    if(country_value){
        params.append("country",country_value)
    }
    if(rating_value){
        params.append("status",rating_value)
    }

    const res = await fetch(`/api/tv-channel?${params}`)
    const data = await res.json()

    render(data.channels)

    total_pages = data.total_pages || 1

    document.getElementById("prev").disabled = current_page === 1
    document.getElementById("next").disabled = current_page >= total_pages 
}

function render(data){
    const channels = document.getElementById("channel_main")
    channels.innerHTML = ""

    if(data.length === 0){
        channels.innerHTML = "<h2>No Channels Found</h2>"
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
                    <div class="overlay_text">categroy: <b>${channel.category}</b></div>
                    <div class="overlay_text2">country: <b>${channel.country}</b></div>
                    <div class="overlay_text2">status: <b>${channel.status}</b></div>
                </div>
            </div>
        `
        channels.appendChild(div)
    })
}

document.querySelectorAll("#filter select").forEach(select => {
    select.addEventListener("change",()=>{
        current_page = 1
        show()
    })
})

document.getElementById("prev").addEventListener("click",()=>{
    if(current_page > 1){
        current_page--
        show()
    }
})

document.getElementById("next").addEventListener("click",()=>{
    if(current_page < total_pages){
        current_page++
        show()
    }
})

show()

async function show_by_name_or_id() {
    const val = document.getElementById("search").value
    const channels = document.getElementById("channel_main")
    channels.innerHTML = ""

    if(!val) {
        show()
        return
    }

    const res = await fetch("/api/tv-channel?page=1&limit=1000")
    const data = await res.json()

    const channels_data = data.channels || []

    if(channels_data.length === 0){
        channels.innerHTML = "<h2>Channels Not Found</h2>"
        return
    }

    const filtered = channels_data.filter(channel =>
        channel._id.includes(val) || channel.title.toLowerCase().includes(val.toLowerCase())
    )

    if(filtered.length === 0){
        channels.innerHTML = "<h2>Channels Not Found</h2>"
        return
    }

    filtered.forEach(channel => {
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

document.getElementById("ic").onclick = show_by_name_or_id

async function create(){
    try{
        const title = document.getElementById("title").value
        const category = document.getElementById("category").value
        const country = document.getElementById("country").value

        const launch = document.getElementById("launch_year").value
        const launch_year = Number(launch)

        const description = document.getElementById("description").value
        const image = document.getElementById("image").value || "/img/default.avif"
        const status = document.getElementById("status").value
        const owner =document.getElementById("owner").value
        const website = document.getElementById("website").value

        const res = await fetch("/api/tv-channel",{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                category,
                country,
                launch_year,
                description,
                image,
                status,
                owner,
                website
            })
        })

        if(res.ok){
            alert("Created Successfully")
        }
        else{
            alert("Failed to create!")
        }
    }catch(err){
        console.log(err)
        alert("Failed to Create!!")
    }
}

document.getElementById("creating").addEventListener("submit",function(e){
    e.preventDefault()
    create()
})