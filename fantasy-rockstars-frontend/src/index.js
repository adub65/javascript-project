document.addEventListener("DOMContentLoaded", () => {
  let startBandForm = false

  const startBandButton = document.querySelector("#name-and-select-band-button")
  const bandMembersContainer = document.querySelector(".all-band-members-container")
  const bandForm = document.querySelector("#band-form")

  bandForm.addEventListener("submit", (event) => {
    event.preventDefault()
    submitBandForScore()
    bandMembersContainer.innerHTML = ""
  })


  startBandButton.addEventListener("click", (event) => {
    const bandName = document.querySelector("#band-name").value
    event.preventDefault()
    if (bandName == "") {
      alert("You must enter your band name first!")
      return false
    } else {
      searchForExistingBand(bandName)
    }
  })

  function searchForExistingBand(bandName) {
  fetch(`http://localhost:3000/bands/${bandName}`)
    .then((resp) => resp.json())
    .then((band) => {
      if(band){
        displayBandScore(band)
      } else {
        let recentBandDisplay = document.querySelector(".bandDisplay")
        startNewBand()
        recentBandDisplay.innerHTML = ""
      }
    })
  }

  function startNewBand() {
  startBandForm = !startBandForm
    if (startBandForm) {
      bandMembersContainer.style.display = "block"
    } else {
      bandMembersContainer.style.display = "none"
    }
    fetch("http://localhost:3000/band_members").then( resp => {
      return resp.json()
    }).then( band_members => {
      selectFantasyBand(band_members)
    })
  }

  function selectFantasyBand(band_members) {
    for (const [key, value] of Object.entries(band_members)) {
      const bandMemberDropDownList = document.querySelector(`#${key}-select`)

      for (const musiciansGroupedByInstrument of [value]) {
        for (const band_member of musiciansGroupedByInstrument) {
          const bandMemberElement = document.createElement("option")

          bandMemberElement.innerHTML = `${band_member.name} (from ${band_member.original_band})`
          bandMemberElement.value = band_member.id

          bandMemberDropDownList.appendChild(bandMemberElement)
        }
      }
    }
  }

  function submitBandForScore() {
    const fantasyBandNameElement = document.querySelector("#band-name").value
    const form = event.target
    fetch("http://localhost:3000/bands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name: fantasyBandNameElement,
        guitarist_id: form.guitarist.value,
        bassist_id: form.bassist.value,
        drummer_id: form.drummer.value,
        singer_id: form.singer.value,
        pianist_id: form.pianist.value
      })
    }).then(resp => resp.json())
    .then(band => {
      displayBandScore(band)
    }).catch( error => {
      return error.message
    })
  }

  function displayBandScore(band) {
    const bandDisplay = document.createElement("div")
    bandDisplay.classList.add("bandDisplay")
    bandDisplay.id = `${band.id}`
    bandDisplay.innerHTML = `
    <h1>${band.name}</h1>
    <h2>Your Fantasy Band Score: ${band.total_band_skill} </h2>
    <h3>
    <u>Band Members</u>
    </h3>
    <ol>
    <p>${band.guitarist.name} (from ${band.guitarist.original_band})</p>
    <p>${band.bassist.name} (from ${band.bassist.original_band})</p>
    <p>${band.pianist.name} (from ${band.pianist.original_band})</p>
    <p>${band.singer.name} (from ${band.singer.original_band})</p>
    <p>${band.drummer.name} (from ${band.drummer.original_band})</p>
    </ol>
    <button id="edit-fantasy-band"> Edit Band </button>
    <button id="create-new-band" type="button" onClick="window.location.reload()"> Create New Band </button>
    `
    const bandDetails = document.querySelector("#fantasy-band-display")
    bandDetails.innerHTML = ""
    bandDetails.appendChild(bandDisplay)
    listenToEditBandButton(band)
  }

  function listenToEditBandButton(band) {
    const updateFantasyBandButton = document.querySelector("#edit-fantasy-band")
    updateFantasyBandButton.addEventListener("click", () => editFantasyBand(band))
  }

  function editFantasyBand(band) {
    console.log(band)
  }
})