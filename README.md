# LangSign
ASL gesture recognition in the browser.




# References and Notes:
1. [this](https://codelabs.developers.google.com/codelabs/tensorflowjs-teachablemachine-codelab/index.html#0) awesome tutorial on how to access webcam, load a model, and train the model on the browser itself with tf.js .

2. ~host the `tfjs_version` directory locally by navigating inside it and typing `python3 -m http.server`~(doesnt allow CORS)

`npm init` and `npm install http-server` and then `node_modules/http-server/bin/http-server  model_types/tfjs_version -c1 --cors`
This allows you to serve a directory with CORS(cross-origin requests) enabled.
Can use the same [https-server](https://www.npmjs.com/package/http-server) globally, anywhere if installed with `-g`


3. [This video](https://www.youtube.com/watch?v=Szjt8E7EKQc) and the video's [article](https://pythonprogramming.net/loading-keras-model-tensorflowjs-tutorial/) were also helpful in making model in python and loading for tf.js, by _sentdex_.

4. [Importing Keras models](https://www.tensorflow.org/js/tutorials/conversion/import_keras) to tf.js.

5. [This article](https://thekevinscott.com/image-classification-with-javascript/) on how to do some image preprocesing with javascript using tf.js

6. Fixing memory leak by referring to the `tf.dispose()` method, from [this](https://www.tensorflow.org/js/guide/tensors_operations) website.

7. Capturing Keypresses on a website from [stackOverflow](https://stackoverflow.com/questions/2878983/capture-key-press-without-placing-an-input-element-on-the-page) ofcourse.

8. Testing what keypress is what keycode, [tester here](https://unixpapa.com/js/testkey.html).
user would use spacebar to confirm action
dialogflow integration

9. use `require()` in the browser. look at [Browserify docs](https://github.com/browserify/browserify).
`npm install -g browserify` and `browserify index.js > bundle.js`

we use `require()` to use `jquery-sendkeys`, from [here](https://www.npmjs.com/package/jquery-sendkeys).