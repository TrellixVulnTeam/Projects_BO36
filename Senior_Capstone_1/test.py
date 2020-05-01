import sys

import cv2
import numpy as np
import pandas as pd
from keras.models import model_from_json
from sklearn.preprocessing import LabelEncoder

from generator import ImageGenerator

def load_model(path):
    with open(path, 'r') as f:
        model = model_from_json(f.read())
        model.load_weights(path.replace('json', 'h5'))
        return model

def load_image(path):
    return cv2.resize(cv2.imread('data/images/{}'.format(path)), (1024, 1024)).reshape(1, 1024, 1024, 3).astype('float32') / 255

if __name__ == '__main__':
    labels = pd.read_csv('data/labels.csv')
    X = labels.Image_Index
    y = LabelEncoder().fit_transform(labels.Finding_Labels).reshape(-1, 1)

    model = load_model('data/model.json')
    idx = int(sys.argv[1])
    pred = model.predict(load_image(X[idx]))[0]
    pred = (pred < 0.00003051757).astype(np.int)
    print(pred[y[idx]][0] == 1)