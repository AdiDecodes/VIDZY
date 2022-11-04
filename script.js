document.addEventListener("DOMContentLoaded", function () {
  let pasteButton = document.getElementById("button");
  pasteButton.addEventListener("click", function () {
    navigator.clipboard.readText().then(
      (cliptext) =>
        (document.getElementById("videoSearchBar").value = cliptext),
      (err) => console.log(err)
    );
  });
});

async function foo() {
  var url = document.getElementById("videoSearchBar").value;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "435ec0b7bfmshbf41945eb7fd82cp173a04jsnd5c26f1cb59a",
      "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
    },
  };

  if (url.includes("?list")) {
    document.getElementById("Errortxt").innerHTML = "Playlist not supported";
  } else if (url.at(url.length - 12) != "=" || url.at(url.length - 12) != "/") {
    document.getElementById("Errortxt").innerHTML = "Invalid Video URL";
  }

  let res = await fetch(
    `https://youtube-video-download-info.p.rapidapi.com/dl?id=${url.slice(
      -11
    )}`,
    options
  );
  console.log(url);
  let Data = await res.json();

  if (Data.status === "fail") {
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var errorid = document.getElementById("ErrorVideo");
    errorid.style.display = "flex";
    var element = document.querySelector(".DownloadSection");
    element.style.display = "none";
    document.getElementById("down").href = "#ErrorVideo";
    var clickbtn = document.getElementById("down");
    clickbtn.click();
    // document.getElementsByClassName("downloadSection");
    // var element = document.querySelector(".downloadSection");
    // element.style.display = "none";
  } else {
    console.log(Data);
    document.getElementById("down").href = "#Downloadsection";
    var clickbtn = document.getElementById("down");
    clickbtn.click();
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var loaderid = document.getElementById("ErrorVideo");
    loaderid.style.display = "none";
    document.querySelector(".title").innerHTML = Data.title;
    document.querySelector(".responseThumbnail").src = Data.thumb;
    document.querySelector(".author1").innerHTML = "By " + Data.author.bold();
    document.querySelector(".quality1").innerHTML =
      "Download " + Data.link[17][3];
    document.querySelector(".size1").innerHTML =
      Data.link[17][1] != "" ? Data.link[17][1] : "Auto";
    document.querySelector(".qualityBtnbox1").href = Data.link[17][0];
    document.querySelector(".quality2").innerHTML =
      "Download " + Data.link[18][3];
    document.querySelector(".size2").innerHTML =
      Data.link[18][1] != "" ? Data.link[18][1] : "Auto";
    document.querySelector(".qualityBtnbox2").href = Data.link[18][0];
    document.querySelector(".quality3").innerHTML =
      "Download " + Data.link[22][3];
    document.querySelector(".size3").innerHTML =
      Data.link[22][1] == "" ? "Auto" : Data.link[22][1];
    document.querySelector(".qualityBtnbox3").href = Data.link[22][0];
    var element = document.querySelector(".DownloadSection");
    element.style.display = "flex";
  }
}

async function insta() {
  var url = document.getElementById("videoSearchBar").value;
  const options = {
    method: "GET",
    url: "https://instagram-looter2.p.rapidapi.com/post",
    headers: {
      "X-RapidAPI-Key": "435ec0b7bfmshbf41945eb7fd82cp173a04jsnd5c26f1cb59a",
      "X-RapidAPI-Host": "instagram-looter2.p.rapidapi.com",
    },
  };

  let res = await fetch(
    `https://instagram-looter2.p.rapidapi.com/post?link=${url}`,
    options
  );
  let Data = await res.json();

  if (Data.status === "fail") {
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var errorid = document.getElementById("ErrorVideo");
    errorid.style.display = "flex";
    var element = document.querySelector(".DownloadSection");
    element.style.display = "none";
    document.getElementById("down").href = "#ErrorVideo";
    var clickbtn = document.getElementById("down");
    clickbtn.click();
    // document.getElementsByClassName("downloadSection");
    // var element = document.querySelector(".downloadSection");
    // element.style.display = "none";
  } else {
    console.log(Data);
    console.log(Data.video_url);
    console.log(Data.thumbnail_src);
    document.getElementById("down").href = "#Downloadsection";
    var clickbtn = document.getElementById("down");
    clickbtn.click();
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var loaderid = document.getElementById("ErrorVideo");
    loaderid.style.display = "none";
    document.querySelector(".title").innerHTML = Data.title;
    document.querySelector(".responseThumbnail").src = Data.thumbnail_src;
    document.querySelector(".author1").innerHTML = "By " + Data.author.bold();
    document.querySelector(".quality1").innerHTML =
      "Download " + Data.link[17][3];
    document.querySelector(".size1").innerHTML =
      Data.link[17][1] != "" ? Data.link[17][1] : "Auto";
    document.querySelector(".qualityBtnbox1").href = Data.link[17][0];
    document.querySelector(".quality2").innerHTML =
      "Download " + Data.link[18][3];
    document.querySelector(".size2").innerHTML =
      Data.link[18][1] != "" ? Data.link[18][1] : "Auto";
    document.querySelector(".qualityBtnbox2").href = Data.link[18][0];
    document.querySelector(".quality3").innerHTML =
      "Download " + Data.link[22][3];
    document.querySelector(".size3").innerHTML =
      Data.link[22][1] == "" ? "Auto" : Data.link[22][1];
    document.querySelector(".qualityBtnbox3").href = Data.link[22][0];
    var element = document.querySelector(".DownloadSection");
    element.style.display = "flex";
  }
}
