const tf = require('@tensorflow/tfjs');

// Define a model for linear regression.
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));

model.compile({loss: 'meanSquaredError', optimizer: tf.train.adam(0.2)});

// Generate some synthetic data for training.
const xs = tf.tensor2d([0, 10, 20, 27, 35], [5, 1]);
const ys = tf.tensor2d([32, 50, 68, 80.6, 95], [5, 1]);

// Train the model using the data.
model.fit(xs, ys, { epochs: 500 }).then(() => {
  // Use the model to do inference on a data point the model hasn't seen before:
  model.predict(tf.tensor2d([100], [1, 1])).print();
  // Open the browser devtools to see the output
});