document.addEventListener("DOMContentLoaded",()=>{
    check_role()
})

async function check_role(){
    try{
        const res = await fetch("/api/user",{
            credentials:"include"
        })
        const user = await res.json()
        if(user.role !== "admin"){
            document.getElementById("creating").style.display = "none"
        }
    }catch(err){
        console.log(err)
        alert("Failed to hide options")
    }
}

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

    const res = await fetch(`/api/movies?${params}`)
    const data = await res.json()

    render(data.movies)

    total_pages = data.total_pages || 1

    document.getElementById("prev").disabled = current_page === 1
    document.getElementById("next").disabled = current_page >= total_pages 
}

function render(data){
    const movies = document.getElementById("main")
    movies.innerHTML = ""

    if(data.length === 0){
        movies.innerHTML = "<h2>No Movies Found</h2>"
        return
    }

    data.forEach(movie => {
        const image = movie.image || "/img/default.avif"
        const div = document.createElement("div")

        div.classList.add("card")
        div.innerHTML = `
            <div class="for_image" onclick="window.location.href='/for_movies?id=${movie._id}'">
                <img src="${image}" alt="${movie.title}">
                <div class="overlay">
                    <div class="overlay_text">rating: <b>${movie.rating}</b></div>
                    <div class="overlay_text2">country: <b>${movie.country.join(", ")}</b></div>
                    <div class="overlay_text2">genre: <b>${movie.genre.join(", ")}</b></div>
                    <div class="overlay_text2">release year: <b>${movie.release_year}</b></div>
                </div>
            </div>
        `
        movies.appendChild(div)
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
    const movies = document.getElementById("main")
    movies.innerHTML = ""

    if(!val) {
        show()
        return
    }

    const res = await fetch("/api/movies?page=1&limit=1000")
    const data = await res.json()

    const movies_data = data.movies || []

    if(movies_data.length === 0){
        movies.innerHTML = "<h2>Movies Not Found</h2>"
        return
    }

    const filtered = movies_data.filter(movie =>
        movie._id.includes(val) || movie.title.toLowerCase().includes(val.toLowerCase())
    )

    if(filtered.length === 0){
        movies.innerHTML = "<h2>Movies Not Found</h2>"
        return
    }

    filtered.forEach(movie => {
        const image = movie.image || "/img/default.avif"
        const div = document.createElement("div")

        div.classList.add("card")
        div.innerHTML = `
            <div class="for_image" onclick="window.location.href='/for_movies?id=${movie._id}'">
                <img src="${image}" alt="${movie.title}">
                <div class="overlay">
                    <div class="overlay_text">rating: <b>${movie.rating}</b></div>
                    <div class="overlay_text2">country: <b>${movie.country.join(", ")}</b></div>
                    <div class="overlay_text2">genre: <b>${movie.genre.join(", ")}</b></div>
                    <div class="overlay_text2">release year: <b>${movie.release_year}</b></div>
                </div>
            </div>
        `
        movies.appendChild(div)
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

        const dur = document.getElementById("duration").value
        const duration = Number(dur)

        const rat = document.getElementById("rating").value
        const rating = Number(rat)

        const description = document.getElementById("description").value
        const image = document.getElementById("image").value || "/img/default.avif"

        const genres = genre.split(",").map(g => g.trim()).filter(g=>g !== "")
        const countries = country.split(",").map(c => c.trim()).filter(c=>c !== "")

        const res = await fetch("/api/movies",{
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
                duration,
                rating,
                description,
                image})
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