// Initialize DOM elements

const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const inputEl = form.querySelector("input");
const searchDescription = document.querySelector(".search-description");
const sectionMain = document.querySelector(".section-main");
const sectionMeaning = document.querySelector(".section-meaning");
let mainResults = "";
const clearSearchEl = document.querySelector(".search-section .clear")
const resultsEl = document.querySelector(".results");

let meaningEl = document.createElement("div");
meaningEl.classList.add("section-meaning");

let exampleEl = document.createElement("div");
exampleEl.classList.add("section-example");

let synonymsEl = document.createElement("div");
synonymsEl.classList.add("section-synonym");

let sourceEl = document.createElement("div");
sourceEl.classList.add("section-source");

form.addEventListener("submit", (e) => {

    e.preventDefault();
    searchDescription.classList.remove("hide");
    searchDescription.innerHTML = `<p>Searching for the word: <span class="search-word">${inputEl.value}</span></p>`;
    setTimeout(() => {
        searchDescription.classList.add("hide");
        fetchResults(inputEl.value);
    }, 2000);

})

inputEl.addEventListener("focusin", () => {
    form.classList.add("active");
})

inputEl.addEventListener("focusout", () => {
    form.classList.remove("active");
})


const fetchResults = async (word) => {
    let callApi = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let results = await callApi.json();
    console.log("Results", results);
    if (results.title === "No Definitions Found") {
        searchDescription.classList.remove("hide");
        searchDescription.innerHTML = `<p>No results for <span class="search-word">${inputEl.value}</span>. Please try another word or check the spelling.</p>`;
        return;
    } else {
        loadResults(results);
    }
}

const loadResults = (results) => {

    // For filtering the audio src

    let audioSrc = "";
    let phoneticText = "";
    results.forEach(result => {
        if (!result.phonetics == "") {
            let phoneticArray = result.phonetics;
            phoneticArray.forEach(phonetic => {

                if (!phonetic.audio == "") {
                    audioSrc = phonetic.audio;
                    return;
                }

            })
            return;
        }

    });

    // Filter the phonetic

    results.forEach(result => {
        if (!result.phonetics == "") {
            let phoneticArray = result.phonetics;
            phoneticArray.forEach(phonetic => {
                if (!phonetic.text == "") {
                    phoneticText = phonetic.text;
                    return;
                }
            })
            return;
        }
    });

    sectionMain.innerHTML = `<div class="word">${results[0].word}
                             <div class="phonetic">${phoneticText}</div></div>
                        <div class="text-to-audio"><audio src="${audioSrc}"></audio><i class="material-icons">settings_voice</i></div>
                        `;

    // mainResults.insertAdjacentHTML("beforeend",mainResults);

    const voiceEl = document.querySelector(".text-to-audio");
    const audio = sectionMain.querySelector("audio");

    if (audioSrc === '') {
        voiceEl.querySelector(".material-icons").innerText = "mic_off";
        voiceEl.setAttribute("title", "No audio found in the database");
        voiceEl.classList.add("no-audio");
    }

    voiceEl.addEventListener("click", () => {
        audio.play();
    })

    // Filter through meanings

    let meaningText = [];

    results.forEach(result => {
        result.meanings.forEach(meaning => {
            meaning.definitions.forEach(definition => {
                meaningText.push(definition.definition);
            })
        })
    })

    console.log("Meaning Text", meaningText);

    let textLi = "";

    meaningText.forEach(text => {
        textLi += `<li>${text}</li>`;
    })

    meaningEl.remove();

    meaningEl.innerHTML = `<div class="title">Meaning(s)</div>
                            <div class="meanings">
                            <ol>${textLi}</ol>
                            </div>`;

    sectionMain.insertAdjacentElement("afterend", meaningEl);

    // Filter through examples

    let exampleText = [];

    results.forEach(result => {
        result.meanings.forEach(meaning => {
            meaning.definitions.forEach(definition => {
                exampleText.push(definition.example);
            })
        })
    })

    if (exampleText.length > 0) {
        let exampleLi = "";

        exampleText.forEach(text => {
            if (text !== undefined) {
                exampleLi += `<li>${text}</li>`;
            }
        })

        exampleEl.remove();


        exampleEl.innerHTML = `<div class="title">Examples(s)</div>
                            <div class="examples">
                            <ol>${exampleLi}</ol>
                            </div>`;

        meaningEl.insertAdjacentElement("afterend", exampleEl);
    }



    // Filter through synonyms

    let synonymsText = [];

    results.forEach(result => {
        result.meanings.forEach(meaning => {
            meaning.synonyms.forEach(synonym => {
                synonymsText.push(synonym);
            })
        })
    })

    console.log(synonymsText);

    synonymsEl.remove();

    if (synonymsText.length > 0) {
        let synonyms = "";

        synonymsText.forEach((text, index) => {
            if (text !== undefined) {
                if (index < synonymsText.length - 1) {
                    synonyms += `<div class="synonym-tag">${text}, </div>`;
                } else if (index == synonymsText.length - 1) {
                    synonyms += `<div class="synonym-tag">${text}.</div>`;
                }
            }
        })



        synonymsEl.innerHTML = `<div class="title">Synonyms(s)</div>
                            <div class="synonyms">
                            ${synonyms}
                            </div>`;

        exampleEl.insertAdjacentElement("afterend", synonymsEl);
    }


}

// Clear input on clicking close icon

clearSearchEl.addEventListener("click", () => {
    inputEl.value = "";
    sectionMain.innerHTML = "";
    meaningEl.remove();
    exampleEl.remove();
    synonymsEl.remove();
    searchDescription.classList.remove("hide");
    searchDescription.innerHTML = `<p>Type in a word and press Enter to search for it in the dictionary.</p>`;
})