from pathlib import Path
import os
from urllib.request import ProxyDigestAuthHandler

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
    img_array = tf.reshape(img_array, [-1, 28, 28, 1]) # für erweitertes model
    predict = model.predict(img_array)
    print('PREDICT', np.argmax(predict[0]))

    #print([np.argmax(predict[0]), predict[0]])
    # return np.argmax(predict[0])

    return ('{',
                '"value": "',np.argmax(predict[0]),'",',
                '"zero": "',predict[0][0],'",'
                '"one": "',predict[0][1],'",',
                '"two": "',predict[0][2],'",',
                '"three": "',predict[0][3],'",',
                '"four": "',predict[0][4],'",',
                '"five": "',predict[0][5],'",',
                '"six": "',predict[0][6],'",',
                '"seven": "',predict[0][7],'",',
                '"eight": "',predict[0][8],'",',
                '"nine": "',predict[0][9],'"',
            '}')