let net;
const webcamElement = document.getElementById('webcam');

var labelToVal =
{
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
    13: 'N',
    14: 'O',
    15: 'P',
    16: 'Q',
    17: 'R',
    18: 'S',
    19: 'T',
    20: 'U',
    21: 'V',
    22: 'W',
    23: 'X',
    24: 'Y',
    25: 'Z',
    26: 'del',
    27: 'nothing',
    28: 'space'
}

async function app() {
    console.log('Loading neural net..');

    // Load the model.
    net = await tf.loadLayersModel('http://localhost:8080/model.json');

    console.log('Sucessfully loaded model');

    await setupWebcam();
    while (true) {
        // have to do this then dispose the tensors to avoid memry leak     
        const img = tf.browser.fromPixels(webcamElement);
        const resizedImg = tf.image.resizeBilinear(img, [150, 150])
        const batchedImage = resizedImg.expandDims(0);// keep() to use it outside of tidy()
        const result = await net.predict(batchedImage);
        arr = result.dataSync();//convert tensor to javascript array
        //index of the maximum value
        var index = arr.indexOf(Math.max(...arr));
        // disposing tensors after we're doe with them
        tf.dispose(img);
        tf.dispose(resizedImg);
        tf.dispose(batchedImage);
        console.log(tf.memory()) // sanity check //- warning: GPU leak stops, but memory consumed is still a lot
        //showing it on the webpage itself
        document.getElementById('console').innerText = `
                result: ${labelToVal[index]}`;
        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await tf.nextFrame();
    }
}


$(document).keydown(function(e){
    if (e.keyCode==32)
        $("body").append("<p>space detected!</p>");
    });

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