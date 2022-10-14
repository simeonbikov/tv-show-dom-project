const allEpisodes = getAllEpisodes();
const searchInput = document.getElementById("searchbar");
const selectEpisode = document.getElementById("selectEpisodeList");

function setup() {
  makePageForEpisodes(allEpisodes);
  makeSelectorForEpisodes(allEpisodes);

  document.getElementById("clearBtn").addEventListener("click",() => 
  document.getElementById("searchbar").value = "");

  searchInput.addEventListener("input", search);

  selectEpisode.addEventListener("change", selectorEpisode);

  countDisplayedEpisodes();
}

function countDisplayedEpisodes() {
  let displayedEpisodes =
    allEpisodes.length - document.querySelectorAll(".is-hidden").length;
  document.getElementById("displayNumOfEpisodes").innerText = 
    `Displaying ${displayedEpisodes}/${allEpisodes.length} episodes`;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach((episode) => {
    const episodeBox = document.createElement("div");
    episodeBox.classList.add("episode-box");
    rootElem.appendChild(episodeBox);

    const nameSeasonEpisodeBox = document.createElement("div");
    episodeBox.appendChild(nameSeasonEpisodeBox);
    const nameSeasonEpisode = document.createElement("h3");
    nameSeasonEpisode.classList.add("name-season-episode");
    nameSeasonEpisode.innerText = 
    `${episode.name} - S${numberFormatter(episode.season)}E${numberFormatter(episode.number)}`;
    nameSeasonEpisodeBox.appendChild(nameSeasonEpisode);

    const imgEpisodeBox = document.createElement("div");
    episodeBox.appendChild(imgEpisodeBox);
    const imgEpisode = document.createElement("img");
    imgEpisode.src = episode.image.medium;
    imgEpisode.atl = `image of episode - ${episode.name}`;
    imgEpisodeBox.appendChild(imgEpisode);

    const episodeSummaryBox = document.createElement("div");
    episodeSummaryBox.innerHTML = episode.summary;
    episodeSummaryBox.childNodes[0].classList.add("episode-summary-text");
    episodeBox.appendChild(episodeSummaryBox);
  });
}

function makeSelectorForEpisodes(episodeList) {
  episodeList.forEach((episode) => {
    const optionEp = document.createElement("option");
    optionEp.value = 
    `S${numberFormatter(episode.season)}E${numberFormatter(episode.number)}`;
    optionEp.innerText = 
    `S${numberFormatter(episode.season)}E${numberFormatter(episode.number)} - ${episode.name}`;
    selectEpisode.appendChild(optionEp);
  });
}

function selectorEpisode(e) {
  const episodeBoxes = document.querySelectorAll(".episode-box");
  const episodeName = document.getElementsByClassName("name-season-episode");
  // console.log(e.target.value);
  //   Array.from(episodeBoxes).forEach((episodeBox) => episodeBox.classList.remove("is-hidden"));

  // if (e.target.value === "-1") {
  //   for (var i = 0; i < episodeBoxes.length; i++) {
  //     episodeBoxes[i].classList.remove("is-hidden");
  //   }
  //   makePageForEpisodes(allEpisodes);
  // }

  for (var i = 0; i < episodeBoxes.length; i++) {
    if (!episodeName[i].innerText.includes(e.target.value)) {
      episodeBoxes[i].classList.add("is-hidden");
    } else {
      episodeBoxes[i].classList.remove("is-hidden");
    }
  }
  countDisplayedEpisodes();
} 

function search() {
  const episodeBoxes = document.querySelectorAll(".episode-box");
  const episodeName = document.getElementsByClassName("name-season-episode");
  const episodeSummary = document.getElementsByClassName("episode-summary-text");
  // Array.from(episodeBoxes).filter((episode) =>
  //   !episode.innerText.toLowerCase().includes(input.toLowerCase()))
  //   .forEach((episode) => episode.classList.add("is-hidden"));
  // console.log(bx);
  let input = document.getElementById("searchbar").value;
  for (var i = 0; i < episodeBoxes.length; i++) {
    if (episodeName[i].innerText.toLowerCase().includes(input.toLowerCase()) ||
      episodeSummary[i].innerText.toLowerCase().includes(input.toLowerCase())) {
      episodeBoxes[i].classList.remove("is-hidden");
      highlighter(episodeName[i], input);
      highlighter(episodeSummary[i], input);
    } else {
      episodeBoxes[i].classList.add("is-hidden");
    }
  }
  countDisplayedEpisodes();
}

function highlighter(episode, searched) {
  episode.innerText.textContent;
  let reg = new RegExp(searched, "gi");
  episode.innerHTML = episode.innerText.replace(reg, function (str) {
    return `<mark>${str}</mark>`;
  });
}

const numberFormatter = (number) => number < 10 ? "0" + number : number;

window.onload = setup;
