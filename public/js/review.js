async function show_username(){
    try{
        const user_name = document.getElementById("user_name")
        const res = await fetch("/api/user",{
            credentials: "include"
        })
        const user = await res.json()
        user_name.innerHTML = `<i class="fa-solid fa-user"></i> ${user.username}`
    }catch(err){
        console.log(err)
        document.getElementById("user_name").innerHTML = "Failed to get user name"
    }
}

show_username()