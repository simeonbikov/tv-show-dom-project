//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  // console.log(allEpisodes.name);
  // allEpisodes.forEach(e => console.log(e.name));

  document.getElementById("clearBtn").addEventListener("click",() =>
  (document.getElementById("searchbar").value = ""));

  const searchInput = document.getElementById("searchbar");
  searchInput.addEventListener("input", search);

}



function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach((episode) => {
    const episodeBox = document.createElement("div");
      episodeBox.classList.add("episode-box");
    rootElem.appendChild(episodeBox);

    const nameSeasonEpisodeBox = document.createElement("div");
    episodeBox.appendChild(nameSeasonEpisodeBox);
    const nameSeasonEpisode = document.createElement("h3");
        // nameSeasonEpisode.classList.add("name-season-episode");
    const episodeSeason =
      episode.season < 10 ? "0" + episode.season : episode.season;
    const episodeNumber =
      episode.number < 10 ? "0" + episode.number : episode.number;
    nameSeasonEpisode.innerText = `${episode.name} - S${episodeSeason}E${episodeNumber}`;
    nameSeasonEpisodeBox.appendChild(nameSeasonEpisode);

    const imgEpisodeBox = document.createElement("div");
    episodeBox.appendChild(imgEpisodeBox);
    const imgEpisode = document.createElement("img");
    imgEpisode.src = episode.image.medium;
    imgEpisode.atl = `image of episode - ${episode.name}`;
    imgEpisodeBox.appendChild(imgEpisode);

    const episodeSummaryBox = document.createElement("div");
    episodeSummaryBox.innerHTML = episode.summary;
        // episodeSummaryBox.childNodes[0].classList.add("episode-summary-text");
    episodeBox.appendChild(episodeSummaryBox);
  });
}


function search() {
  let episodeBoxes = document.querySelectorAll('.episode-box')
  // Array.from(episodeBoxes).filter((episode) => 
  //   !episode.innerText.toLowerCase().includes(input.toLowerCase()))
  //   .forEach((episode) => episode.classList.add("is-hidden"));
  // console.log(bx);
  let input = document.getElementById("searchbar").value;
  for (var i = 0; i < episodeBoxes.length; i++) {
    if(episodeBoxes[i].innerText.toLowerCase().includes(input.toLowerCase())) {
      episodeBoxes[i].classList.remove("is-hidden");
      // highlight(episodeBoxes[i], input);
    } else {
      episodeBoxes[i].classList.add("is-hidden");
    }
  }
}

// function highlight(episode, text) {
//   episode.replace(text,"<span>text</span>");
// }


// const searchInput = document.getElementById("searchbar");
// searchInput.addEventListener("input", e => {
//   const input = e.target.value.toLowerCase();
//   console.log(input);
//   });



  // searchSeries();
      // input = input.toLowerCase();
      // console.log(input);
//       let box = document.getElementsByClassName("episode-box");
//       let name = document.getElementsByClassName("name-season-episode");
//       let summary = document.getElementsByClassName("episode-summary-text");

//       for (i = 0; i < box.length; i++) {
//         if (
//           !name[i].innerText.toLowerCase().includes(input) ||
//           !summary[i].innerText.toLowerCase().includes(input)
//         ) {
//           box[i].style.display = "none";
//         } else {
//           box[i].style.display = "rootElem";
//         }
//       }
// });

// function searchSeries() {

    // let input = document.getElementById("searchbar").value;
    // input = input.toLowerCase();
//     let box = document.getElementsByClassName("episode-box");
//     let name = document.getElementsByClassName("name-season-episode");
//     let summary = document.getElementsByClassName("episode-summary-text");

//     for (i = 0; i < box.length; i++) {
//       if (!name[i].innerText.toLowerCase().includes(input) ||
//         !summary[i].innerText.toLowerCase().includes(input)) {
//         box[i].style.display = "none";
//       } else {
//         box[i].style.display = "rootElem";
//       }
//     }
// }

window.onload = setup;
