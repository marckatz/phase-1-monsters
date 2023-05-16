let currentPage = 0

document.addEventListener("DOMContentLoaded", (e) => {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
    .then((r) => r.json())
    .then((monsters) => addMonsters(monsters))

    let form = document.createElement("form")
    form.id = "monster-form"
    let nameInput = document.createElement("input")
    nameInput.id = "name"
    nameInput.placeholder = "name..."
    let ageInput = document.createElement("input")
    ageInput.id = "age"
    ageInput.placeholder = "age..."
    let descriptionInput = document.createElement("input")
    descriptionInput.id = "description"
    descriptionInput.placeholder = "description..."
    let button = document.createElement("button")
    button.textContent = "Create"
    form.appendChild(nameInput)
    form.append(ageInput)
    form.append(descriptionInput)
    form.append(button)
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(e)
        let name = e.target.name.value
        let age = e.target.age.value
        let description = e.target.description.value
        let header = {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
        let bod = {
            "name":name,
            "age":age,
            "description":description
        }
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: header,
            body: JSON.stringify(bod)
        })
    })
    document.getElementById("create-monster").appendChild(form)

    document.getElementById("back").addEventListener("click", (e) => {
        document.getElementById("monster-container").innerHTML = ""
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${--currentPage}`)
        .then((r) => r.json())
        .then((monsters) => addMonsters(monsters))
    })
    document.getElementById("forward").addEventListener("click", (e) => {
        document.getElementById("monster-container").innerHTML = ""
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${++currentPage}`)
        .then((r) => r.json())
        .then((monsters) => addMonsters(monsters))
    })
})

function addMonsters(monsters){
    let monsterContainer = document.getElementById("monster-container")
    monsters.forEach((monster) => {
        let monsterDiv = document.createElement("div")
        let h2 = document.createElement("h2")
        h2.textContent = monster.name
        let h4 = document.createElement("h4")
        h4.textContent = monster.age
        let p = document.createElement("p")
        p.textContent = monster.description
        monsterDiv.appendChild(h2)
        monsterDiv.appendChild(h4)
        monsterDiv.appendChild(p)
        monsterContainer.appendChild(monsterDiv)
    })
}

function back(e){
    document.getElementById("monster-container").innerHTML = ""
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${--currentPage}`)
    .then((r) => r.json())
    .then((monsters) => addMonsters(monsters))
}

function forward(e){
}