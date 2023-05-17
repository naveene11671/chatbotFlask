
import json
from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin

# Initialize Flask app
app = Flask(__name__)
CORS(app, support_credentials=True)

# Load chatbot responses from JSON file
with open("./config/response.json",encoding="utf8") as f:
    responses = json.load(f)

def find_keyword(sentence):
    with open("./config/key.json", 'r') as f:
        keywords = json.load(f)['keywords']

    # Split the sentence into individual words
    words = sentence.split()

    # Check for each keyword in the sentence
    # for keyword in keywords:
    #     if keyword in words:
    #         print(keyword)
    #         return keyword

    for keyword in keywords:
        if keyword == sentence:
            return keyword
        elif keyword in words:
            print(keyword)
            return keyword
    
    # If no keywords are found, return the whole sentence as a string
    return f"{sentence}"

# Define route to handle incoming user requests
@app.route('/')
def hello():
    print("Hello World!")
    return 'Hello, World!'

@app.route('/chatbot', methods=['POST'])
@cross_origin(supports_credentials=True)
def chatbot():
    print("entered")
    user = request.json['user_input']
    user_raw = user.lower()
    user_input= find_keyword(user_raw)
    print(user_input)
    if user_input.lower() in ['bye', 'goodbye', 'exit']:
        response = {"output": "<strong>  Goodbye!.. Have a nice day. </strong>"}
    elif user_input in responses:
        response = {"output": responses[user_input]}
    else:
        response ={"output": "Rephrase It"}
        
    return jsonify(response)

    
# if __name__ =='__main__':
#     app.run()
if __name__ =='__main__':
    app.run("0.0.0.0", port=5000, debug=True)