import cv2

from block_detector import detect_tokens
from symbol_detector import SymbolClassifier
from number_segmenter import detect_numbers

class TokenGenerator:

    def __init__(self, image) -> None:
        self.symbol_classifier = SymbolClassifier()
        self.image = image
        self.tokens = []
        self.curr_operator = None

    def create_tokens(self):
        self.patches, self.line_numbers = detect_tokens(self.image)

        for i in range(0, len(self.patches)):
            patch = self.patches[i]
            line_number = self.line_numbers[i]

            if i != 0 and line_number == self.line_numbers[i-1]: # we are dealing with an operand here
                token = self.detect_operand(patch)
            else: # we are dealing with an operator
                token = self.detect_operator(patch)
                self.curr_operator = token
            
            self.tokens.append(token)
    
    def detect_operator(self, patch):
        token = self.symbol_classifier.classify(patch)
        return token

    def detect_operand(self, patch):
        # token = self.number_detector.classify(patch)
        # return token
        number_string = detect_numbers(patch)
        if self.curr_operator.find("ROTATE") != -1 : # The operator is based on angle, so the number must be an angle
            number_string = f"ROTATE|{number_string}"
        else:
            number_string = f"TIMES|{number_string}"
        return number_string 

    def get_tokens(self):
        return self.tokens


if __name__ == "__main__":
    image = cv2.imread("./test/test3.jpeg")
    token_generator = TokenGenerator(image)
    token_generator.create_tokens()
    print(token_generator.get_tokens())
