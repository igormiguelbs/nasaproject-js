const baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=I2XK0pHiXKhy0gJp3PZaKLjkrjWr4XDnKbk3hvGe&start_date=2022-06-01';

var root = document.querySelector('#root');

async function getPictures() {
  
  const pictureList = await fetch( baseUrl );
  var picureData = await pictureList.json();
  console.log(picureData)

  const photoListSection = document.createElement("section");
  photoListSection.classList.add("photo-sec")
  const homeTitle = document.createElement("h1");
  const homeTitleText = document.createTextNode("NASA - Picture of the day");
  homeTitle.appendChild(homeTitleText);

  const photoList = document.createElement("ul");
  photoList.classList.add('photo-list')

  photoListSection.appendChild(homeTitle)
  photoListSection.appendChild(photoList)
  
  picureData.forEach(element => {
    console.log(element.title)

    const photoListItem = document.createElement("li");
    const photoName = document.createTextNode(element.title);

    const photoDate = document.createElement("span")
    const photoDateText = document.createTextNode("Data: " + element.date)
    photoDate.appendChild(photoDateText)

    photoListItem.appendChild(photoName);
    photoListItem.appendChild(photoDate)

    photoList.appendChild(photoListItem);

  });

  root.appendChild(photoListSection);

}

getPictures();

//

