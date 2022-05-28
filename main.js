noseX = 0;
noseY = 0;
leftwristX = 0;
rightwristX = 0;
difference = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 550);

    canvas = createCanvas(700, 500);
    canvas.center();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function draw() {
    background('#1d1d1d');
    fill('#FFC0CB');
    stroke('#FFC0CB');
    square(noseX, noseY, difference);
    document.getElementById("stats").innerHTML = "Width =" + difference + " px"
}

function modelLoaded() {
    console.log("Posenet Loaded");
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y - 90;
        console.log("Nose X = " + noseX + "Nose Y = " + noseY);
        leftwristX = results[0].pose.leftWrist.x;
        rightwristX = results[0].pose.rightWrist.x;
        difference = floor(leftwristX - rightwristX);
        console.log("Left Wrist is " + leftwristX + "Right Wrist is " + rightwristX + "Difference is " + difference)
    }
}