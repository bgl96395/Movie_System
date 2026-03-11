let current_page3 = 1
let limit3 = 6
let total_pages3 = 1

async function show_fav_cartoons(){
    try{
        const params = new URLSearchParams({
            page:current_page3,
            limit:limit3
        })

        const res = await fetch(`/api/fav_cartoons?${params}`,{
            credentials:"include"
        })
        const data = await res.json()

        render_cartoons(data.cartoons)

        total_pages3 = data.total_pages || 1

        document.getElementById("prev3").disabled = current_page3 === 1
        document.getElementById("next3").disabled = current_page3 >= total_pages3 
    }catch(err){
        console.log(err)
        document.getElementById("cartoons").innerHTML = "<h2>Failed to load favorite cartoons</h2>"
    }
}

function render_cartoons(data){
    const cartoons = document.getElementById("cartoons")
    cartoons.innerHTML = ""

    if(data.length === 0){
        cartoons.innerHTML = "<h2>Favorite Cartoons Not Found</h2>"
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

document.getElementById("prev3").addEventListener("click",()=>{
    if(current_page3 > 1){
        current_page3--
        show_fav_cartoons()
    }
})

document.getElementById("next3").addEventListener("click",()=>{
    if(current_page3 < total_pages3){
        current_page3++
        show_fav_cartoons()
    }
})

show_fav_cartoons()