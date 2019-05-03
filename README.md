[this](https://codelabs.developers.google.com/codelabs/tensorflowjs-teachablemachine-codelab/index.html#0) awesome tutorial on how to access webcam, load a model, and train the model on the browser itself with tf.js .

host the `tfjs_version` directory locally by navigating inside it and typing `python3 -m http.server`
_new version_
`npm init` and `npm install http-server` and then `node_modules/http-server/bin/http-server  model_types/tfjs_version -c1 --cors`


modelTopology is null, as mentioned in the issue [here](https://github.com/tensorflow/tfjs/issues/332). Hence I'm just ignoring the error


can use [https-server](https://www.npmjs.com/package/http-server) globally, anywhere if installed with `-g`


[this video](https://www.youtube.com/watch?v=Szjt8E7EKQc) and the video's [article](https://pythonprogramming.net/loading-keras-model-tensorflowjs-tutorial/) were also helpful, by _sentdex_.

# todo: pass the correct size of image to the neuralnet