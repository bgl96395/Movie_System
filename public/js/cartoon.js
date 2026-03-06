let current_page = 1
let limit = 6
let total_pages = 1

async function show(){

    const genre_value = document.getElementById("genre_filter").value
    const country_value = document.getElementById("country_filter").value
    const year_value = document.getElementById("year_filter").value
    const rating_value = document.getElementById("rating_filter").value

    const params = new URLSearchParams({
        page: current_page,
        limit: limit
    })

    if(genre_value){
        params.append("genre",genre_value)
    }
    if(country_value){
        params.append("country",country_value)
    }
    if(year_value){
        params.append("year",year_value)
    }
    if(rating_value){
        params.append("rating",rating_value)
    }

    const res = await fetch(`/api/cartoons?${params}`)
    const data = await res.json()

    render(data.cartoons)

    total_pages = data.total_pages || 1

    document.getElementById("prev").disabled = current_page === 1
    document.getElementById("next").disabled = current_page >= total_pages 
}

function render(data){
    const cartoons = document.getElementById("main")
    cartoons.innerHTML = ""

    if(data.length === 0){
        cartoons.innerHTML = "<h2>No Cartoons Found</h2>"
        return
    }

    data.forEach(cartoon => {
        const image = cartoon.image || "/img/default.avif"
        const div = document.createElement("div")

        div.classList.add("card")
        div.innerHTML = `
            <div class="for_image" onclick="window.location.href='/for_cartoons?id=${cartoon._id}'">
                <img src="${image}" alt="${cartoon.title}">
                <div class="overlay">
                    <div class="overlay_text">rating: <b>${cartoon.rating}</b></div>
                    <div class="overlay_text2">country: <b>${cartoon.country.join(", ")}</b></div>
                    <div class="overlay_text2">genre: <b>${cartoon.genre.join(", ")}</b></div>
                    <div class="overlay_text2">release year: <b>${cartoon.release_year}</b></div>
                </div>
            </div>
        `
        cartoons.appendChild(div)
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
    const cartoons = document.getElementById("main")
    cartoons.innerHTML = ""

    if(!val) {
        show()
        return
    }

    const res = await fetch("/api/cartoons?page=1&limit=1000")
    const data = await res.json()

    const cartoons_data = data.cartoons || []

    if(cartoons_data.length === 0){
        cartoons.innerHTML = "<h2>Movies Not Found</h2>"
        return
    }

    const filtered = cartoons_data.filter(cartoon =>
        cartoon._id.includes(val) || cartoon.title.toLowerCase().includes(val.toLowerCase())
    )

    if(filtered.length === 0){
        cartoons.innerHTML = "<h2>Movies Not Found</h2>"
        return
    }

    filtered.forEach(cartoon => {
        const image = cartoon.image || "/img/default.avif"
        const div = document.createElement("div")

        div.classList.add("card")
        div.innerHTML = `
            <div class="for_image" onclick="window.location.href='/for_cartoons?id=${cartoon._id}'">
                <img src="${image}" alt="${cartoon.title}">
                <div class="overlay">
                    <div class="overlay_text">rating: <b>${cartoon.rating}</b></div>
                    <div class="overlay_text2">country: <b>${cartoon.country.join(", ")}</b></div>
                    <div class="overlay_text2">genre: <b>${cartoon.genre.join(", ")}</b></div>
                    <div class="overlay_text2">release year: <b>${cartoon.release_year}</b></div>
                </div>
            </div>
        `
        cartoons.appendChild(div)
    })
}

document.getElementById("ic").onclick = show_by_name_or_id

async function create(){
    try{
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
        const image = document.getElementById("image").value || "/img/default.avif"
        const main_characters = document.getElementById("main_characters").value
        const style =document.getElementById("style").value

        const genres = genre.split(",").map(g => g.trim()).filter(g=>g !== "")
        const countries = country.split(",").map(c => c.trim()).filter(c=>c !== "")

        const res = await fetch("/api/cartoons",{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                genre:genres,
                country:countries,
                release_year,
                number_of_episods,
                rating,
                description,
                image,
                main_characters,
                style
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