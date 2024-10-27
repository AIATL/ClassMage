import os
from dotenv import load_dotenv
import json

load_dotenv()


json_account_info = json.loads(os.environ.get("GOOGLE_CLOUD_JSON"))  # convert JSON to dictionary
with open('data.json', 'w') as f:
    json.dump(json_account_info, f)