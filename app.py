import requests
from flask import Flask, request, redirect, url_for
import json
from controller import analysis1
from flask_cors import CORS
from werkzeug.exceptions import BadRequest
# Initialize Flask
app = Flask(__name__)

CORS(app)
app.secret_key = '1dae3ab43167fa155e5dd772fd8206b1'

# Define routes
@app.route('/')
@app.route('/home')
def home():
    return {"result": "Control System"}

@app.route('/help')
def about():
    return {"result": "Help"}

@app.route('/health')
def health():
    return {"alive": True}

@app.route('/analysis', methods=["GET", "POST"])
def analysis():
    if request.method == "POST":
        data = json.loads(request.data)
        print(data)
        hnum = list(map(float,data['hnum'].split(',')))
        hden = list(map(float,data['hden'].split(',')))
        gnum = list(map(float,data['gnum'].split(',')))
        gden = list(map(float,data['gden'].split(',')))
        
        try:
            resp = analysis1(hnum, hden, gnum, gden)
        except:
            raise BadRequest
        return resp
    
    return "Analysis"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', threaded=True)