# LangSign
ASL gesture recognition in the browser.

### To run: open `index.html` in a browser
### Demo:
![langsignGIF](https://user-images.githubusercontent.com/17317792/57445938-0c5b3980-7286-11e9-8146-df1adf4d90de.gif)

# Setting the whole thing up
- [Getting keys for dialogflow agent](#getting-keys-for-dialogflow-agent)
  - [1. Setup an Agent in Dialogflow](#1-setup-an-agent-in-dialogflow)
  - [2. Create a service account](#2-create-a-service-account-and-download-the-service-key-json-file)
  - [3. Save it in the `keys/` folder](#3-save-it-in-the-keys-folder)
  - [4. ProjectId changes](#4-projectid-changes)
- [Serving the CNN model](#serving-the-cnn-model)
- [Hosting the REST Api locally](#hosting-the-rest-api-locally)
- [Making changes to `index.js`](#making-changes-to-indexjs)

## Getting keys for dialogflow agent:
### 1. Setup an Agent in Dialogflow
![default_intent](https://github.com/jschnurr/botkit-middleware-dialogflow/blob/master/images/default_intent.png?raw=true)

Google describes `Agents` as *NLU (Natural Language Understanding) modules*. They transform natural user requests into structured, actionable data.

1. In the [Dialogflow Console](https://console.dialogflow.com/), create an [agent](https://dialogflow.com/docs/agents)
2. Choose or create a [Google Cloud Platform (GCP) Project](https://cloud.google.com/docs/overview/#projects).
3. Dialogflow will automatically setup a `Default Welcome Intent`, which you can try from the test console.

### 2. Create a service account and download the service key json file
![](https://github.com/jschnurr/botkit-middleware-dialogflow/blob/master/images/save_json.png?raw=true)

In order for your Bot to access your Dialogflow Agent, you will need to create a `service account`. A [Service account](https://cloud.google.com/compute/docs/access/service-accounts) is an identity that allows your bot to access the Dialogflow services on your behalf. Once configured, you can download the private key for your service account as a JSON file.

1. Open the [GCP Cloud Console](https://console.cloud.google.com), and select the project which contains your agent.
2. From the `nav` menu, choose `IAM & admin`, `Service accounts`.
3. Select `Dialogflow Integrations` (created by default by Dialogflow), or create your own.
4. Under `actions`, select `create key`, select `JSON` and download the file.
### 3. Save it in the `keys/` folder 
You'll have to create a 'keys/' folder in the workspace if it doesn't exist.
### 4. ProjectId changes
Change the `projectID`  variable in `backend.py` to your dialogflow `projectID`. (it can be found in your agent settings)

## Serving the CNN model
1. `npm install http-server` 
2. To serve the folder: `node_modules/http-server/bin/http-server  model_types/tfjs_version -c1 --cors`
3. It's now available on `https://localhost:8080` (:8080 is the default port)

## Hosting the REST Api locally
The REST Api (in flask) talks to dialogflow. It is called by the frontend.

1. To host it: `python backend.py`
2. It's now available on `https://localhost:5000` (:5000 is the default port)

## Making changes to `index.js`
Changes to `index.js` will not be reflected in the website. This is because `browserify` is used to bundle requirements.
1. `npm install -g browserify` to install browserify globally
2. `browserify index.js > bundle.js`  to bundle up the requirements into a single file. `bundle.js` s the file we'll be linking to our `index.html`

# The flow, diagramatically
This is how everything ties up:

![flow](https://user-images.githubusercontent.com/17317792/57443491-bdf76c00-7280-11e9-9287-ccbb22b40269.png)

This should be your directory structure(well this is mine):

![directory structure](https://user-images.githubusercontent.com/17317792/57443605-04e56180-7281-11e9-9534-e3bc009c3279.png)

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

10. BotUI starter from their [website](https://docs.botui.org/install.html).
11. `pip install dialogflow` and `pip install flask-restful` for python
12. `python backend.py` to obtain an api endpoint which frontend can hopefully query. **start the backend flask server with this command before loading `index.html`**

example api call `http://127.0.0.1:5000/request/camp deadline`
13. BotUI [examples](https://github.com/botui/botui-examples)!!!

## keyboard commands:
`shift`: captures current prediction
`spacebar`: inserts a space into the sentence being formed
`Ctrl+E`: sends the sentence formed to the chatbot input feild, clears the sentence buffer
`enter`: sends what was in the chatbot input feild to the chatbot

### todo/expansion
* send it directly to the chatbot input and manipulate stuff over there?
* UI bump needed
* make a new GIF for README