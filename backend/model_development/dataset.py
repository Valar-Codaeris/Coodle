from crop import detect_tokens
from utils import Dataset


if __name__ == "__main__":
    output_patches = detect_tokens("test5.jpeg")
    Dataset(output_patches)
