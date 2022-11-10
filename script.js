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

function checkUrl() {
  var loaderid = document.getElementById("preloader");
  loaderid.style.display = "flex";
  var url = document.getElementById("videoSearchBar").value;
  if (url != undefined || url != "") {
    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      console.log(match[2]);
      yt(url);
    } else if (
      url.includes("https://fb.watch/") ||
      url.includes("https://www.facebook.com/reel/")
    ) {
      fb(url);
    } else {
      var loaderid = document.getElementById("preloader");
      loaderid.style.display = "none";
      var errorid = document.getElementById("ErrorVideo");
      errorid.style.display = "flex";
      var element = document.querySelector(".DownloadSection");
      element.style.display = "none";
      document.getElementById("down").href = "#ErrorVideo";
      var clickbtn = document.getElementById("down");
      clickbtn.click();
    }
  }
}

var url = document.getElementById("videoSearchBar").value;
async function yt(Url) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "435ec0b7bfmshbf41945eb7fd82cp173a04jsnd5c26f1cb59a",
      "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
      // "X-RapidAPI-Key": "58b932c646mshe173584bfaded5cp1d30c5jsn55df2dd57b36",
      // "X-RapidAPI-Host": "youtube-video-download-info.p.rapidapi.com",
    },
  };
  const res = await fetch(
    `https://youtube-video-download-info.p.rapidapi.com/dl?id=${document
      .getElementById("videoSearchBar")
      .value.slice(-11)}`,
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
  } else {
    console.log(Data);
    document.getElementById("down").href = "#Downloadsection";
    var clickbtn = document.getElementById("down");
    clickbtn.click();
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var loaderid = document.getElementById("ErrorVideo");
    loaderid.style.display = "none";
    document.querySelector(".title").innerHTML =
      Data.title == "" ? "Untitled Video" : Data.title;
    document.querySelector(".responseThumbnail").src = Data.thumb;
    document.querySelector(".author1").innerHTML = "By " + Data.author;
    document.querySelector(".quality1").innerHTML =
      "Download " + Data.link[17][3];
    document.querySelector(".size1").innerHTML =
      Data.link[17][1] == "" ? "Auto" : Data.link[17][1];
    document.querySelector(".qualityBtnbox1").href = Data.link[17][0];
    document.querySelector(".quality2").innerHTML =
      "Download " + Data.link[18][3];
    document.querySelector(".size2").innerHTML =
      Data.link[18][1] == "" ? "Auto" : Data.link[18][1];
    document.querySelector(".qualityBtnbox2").href = Data.link[18][0];
    document.querySelector(".qualityBtnbox3").href = Data.link[22][0];
    document.querySelector(".quality3").innerHTML =
      "Download " + Data.link[22][3];
    document.querySelector(".size3").innerHTML =
      Data.link[22][1] == "" ? "Auto" : Data.link[22][1];
    var element = document.querySelector(".DownloadSection");
    element.style.display = "flex";
    var hidebtn = document.getElementById("btn2");
    hidebtn.style.display = "flex";
    var hidebtn = document.getElementById("btn3");
    hidebtn.style.display = "flex";
  }
}

async function fb(Url) {
  var url = Url;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "435ec0b7bfmshbf41945eb7fd82cp173a04jsnd5c26f1cb59a",
      "X-RapidAPI-Host": "facebook-reel-and-video-downloader.p.rapidapi.com",
    },
  };

  let res = await fetch(
    `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${url}`,
    options
  );
  let Data = await res.json();
  if (Data.success == "Fail") {
    console.log("Failed");
  }
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
  } else {
    if (Data.success == false) {
      var loaderid = document.getElementById("preloader");
      loaderid.style.display = "none";
      var errorid = document.getElementById("ErrorVideo");
      errorid.style.display = "flex";
      var element = document.querySelector(".DownloadSection");
      element.style.display = "none";
      document.getElementById("down").href = "#ErrorVideo";
      var clickbtn = document.getElementById("down");
      clickbtn.click();
    } else {
      console.log(Data);
      if (Data == false) {
        var loaderid = document.getElementById("preloader");
        loaderid.style.display = "none";
        var errorid = document.getElementById("ErrorVideo");
        errorid.style.display = "flex";
        var element = document.querySelector(".DownloadSection");
        element.style.display = "none";
        document.getElementById("down").href = "#ErrorVideo";
        var clickbtn = document.getElementById("down");
        clickbtn.click();
      } else {
        document.getElementById("down").href = "#Downloadsection";
        var clickbtn = document.getElementById("down");
        clickbtn.click();
        var loaderid = document.getElementById("preloader");
        loaderid.style.display = "none";
        var loaderid = document.getElementById("ErrorVideo");
        loaderid.style.display = "none";
        var element = document.querySelector(".DownloadSection");
        element.style.display = "flex";
        document.querySelector(".title").innerHTML =
          Data.title == "" ? "Untitled Video" : Data.title;
        document.querySelector(".responseThumbnail").src = Data.thumbnail;
        document.querySelector(".author1").innerHTML = "By Facebook User";
        document.querySelector(".quality1").innerHTML = "Download High Quality";
        document.querySelector(".size1").innerHTML = "Auto";
        document.querySelector(".qualityBtnbox1").href =
          Data.links["Download High Quality"];
        document.querySelector(".quality2").innerHTML = "Download Low Quality";
        document.querySelector(".size2").innerHTML = "Auto";
        document.querySelector(".qualityBtnbox2").href =
          Data.links["Download Low Quality"];
        var hidebtn = document.getElementById("btn2");
        hidebtn.style.display = "flex";
        var hidebtn = document.getElementById("btn3");
        hidebtn.style.display = "none";
      }
    }
  }
}

// async function insta(Url) {
//   var url = Url;
//   const options = {
//     method: "GET",
//     headers: {
//       "cross-origin-resource-policy": "cross-origin",
//       "X-RapidAPI-Key": "435ec0b7bfmshbf41945eb7fd82cp173a04jsnd5c26f1cb59a",
//       "X-RapidAPI-Host": "instagram-data1.p.rapidapi.com",
//     },
//   };

//   let res = await fetch(
//     `https://instagram-data1.p.rapidapi.com/post/info?post=${url}`,
//     options
//   );
//   let Data = await res.json();
//   if (Data.status === "fail") {
//     var loaderid = document.getElementById("preloader");
//     loaderid.style.display = "none";
//     var errorid = document.getElementById("ErrorVideo");
//     errorid.style.display = "flex";
//     var element = document.querySelector(".DownloadSection");
//     element.style.display = "none";
//     document.getElementById("down").href = "#ErrorVideo";
//     var clickbtn = document.getElementById("down");
//     clickbtn.click();
//   } else {
//     if (Data.success == false) {
//       var loaderid = document.getElementById("preloader");
//       loaderid.style.display = "none";
//       var errorid = document.getElementById("ErrorVideo");
//       errorid.style.display = "flex";
//       var element = document.querySelector(".DownloadSection");
//       element.style.display = "none";
//       document.getElementById("down").href = "#ErrorVideo";
//       var clickbtn = document.getElementById("down");
//       clickbtn.click();
//     } else {
//       console.log(Data.image_versions2.candidates[0].url);
//       document.getElementById("down").href = "#Downloadsection";
//       var clickbtn = document.getElementById("down");
//       clickbtn.click();
//       var loaderid = document.getElementById("preloader");
//       loaderid.style.display = "none";
//       var loaderid = document.getElementById("ErrorVideo");
//       loaderid.style.display = "none";
//       var element = document.querySelector(".DownloadSection");
//       element.style.display = "flex";
//       // if (Data.media_type == 1) {
//       // } else if (media_type == 2) {
//       // }
//       document.querySelector(".title").innerHTML =
//         Data.caption.text == "" ? "Untitled Video" : Data.caption.text;
//       document.querySelector(".responseThumbnail").src =
//         Data.image_versions2.candidates[0].url;
//       document.querySelector(".author1").innerHTML =
//         "By @" + Data.caption.user.username;
//       document.querySelector(".quality1").innerHTML = "Download Media";
//       document.querySelector(".size1").innerHTML = "Auto";
//       document.querySelector(".qualityBtnbox1").href =
//         Data.video_versions[0]["url"];
//       var hidebtn = document.getElementById("btn2");
//       hidebtn.style.display = "none";
//       var hidebtn = document.getElementById("btn3");
//       hidebtn.style.display = "none";
//     }
//   }
// }
