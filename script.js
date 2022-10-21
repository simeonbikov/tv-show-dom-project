const rootElem = document.getElementById("root");
const selectShow = document.getElementById("selectShow");
const selectEpisode = document.getElementById("selectEpisode");
// const displayNumOfEl = document.getElementById("displayNumOfMovies");
let searchBar = document.getElementById("searchbar");
let allShows = [];
let allEpisodes = [];
let showId = 0;

const setup = () => {
  getAllShows();
  searchItem();
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
      allShows = data.sort((a, b) => a.name.localeCompare(b.name));
      makePageForShows(allShows);
      makeSelectorForShows(allShows);
    })
    .catch((err) => console.log(err.message));
}

const getAllEpisodes = (showId) => {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw new Error(`Encountered something unexpected: ${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
      makeSelectorForEpisodes(allEpisodes);
    })
    .catch((err) => console.log(err.message));
}

const makePageForShows = (shows) => {
  selectEpisode.classList.add("is-hidden");
  // displayNumOfEl.innerText = `Displaying ${allShows.length}/${allEpisodes.length} episodes`;
  rootElem.innerHTML = "";
  shows.forEach((show) => {
    const showBox = document.createElement("div");
    // showBox.classList.add("show-box");
    showBox.id = show.id;

    const titleShowBox = document.createElement("div");
    const linkShow = document.createElement("a");
    const titleShow = document.createElement("h3");
    titleShow.classList.add("title-show");
    titleShow.innerText = show.name;
    titleShow.id = `title${show.id}`;

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
    summaryShow.id = `summary${show.id}`;

    const infoShowBox = document.createElement("div");
    const infoShowList = document.createElement("ul");
    infoShowList.classList.add("info-show-list");
    const ratingShow = document.createElement("li");
    const genresShow = document.createElement("li");
    const statusShow = document.createElement("li");
    const runtimeShow = document.createElement("li");
    ratingShow.innerText = `Rated: ${show.rating.average}`;
    genresShow.innerText = `Genres: ${show.genres}`;
    genresShow.id = `genres${show.id}`;
    statusShow.innerText = `Status: ${show.status}`;
    runtimeShow.innerText = `Runtime: ${show.runtime}`;

    if (rootElem) rootElem.append(showBox);
    showBox.append(titleShowBox, contentShowBox);
    titleShowBox.append(linkShow);
    linkShow.append(titleShow);
    contentShowBox.append(imgShowBox, summaryShowBox, infoShowBox);
    imgShowBox.append(imgShow);
    summaryShowBox.append(summaryShow);
    infoShowBox.append(infoShowList);
    infoShowList.append(ratingShow, genresShow, statusShow, runtimeShow);
  });
}

const makePageForEpisodes = (episodes) => {
  selectEpisode.classList.remove("is-hidden");
  rootElem.innerHTML = "";
  episodes.forEach((episode) => {
    const episodeBox = document.createElement("div");
    // episodeBox.classList.add("episode-box");
    episodeBox.id = episode.id;

    const titleEpisodeBox = document.createElement("div");
    const titleEpisode = document.createElement("h3");
    titleEpisode.id = `title${episode.id}`;
    titleEpisode.classList.add("title-episode");
    titleEpisode.innerText = `${episode.name} - S${numFormatter(episode.season)}E${numFormatter(episode.number)}`;

    const imgEpisodeBox = document.createElement("div");
    const imgEpisode = document.createElement("img");
    imgEpisode.src = episode.image.medium;
    imgEpisode.alt = `image of episode - ${episode.name}`;

    const summaryEpisodeBox = document.createElement("div");
    const summaryEpisode = document.createElement("p");
    summaryEpisode.id = `summary${episode.id}`;
    summaryEpisode.innerText = episode.summary.replace(/(<([^>]+)>)/gi, "");
    summaryEpisode.classList.add("episode-summary");

    if (rootElem) rootElem.append(episodeBox);
    episodeBox.append(titleEpisodeBox, imgEpisodeBox, summaryEpisodeBox);
    titleEpisodeBox.append(titleEpisode);
    imgEpisodeBox.append(imgEpisode);
    summaryEpisodeBox.append(summaryEpisode);
  });
}

const makeSelectorForShows = (shows) => {
  // const selectShow = document.getElementById("selectShow");
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
}

const makeSelectorForEpisodes = (episodes) => {
  // const selectEpisode = document.getElementById("selectEpisode");
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
      allEpisodes.forEach((episode) => {
        const el = document.getElementById(episode.id);
        el.classList.remove("is-hidden");
      });
    }
    allEpisodes.forEach((episode) => {
      const elem = document.getElementById(episode.id);
      selectedEl.target.value !== elem.id &&
      selectedEl.target.value !== "all"
        ? elem.classList.add("is-hidden")
        : elem.classList.remove("is-hidden");
    });
  // displayNumOfEl.innerText = `Displaying ${allEpisodes.length}/${allEpisodes.length} episodes`;
  searchBar.value = "";
  });
}

const matchesSearchText = (movie, targetItem) => {
  return (
    movie.name.toLowerCase().includes(targetItem) ||
    movie.summary.toLowerCase().includes(targetItem)
  );
};

let searchItem = () => {
  // let searchBar = document.getElementById("searchbar");
  if (!searchBar) return;
  searchBar.addEventListener("input", (e) => {
    if (e.target === null) return;
    if (!(e.target instanceof HTMLInputElement)) return;

    let searchText = e.target.value;

    let displayEpisodes = allEpisodes.filter((episode) => {
      return matchesSearchText(episode, searchText.toLowerCase());
    });
    let hideEpisodes = allEpisodes.filter((episode) => {
      return !matchesSearchText(episode, searchText.toLowerCase());
    });

    let displayShows = allShows.filter((show) => {
      return matchesSearchText(show, searchText.toLowerCase());
    });
    let hideShows = allShows.filter((show) => {
      return !matchesSearchText(show, searchText.toLowerCase());
    });

    displayEpisodes.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (element === null) {
        console.warn("could not find element using id: " + elem.id);
      } else {
        element.classList.remove("is-hidden");
        highlighter(elem.id, searchText);
      }
    });
    hideEpisodes.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (element === null) {
        console.warn("could not find element using id: " + elem.id);
      } else {
        element.classList.add("is-hidden");
        // delHighlight(elem.id);
      }
    });
    displayShows.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (element === null) {
        console.warn("could not find element using id: " + elem.id);
      } else {
        element.classList.remove("is-hidden");
        highlighter(elem.id, searchText);
      }
    });
    hideShows.forEach((elem) => {
      const element = document.getElementById(elem.id);
      if (element === null) {
        console.warn("could not find element using id: " + elem.id);
      } else {
        element.classList.add("is-hidden");
        // delHighlight(elem.id);
      }
    });

    selectEpisode.value = "all";

    // displayNumOfEl.innerText = `Displaying ${allEpisodes.length}/${displayEpisodes.length} episodes`;
    // displayNumOfEl.innerText = `Displaying ${allShows.length}/${displayShows.length} shows`;
  });
};

const numFormatter = (number) => (number < 10 ? "0" + number : number);

const delHighlight = (el) => el.innerText.textContent;

const highlighter = (id, inputText) => {
  // const elementBox = document.getElementById(id);
  const titleEl = document.getElementById(`title${id}`);
  const summaryEl = document.getElementById(`summary${id}`);
  const genresEl = document.getElementById(`genres${id}`);
  // // console.log(element);
  // titleEl.innerHTML.textContent;
  // summaryEl.innerHTML.textContent;
  // genresEl.innerHTML.textContent;

  if (titleEl) addMarkTags(titleEl);
  if (summaryEl) addMarkTags(summaryEl);
  if (genresEl) addMarkTags(genresEl);

  // const element = document.getElementById(id);
  
  function addMarkTags(el) {
    el.innerHTML.textContent;
    if (inputText !== "") {
      let reg = new RegExp(inputText, "gi");
      el.innerHTML = el.innerText.replace(reg, function (str) {
        return `<mark>${str}</mark>`;
      });
    }
  }
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
  //     const titleEpisode = document.createElement("h3");
  //     titleEpisode.classList.add("episode-title");
  //     titleEpisode.innerText = `${episode.name} - S${numFormatter(
  //       episode.season
  //     )}E${numFormatter(episode.number)}`;
  //     titleEpisodeBox.appendChild(titleEpisode);

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



  //============================================


// const hideElements = (elements) => {
//   elements.forEach((elem) => {
//     const element = document.getElementById(elem.id);
//     if (element === null) {
//       console.warn("could not find element using id: " + elem.id);
//     } else {
//       element.classList.add("is-hidden");
//     }
//   });
// }

// const showAllElements = (elements) => {
//   elements.forEach((elem) => {
//     const element = document.getElementById(elem.id);
//     if (element === null) {
//       console.warn("could not find element using id: " + elem.id);
//     } else {
//       element.classList.remove("is-hidden");
//     }
//   });
// }