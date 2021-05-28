import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
os.environ["CUDA_VISIBLE_DEVICES"] = "-1" # Disable GPU while testing

import tensorflow as tf
from PIL import Image, ImageOps

import numpy as np
np.set_printoptions(suppress=True) # Disable scientific notation for clarity

class SymbolClassifier:
    
    def __init__(self):
        
        self.model = tf.keras.models.load_model('keras_model.h5')
        self.classes = ["FRONT", "BACK", "START", "STOP", "IF", "ELSE", "ROTATE_CW", "ROTATE_ACW", "REPEAT", "END_REPEAT"]
        self.image_size = (224, 224) # Set the image size


    def classify(self, image):
        
        # Create the array of the right shape. resize image, then store in np array
        data = np.ndarray(shape=(1, self.image_size[0], self.image_size[1], 3), dtype=np.float32)
        image = Image.fromarray(image) # Create image from numpy array
        image = ImageOps.fit(image, self.image_size, Image.ANTIALIAS)
        image_array = np.asarray(image)
        # image.show()
        normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
        data[0] = normalized_image_array

        # Run the model on the image, get the prediction, and the index
        prediction = self.model.predict(data)[0].tolist()
        # print(prediction)
        index = prediction.index(max(prediction))
        print("Predicted: ", self.classes[index])
        return self.classes[index]

if __name__ == "__main__":
    classifier = SymbolClassifier()
    img = Image.open('test.jpeg')

    classifier.classify(img)


# print(prediction)