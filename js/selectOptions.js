document.addEventListener('DOMContentLoaded', function() {
  const carShopButton = document.querySelector(".card.carService");
  const hotelButton = document.querySelector(".card.hotel");
  const eShopButton = document.querySelector(".card.eShop");
  const hospitalButton = document.querySelector(".card.hospital");

  const modal = document.querySelector("dialog");
  const closeButton = document.querySelector("[data-close-modal]");
  const startButton = document.querySelector(".start");

  let selectedBusiness = "";

  carShopButton.addEventListener("click", () => {
    selectedBusiness = "Cars";
    loadData();
    modal.showModal();
  });

  hotelButton.addEventListener("click", () => {
    selectedBusiness = "Hotel";
    loadData();
    modal.showModal();
  });

  eShopButton.addEventListener("click", () => {
    selectedBusiness = "Eshop";
    loadData();
    modal.showModal();
  });

  hospitalButton.addEventListener("click", () => {
    selectedBusiness = "Hospital";
    loadData();
    modal.showModal();
  });

  closeButton.addEventListener("click", () => {
    modal.close();
  });

  startButton.addEventListener("click", () => {
    console.log("Selected Business:", selectedBusiness);
    sessionStorage.setItem('selectedBusiness', selectedBusiness);
    document.location.href = `..quizPage.html?selected=${selectedBusiness}`;
  });


/* Description elements*/
const title = document.querySelector(".description h1");
const firstDescription = document.querySelector(".description h1 + p");
const list = document.querySelector(".description h2 + p");
const image = document.querySelector(".content img");
/*---------------------*/

function loadData() {
  console.log(selectedBusiness);
  console.log(selectedBusiness, 'YOU SELECTED IT');
  switch (selectedBusiness) {
    case "Cars":
      title.innerHTML = "Automobilių gamykla";
      firstDescription.innerHTML = `"AutoManija" yra sena, tradicinė gamykla, kuri pastarąjį
      dešimtmetį patyrė daug pokyčių dėl globalizacijos, konkurencijos
      ir technologijų pažangos. Ji yra žinoma dėl aukštos kokybės
      automobilių gamybos, tačiau pastaruoju metu pradėjo jausti
      spaudimą dėl greitai besikeičiančios rinkos.`;
      list.innerHTML = `<span class="bold">Gamybos efektyvumo sumažėjimas:</span>
      Gamykloje pastebėta, kad automobilių gamybos laikas padidėjo ir
      kainos auga.<br />

      <span class="bold">Kokybės kontrolės trūkumai:</span> Dažnai
      atsiranda defektų, kurie nėra pastebimi iki automobilio
      pardavimo.<br />

      <span class="bold">Tiekimo grandinės problemos:</span> Dėl
      užsakymų kiekio svyravimų, tiekimo grandinė nėra stabili.<br />

      <span class="bold">Rinkos pokyčiai:</span> Poreikis
      ekologiškesniems ir technologiškai pažangesniems automobiliams
      reiškia, kad gamykla turi greitai adaptuotis arba praras rinkos
      dalį.<br />`;
      image.src = "../assets/illustrations/Car.svg";
      break;
    case "Hotel":
      title.innerHTML = "Viešbutis";
      firstDescription.innerHTML = `"Hotela" yra prabangus penkių žvaigždučių viešbutis, įsikūręs miesto centre. Jis pasižymi puikiu aptarnavimu, istoriniu paveldu ir moderniais patogumais. Tačiau pastaruoju metu viešbutis susiduria su keletu iššūkių dėl konkurencijos, technologinės pažangos ir besikeičiančių klientų lūkesčių.`;
      list.innerHTML = `<span class="bold">Rezervacijų sistema:</span>
      Dabartinė rezervacijų sistema yra pasenusi ir dažnai kelia problemų tiek darbuotojams, tiek svečiams.<br />

      <span class="bold">Klientų aptarnavimas:</span> Svečių lūkesčiai nuolat auga, o viešbutis turi užtikrinti nuoseklų aukšto lygio aptarnavimą.<br />

      <span class="bold">Kainodara:</span> Konkuruojant su kitais prabangiais viešbučiais ir naujomis viešnagės platformomis, viešbutis turi rasti optimalų kainų balansą.<br />

      <span class="bold">Technologijų integracija:</span> Naujų technologijų, tokių kaip virtuali realybė ar mobiliosios programėlės, naudojimas tampa vis svarbesnis svečių patirtims gerinti.<br />`;
      image.src = "../assets/illustrations/Hotel.svg";
      break;
    case "Eshop":
      title.innerHTML = "Elektroninės prekybos platforma";
      firstDescription.innerHTML = `"Pirkinių viešnagė" yra maža, bet auganti e-prekybos svetainė šalyje. Jie siūlo apie tūkstantį unikalių prekių, daugiausiai vietinių gamintojų. Įmonė stengiasi išsiskirti asmeniniu aptarnavimu, unikaliomis prekėmis ir greitu pristatymu.`;
      list.innerHTML = `<span class="bold">Rinkos įžvalgos:</span>
      Dėl ribotų resursų ir mažesnio klientų skaičiaus, svetainei sunku nustatyti, kokie produktai bus populiariausi.<br />

      <span class="bold">Konkurencija:</span> Nedidelė įmonė susiduria su konkurencija iš didesnių e-prekybos svetainių, kurios gali pasiūlyti platesnį prekių asortimentą ir mažesnes kainas.<br />

      <span class="bold">Sistemos stabilumas:</span> Užtikrinti, kad svetainė veikia be trikdžių ir sugeba tvarkyti vis didesnį srautą yra esminė sėkmės dalis.<br />`;
      image.src = "../assets/illustrations/Eshop.svg";
      break;
    case "Hospital":
      title.innerHTML = "Sveikatos priežiūros įstaiga";
      firstDescription.innerHTML = `"Medika" yra regioninė klinika, teikianti ambulatorines paslaugas gyventojams. Įstaigoje dirba šeimos gydytojai, specialistai, taip pat yra laboratorija ir radiologijos skyrius. Įstaiga yra žinoma dėl aukštos kokybės paslaugų, bet susiduria su nuolatiniais iššūkiais, susijusiais su efektyvumu, pacientų srautais ir technologijų taikymu.`;
      list.innerHTML = `<span class="bold">Pacientų srauto valdymas:</span>
      Dėl didelės pacientų apkrovos, įstaigai sunku efektyviai valdyti registracijas, vizitus ir laukimo laikus.<br />

      <span class="bold">Duomenų analizė:</span> Didelis kiekis pacientų duomenų reikalauja efektyvaus analizės būdo, kad būtų galima geriau nustatyti ligos tendencijas ir individualizuoti gydymą.<br />

      <span class="bold">Diagnostikos tikslumas:</span> Klaidingos diagnozės ar praleisti simptomai gali turėti rimtų pasekmių pacientams.<br />`;
      image.src = "../assets/illustrations/Hospital.svg";
      break;
  }
}
});
