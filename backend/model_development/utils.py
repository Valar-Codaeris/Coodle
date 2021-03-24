import cv2
import os 
import string
from pathlib import Path
import random
class Dataset:
    """
    class to store and categorize different symbols in the photo
    """



    def __init__(self, photos):
        self.letters = string.ascii_lowercase
        self.set_1 = photos[:12]
        self.set_2 = photos[12:]
        self.classes = {
        "FORWARD": [],
        "RIGHT": [],
        "LEFT": [],
        "BACK": [],
        "ROTATE_CW": [],
        "ROTATE_ACW": [],
        "LOOP": [],
        "IF": [],
        "ELSE": [],
        "END": [],
        "START": [],
        "END_LOOP": []
    }

        self.categorize()
        for key in self.classes:
            self.save_class(key)

    def categorize(self):
        """
        Categorize the photos into different classes
        """

        self.classes["RIGHT"].append(self.set_1[0])
        self.classes["LEFT"].append(self.set_1[1])
        self.classes["FORWARD"].append(self.set_1[2])
        self.classes["BACK"].append(self.set_1[3])
        self.classes["START"].append(self.set_1[4])
        self.classes["END"].append(self.set_1[5])
        self.classes["ROTATE_CW"].append(self.set_1[6])
        self.classes["ROTATE_ACW"].append(self.set_1[7])
        self.classes["ELSE"].append(self.set_1[8])
        self.classes["IF"].append(self.set_1[9])
        self.classes["LOOP"].append(self.set_1[10])
        self.classes["END_LOOP"].append(self.set_1[11])


        self.classes["RIGHT"].append(self.set_2[0])
        self.classes["LEFT"].append(self.set_2[1])
        self.classes["FORWARD"].append(self.set_2[2])
        self.classes["BACK"].append(self.set_2[3])
        self.classes["START"].append(self.set_2[4])
        self.classes["END"].append(self.set_2[5])
        self.classes["ROTATE_CW"].append(self.set_2[6])
        self.classes["ROTATE_ACW"].append(self.set_2[7])
        self.classes["ELSE"].append(self.set_2[8])
        self.classes["IF"].append(self.set_2[9])
        self.classes["LOOP"].append(self.set_2[10])
        self.classes["END_LOOP"].append(self.set_2[11])

    def save_class(self,class_name):
        """
        Save the photos of a class in hard disk
        """ 
        for photo in self.classes[class_name]:
            self.save_to_folder(class_name,photo)

    def save_to_folder(self,folder_path,img):
        """
        Save an image to a folder, and give it an unique name
        """
        file_name = ''.join(random.choice(self.letters) for i in range(10)) + '.jpeg'
        try:
            os.mkdir('dataset/'+folder_path)
        except:
            print("")
        cv2.imwrite(f'dataset/{folder_path}/{file_name}',img)
        print(f"Saved file {file_name}")
