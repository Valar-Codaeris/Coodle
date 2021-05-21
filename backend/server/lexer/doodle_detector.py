from .block_detector import detect_tokens
from .symbol_detector import SymbolDetector


class TokenGenerator:

    def __init__(self, image) -> None:
        self.symbol_detector = SymbolDetector()
        self.image = image
        self.tokens = []

    def create_tokens(self):
        self.patches, self.line_numbers = detect_tokens(self.image)

        for i in range(0, len(self.tokens)):
            patch = self.patches[i]
            line_number = self.line_numbers[i]

            if i != 0 and line_number == self.line_numbers[i-1]: # we are dealing with an operand here
                token = self.detect_operand(patch)
            else: # we are dealing with an operator
                token = self.detect_operator(patch)
            
            self.tokens.append(token)
    
    def detect_operator(self, patch):
        token = self.symbol_detector.classify(patch)
        return token

    def detect_operand(self, patch):
        # token = self.number_detector.classify(patch)
        # return token
        return "1|TIMES"

    def get_tokens(self):
        return self.tokens