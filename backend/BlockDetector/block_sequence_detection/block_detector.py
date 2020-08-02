import cv2
import imutils
import numpy as np


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
	y_coordinates = []

	edged = cv2.Canny(preprocessed_image, 30, 200)
	contours, hierarchy = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE) 

	token_number = 0

	for contour in reversed(contours):
		if len(contour) >= 4:
			if cv2.contourArea(contour) > 200:
				token_number += 1

				cnt_scaled, cy_scaled = scale_contour(contour, ratio)

				x, y, w, h = cv2.boundingRect(cnt_scaled)
				roi = src_image[y:y+h, x:x+w]
				cv2.imshow('patch'+ str(token_number), roi)
				cv2.waitKey(0)
				cv2.destroyAllWindows()
				#output_patches.append(roi)
				#y_coordinates.append(cy_scaled)

				#if token_number == 1:
					#continue
				#else: # need optimisation(low priority)
					#for y_coordinate in y_coordinates[:token number -1]:
						#height_difference = abs(y_coordinate - y_coordinates[token_number-1])
						#if height_difference < :

				draw_contour = cv2.drawContours(src_image, [cnt_scaled], -1, (255, 140, 240), 2)
				cv2.imshow('Contours', draw_contour) 
				cv2.waitKey(0) 
				cv2.destroyAllWindows()

	return output_patches, y_coordinates

# test
image_path = './test/newt_1.jpeg'
preprocessed_img, img, ratio = preprocess(image_path)
contour_detection(preprocessed_img, img, ratio)
