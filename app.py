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
    resp = " "
    if request.method == "POST" and request.path == '/analysis':
        data = json.loads(request.data)

        resp = calculate(data)
    
        return resp

    return "Analysis"


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', threaded=True)