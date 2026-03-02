async function show(){
    const res = await fetch("/api/movies")
    let data = await res.json()

    const genre_value = document.getElementById("genre_filter").value
    const country_value = document.getElementById("country_filter").value
    const year_value = document.getElementById("year_filter").value
    const rating_value = document.getElementById("rating_filter").value

    let filtered = data.filter(movie =>{

        const genres = movie.genre.split(",").map(g => g.trim().toLowerCase())
        const countries = movie.country.split(",").map(g => g.trim())

        const genre_match = !genre_value || genres.includes(genre_value.toLowerCase())
        const country_match = !country_value || countries.includes(country_value)
        const year_match = !year_value || (()=>{
            const movie_year = parseInt(movie.release_date.split("-")[2])
            if(year_value==="before_1980"){
                return movie_year <= 1980
            }
            else{
                return movie_year === Number(year_value)
            }
        })()

        let rating_match = true
        if(rating_value){
            const [min,max] = rating_value.split("-").map(Number)
            rating_match = movie.raiting >= min && movie.raiting <= max
        }

        return genre_match && country_match && year_match && rating_match
    })

    render(filtered)
}

function render(data){
    const movies = document.getElementById("main")
    movies.innerHTML = ""

    data.forEach(movie => {
        const image = movie.image || "/img/default.avif"
        const div = document.createElement("div")

        div.classList.add("card")
        div.innerHTML = `
            <div class="for_image">
                <img src="${image}" alt="${movie.title}">
                <div class="overlay">
                    <div class="overlay_text">raiting: <b>${movie.raiting}</b></div>
                    <div class="overlay_text2">country: <b>${movie.country}</b></div>
                    <div class="overlay_text2">genre: <b>${movie.genre}</b></div>
                    <div class="overlay_text2">release date: <b>${movie.release_date}</b></div>
                </div>
            </div>
        `
        movies.appendChild(div)
    })
}

document.querySelectorAll("#filter select").forEach(select => {
    select.addEventListener("change",show)
})

show()

async function show_by_name_or_id(){
    const val = document.getElementById("search").value

    if(val === ""){
        show()
        return
    }

    const res = await fetch("/api/movies")
    const data = await res.json()

    const movies = document.getElementById("main")
    movies.innerHTML=""

    data.forEach(movie => {
        if(movie._id.includes(val) || movie.title.toLowerCase().includes(val.toLowerCase())){
            const image = movie.image || "/img/default.avif"
            const div = document.createElement("div")

            div.classList.add("card")
            div.innerHTML = `
                <div class="for_image">
                    <img src="${image}" alt="${movie.title}">
                    <div class="overlay">
                        <div class="overlay_text">raiting: <b>${movie.raiting}</b></div>
                        <div class="overlay_text2">country: <b>${movie.country}</b></div>
                        <div class="overlay_text2">genre: <b>${movie.genre}</b></div>
                        <div class="overlay_text2">release date: <b>${movie.release_date}</b></div>
                    </div>
                </div>
            `
            movies.appendChild(div)
        }
    })

    if(!movies){
        movies.innerHTML = "Movie Not Found"
    }
}

document.getElementById("ic").onclick = show_by_name_or_id