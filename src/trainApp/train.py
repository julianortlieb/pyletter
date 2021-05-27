from pathlib import Path
import os

import tensorflow as tf
import numpy as np

from tensorflow.keras.layers import Conv2D

def trainModel():
    mnist = tf.keras.datasets.mnist
    (train_images, train_labels), (test_images, test_labels) = mnist.load_data()
    train_images = train_images.reshape(-1, 28, 28, 1)
    test_images = test_images.reshape(-1, 28, 28, 1)

    model = tf.keras.Sequential([
        # erweitertes Netz
        tf.keras.layers.Conv2D(32, (3, 3), input_shape=(28,28,1)),
        tf.keras.layers.BatchNormalization(axis=-1),
        tf.keras.layers.Activation('relu'),
        tf.keras.layers.Conv2D(32, (3, 3)),
        tf.keras.layers.Activation('relu'),
        tf.keras.layers.MaxPooling2D(pool_size=(2,2)),

        tf.keras.layers.Conv2D(64,(3, 3)),
        tf.keras.layers.BatchNormalization(axis=-1),
        tf.keras.layers.Activation('relu'),
        tf.keras.layers.Conv2D(64, (3, 3)),
        tf.keras.layers.BatchNormalization(axis=-1),
        tf.keras.layers.Activation('relu'),
        tf.keras.layers.MaxPooling2D(pool_size=(2,2)),

        # Einfaches netz
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation=tf.nn.relu),
        tf.keras.layers.Dense(10, activation=tf.nn.softmax)
    ])
    # compile
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0005), loss='sparse_categorical_crossentropy', metrics=['accuracy'], )

    # Feed the model
    model.fit(train_images, train_labels, epochs=5)
    model.save(os.path.join(Path(__file__).resolve().parent.parent, 'app', 'model'))

    test_loss, test_acc = model.evaluate(test_images,  test_labels, verbose=2)
    print('\nTest accuracy:', test_acc)

    model.summary()

trainModel()