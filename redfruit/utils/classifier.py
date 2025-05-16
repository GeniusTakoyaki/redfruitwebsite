# redfruit/utils/classifier.py

#import os
from PIL import Image
import torchvision.transforms as transforms
import torch
from redfruit.utils.neural_network import NeuralNetwork

# from sympy import false



def transparency_remove(img):
    if img.mode == "RGBA":
        white_bg = Image.new("RGB", img.size, (255, 255, 255))
        white_bg.paste(img, mask=img.split()[3])  # Use alpha as mask
        return white_bg
    return img.convert("RGB")



model = NeuralNetwork()
model.load_state_dict(torch.load("redfruit/utils/Redfruit-Lightweight-NonNormalize-params.pth", map_location='cpu'))

transform = transforms.Compose([
    transforms.Resize((128,128)),
    transforms.Grayscale(num_output_channels=1),
    transforms.ToTensor()
])

mapping = {0: 'Tomatoes', 1: 'Apples', 2: 'Unknown'}


def classify_image(file):
    """
    Classifies an image using the pre-trained PyTorch model.
    Args:
        file (file): the uploaded image file.
    Returns:
        dict: Classification results (e.g., predicted class, confidence scores).
    """
    try:
        print(f"Processing file: {file}")  # Debugging statement

        # Open and preprocess the image
        image = Image.open(file)
        print("Image opened successfully.")  # Debugging statement
        image = transparency_remove(image)

        image_tensor = transform(image).unsqueeze(0)  # Add batch dimension
        print("Image preprocessed successfully.")  # Debugging statement

        # Predict using the model
        with torch.no_grad():  # Disable gradient computation
            model.eval()
            outputs = model(image_tensor)
            probs = torch.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probs, 1)  # Get predicted class and confidence
            simplified_confidence = round(confidence.item() * 100, 3)
            print(confidence)


        print(f"Prediction: {predicted.item()}, Confidence: {simplified_confidence}")  # Debugging statement

        # Return results as a dictionary
        return {
            'status': 'success',
            'filename': file.name,  # Include the file name
            'filesize': file.size,  # Include the file size (in bytes)
            'content_type': file.content_type,  # Include the MIME type (e.g., image/jpeg)
            'prediction': mapping[predicted.item()],
            'confidence': simplified_confidence,
        }
    except Exception as e:
        print(f"Error during classification: {str(e)}")  # Debugging statement
        return {'status': 'error', 'message': str(e)}