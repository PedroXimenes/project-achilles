from flask import Flask, request
import json

from controller_control import calculate
from flask_cors import CORS
# Initialize Flask
app = Flask(__name__)

CORS(app)
app.secret_key = '1dae3ab43167fa155e5dd772fd8206b1'

# Define routes
@app.route('/')
@app.route('/home')
def home():
    return {"result": "Project Achilles"}

@app.route('/health')
def health():
    return {"alive": True}

@app.route('/analysis', methods=["GET", "POST"])
@app.route('/check',  methods=["GET", "POST"])

def analysis():

    if request.method == "POST" and request.path == '/analysis':
        data = json.loads(request.data)

        resp = calculate(data)
    
        return resp

    return "Analysis"

def check():
    if request.method == "POST" and request.path == '/check':
        specifications = json.loads(request.data)
        
        return specifications
    return "Check Specifications"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', threaded=True)