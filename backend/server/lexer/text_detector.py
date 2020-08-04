import cv2
import imutils
import numpy as np
from re import search
# import pytesseract
import os
import re
import requests
from .block_detector import detect_tokens
from django.conf import settings

def TokenGenerator(image):
	blocks = []
	lineNo = []
	tokens = {
        "START":"START",
        "END":"END_REPEAT",
        "REPEAT":"REPEAT",
        "LEFT":"LEFT",
        "RIGHT":"RIGHT",
        "FORWARD":"FRONT",
        "BACKWARD":"BACK",
        "ROTATE":"ROTATE",
        "TIMES":"TIMES",
        "ANTI":"ROTATE_ANTICLOCKWISE",
        "CLOCKWISE":"ROTATE_CLOCKWISE",
        "d01S":"STOP",
        "dOLS":"STOP",
        "d0LS":"STOP",
        "STOP":"STOP",
        "IF":"IF",
        "ELSE":"ELSE",
        "002":"TIMES|002",
        "zoo":"TIMES|002"
    }
	sequence = {}
	
	blocks,lines = detect_tokens(image)
	for line in lines:
		sequence[line-1]=[]
	#print("test")
	for img,lineNO in zip(blocks,lines):
		
		subscription_key = '047bcc1b65e347f3833df48eb4f61b0b'


		endpoint = 'https://coodle-card-text-detector.cognitiveservices.azure.com/'

		ocr_url = endpoint + "vision/v3.0/ocr"

		headers = {'Ocp-Apim-Subscription-Key': subscription_key,
				'Content-Type': 'application/octet-stream'
				}
		params = {'language': 'unk', 'detectOrientation': 'true'}

		filename = "{}.png".format(os.getpid())
		cv2.imwrite(filename, img)
		with open(os.path.join(settings.BASE_DIR, filename), 'rb') as f:
			data = f.read()
		response = requests.post(url=ocr_url,
							data=data,
							headers=headers,
							params=params)
		os.remove(filename)
		response.raise_for_status()

		analysis = response.json()
		#print(analysis)
		# Extract the word bounding boxes and text.
		line_infos = [region["lines"] for region in analysis["regions"]]
		word_infos = []
		for line in line_infos:
			for word_metadata in line:
				for word_info in word_metadata["words"]:
					word_infos.append(word_info)
		#print(word_infos)
		text=''
		for word in word_infos:
			text=text+word['text']
		text=text.replace(" ", "")
		text=text.replace("\n", "")
		text=text.replace("\t", "")
		#print(text)
		unidentified = 0
		for token in tokens:
			if search(token, text):
				if token == "TIMES" or token == "ROTATE":
					num = re.sub("\D", "", text) 
					sequence[lineNO-1].append(tokens[token]+"|"+num)
				else:
					sequence[lineNO-1].append(tokens[token])
				unidentified = 1
				break
		if unidentified == 0:
			sequence[lineNO-1].append("UNKNOWN")

	n = len(list(sequence.keys()))
	if sequence[n - 1] == ['UNKNOWN']:
		sequence[list(sequence.keys())[n-1]] = ['STOP']

	return sequence

# test
#image = cv2.imread("./test/test.jpg")
#sequence = TokenGenerator(image)
#print(sequence)
