import cv2
import base64
import numpy as np
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .text_detector import TokenGenerator


@api_view(['GET', 'POST'])
def lexer(request):
    """
    Given an image, return the sequence of tokens detected
    """
    encoded_image = request.data['data'].split(',')[1] # Get the base 64 data

    # Decode the image
    nparr = np.frombuffer(base64.b64decode(encoded_image), np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    token_sequence = TokenGenerator(image)

    return Response(token_sequence)
