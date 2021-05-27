import cv2
import imutils
import numpy as np
from re import search
from PIL import Image
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
    resized = imutils.resize(image, width=500)
    resized = image
    ratio = image.shape[0] / float(resized.shape[0])
    
    # convert the resized image to grayscale, blur slightly and threshold it
    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
    (thresh, blackAndWhiteImage) = cv2.threshold(gray, 220, 255, cv2.THRESH_BINARY)

    blurred = cv2.medianBlur(blackAndWhiteImage,5)
    
    # # sharpen image to enhance edges
    kernel = np.array((
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]), dtype="int")
    sharpened = cv2.filter2D(blurred, -1, kernel)
    
    return sharpened, image, 1.0

def contour_detection(preprocessed_image, src_image, ratio):

    output_patches = []
    centroids = []
    heights = [] # h/2

    edged = cv2.Canny(preprocessed_image, 130, 225, 2)
    contours, hierarchy = cv2.findContours(edged, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE) 

    for i in range(len(contours)-1, -1, -1):
        x1, y1, w1, h1 = cv2.boundingRect(contours[i])
        if cv2.contourArea(contours[i]) < 10000 or abs(w1-h1) > 100:
            contours.pop(i)
            continue

    for i in range(len(contours)-1, -1, -1):
        x1, y1, w1, h1 = cv2.boundingRect(contours[i])

        for j in range(i-1, -1, -1):
            x2, y2, w2, h2 = cv2.boundingRect(contours[j])
            if compare(x1, y1, w1, h1, x2, y2, w2, h2):
                print("duplicate removed")
                contours.pop(i)
                break

    print("Length of contours", len(contours))

    # for c in contours:
    #     cv2.drawContours( src_image,[c], 0, (255,255,0), 1)

    # cv2.imshow("result", src_image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    
    token_number = 0
    print(len(contours))

    cnt_rects = [(cv2.boundingRect(cnt), cnt) for cnt in contours]
    cnt_rects = sort_contours(cnt_rects)

    for cnt_rect in cnt_rects:

        rect, contour = cnt_rect
        print(rect)
        # if len(contour) >= 1:
        if cv2.contourArea(contour) > 10000:

            cnt_scaled, cy_scaled = scale_contour(contour, ratio)
            x, y, w, h = cv2.boundingRect(cnt_scaled)
            print(w,h)
            if abs(w-h) <= 100:
                token_number += 1

                cnt_scaled, cy_scaled = scale_contour(contour, ratio)

                x, y, w, h = cv2.boundingRect(cnt_scaled)
                roi = src_image[y:y+h, x:x+w]
                print(cv2.contourArea(contour))
                # cv2.imshow('patch'+ str(token_number), roi)
                # cv2.waitKey(0)
                # cv2.destroyAllWindows()
                
                output_patches.append(roi)
                centroids.append(cy_scaled)
                heights.append(h/2)

    return output_patches, centroids, heights 


def detect_tokens(path_to_image): # wrapper function

    preprocessed_img, img, ratio = preprocess(path_to_image)
    output_patches, centroids, heights =  contour_detection(preprocessed_img, img, ratio)
    # line_number = get_line_numbers(centroids, heights)

    return output_patches


def compare(x1, y1, w1, h1, x2, y2, w2, h2):
    """
    Compare if two contours denote the same area
    """
    if abs(x1-x2) < 50 and abs(y1-y2) < 50 and abs(w1-w2) < 50 and abs(h1-h2) < 50:
        return True
    return False

def sort_contours(cnt_rects):
    sort_vertically = sorted(cnt_rects,key=lambda  x:x[0][1])
    sort_horizontally = list()
    for i in range(6):
        sort_horizontally.extend(sorted(sort_vertically[4*i: 4*i + 4], key= lambda x: x[0][0]))
    return sort_horizontally


# output_patches = detect_tokens('test.jpeg')
# print(output_patches, len(output_patches))


# Try later -- fix the approximate size of the bounding boxes based on the file size ( or the number of pixels in the file )
