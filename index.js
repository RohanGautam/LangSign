let net;
const webcamElement = document.getElementById('webcam');

async function app() {
    console.log('Loading neural net..');

    // Load the model.
    net = await tf.loadLayersModel('http://localhost:8080/model.json');

    console.log('Sucessfully loaded model');

    await setupWebcam();
    while (true) {
        img= tf.browser.fromPixels(webcamElement);
        // the neural net expects a 150x150 image, so resize it:
        img=tf.image.resizeBilinear(img, [150, 150])
        // we need a dimension (1,150,150,3) not (150,150,3)
        // Expand our tensor to have an additional dimension, whose size is 1
        const batchedImage = img.expandDims(0);
        console.log(typeof batchedImage)
        console.log(batchedImage)
        const result = await net.predict(batchedImage);
        
        document.getElementById('console').innerText = `
        result: ${result}
      `;

        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await tf.nextFrame();
    }
}

async function setupWebcam() {
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigator.getUserMedia = navigator.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true },
                stream => {
                    webcamElement.srcObject = stream;
                    webcamElement.addEventListener('loadeddata', () => resolve(), false);
                },
                error => reject());
        } else {
            reject();
        }
    });
}

app();