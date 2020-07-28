document.addEventListener("DOMContentLoaded", () => {
  let startBand = false

  const startBandButton = document.querySelector("#name-and-select-band-button")
  const bandMembersContainer = document.querySelector(".all-band-members-container")
  const bandForm = document.querySelector("#band-form")

  startBandButton.addEventListener("click", (event) => {
    event.preventDefault()
    startBand = !startBand
    if (startBand) {
      bandMembersContainer.style.display = "block"
    } else {
      bandMembersContainer.style.display = "none"
    }
  })

  bandForm.addEventListener("submit", (event) => {
    event.preventDefault()
    submitBandForScore()
  })

  fetch("http://localhost:3000/band_members").then( resp => {
    return resp.json()
  }).then( band_members => {
    selectFantasyBand(band_members)
  })

})

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
  
}