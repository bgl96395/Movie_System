let current_page = 1
let limit = 6
let total_pages = 1

async function show_fav_movies(){
    try{
        const params = new URLSearchParams({
            page:current_page,
            limit:limit
        })

        const res = await fetch(`/api/fav_movies?${params}`,{
            credentials:"include"
        })
        const data = await res.json()

        render(data.movies)

        total_pages = data.total_pages || 1

        document.getElementById("prev").disabled = current_page === 1
        document.getElementById("next").disabled = current_page >= total_pages 
    }catch(err){
        console.log(err)
        document.getElementById("movies").innerHTML = "<h2>Failed to load favorite movies</h2>"
    }
}

function render(data){
    const movies = document.getElementById("movies")
    movies.innerHTML = ""

    if(data.length === 0){
        movies.innerHTML = "<h2>Favorite Movies Not Found</h2>"
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

document.getElementById("prev").addEventListener("click",()=>{
    if(current_page > 1){
        current_page--
        show_fav_movies()
    }
})

document.getElementById("next").addEventListener("click",()=>{
    if(current_page < total_pages){
        current_page++
        show_fav_movies()
    }
})

show_fav_movies()