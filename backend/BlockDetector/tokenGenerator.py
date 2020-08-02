import cv2
import imutils
import numpy as np
from re import search
from PIL import Image
import pytesseract
import os
import re


def scale_contour(contour, scale):
	
	M = cv2.moments(contour)
	cx = int(M['m10']/M['m00'])
	cy = int(M['m01']/M['m00'])

	cx_scaled = int(M['m10']/M['m00'])*scale
	cy_scaled = int(M['m01']/M['m00'])*scale

	cnt_norm = contour - [cx, cy]
	cnt_scaled = cnt_norm * scale
	cnt_scaled = cnt_scaled + [cx_scaled, cy_scaled]
	cnt_scaled = cnt_scaled.astype(np.int32)

	return cnt_scaled, cy_scaled

def preprocess(path_to_image):
	
	# load image and resize to smaller factor for better shape approximation
	image = cv2.imread(path_to_image)
	resized = imutils.resize(image, width=300)
	ratio = image.shape[0] / float(resized.shape[0])
	
	# convert the resized image to grayscale, blur slightly and threshold it
	gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
	blurred = cv2.medianBlur(gray,5)
	
	# sharpen image to enhance edges
	kernel = np.array((
	[0, -1, 0],
	[-1, 5, -1],
	[0, -1, 0]), dtype="int")
	sharpened = cv2.filter2D(blurred, -1, kernel)
	
	return sharpened, image, ratio

def contour_detection(preprocessed_image, src_image, ratio):

	output_patches = []
	centroids = []
	heights = [] # h/2

	edged = cv2.Canny(preprocessed_image, 30, 200)
	contours, hierarchy = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE) 

	token_number = 0

	for contour in reversed(contours):
		if len(contour) >= 4:
			if cv2.contourArea(contour) > 300:
				token_number += 1

				cnt_scaled, cy_scaled = scale_contour(contour, ratio)

				x, y, w, h = cv2.boundingRect(cnt_scaled)
				roi = src_image[y:y+h, x:x+w]
				#cv2.imshow('patch'+ str(token_number), roi)
				#cv2.waitKey(0)
				#cv2.destroyAllWindows()
				
				output_patches.append(roi)
				centroids.append(cy_scaled)
				heights.append(h/2)
				#y_coordinates.append(cy_scaled)

				#if token_number == 1:
					#continue
				#else: # need optimisation(low priority)
					#for y_coordinate in y_coordinates[:token number -1]:
						#height_difference = abs(y_coordinate - y_coordinates[token_number-1])
						#if height_difference < :

				#draw_contour = cv2.drawContours(src_image, [cnt_scaled], -1, (255, 140, 240), 2)
				#cv2.imshow('Contours', draw_contour) 
				#cv2.waitKey(0) 
				#cv2.destroyAllWindows()

	# print(len(output_patches))

	return output_patches, centroids, heights 

def get_line_numbers(centroids, heights):

	line_number = [1] # initialise line no of first token
	
	for i in range(1, len(centroids)):
		if abs(centroids[i] - centroids[i-1]) <  abs(heights[i] + heights[i-1]):  # heights already in h/2 
			line_number.append(line_number[len(line_number)-1])
		else:
			line_number.append(line_number[len(line_number)-1] + 1)

	return line_number


def detect_tokens(path_to_image): # wrapper function

	'''output : output_patches = list of cropped token images
				line_number    = list of line numbers where each token appears

			use the index of list for the sequential token numbers
	'''

	preprocessed_img, img, ratio = preprocess(path_to_image)
	output_patches, centroids, heights =  contour_detection(preprocessed_img, img, ratio)
	line_number = get_line_numbers(centroids, heights)

	return output_patches, line_number


def TokenGenerator(img_path):
	blocks = []
	lineNo = []
	tokens = {
		"START":"START",
		"END":"ENDREPEAT",
		"REPEAT":"REPEAT",
		"LEFT":"LEFT",
		"RIGHT":"RIGHT",
		"FORWARD":"FORWARD",
		"BACKWARD":"BACKWARD",
		"ROTATE":"ROTATE",
		"TIMES":"TIMES",
		"ANTI":"ANTICLOCKWISE",
		"CLOCKWISE":"CLOCKWISE",
		"STOP":"STOP",
		"OS":"IF",
		"ELSE":"ELSE"
	}
	sequence = {}
	
	blocks,lineNo = detect_tokens(img_path)
	for line in lineNo:
		sequence[line]=[]
	print("test")
	for img,line in zip(blocks,lineNo):
		# load the example image and convert it to grayscale
		gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
		
		#cv2.imshow("Image", gray)
		# check to see if we should apply thresholding to preprocess the
		# image
		
		gray1 = cv2.threshold(gray, 0, 255,
			cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]

		# make a check to see if median blurring should be done to remove
		# noise
		
		gray2 = cv2.medianBlur(gray, 3)

		# write the grayscale image to disk as a temporary file so we can
		# apply OCR to it
		filename1 = "{}.png".format(os.getpid())
		
		cv2.imwrite(filename1, gray1)

		filename2 = "{}.png".format(os.getpid()+1)
		cv2.imwrite(filename2, gray2)
		# load the image as a PIL/Pillow image, apply OCR, and then delete
		# the temporary file
		#custom_config = r'--oem 2 --psm 12'
		texts =['','','']
		texts[2] = pytesseract.image_to_string((img))
		texts[1] = pytesseract.image_to_string(Image.open(filename1))
		texts[0] = pytesseract.image_to_string(Image.open(filename2))
		print(texts[1]+texts[0])
		os.remove(filename1)
		os.remove(filename2)
		unidentified = 0
		for text in texts:
			text=text.replace(" ", "")
			text=text.replace("\n", "")
			text=text.replace("\t", "")
			for token in tokens:
				if search(token, text):
					if token == "TIMES" or token == "ROTATE":
						num = re.sub("\D", "", text) 
						sequence[line].append(tokens[token]+"|"+num)
					else:
						sequence[line].append(tokens[token])
						
					unidentified = 1
					break
			if unidentified == 1:
				break
		if unidentified == 0:
			sequence[line].append("UNKNOWN")
	return sequence

sequence = TokenGenerator("print3.jpg")

print(sequence)





