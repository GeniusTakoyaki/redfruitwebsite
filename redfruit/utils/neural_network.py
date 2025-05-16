import torch.nn as nn
import torch.nn.functional as F



class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()

        # Convolutional Layers with Batch Normalization
        self.conv1 = nn.Conv2d(1, 48, (3, 3), stride=2, padding=2)
        self.bn1 = nn.BatchNorm2d(48)
        self.conv2 = nn.Conv2d(48, 128, (4, 4), stride=1, padding=2)
        self.bn2 = nn.BatchNorm2d(128)
        self.conv3 = nn.Conv2d(128, 48, (4, 4), stride=1, padding=2)
        self.bn3 = nn.BatchNorm2d(48)

        # Additional Convolutional Layers
        self.conv4 = nn.Conv2d(48, 16, (3, 3), stride=1, padding=1)
        self.bn4 = nn.BatchNorm2d(16)

        # Max Pooling Layer
        self.maxpool2 = nn.MaxPool2d((2, 2))

        # Fully Connected Layers with Batch Normalization
        # Updated input size based on output after pooling: 16 * 33 * 33 self.fcl1 = nn.Linear(16 * 33 * 33, 64)  if image size is 128x128
        self.fcl1 = nn.Linear(16 * 33 * 33, 64)  # Corrected input size for size 64x64 is 16 * 17 * 17
        self.bn7 = nn.BatchNorm1d(64)

        # Output layer for classification (3 classes)
        self.fcl2 = nn.Linear(64, 3)

    def forward(self, x):
        # Convolutional Layers with ReLU and Batch Normalization
        x = F.relu(self.bn1(self.conv1(x)))
        x = F.relu(self.bn2(self.conv2(x)))
        x = F.relu(self.bn3(self.conv3(x)))

        # Additional Convolutional Layers with ReLU and Batch Normalization
        x = F.relu(self.bn4(self.conv4(x)))

        # Max Pooling
        x = self.maxpool2(x)

        # Flatten the tensor for fully connected layers
        x = x.view(x.size(0), -1)

        # Fully Connected Layers with ReLU and Batch Normalization
        x = F.relu(self.bn7(self.fcl1(x)))

        # Output Layer (classification)
        x = self.fcl2(x)

        return x