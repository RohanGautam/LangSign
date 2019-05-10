// jQuery and it's extensioin required to send keys
var $ = require('jquery');
require('jquery-sendkeys'); // can do dis cuz browserify
var botui = new BotUI('botui-app') // id of container

let net;
const webcamElement = document.getElementById('webcam');
const resultmsg = "Result: ";

var finalMessage = "";
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

        //console.log(tf.memory()) // sanity check //- warning: GPU leak stops, but memory consumed is still a lot

        //showing it on the webpage itself
        document.getElementById('resultmsg').innerText = `${resultmsg}`;
        document.getElementById('console').innerText = `${labelToVal[index]}`;
        // Give some breathing room by waiting for the next animation frame to
        // fire.
        await tf.nextFrame();
    }
}


$(document).keydown(function (e) {
    var result = (document.getElementById('console').innerText);
    if (e.keyCode == 16) {
        // if it's shift, then select current prediction      
        if (result == "space") finalMessage += " ";
        else if (result == "del") finalMessage = finalMessage.slice(0, -1);
        else if (finalMessage != "nothing") finalMessage += result;
    }
    else if (e.keyCode == 32) { //space
        finalMessage += " ";
    }
    else if (e.keyCode == 90 && e.ctrlKey) {//ctrl+z
        finalMessage = finalMessage.slice(0, -1);
    }
    else if (e.keyCode == 77 && e.ctrlKey){ //ctrl+m to send the message to dialogflow
        $('.botui-actions-text-input').sendkeys(finalMessage);
        finalMessage=""; //reset the message
    }
    document.getElementById('message').innerText = `${finalMessage}`;

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



const callAPI = async (requestStr) => {
    console.log(requestStr);
    const response = await fetch(`http://localhost:5000/request/${requestStr}`);
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    return (myJson);
}

botui.message.bot({ // show the first message
    delay: 200,
    content: 'Hello there!'
});

function init_bot() {
    botui.action.text({
        action: {
            placeholder: "Your query"
        }
    }).then(async (res) => {
        botui.message.add({
            loading: true
        }).then(async (index) => {
            jsonResult = await callAPI(res.value);
            console.log('here it\'s', res.value);
            return botui.message.update(index, {
                loading: false,
                content: `${jsonResult['response']}`
            });
        }).then(init_bot); //ask again, and keep it in loop
    })
}

init_bot();// initialize the bot one time, will continue itself after initial call

app();