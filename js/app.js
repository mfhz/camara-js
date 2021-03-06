// Store a reference of the preview video element and a global reference to the recorder instance
var video = document.getElementById('my-preview');
var recorder;
var x;
// const mediaSource = new MediaSource();

// When the user clicks on start video recording
document.getElementById('btn-start-recording').addEventListener("click", function(){
    // Disable start recording button
    this.disabled = true;

    // Request access to the media devices
    const mediaSource = navigator.mediaDevices.getUserMedia({
        audio: true, 
        video: true
    }).then(function(stream) {
        // Display a live preview on the video element of the page
        video.srcObject = stream;

        // Start to display the preview on the video element
        // and mute the video to disable the echo issue !
        video.play();
        video.muted = true;

        // Initialize the recorder
        recorder = new RecordRTCPromisesHandler(stream, {
            mimeType: 'video/webm',
            bitsPerSecond: 128000
        });

        // Start recording the video
        recorder.startRecording().then(function() {
            console.info('Recording video ...');
            // release stream on stopRecording
        }).catch(function(error) {
            console.error('Cannot start video recording: ', error);
        });

        // release stream on stopRecording
        recorder.stream = stream;
        console.log(recorder);
     //    recorder = stream;

        // Enable stop recording button
        document.getElementById('btn-stop-recording').disabled = false;
    }).catch(function(error) {
        console.error("Cannot access media devices: ", error);
    });
    

}, false);

// When the user clicks on Stop video recording
document.getElementById('btn-stop-recording').addEventListener("click", function(){
    this.disabled = true;

    recorder.stopRecording()
    .then(function() {
        console.info('stopRecording success');


        // Retrieve recorded video as blob and display in the preview element
     //    var videoBlob = recorder.getBlob();
        var blob = new Blob(recorder, { 'type' : 'video/mp4;'});
        // chunks = [];
     //    console.log(videoBlob);
        let videoUrl = window.createObjectURL(blob)
        video.src = videoUrl
        video.play();

        // Unmute video on preview
        video.muted = false;

        // Stop the device streaming
        recorder.stream.stop();

        // Enable record button again !
        document.getElementById('btn-start-recording').disabled = false;
        console.log(video);
    })
    .catch(function(error) {
        console.error('stopRecording failure', error);
    });
}, false);



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

