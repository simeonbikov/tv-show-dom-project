const rootElem = document.getElementById("root");
let allShows = [];
let allEpisodes = [];
let showId = 0;

function setup() {
  getAllShows();
}

window.onload = setup;

const getAllShows = () => {
  fetch("https://api.tvmaze.com/shows")
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(`Encountered something unexpected: ${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      allShows = data;
      makePageForShows(allShows);
      makeSelectorForShows(allShows);
    })
    .catch((err) => console.log(err.message));
}

// const getAllEpisodes = (showId) => {
//   fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
//     .then((response) => {
//       if (response.status >= 200 && response.status <= 299) {
//         return response.json();
//       } else {
//         throw new Error(`Encountered something unexpected: ${response.status} ${response.statusText}`);
//       }
//     })
//     .then((data) => allEpisodes = data)
//     .catch((err) => console.log(err.message));
// }

const makePageForShows = (shows) => {
  shows.forEach((show) => {
    const showBox = document.createElement("div");
    showBox.classList.add("show-box");
    showBox.id = show.id;

    const titleShowBox = document.createElement("div");
    const titleShow = document.createElement("a");
    titleShow.classList.add("title-show");
    titleShow.innerText = show.name;

    const contentShowBox = document.createElement("div");
    contentShowBox.classList.add("content-show-box");

    const imgShowBox = document.createElement("div");
    const imgShow = document.createElement("img");
    imgShow.src = show.image.medium;
    imgShow.alt = `image of show - ${show.name}`;

    const summaryShowBox = document.createElement("div");
    const summaryShow = document.createElement("p");
    summaryShow.innerText = show.summary.replace(/(<([^>]+)>)/gi, "");
    summaryShow.classList.add("show-summary");

    const infoShowBox = document.createElement("div");
    const infoShowList = document.createElement("ul");
    infoShowList.classList.add("info-show-list");
    const ratingShow = document.createElement("li");
    const genresShow = document.createElement("li");
    const statusShow = document.createElement("li");
    const runtimeShow = document.createElement("li");
    ratingShow.innerText = `Rated: ${show.rating.average}`;
    genresShow.innerText = `Genres: ${show.genres}`;
    statusShow.innerText = `Status: ${show.status}`;
    runtimeShow.innerText = `Runtime: ${show.runtime}`;

    if (rootElem) rootElem.append(showBox);
    showBox.append(titleShowBox, contentShowBox);
    titleShowBox.append(titleShow);
    contentShowBox.append(imgShowBox, summaryShowBox, infoShowBox);
    imgShowBox.append(imgShow);
    summaryShowBox.append(summaryShow);
    infoShowBox.append(infoShowList);
    infoShowList.append(ratingShow, genresShow, statusShow, runtimeShow);
  });
}

  function makeSelectorForShows(shows) {
    const selectShow = document.getElementById("selectShow");
    shows.forEach((show) => {
      const optionShow = document.createElement("option");
      optionShow.value = show.id;
      optionShow.innerText = show.name;
      selectShow.appendChild(optionShow);
    });

    selectShow.addEventListener("change", (selectedEl) => {
      if (selectedEl === null)
        console.warn("could not find element using id: " + selectedEl.id);
      // if (selectedEl.target.value === "none") searchBar.value = "";
      hideElements(shows);
    });
  }

  const hideElements = (elements) => {
    elements.forEach((elem) => {
      const element = document.getElementById(elem.id);
       if (element === null) {
        console.warn("could not find element using id: " + elem.id);
      } else {
        element.classList.add("is-hidden");
      }
    });
  }




  //=====================================





  // const rootElem = document.getElementById("root");
  // const allEpisodes = getAllEpisodes();
  // const searchBar = document.getElementById("searchbar");
  // const selectEpisode = document.getElementById("selectEpisodeList");
  // const displayNumOfEp = document.getElementById("displayNumOfEpisodes");

  // function setup() {
  //   makePageForEpisodes(allEpisodes);
  //   makeSelectorForEpisodes(allEpisodes);
  //   searchItem();

  //   displayNumOfEp.innerText = `Displaying ${allEpisodes.length} episodes`;
  // }
  // window.onload = setup;

  // function makePageForEpisodes(episodeList) {
  //   episodeList.forEach((episode) => {
  //     const episodeBox = document.createElement("div");
  //     episodeBox.classList.add("episode-box");
  //     episodeBox.id = episode.id;

  //     const titleEpisodeBox = document.createElement("div");
  //     const nameSeasonEpisode = document.createElement("h3");
  //     nameSeasonEpisode.classList.add("episode-title");
  //     nameSeasonEpisode.innerText = `${episode.name} - S${numFormatter(
  //       episode.season
  //     )}E${numFormatter(episode.number)}`;
  //     titleEpisodeBox.appendChild(nameSeasonEpisode);

  //     const imgEpisodeBox = document.createElement("div");
  //     const imgEpisode = document.createElement("img");
  //     imgEpisode.src = episode.image.medium;
  //     imgEpisode.alt = `image of episode - ${episode.name}`;
  //     imgEpisodeBox.appendChild(imgEpisode);

  //     const summaryEpisodeBox = document.createElement("div");
  //     const summaryEpisode = document.createElement("p");
  //     summaryEpisode.innerText = episode.summary.replace(/(<([^>]+)>)/gi, "");
  //     summaryEpisode.classList.add("episode-summary");
  //     summaryEpisodeBox.appendChild(summaryEpisode);

  //     episodeBox.append(titleEpisodeBox, imgEpisodeBox, summaryEpisodeBox);

  //     if (rootElem) rootElem.append(episodeBox);
  //   });
  // }

  // function makeSelectorForEpisodes(episodeList) {
  //   episodeList.forEach((episode) => {
  //     const optionEp = document.createElement("option");
  //     optionEp.value = episode.id;
  //     optionEp.innerText = `S${numFormatter(episode.season)}E${numFormatter(
  //       episode.number
  //     )} - ${episode.name}`;
  //     selectEpisode.appendChild(optionEp);
  //   });

  //   selectEpisode.addEventListener("change", (selectedEl) => {
  //     if (selectedEl === null)
  //       console.warn("could not find element using id: " + selectedEl.id);
  //     // if (selectedEl.target.value === "none") searchBar.value = "";
  //     allEpisodes.forEach((episode) => {
  //       const elem = document.getElementById(episode.id);
  //       selectedEl.target.value !== elem.id
  //         ? elem.classList.add("is-hidden")
  //         : elem.classList.remove("is-hidden");
  //     });
  //   });
  // }

  // const matchesSearchText = (episode, targetItem) => {
  //   return (
  //     episode.name.toLowerCase().includes(targetItem) ||
  //     episode.summary.toLowerCase().includes(targetItem)
  //   );
  // };

  // let searchItem = () => {
  //   // let searchBar = document.getElementById("searchbar");
  //   if (!searchBar) return;
  //   searchBar.addEventListener("input", (e) => {
  //     if (e.target === null) return;
  //     if (!(e.target instanceof HTMLInputElement)) return;

  //     let searchText = e.target.value;

  //     let showEpisodes = allEpisodes.filter((episode) => {
  //       return matchesSearchText(episode, searchText.toLowerCase());
  //     });
  //     let hideEpisodes = allEpisodes.filter((episode) => {
  //       return !matchesSearchText(episode, searchText.toLowerCase());
  //     });

  //     displayNumOfEp.innerText = `Displaying ${showEpisodes.length}/${allEpisodes.length} episodes`;

  //     showEpisodes.forEach((elem) => {
  //       const element = document.getElementById(elem.id);
  //       if (element === null) {
  //         console.warn("could not find element using id: " + elem.id);
  //       } else {
  //         element.classList.remove("is-hidden");
  //       }
  //     });
  //     hideEpisodes.forEach((elem) => {
  //       const element = document.getElementById(elem.id);
  //       if (element === null) {
  //         console.warn("could not find element using id: " + elem.id);
  //       } else {
  //         element.classList.add("is-hidden");
  //       }
  //     });
  //   });
  // };

  // // searchItem();

  // const numFormatter = (number) => (number < 10 ? "0" + number : number);

  // document
  //   .getElementById("clearBtn")
  //   .addEventListener("click", () => (searchBar.value = ""));
