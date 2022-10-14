// https://gist.github.com/jdbevan/2e81a3a8d842412379f211d2d7f84314

const rootElem = document.querySelector(".main-grid");

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
window.onload = setup;

// =============
//   level100
// =============
const makeElemId = (episode) => `article-${episode.id}`;

function makePageForEpisodes(episodeList) {
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach((episode) => {
    const articleBox = document.createElement("article");
    articleBox.className = "episode-box";
    // Give each article and ID so we can easily find it
    articleBox.id = makeElemId(episode);

    const headerH2 = document.createElement("h2");
    headerH2.className = "header";
    headerH2.style.fontSize = "1.2rem";
    headerH2.innerText =
      episode.number >= 10
        ? `${episode.name}-S0${episode.season}E${episode.number}`
        : `${episode.name}-S0${episode.season}E0${episode.number}`;

    const episodeImage = document.createElement("img");
    episodeImage.className = "episode-img";
    episodeImage.setAttribute("src", episode.image.medium);

    const episodeSummary = document.createElement("p");
    episodeSummary.className = "episode-summary";
    episodeSummary.innerText = episode.summary
      .replaceAll("<p>", "")
      .replaceAll("</p>", "")
      .replaceAll("<br>", "");

    articleBox.append(headerH2, episodeImage, episodeSummary);
    rootElem.append(articleBox);
  });
}

// ==========
//  Level200
// ==========
const matchesSearchText = (episode, targetItem) => {
  return (
    episode.name.includes(targetItem) ||
    episode.summary.includes(targetItem) ||
    episode.name.toLowerCase().includes(targetItem) ||
    episode.summary.toLowerCase().includes(targetItem)
  );
};

let searchItem = () => {
  let searchBar = document.querySelector("#search");
  let allEpisodes = getAllEpisodes();

  searchBar.addEventListener("input", (e) => {
    let targetItem = e.target.value.toLowerCase();

    let showEpisodes = allEpisodes.filter((episode) => {
      return matchesSearchText(episode, targetItem);
    });
    let hideEpisodes = allEpisodes.filter((episode) => {
      return !matchesSearchText(episode, targetItem);
    });

    //rootElem.innerText = "";
    //console.log(rootElem);
    //makePageForEpisodes(filteredEpisodes);
    showEpisodes
      .map((episode) => makeElemId(episode))
      .forEach((elemId) => {
        const elem = document.getElementById(elemId);
        if (elem === null) {
          // This should not happen, it should always be an element
          console.warn("could not find element using id: " + elemId);
        } else {
          elem.classList.remove(".is-hidden");
        }
      });
    hideEpisodes
      .map((episode) => makeElemId(episode))
      .forEach((elemId) => {
        const elem = document.getElementById(elemId);
        if (elem === null) {
          // This should not happen, it should always be an element
          console.warn("could not find element using id: " + elemId);
        } else {
          elem.classList.add(".is-hidden");
        }
      });
  });
};

searchItem();
