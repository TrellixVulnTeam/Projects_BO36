import cv2
import numpy as np
from keras.utils import Sequence


class ImageGenerator(Sequence):
    def __init__(self, filenames, labels, batch_size):
        self.filenames = filenames
        self.labels = labels
        self.batch_size = batch_size

    def __len__(self):
        return int(np.ceil(len(self.filenames) / float(self.batch_size)))

    def __getitem__(self, idx):
        x = self.filenames[idx * self.batch_size:(idx + 1) * self.batch_size]
        y = self.labels[idx * self.batch_size:(idx + 1) * self.batch_size]
        return np.array([cv2.resize(cv2.imread('data/images/{}'.format(name)), (1024, 1024)) for name in x]), np.array(y)
