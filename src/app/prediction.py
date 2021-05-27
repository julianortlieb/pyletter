from pathlib import Path
import os

import tensorflow as tf
import numpy as np
import io
from PIL import Image, ImageOps
from tensorflow.python.ops.gen_array_ops import Size

model = tf.keras.models.load_model(os.path.join(Path(__file__).resolve().parent, 'model'));

def predict(image):
    img = Image.open(io.BytesIO(image)).convert("L")
    img = img.resize((28,28))
    img = ImageOps.invert(img)
    img_array = np.array(img)
    img_array = np.asarray([img_array])
    img_array = tf.reshape(img_array, [-1, 28, 28, 1])
    predict = model.predict(img_array)
    print('PREDICT', np.argmax(predict[0]))

    return np.argmax(predict[0])
