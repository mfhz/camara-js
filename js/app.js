
navigator.mediaDevices.getUserMedia({ audio: true, video: true})
.then((success) => {
     console.log(success)
     
     let video = document.querySelector('#video');

     video.srcObject = success;

     video.onloadedmetadata = (ev) => video.play();
})
.catch((err) => {
     console.log(err);
})



// navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
// if (navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia(
//      {
//          audio: true,
//          video: {
//               width: 1280,
//               height: 720 
//          } 
//      })
//     .then(function (stream) {
//           console.log('ENTRA');
//      })
//      .catch(function (e) { 
//           // logError(e.name + ": " + e.message); 
//           console.log('entra al if pero va al catch');
//      });
// } else {
//      navigator.getWebcam({ audio: true, video: true }, 
//      function (stream) {
//           //Display the video stream in the video object
//      }, 
//      function () { logError("Web cam is not accessible."); });
// }

