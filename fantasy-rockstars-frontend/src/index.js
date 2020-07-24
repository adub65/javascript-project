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
    console.log(resp.json())
  })
}
  // }).then(band => {
  //   // render to DOM
  //   fantasyBandNameElement.value = ""
  // }).catch(error => {
  //   return error.message
  // })


  // const addBandMembersButton = document.querySelector("#fantasy-band-button")
  // const bandMembersContainer = document.querySelector(".container")

  // fetch("http://localhost:3000/band_members").then(resp => {
  //   return resp.json()
  // })

  // addBandMembersButton.addEventListener("click", () => {

//   let addBandMembers = false
//   if (addBandMembers) {
//     bandMembersContainer.style.display = "none"
//   }
//   else {
//     bandMembersContainer.style.display = "block"
//   }
// }