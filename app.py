from flask import Flask, request
import json
from controller import calculate
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
def analysis():
    if request.method == "POST":
        data = json.loads(request.data)
        
        hnum = list(map(float,data['hnum'].split(',')))
        hden = list(map(float,data['hden'].split(',')))
        gnum = list(map(float,data['gnum'].split(',')))
        gden = list(map(float,data['gden'].split(',')))
        
        resp = calculate(hnum, hden, gnum, gden)

        return resp
    
    return "Analysis"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', threaded=True)