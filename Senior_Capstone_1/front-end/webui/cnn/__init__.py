import os
import struct
import random

import cv2
import numpy as np
from Crypto.Cipher import AES
from django.conf import settings
from tensorflow.keras.models import model_from_json

LABELS = [
    'Atelectasis',
    'Cardiomegaly',
    'Consolidation',
    'Edema',
    'Effusion',
    'Emphysema',
    'Fibrosis',
    'Hernia',
    'Infiltration',
    'Mass',
    'No Finding',
    'Nodule',
    'Pleural Thickening',
    'Pneumonia',
    'Pneumothorax'
]

def encrypt(key, in_filename, out_filename, size=64*1024):
    iv = os.urandom(16)
    encryptor = AES.new(key, AES.MODE_CBC, iv)
    file_size = os.path.getsize(in_filename)
    with open(in_filename, 'rb') as in_file:
        with open(out_filename, 'wb') as out_file:
            out_file.write(struct.pack('<Q', file_size))
            out_file.write(iv)
            while True:
                chunk = in_file.read(size)
                if len(chunk) == 0:
                    break
                elif len(chunk) % 16 != 0:
                    chunk += b' ' * (16 - len(chunk) % 16)
                out_file.write(encryptor.encrypt(chunk))
    return out_filename

def decrypt(key, in_filename, out_filename, size=64*1024):
    with open(in_filename, 'rb') as in_file:
        file_size = struct.unpack('<Q', in_file.read(struct.calcsize('Q')))[0]
        iv = in_file.read(16)
        decryptor = AES.new(key, AES.MODE_CBC, iv)
        with open(out_filename, 'wb') as out_file:
            while True:
                chunk = in_file.read(size)
                if len(chunk) == 0:
                    break
                out_file.write(decryptor.decrypt(chunk))
            out_file.truncate(file_size)
    return out_filename


class Model():
    def __init__(self):
        with open(self.get('model.json'), 'r') as f:
            self.model = model_from_json(f.read())
            self.model.load_weights(self.get('weights.h5'))
        self.threshold = 0.00003051757

    def get(self, filename):
        path = os.path.join(settings.MODEL_DIR, filename)
        if not os.path.exists(path):
            decrypt(settings.AES_KEY, path.rsplit('.', 1)[0] + '.enc', path)
        return path

    def predict(self, path):
        pred = self.model.predict(self.load_image(path))[0]
        pred[pred > self.threshold] = 0
        pred = pred / self.threshold
        data = {}
        for i in range(len(pred)):
            data[LABELS[i]] = round(pred[i] * 100, 2)
        return list(map(lambda x: [x[0], '{0:.2f}%'.format(float(x[1]))], sorted(data.items(), key=lambda x: x[1], reverse=True)))

    def load_image(self, path):
        return cv2.resize(cv2.imread(path), (1024, 1024)).reshape(1, 1024, 1024, 3).astype('float32') / 255
