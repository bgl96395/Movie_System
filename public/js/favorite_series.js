let current_page2 = 1
let limit2 = 6
let total_pages2 = 1

async function show_fav_series(){
    try{
        const params = new URLSearchParams({
            page:current_page2,
            limit:limit2
        })

        const res = await fetch(`/api/fav_series?${params}`,{
            credentials:"include"
        })
        const data = await res.json()

        render_series(data.series)

        total_pages2 = data.total_pages || 1

        document.getElementById("prev2").disabled = current_page2 === 1
        document.getElementById("next2").disabled = current_page2 >= total_pages2 
    }catch(err){
        console.log(err)
        document.getElementById("tv-series").innerHTML = "<h2>Failed to load favorite series</h2>"
    }
}

function render_series(data){
    const series = document.getElementById("tv-series")
    series.innerHTML = ""

    if(data.length === 0){
        series.innerHTML = "<h2>Favorite Series Not Found</h2>"
        return
    }

    data.forEach(serie => {
        const image = serie.image || "/img/default.avif"
        const div = document.createElement("div")

        div.classList.add("card")
        div.innerHTML = `
            <div class="for_image" onclick="window.location.href='/for_series?id=${serie._id}'">
                <img src="${image}" alt="${serie.title}">
                <div class="overlay">
                    <div class="overlay_text">rating: <b>${serie.rating}</b></div>
                    <div class="overlay_text2">country: <b>${serie.country.join(", ")}</b></div>
                    <div class="overlay_text2">genre: <b>${serie.genre.join(", ")}</b></div>
                    <div class="overlay_text2">release year: <b>${serie.release_year}</b></div>
                </div>
            </div>
        `
        series.appendChild(div)
    })
}

document.getElementById("prev2").addEventListener("click",()=>{
    if(current_page2 > 1){
        current_page2--
        show_fav_series()
    }
})

document.getElementById("next2").addEventListener("click",()=>{
    if(current_page2 < total_pages2){
        current_page2++
        show_fav_series()
    }
})

show_fav_series()