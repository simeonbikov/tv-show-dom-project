const rootElem = document.getElementById("root");
const selectShow = document.getElementById("selectShow");
const selectEpisode = document.getElementById("selectEpisode");
const displayNum = document.getElementById("displayNumOfMovies");
let searchBar = document.getElementById("searchbar");
let allShows = [];
let allEpisodes = [];
let showId = 0;
let foundEl = allShows.length;

const setup = () => {
  getAllShows();
};
window.onload = setup;

const getAllShows = () => {
  fetch("https://api.tvmaze.com/shows")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((data) => {
      allShows = data.sort((a, b) => a.name.localeCompare(b.name));
      makePageForShows(allShows);
      makeSelectorForShows(allShows);
      searchItem(allShows);
    })
    .catch((err) => console.log(err.message));
};

const getAllEpisodes = (showId) => {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Encountered something unexpected: ${response.status} ${response.statusText}`
        );
      }
    })
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
      makeSelectorForEpisodes(allEpisodes);
      searchItem(allEpisodes);
    })
    .catch((err) => console.log(err.message));
};

const makePageForShows = (shows) => {
  rootElem.innerHTML = "";
  displayNumOfEl(shows.length, shows.length);
  selectEpisode.classList.add("is-hidden");
  rootElem.innerHTML = "";
  shows.forEach((show) => {
    const showBox = document.createElement("div");
    showBox.id = show.id;
    const showWrapper = document.createElement("div");
    showWrapper.classList.add("show-wrapper");
    showWrapper.style.backgroundImage = `linear-gradient(to right bottom, hsla(0, 0%, 0%, 0.8), hsla(46, 100%, 50%, 0.8)), url(${show.image.original})`;
    const titleShowBox = document.createElement("div");
    titleShowBox.classList.add("title-show-box");
    const titleShow = document.createElement("h2");
    titleShow.classList.add("title-show");
    titleShow.innerText = show.name;
    titleShow.id = `title${show.id}`;
    const imgShowBox = document.createElement("div");
    imgShowBox.classList.add("img-show-box");
    const imgShow = document.createElement("img");
    imgShow.src = show.image.medium;
    imgShow.alt = `image of show - ${show.name}`;
    const summaryShowBox = document.createElement("div");
    summaryShowBox.classList.add("summary-show-box");
    const summaryShow = document.createElement("p");
    summaryShow.innerText = show.summary.replace(/(<([^>]+)>)/gi, "");
    summaryShow.classList.add("summary-show");
    summaryShow.id = `summary${show.id}`;
    const infoShowBox = document.createElement("div");
    infoShowBox.classList.add("info-show-box");
    const infoShowList = document.createElement("ul");
    infoShowList.classList.add("info-show-list");
    const ratingShow = document.createElement("li");
    const genresShow = document.createElement("li");
    const statusShow = document.createElement("li");
    const runtimeShow = document.createElement("li");
    ratingShow.innerText = `Rated: ${show.rating.average}`;
    genresShow.innerText = `Genres: ${show.genres.join(" | ")}`;
    genresShow.id = `genres${show.id}`;
    statusShow.innerText = `Status: ${show.status}`;
    runtimeShow.innerText = `Runtime: ${show.runtime}`;
    if (rootElem) rootElem.append(showBox);
    showBox.append(showWrapper);
    showWrapper.append(titleShowBox, imgShowBox, summaryShowBox, infoShowBox);
    titleShowBox.append(titleShow);
    imgShowBox.append(imgShow);
    summaryShowBox.append(summaryShow);
    infoShowBox.append(infoShowList);
    infoShowList.append(ratingShow, genresShow, statusShow, runtimeShow);

    titleShow.addEventListener("click", () => {
      const showId = getIdFromString(titleShow.id);
      selectShow.value = showId;
      searchBar.value = "";
      getAllEpisodes(showId);
    });
  });
};

const makePageForEpisodes = (episodes) => {
  rootElem.innerHTML = "";
  displayNumOfEl(episodes.length, episodes.length);
  selectEpisode.classList.remove("is-hidden");

  episodes.forEach((episode) => {
    const episodeBox = document.createElement("div");
    episodeBox.id = episode.id;
    const episodeWrapper = document.createElement("div");
    episodeWrapper.classList.add("episode-wrapper");
    const titleEpisodeBox = document.createElement("div");
    titleEpisodeBox.classList.add("title-episode-box");
    const titleEpisode = document.createElement("h3");
    titleEpisode.id = `title${episode.id}`;
    titleEpisode.classList.add("title-episode");
    titleEpisode.innerText = 
      `${episode.name} - S${numFormatter(episode.season)}E${numFormatter(episode.number)}`;
    const imgEpisodeBox = document.createElement("div");
    imgEpisodeBox.classList.add("img-episode-box");
    const imgEpisode = document.createElement("img");
    imgEpisode.src = episode.image.medium;
    imgEpisode.alt = `image of episode - ${episode.name}`;
    const summaryEpisodeBox = document.createElement("div");
    summaryEpisodeBox.classList.add("summary-episode-box");
    const summaryEpisode = document.createElement("p");
    summaryEpisode.id = `summary${episode.id}`;
    summaryEpisode.innerText = episode.summary.replace(/(<([^>]+)>)/gi, "");
    summaryEpisode.classList.add("episode-summary");
    if (rootElem) rootElem.append(episodeBox);
    episodeBox.append(episodeWrapper);
    episodeWrapper.append(titleEpisodeBox, imgEpisodeBox, summaryEpisodeBox);
    titleEpisodeBox.append(titleEpisode);
    imgEpisodeBox.append(imgEpisode);
    summaryEpisodeBox.append(summaryEpisode);

    titleEpisode.addEventListener("click", () => {
      searchBar.value = "";
      const episodeId = getIdFromString(titleEpisode.id);
      allEpisodes.map(makeElemId).forEach((elemId) => {
        const elem = document.getElementById(elemId);
        elem.id !== episodeId
          ? elem.classList.add("is-hidden")
          : elem.classList.remove("is-hidden");
      });
    });
  });
};

const makeSelectorForShows = (shows) => {
  const optionAllShows = document.createElement("option");
  optionAllShows.value = "all";
  optionAllShows.innerText = "All shows";
  selectShow.appendChild(optionAllShows);
  shows.forEach((show) => {
    const optionShow = document.createElement("option");
    optionShow.value = show.id;
    optionShow.innerText = show.name;
    selectShow.appendChild(optionShow);
  });
  selectShow.addEventListener("change", (selectedEl) => {
    if (selectedEl === null)
      console.warn("could not find element using id: " + selectedEl.id);
    if (selectedEl.target.value === "all") {
      makePageForShows(allShows);
    } else {
      showId = selectedEl.target.value;
      getAllEpisodes(showId);
    }
    searchBar.value = "";
  });
};

const makeSelectorForEpisodes = (episodes) => {
  selectEpisode.innerHTML = "";
  const optionAllEp = document.createElement("option");
  optionAllEp.value = "all";
  optionAllEp.innerText = "All episodes";
  selectEpisode.appendChild(optionAllEp);
  episodes.forEach((episode) => {
    const optionEp = document.createElement("option");
    optionEp.value = episode.id;
    optionEp.innerText = `S${numFormatter(episode.season)}E${numFormatter(episode.number)} - ${episode.name}`;
    selectEpisode.appendChild(optionEp);
  });
  selectEpisode.addEventListener("change", (selectedEl) => {
    if (selectedEl === null)
      console.warn("could not find element using id: " + selectedEl.id);
    if (selectedEl.target.value === "all") {
      allEpisodes.map(makeElemId).forEach((elemId) => {
        const elem = document.getElementById(elemId);
        elem.classList.remove("is-hidden");
      });
    }
    allEpisodes.map(makeElemId).forEach((elemId) => {
      const elem = document.getElementById(elemId);
      selectedEl.target.value !== elem.id && selectedEl.target.value !== "all"
        ? elem.classList.add("is-hidden")
        : elem.classList.remove("is-hidden");
    });
    displayNumOfEl(episodes.length, 1);
    searchBar.value = "";
  });
};

const matchesSearchText = (element, targetItem) => {
  return (
    element.name.toLowerCase().includes(targetItem) ||
    element.summary.toLowerCase().includes(targetItem)
  );
};

let searchItem = (allElements) => {
  if (!searchBar) return;
  searchBar.addEventListener("input", (e) => {
    if (e.target === null) return;
    if (!(e.target instanceof HTMLInputElement)) return;
    let searchText = e.target.value;
    let displayElements = allElements.filter((elem) => {
      return matchesSearchText(elem, searchText.toLowerCase());
    });
    let hideElements = allElements.filter((elem) => {
      return !matchesSearchText(elem, searchText.toLowerCase());
    });
    displayElements.map(makeElemId).forEach((elemId) => {
      const element = document.getElementById(elemId);
      if (element !== null) {
        element.classList.remove("is-hidden");
        highlighter(elemId, searchText);
      } else {
        return;
      }
    });
    hideElements.map(makeElemId).forEach((elemId) => {
      const element = document.getElementById(elemId);
      if (element !== null) {
        element.classList.add("is-hidden");
      } else {
        return;
      }
    });
    selectEpisode.value = "all";
    displayNumOfEl(allElements.length, displayElements.length);
  });
};

const displayNumOfEl = (allEl, foundEl) =>
  (displayNum.innerText = `Displaying ${foundEl} of ${allEl}`);

const makeElemId = (element) => element.id;

const numFormatter = (number) => (number < 10 ? "0" + number : number);

const getIdFromString = (str) => str.match(/(\d+)/)[0];

document.getElementById("homeBtn").addEventListener("click", (e) => {
  searchBar.value = "";
  selectShow.value = "all";
  getAllShows();
});