# redfruit/utils/classifier.py

import os
from PIL import Image
import torchvision.transforms as transforms
import torch
import torch.nn as nn
import torch.nn.functional as F


class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()

        # Convolutional Layers with Batch Normalization
        self.conv1 = nn.Conv2d(3, 48, (3, 3), stride=2, padding=2)
        self.bn1 = nn.BatchNorm2d(48)  # Batch Normalization for conv1
        self.conv2 = nn.Conv2d(48, 128, (4, 4), stride=1, padding=2)
        self.bn2 = nn.BatchNorm2d(128)  # Batch Normalization for conv2
        self.conv3 = nn.Conv2d(128, 48, (4, 4), stride=1, padding=2)
        self.bn3 = nn.BatchNorm2d(48)  # Batch Normalization for conv3

        # Additional Convolutional Layers
        self.conv4 = nn.Conv2d(48, 64, (3, 3), stride=1, padding=1)
        self.bn4 = nn.BatchNorm2d(64)  # Batch Normalization for conv4
        self.conv5 = nn.Conv2d(64, 32, (3, 3), stride=1, padding=1)
        self.bn5 = nn.BatchNorm2d(32)  # Batch Normalization for conv5
        self.conv6 = nn.Conv2d(32, 16, (3, 3), stride=1, padding=1)
        self.bn6 = nn.BatchNorm2d(16)  # Batch Normalization for conv6

        # Max Pooling Layer
        self.maxpool2 = nn.MaxPool2d((2, 2))

        # Fully Connected Layers with Batch Normalization
        self.fcl1 = nn.Linear(16 * 57 * 57, 128)  # Corrected input size
        self.bn7 = nn.BatchNorm1d(128)  # Batch Normalization for fcl1
        self.fcl2 = nn.Linear(128, 64)
        self.bn8 = nn.BatchNorm1d(64)  # Batch Normalization for fcl2
        self.fcl3 = nn.Linear(64, 32)
        self.bn9 = nn.BatchNorm1d(32)  # Batch Normalization for fcl3
        self.fcl4 = nn.Linear(32, 3)  # Output layer

    def forward(self, x):
        # Convolutional Layers with ReLU and Batch Normalization
        x = F.relu(self.bn1(self.conv1(x)))  # Output: (48, 113, 113)
        x = F.relu(self.bn2(self.conv2(x)))  # Output: (128, 114, 114)
        x = F.relu(self.bn3(self.conv3(x)))  # Output: (48, 115, 115)

        # Additional Convolutional Layers with ReLU and Batch Normalization
        x = F.relu(self.bn4(self.conv4(x)))  # Output: (64, 115, 115)
        x = F.relu(self.bn5(self.conv5(x)))  # Output: (32, 115, 115)
        x = F.relu(self.bn6(self.conv6(x)))  # Output: (16, 115, 115)

        # Max Pooling
        x = self.maxpool2(x)  # Output: (16, 57, 57)

        # Flatten the tensor for fully connected layers
        x = x.view(-1, 16 * 57 * 57)  # Flattened size: 16 * 57 * 57 = 51984

        # Fully Connected Layers with ReLU and Batch Normalization
        x = F.relu(self.bn7(self.fcl1(x)))
        x = F.relu(self.bn8(self.fcl2(x)))
        x = F.relu(self.bn9(self.fcl3(x)))

        # Output Layer
        x = self.fcl4(x)
        return F.softmax(x, dim=1)



model_path = 'redfruit/utils/Redfruit-BatchNormalization-params.pth'
model = NeuralNetwork()
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu'), weights_only=True))  # Load model weights
model.eval()  # Set the model to evaluation mode

transform = transforms.Compose([
    transforms.Resize((224,224)),
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

        image_tensor = transform(image).unsqueeze(0)  # Add batch dimension
        print("Image preprocessed successfully.")  # Debugging statement

        # Predict using the model
        with torch.no_grad():  # Disable gradient computation
            outputs = model(image_tensor)
            probabilities = torch.softmax(outputs, dim=1)  # Apply softmax to get probabilities
            confidence, predicted = torch.max(probabilities, 1)  # Get predicted class and confidence

        print(f"Prediction: {predicted.item()}, Confidence: {confidence.item()}")  # Debugging statement

        # Return results as a dictionary
        return {
            'status': 'success',
            'filename': file.name,  # Include the file name
            'filesize': file.size,  # Include the file size (in bytes)
            'content_type': file.content_type,  # Include the MIME type (e.g., image/jpeg)
            'prediction': mapping[predicted.item()],
            'confidence': confidence.item(),
        }
    except Exception as e:
        print(f"Error during classification: {str(e)}")  # Debugging statement
        return {'status': 'error', 'message': str(e)}