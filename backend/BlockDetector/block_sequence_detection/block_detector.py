import cv2
import imutils
import numpy as np

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
	
	return sharpened, resized, ratio

def contour_detection(preprocessed_image, resized_image):

	output_patches = []

	edged = cv2.Canny(preprocessed_image, 30, 200)
	contours, hierarchy = cv2.findContours(preprocessed_image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE) 

	for contour in contours:
		if len(contour) >= 4:
			if cv2.contourArea(contour) > 200:
				index += 1
				draw_contour = cv2.drawContours(resized_image, [contour], -1, (255, 140, 240), 2)
				cv2.imshow('Contours', draw_contour) 
				cv2.waitKey(0) 
				cv2.destroyAllWindows()

				x, y, w, h = cv2.boundingRect(contour)
				#x,y,w,h = rescale((x,y,w,h), ratio)
				roi = resized_image[y:y+h, x:x+w]
				# print(roi)
				cv2.imshow('patch'+ str(index), roi)
				cv2.waitKey(0)
				cv2.destroyAllWindows()
				output_patches.append(roi)

    return output_patches

#test
#image_path = ('./test/newt_1.jpeg'
#preprocessed_img, img, _ = preprocess(image_path)
#contour_detection(preprocessed_imgm img)
