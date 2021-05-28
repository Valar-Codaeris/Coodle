import cv2
import imutils
import numpy as np
import random

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
	
	return sharpened, ratio

def contour_detection(preprocessed_image, src_image, ratio):

	output_patches = []
	centroids = []
	heights = [] # h/2

	edged = cv2.Canny(preprocessed_image, 30, 200)
	contours, _ = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE) 

	cnt_rects = []

	for contour in reversed(contours):
		if len(contour) >= 4:
			if cv2.contourArea(contour) > 300:
				cnt_rects.append((cv2.boundingRect(contour), contour))

	# Sort all the lines vertically first
	sort_vert = sorted(cnt_rects,key=lambda  x:x[0][1]) # sort the contours using y co ordinate
	# print(len(sort_vert))
	lines = [[]]
	lines[0].append(sort_vert[0])

	# Separate the blocks into their separate lines
	for i in range(1, len(sort_vert)):
		if abs(sort_vert[i][0][1] - sort_vert[i-1][0][1]) > abs(sort_vert[i][0][3]/2 + sort_vert[i-1][0][3]/2):
			lines.append([])
		lines[len(lines)-1].append(sort_vert[i])
	
	# Sort the blocks in each line horizontally
	for i in range(0, len(lines)):
		lines[i] = sorted(lines[i], key=lambda x:x[0][0])

	output_patches = []
	# Get the output image patch for each block
	for line in lines:
		for block in line:
			cnt_rect, contour = block
			cnt_scaled, cy_scaled = scale_contour(contour, ratio)
			x, y, w, h = cv2.boundingRect(cnt_scaled)
			img = src_image[y:y+h, x:x+w]
			output_patches.append(img)
			# cv2.imshow('patch'+ str(random.randint(0, 100)), img)
			# cv2.waitKey(0)
			# cv2.destroyAllWindows()

	return output_patches, lines

def detect_tokens(image): # wrapper function

	'''output : output_patches = list of cropped token images
				line_number    = list of line numbers where each token appears

			use the index of list for the sequential token numbers
	'''

	preprocessed_img, ratio = preprocess(image)
	output_patches, lines =  contour_detection(preprocessed_img, image, ratio)
	line_numbers = [line_no for line_no in range(0, len(lines)) for i in range(0, len(lines[line_no])) ]

	return output_patches, line_numbers


# test
if __name__ == "__main__":
	image_path = './test/test3.jpeg'
	image = cv2.imread(image_path)
	output_patches, line_number = detect_tokens(image)
	print(line_number)