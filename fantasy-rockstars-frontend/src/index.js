document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/band_members")
  .then( resp => {
    return resp.json()
  }).then( band_members => {
    selectFantasyBand(band_members)
  })

  let startBandForm = false

  const bandNameForm = document.querySelector("#band-name-form")
  const bandMembersContainer = document.querySelector(".all-band-members-container")
  const musiciansForm = document.querySelector("#band-form")


  bandNameForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const bandName = document.querySelector("#band-name").value
    if (bandName == "") {
      alert("You must enter your band name first!")
      return false
    } else {
      searchForExistingBand(bandName)
      bandNameForm.style.display = "none"
    }
  })

  function searchForExistingBand(bandName) {
    fetch(`http://localhost:3000/bands/${bandName}`)
    .then((resp) => resp.json())
    .then((band) => {
      if(band) {
        displayBandScore(band)
      } else {
        startNewBand(bandName)
      }
    })
  }

  musiciansForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let values = document.querySelectorAll("select").values()
    for (const select of values) {
      if (!select.value) {
        alert("You must select a musician for each position!")
        resetSelects()
        return false
      }
    }
    submitBandForScore()
    resetSelects()
  })

  function resetSelects() {
    let values = document.querySelectorAll("select").values()
    for (const select of values) {
      select.value = ""
    }
  }

  function startNewBand(bandName) {
    startBandForm = !startBandForm
    if (startBandForm) {

      const nameHeader = document.querySelector("#bandName") ||document.createElement("div")
      nameHeader.innerHTML = ""
      nameHeader.id = "bandName"
      bandMembersContainer.prepend(nameHeader)
      nameHeader.innerHTML = `<h2>${bandName}</h2>`
      bandMembersContainer.style.display = "block"
    } else {
      bandMembersContainer.style.display = "none"
    }
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
    }).then(resp => {
      return resp.json()
    }).then(band => {
      console.log(band)
        displayBandScore(band)
        bandMembersContainer.style.display = "none"
    }).catch(error => {
      return error.message
    })
  }

  function displayBandScore(band) {
    const bandDisplay = document.createElement("div")
    bandDisplay.classList.add("bandDisplay")
    bandDisplay.id = `${band.id}`
    bandDisplay.innerHTML = `
    <h2>*** Your Fantasy Band Score: <b>${band.total_band_skill}</b> ***</h2>
    <h3>
      <u>${band.name}</u>
    </h3>
    <ol>
      <p>${band.guitarist.name} (from ${band.guitarist.original_band})</p>
      <p>${band.bassist.name} (from ${band.bassist.original_band})</p>
      <p>${band.pianist.name} (from ${band.pianist.original_band})</p>
      <p>${band.singer.name} (from ${band.singer.original_band})</p>
      <p>${band.drummer.name} (from ${band.drummer.original_band})</p>
    </ol>
    <button id="create-new-band" type="button"> Enter A New Band </button>
    <button id="delete-band-${band.id}" class="delete-band-button"> Delete Band</button>
    `
    const bandDetails = document.querySelector("#fantasy-band-display")
    bandDetails.innerHTML = ""
    bandDetails.appendChild(bandDisplay)
    bandNameForm.style.display = "none"
    listenToDeleteBandButton(band)
    listenToNewBandButton(bandDisplay)
  }

  function listenToNewBandButton(bandDisplay) {
    const newBandButton = document.querySelector("#create-new-band")
    newBandButton.addEventListener("click", () => {
      bandDisplay.style.display = "none"
      resetNameForm()
    })
  }

  function resetNameForm() {
    event.preventDefault()
    startBandForm = false
    bandNameForm.style.display = "block"
    showNameForm()
  }

  function listenToDeleteBandButton(band) {
    const deleteFantasyBandButton = document.querySelector(`#delete-band-${band.id}`)
    deleteFantasyBandButton.addEventListener("click", () => {
      resetNameForm()
      fetch(`http://localhost:3000/bands/${band.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }).then(resp => { resp.json()
      }).then( () => {
        deleteFantasyBandButton.parentElement.remove()
      })
    })
  }

  function showNameForm() {
    document.querySelector("#band-name-form").innerHTML = `
    <input id="band-name" class="form-control" type="text" placeholder="Enter Band Name...">
    <button id="name-and-select-band-button">Submit Your Fantasy Band Name</button>
    `
  }


})
