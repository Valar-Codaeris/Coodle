import cv2
import imutils
import numpy as np
import random
from PIL import Image

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

def preprocess(image):
	
	# resize to smaller factor for better shape approximation
	resized = imutils.resize(image, width=100)
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
	
	return sharpened, ratio

def contour_detection(preprocessed_image, src_image, ratio):

	output_patches = []
	centroids = []
	heights = [] # h/2

	edged = cv2.Canny(preprocessed_image, 30, 200)
	contours, _ = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE) 

	for c in contours:
		cv2.drawContours( preprocessed_image,[c], 0, (255,0,0), 1)

	# cv2.imshow("result", preprocessed_image)
	# cv2.waitKey(0)
	# cv2.destroyAllWindows()

	cnt_rects = []

	for contour in reversed(contours):
		print(cv2.contourArea(contour))
		if cv2.contourArea(contour) > 100 and cv2.contourArea(contour) < 1000:
			cnt_rects.append((cv2.boundingRect(contour), contour))

	# Sort all the lines vertically first
	sort_hor = sorted(cnt_rects,key=lambda  x:x[0][0]) # sort the contours using x co-ordinate

	output_patches = []
	# Get the output image patch for each block
	for patch in sort_hor:
		cnt_rect, contour = patch
		cnt_scaled, cy_scaled = scale_contour(contour, ratio)
		x, y, w, h = cv2.boundingRect(cnt_scaled)
		img = src_image[y:y+h, x:x+w]
		output_patches.append(img)
		cv2.imshow('patch'+ str(random.randint(0, 100)), img)
		cv2.waitKey(0)
		cv2.destroyAllWindows()

	return output_patches

def detect_numbers(image): # wrapper function

	'''output : output_patches = list of cropped token images
				line_number    = list of line numbers where each token appears

			use the index of list for the sequential token numbers
	'''

	# image = Image.fromarray(image)
	preprocessed_img, ratio = preprocess(image)
	output_patches =  contour_detection(preprocessed_img, image, ratio)


	"""
	ML Code here
	"""


	return "1"

def classify_numbers(image_patch):
	pass