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

    const res = await fetch(`/api/series?${params}`)
    const data = await res.json()

    render(data.series)

    total_pages = data.total_pages || 1

    document.getElementById("prev").disabled = current_page === 1
    document.getElementById("next").disabled = current_page >= total_pages 
}

function render(data){
    const series = document.getElementById("main")
    series.innerHTML = ""

    if(data.length === 0){
        series.innerHTML = "<h2>No Series Found</h2>"
        return
    }

    data.forEach(serie => {
        const image = serie.image || "/img/default.avif"
        const div = document.createElement("div")

        div.classList.add("card")
        div.innerHTML = `
            <a href="/for_series"><div class="for_image">
                <img src="${image}" alt="${serie.title}">
                <div class="overlay">
                    <div class="overlay_text">rating: <b>${serie.rating}</b></div>
                    <div class="overlay_text2">country: <b>${serie.country.join(", ")}</b></div>
                    <div class="overlay_text2">genre: <b>${serie.genre.join(", ")}</b></div>
                    <div class="overlay_text2">release year: <b>${serie.release_year}</b></div>
                </div>
            </div></a>
        `
        series.appendChild(div)
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
    const series = document.getElementById("main")
    series.innerHTML = ""

    if(!val) {
        show()
        return
    }

    const res = await fetch("/api/series?page=1&limit=1000")
    const data = await res.json()

    const series_data = data.series || []

    if(series_data.length === 0){
        series.innerHTML = "<h2>Series Not Found</h2>"
        return
    }

    const filtered = series_data.filter(serie =>
        serie._id.includes(val) || serie.title.toLowerCase().includes(val.toLowerCase())
    )

    if(filtered.length === 0){
        series.innerHTML = "<h2>Series Not Found</h2>"
        return
    }

    filtered.forEach(serie => {
        const image = serie.image || "/img/default.avif"
        const div = document.createElement("div")

        div.classList.add("card")
        div.innerHTML = `
            <a href="/for_series"><div class="for_image">
                <img src="${image}" alt="${serie.title}">
                <div class="overlay">
                    <div class="overlay_text">rating: <b>${serie.rating}</b></div>
                    <div class="overlay_text2">country: <b>${serie.country.join(", ")}</b></div>
                    <div class="overlay_text2">genre: <b>${serie.genre.join(", ")}</b></div>
                    <div class="overlay_text2">release year: <b>${serie.release_year}</b></div>
                </div>
            </div></a>
        `
        series.appendChild(div)
    })
}

document.getElementById("ic").onclick = show_by_name_or_id