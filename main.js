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
		console.log(data);
		const cardHeader = document.getElementById("cardHeader");
		cardHeader.innerHTML = `${data.title}`;

		const cardBody = document.querySelector("#cardBody blockquote");

		cardBody.firstElementChild.innerHTML = `${data.hadeeth}`;

		const accordion = document.querySelector("#accordion");

		accordion.firstElementChild.lastElementChild.firstElementChild.firstElementChild.innerHTML = `${data.explanation}`;

		accordion.firstElementChild.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.innerHTML =
			"";
		data.hints.forEach(
			(hint) =>
				(accordion.firstElementChild.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.innerHTML += `<li>${hint}</li>`)
		);
		accordion.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.lastElementChild.innerHTML =
			"";
		data.words_meanings.forEach(
			(word_meaning) =>
				(accordion.firstElementChild.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.firstElementChild.lastElementChild.innerHTML += `<tr><td>${word_meaning.word}</td><td>${word_meaning.meaning}</td></tr>`)
		);

		accordion.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.firstElementChild.innerHTML = `<p>${data.reference}</p>`;
	})
	.catch((error) => console.error(error));
