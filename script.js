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
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "58b932c646mshe173584bfaded5cp1d30c5jsn55df2dd57b36",
      "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
    },
  };
  let text = document.getElementById("videoSearchBar").value;
  if (text.includes("?list")) {
    document.getElementById("Errortxt").innerHTML = "Playlist not supported";
  }
  let res = await fetch(
    `https://youtube-video-download-info.p.rapidapi.com/dl?id=${document
      .getElementById("videoSearchBar")
      .value.slice(-11)}`,
    options
  );

  let Data = await res.json();

  document.querySelector(".DownloadSection").href = "#Downloadselection";

  if (Data.status === "fail") {
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var errorid = document.getElementById("ErrorVideo");
    errorid.style.display = "flex";
    var element = document.querySelector(".DownloadSection");
    element.style.display = "none";
    // document.getElementsByClassName("downloadSection");
    // var element = document.querySelector(".downloadSection");
    // element.style.display = "none";
  } else {
    var clickbtn = document.getElementById("down");
    clickbtn.click();
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var loaderid = document.getElementById("ErrorVideo");
    loaderid.style.display = "none";
    console.log(Data);
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
