const bandList = document.querySelector("#list-group")
const bandForm = document.querySelector("#band-form")

bandForm.addEventListener("submit", event => {
  event.preventDefault()
  createBand()
})

fetch("http://localhost:3000/bands").then(function(resp) {
  return resp.json()
}).then(function(bands) {
  for (const band of bands) {
  appendBand(band)
  }
})

function appendBand(band) {
  const bandElement = document.createElement("li")
  bandElement.classList.add("list-group-item")
  bandElement.id = `band-${band.id}`
  bandElement.innerHTML = `<span>${band.name}</span>`
  console.log(bandElement)
  bandList.appendChild(bandElement)
  bandElement.addEventListener("click", listenForBandClick)
}

function listenForBandClick(event) {
  console.log(event)
  const bandId = event.path[1].id.split("-")[2]
  fetch(`http://localhost:3000/bands/${bandId}`)
    .then(function(resp) {
      return resp.json()
    })
    .then(displayBandDetails)
}