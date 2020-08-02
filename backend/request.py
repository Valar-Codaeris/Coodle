import os
import sys
import requests
# If you are using a Jupyter notebook, uncomment the following line.
# %matplotlib inline
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
from PIL import Image
from io import BytesIO

subscription_key = '047bcc1b65e347f3833df48eb4f61b0b'


endpoint = 'https://coodle-card-text-detector.cognitiveservices.azure.com/'

ocr_url = endpoint + "vision/v3.0/ocr"

headers = {'Ocp-Apim-Subscription-Key': subscription_key,
           'Content-Type': 'application/octet-stream'
           }
params = {'language': 'unk', 'detectOrientation': 'true'}

with open('./five.jpg', 'rb') as f:
    data = f.read()
response = requests.post(url=ocr_url,
                    data=data,
                    headers=headers,
                    params=params)

response.raise_for_status()

analysis = response.json()
print(analysis)
# Extract the word bounding boxes and text.
line_infos = [region["lines"] for region in analysis["regions"]]
word_infos = []
for line in line_infos:
    for word_metadata in line:
        for word_info in word_metadata["words"]:
            word_infos.append(word_info)
word_infos
print(word_infos)
