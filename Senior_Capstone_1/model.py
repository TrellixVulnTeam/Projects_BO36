from keras.callbacks import EarlyStopping
from keras.layers import Activation, Dense, Dropout, Flatten, MaxPooling2D
from keras.layers.convolutional import Conv2D
from keras.models import Sequential
from sklearn.metrics import precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split

from generator import ImageGenerator


class Model():
    def __init__(self, X_train, y_train, epoch, batch_size, classes):
        self.X_train = X_train
        self.y_train = y_train
        self.epoch = epoch
        self.batch_size = batch_size
        self.classes = classes

        self.fit()

    def fit(self):
        self.model = Sequential()
        self.model.add(Conv2D(32, (2, 2), padding='valid', strides=1, input_shape=(1024, 1024, 1)))
        self.model.add(Activation('relu'))
        self.model.add(Conv2D(32, (2, 2)))
        self.model.add(Activation('relu'))
        self.model.add(Conv2D(32, (2, 2)))
        self.model.add(Activation('relu'))
        self.model.add(MaxPooling2D(pool_size=(2, 2)))
        self.model.add(Conv2D(64, (4, 4)))
        self.model.add(Activation('relu'))
        self.model.add(Conv2D(64, (4, 4)))
        self.model.add(Activation('relu'))
        self.model.add(MaxPooling2D(pool_size=(2, 2)))
        self.model.add(Flatten())
        self.model.add(Dense(4096))
        self.model.add(Activation('relu'))
        self.model.add(Dropout(0.2))
        self.model.add(Dense(4096))
        self.model.add(Activation('relu'))
        self.model.add(Dropout(0.2))
        self.model.add(Dense(self.classes))
        self.model.add(Activation('softmax'))
        self.model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
        self.model.fit_generator(
            generator=ImageGenerator(X_train, y_train, self.batch_size),
            batch_size=self.batch_size,
            epochs=self.epoch,
            verbose=1,
            validation_split=0.2,
            class_weight='auto',
            callbacks=[EarlyStopping(monitor='acc', min_delta=0.001, patience=2, verbose=0, mode='auto')]
        )

    def predict(self, X_test):
        return self.model.predict(X_test)

    def precision_score(self, y_test, y_pred):
        return precision_score(y_test, y_pred, average='weighted')

    def recall_score(self, y_test, y_pred):
        return recall_score(y_test, y_pred, average='weighted')

    def f1_score(self, y_test, y_pred):
        return f1_score(y_test, y_pred, average='weighted')

    def save(self, path):
        with open(path, 'w') as f:
            f.write(self.model.to_json())
        self.model.save_weights(path.replace('json', 'h5'))
