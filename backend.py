import uuid
from backend.connect_dialogflow import detect_intent_text
from flask import Flask
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

projectId = 'testaction-d6d53'


class User(Resource):
    def get(self, request):
        '''get request's response from dialogflow'''
        print(f'GOT request= {request}, processing')
        # return in json format for extendability in the future
        jsonFormat = {
            'response': detect_intent_text(projectId, uuid.uuid4(), request, 'en-US').query_result.fulfillment_text
        }
        return jsonFormat, 200, {'Access-Control-Allow-Origin': '*'} # last one is to to allow CORS [important]


api.add_resource(User, "/request/<string:request>")
app.run(debug=True)

# example call:
# http://127.0.0.1:5000/request/camp deadline
