import requests
import json

# Define the URL for the request
url = "http://localhost:8000/ask_question/"

# Define the request payload
payload = {
    "ragname": "theosTestClass",
    "query": "What is AI?",
    "prior_queries": '[{"question": "What is machine learning?"}, {"question": "How does deep learning work?"}]'
}

# Send the request
try:
    response = requests.post(url, json=payload)

    # Check for successful response
    if response.status_code == 200:
        print("Response:", response.json())
    else:
        print("Error:", response.status_code, response.text)
except requests.RequestException as e:
    print("Request failed:", e)
