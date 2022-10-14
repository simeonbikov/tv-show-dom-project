const rootElem = document.getElementById("root");
const allEpisodes = getAllEpisodes();
const searchBar = document.getElementById("searchbar");
const selectEpisode = document.getElementById("selectEpisodeList");
const displayNumOfEp = document.getElementById("displayNumOfEpisodes");

function setup() {
  makePageForEpisodes(allEpisodes);
  makeSelectorForEpisodes(allEpisodes);
  searchItem();

  displayNumOfEp.innerText = `Displaying ${allEpisodes.length} episodes`;
}
window.onload = setup;

function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => {
    const episodeBox = document.createElement("div");
    episodeBox.classList.add("episode-box");
    episodeBox.id = episode.id;

    const titleEpisodeBox = document.createElement("div");
    const nameSeasonEpisode = document.createElement("h3");
    nameSeasonEpisode.classList.add("episode-title");
    nameSeasonEpisode.innerText = `${episode.name} - S${numFormatter(episode.season)}E${numFormatter(episode.number)}`;
    titleEpisodeBox.appendChild(nameSeasonEpisode);

    const imgEpisodeBox = document.createElement("div");
    const imgEpisode = document.createElement("img");
    imgEpisode.src = episode.image.medium;
    imgEpisode.alt = `image of episode - ${episode.name}`;
    imgEpisodeBox.appendChild(imgEpisode);

    const summaryEpisodeBox = document.createElement("div");
    const summaryEpisode = document.createElement("p");
    summaryEpisode.innerText = episode.summary.replace(/(<([^>]+)>)/gi, "");
    summaryEpisode.classList.add("episode-summary");
    summaryEpisodeBox.appendChild(summaryEpisode);

    episodeBox.append(titleEpisodeBox, imgEpisodeBox, summaryEpisodeBox);

    if (rootElem) rootElem.append(episodeBox);
  });
}

function makeSelectorForEpisodes(episodeList) {
  episodeList.forEach((episode) => {
    const optionEp = document.createElement("option");
    optionEp.value = episode.id;
    optionEp.innerText = 
    `S${numFormatter(episode.season)}E${numFormatter(episode.number)} - ${episode.name}`;
    selectEpisode.appendChild(optionEp);
  });

  selectEpisode.addEventListener("change", (selectedEl) => {
    if (selectedEl === null)
      console.warn("could not find element using id: " + selectedEl.id);
    // if (selectedEl.target.value === "none") searchBar.value = "";
    allEpisodes.forEach((episode) => {
      const elem = document.getElementById(episode.id);
      selectedEl.target.value !== elem.id
        ? elem.classList.add("is-hidden")
        : elem.classList.remove("is-hidden");
    });
  });
}

const matchesSearchText = (episode, targetItem) => {
  return (
    episode.name.toLowerCase().includes(targetItem) ||
    episode.summary.toLowerCase().includes(targetItem)
  );
};

let searchItem = () => {
  // let searchBar = document.getElementById("searchbar");
  if (!searchBar) return;
  searchBar.addEventListener("input", (e) => {
    if (e.target === null) return;
    if (!(e.target instanceof HTMLInputElement)) return;

    let searchText = e.target.value;

    let showEpisodes = allEpisodes.filter((episode) => {
      return matchesSearchText(episode, searchText.toLowerCase());
    });
    let hideEpisodes = allEpisodes.filter((episode) => {
      return !matchesSearchText(episode, searchText.toLowerCase());
    });

    displayNumOfEp.innerText = `Displaying ${showEpisodes.length}/${allEpisodes.length} episodes`;

    showEpisodes.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (element === null) {
        console.warn("could not find element using id: " + elem.id);
      } else {
        element.classList.remove("is-hidden");
      }
    });
    hideEpisodes.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (element === null) {
        console.warn("could not find element using id: " + elem.id);
      } else {
        element.classList.add("is-hidden");
      }
    });
  });
};

// searchItem();

const numFormatter = (number) => (number < 10 ? "0" + number : number);


document.getElementById("clearBtn").addEventListener("click", () => 
  (searchBar.value = ""));
