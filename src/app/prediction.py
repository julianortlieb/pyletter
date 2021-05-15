from pathlib import Path
import os

import tensorflow as tf
import numpy as np
import io
from PIL import Image, ImageOps
from tensorflow.python.ops.gen_array_ops import Size

model = tf.keras.models.load_model(os.path.join(Path(__file__).resolve().parent, 'model'));

def trainModel():
    mnist = tf.keras.datasets.mnist
    (train_images, train_labels), (test_images, test_labels) = mnist.load_data()
    model = tf.keras.Sequential([
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation=tf.nn.relu),
        tf.keras.layers.Dense(10, activation=tf.nn.softmax)
    ])
    # compile
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0005), loss='sparse_categorical_crossentropy', metrics=['accuracy'], )

    # Feed the model
    model.fit(train_images, train_labels, epochs=20)
    model.save(os.path.join(Path(__file__).resolve().parent, 'model'))

def predict(image):
    img = Image.open(io.BytesIO(image)).convert("L")
    img = img.resize((28,28))
    img = ImageOps.invert(img)
    img_array = np.array(img)
    img_array = np.asarray([img_array])

    predict = model.predict(img_array)
    print('PREDICT', np.argmax(predict[0]))

    return np.argmax(predict[0])
