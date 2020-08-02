from rest_framework.decorators import api_view
from rest_framework.response import Response
import base64


@api_view(['GET', 'POST'])
def lexer(request):
    """
    Given an image, return the sequence of tokens detected
    """
    imageString = request.data['data'].split(',')[1] # Get the base 64 data

    # Binary image data, to be used in the ML pipeline
    imageData = base64.b64decode(imageString)
    # with open('image', 'wb') as f:
    #     f.write(imageData)

    return Response({'tokens': [[{
        'type': 'START',
        'line': 0
    }], [], [{
        'type': 'STOP',
        'line': 0
    }]]})
