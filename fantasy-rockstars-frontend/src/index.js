const bandList = document.querySelector("#list-group")
const bandForm = document.querySelector("#band-form")

bandForm.addEventListener("submit", event => {
  event.preventDefault()
  startFantasyBand()
})

function startFantasyBand() {
  const fantasyBandNameElement = document.querySelector("#add-band-input")

  fetch("http://localhost:3000/bands", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {
      name: fantasyBandNameElement.value
    })
  }).then(resp => {
    return resp.json()
  }).then(band => {
    selectBandMembers(band)
    fantasyBandNameElement.value = ""
  }).catch(error => {
    return error.message
  })
}

function selectBandMembers(band) {
  console.log(band)
}