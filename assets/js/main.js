const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=I2XK0pHiXKhy0gJp3PZaKLjkrjWr4XDnKbk3hvGe';

const root = document.querySelector('#root');

const photoListSection = document.createElement("section");
photoListSection.classList.add("photo-sec")

const photoList = document.createElement("ul");
photoList.classList.add('photo-list')

const photoSingle = document.createElement("div");
photoSingle.classList.add('photo-single')

function goBackUrl(){
  photoList.classList.toggle('inactive');
  photoSingle.classList.toggle('inactive');
  photoSingle.innerHTML = "";
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

async function goToUrl(e) {

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if(photoSingle.classList.contains("inactive")){
    photoSingle.classList.toggle('inactive');
  }

  const pictureSingle = await fetch( baseUrl + '&start_date=' + e + '&end_date=' + e);
  const picureSingleData = await pictureSingle.json();
  console.log(picureSingleData)
  photoList.classList.toggle('inactive');
  
  const photoPic = document.createElement("img")
  photoPic.classList.add("single-photo")
  photoPic.setAttribute("src", picureSingleData[0].url)

  const photoSingleTitle = document.createElement("h2");
  const photoSingleTitleText = document.createTextNode(picureSingleData[0].title);
  photoSingleTitle.appendChild(photoSingleTitleText)

  const photoSingleDate = document.createElement("p");
  photoSingleDate.classList.add("date")
  const photoSingleDateText = document.createTextNode(picureSingleData[0].date);
  photoSingleDate.appendChild(photoSingleDateText)

  const photoSingleExplanation = document.createElement("p");
  const photoSingleExplanationText = document.createTextNode(picureSingleData[0].explanation);
  photoSingleExplanation.appendChild(photoSingleExplanationText)

  const goBack = document.createElement("p");
  goBack.classList.add("go-back")
  const goBackText = document.createTextNode("< Voltar");
  goBack.appendChild(goBackText)

  photoListSection.appendChild(photoSingle)
  photoSingle.appendChild(photoPic);
  photoSingle.appendChild(photoSingleTitle);
  photoSingle.appendChild(photoSingleDate);
  photoSingle.appendChild(photoSingleExplanation);
  photoSingle.appendChild(goBack);

  goBack.addEventListener('click', goBackUrl)

}

async function getPictures() {
  
  const pictureList = await fetch( baseUrl + '&start_date=2022-06-01');
  const picureData = await pictureList.json();
  //console.log(picureData)

  const homeTitle = document.createElement("h1");
  const homeTitleText = document.createTextNode("NASA - Picture of the day");
  homeTitle.appendChild(homeTitleText);

  photoListSection.appendChild(homeTitle)
  photoListSection.appendChild(photoList)
  
  picureData.forEach(element => {
    //console.log(element.title)

    const photoListItem = document.createElement("li");
    const photoName = document.createTextNode(element.title);

    const photoDate = document.createElement("span")
    const photoDateText = document.createTextNode("Data: " + element.date)
    photoDate.appendChild(photoDateText)

    photoListItem.appendChild(photoName);
    photoListItem.appendChild(photoDate)

    photoListItem.addEventListener('click', function(){
      goToUrl(element.date)
    })

    photoList.appendChild(photoListItem);

  });

  root.appendChild(photoListSection);

}

getPictures();

//

