const HADITH_IDs = [
	5907, 5913, 6208, 6274, 6275, 8402, 65099, 3410, 6258, 6265, 6276, 10112,
	10113, 10114, 10842, 10847, 10853, 10854, 64642, 65026, 65035, 65046, 65051,
	65054, 65058, 65059, 65060, 65061, 65062, 65065, 65071, 65074, 65075, 3571,
	3772, 4448, 5213, 5658, 5775, 6178, 6212, 6260, 6828, 8401, 10119, 10834,
	10838, 10840, 10841, 10843, 10850, 10851, 10913, 58176, 58197, 64607, 65174,
	65214, 65218, 65223, 65231, 65232, 65237, 65238, 65239, 65240, 65241, 65243,
	65244, 65245, 65247, 65248, 65249, 65250, 65253, 65257, 65258, 65259, 65261,
	65262, 65263, 65267, 65268, 65269, 65272, 65273, 65274, 65275, 65276, 65277,
	65278, 65279, 65280, 65281, 65283, 65284, 65285, 65288, 65289, 65290, 65291,
	65292, 65293, 65294, 65296, 65297, 65298, 65299, 65300, 65301, 65302, 65303,
	65304, 65306, 65308, 65311, 65312, 65313, 65315, 65323, 65324, 65325, 65326,
	65327, 65328, 65329, 65331, 65332, 65334, 65335, 65336, 65338, 65340, 65341,
	65342, 65343, 65344, 65347, 65349, 65351, 65383, 65407, 65425, 65445, 65448,
	65652, 3377, 4217, 10558, 10574, 10575, 10836, 10852, 10856, 58137, 58145,
	65159, 65162, 65233, 65234, 65235, 65271, 65282, 65307, 65309, 65310, 65317,
	65333, 65339, 65557, 5383, 65236, 65052, 65056, 65064, 65066, 65067, 65070,
	65072,
];

const apiFetch = async (URI) => {
	try {
		const response = await fetch(URI);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("There was a problem with the fetch operation:", error);
		return null;
	}
};

const RANDOM_ID = HADITH_IDs[Math.floor(Math.random() * HADITH_IDs.length)];

apiFetch(
	`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${RANDOM_ID}`
)
	.then((data) => {
		document.querySelector("#placeHolder").classList.remove("placeholder-wave");
		const cardHeader = document.getElementById("cardHeader");
		cardHeader.innerHTML = `${data.title}`;

		const cardBody = document.querySelector("#cardBody .hadith-body");

		cardBody.firstElementChild.nextElementSibling.innerHTML = `${data.hadeeth}`;

		const hadithExplain = document.querySelector("#hadithExplain");

		hadithExplain.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML = `${data.explanation}`;

		const hadithHints = document.querySelector("#hadithHints");

		hadithHints.firstElementChild.nextElementSibling.lastElementChild.innerHTML =
			"";

		data.hints.forEach(
			(hint) =>
				(hadithHints.firstElementChild.nextElementSibling.lastElementChild.innerHTML += `<li>${hint}</li>`)
		);

		const wordMeanings = document.querySelector("#wordMeanings");
		wordMeanings.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.innerHTML =
			"";

		("");
		data.words_meanings.forEach(
			(word_meaning) =>
				(wordMeanings.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.innerHTML += `<tr><td>${word_meaning.word}</td><td>${word_meaning.meaning}</td></tr>`)
		);

		const hadithReferences = document.querySelector("#hadithReferences");

		hadithReferences.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling = `${data.reference}`;
	})
	.catch((error) => console.error(error));

const clipboardCheck = `<svg data-color="green" class='icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
		<path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
		<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
		<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
	</svg>`;

const btns = document.querySelectorAll(".clipboard");

btns.forEach((btn) => {
	new ClipboardJS(btn);
	btn.addEventListener("click", function () {
		const textToCopy = this.nextElementSibling.innerText;
		// Select the text field
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				// Success! The text was copied to the clipboard
				const btnPrevHTML = this.innerHTML;
				btn.innerHTML = clipboardCheck;
				setTimeout(() => {
					btn.innerHTML = btnPrevHTML;
				}, 1000);
			})
			.catch((err) => {
				// Something went wrong
				console.error("Could not copy text: ", err);
			});
	});
});
