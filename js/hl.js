const highlighter = (id, inputText) => {
  const titleEl = document.getElementById(`title${id}`);
  const summaryEl = document.getElementById(`summary${id}`);

  const addMarkTags = (el) => {
    el.innerHTML.textContent;
    if (inputText !== null) {
      let reg = new RegExp(inputText, "gi");
      el.innerHTML = el.innerText.replace(reg, (str) => `<mark>${str}</mark>`);
    }
  };
  if (titleEl) addMarkTags(titleEl);
  if (summaryEl) addMarkTags(summaryEl);
};
