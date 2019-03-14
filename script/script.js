const setInputFilter = (textbox, inputFilter) => {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach((event) => {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
};

setInputFilter(document.getElementById("celsiusInput"), (value) => {
  return /^-?\d*$/.test(value);
});

// Define a model for linear regression.
const model = tf.sequential();
const layer0 = tf.layers.dense({units: 1, inputShape: [1]});
model.add(layer0);

// Prepare the model for training: Specify the loss and the optimizer.
model.compile({loss: 'meanSquaredError', optimizer: tf.train.adam(0.2)});

// Generate some synthetic data for training.
const xs = tf.tensor2d([10, 27, 19, 34, 105, 16, 28, 59], [8, 1]);
const ys = tf.tensor2d([50, 80.6, 66.2, 93.2, 221, 60.8, 82.4, 138.2], [8, 1]);

const onButtonClick = async () => {
  const celsiusInput = document.getElementById("celsiusInput");
  const fahrenheitInput = document.getElementById("fahrenheitInput");
  const convertButton = document.getElementById("convertButton");
  const main = document.getElementById("main");

  if (celsiusInput.value === '') {
    fahrenheitInput.value = 'Please enter the value above.';
    return;
  }

  const oldText = convertButton.innerText;
  convertButton.innerText = 'Converting...';
  convertButton.disabled = true;

  const before = Date.now();
  await model.fit(xs, ys, { epochs: 500 });
  const after = Date.now();

  const value = model.predict(tf.tensor2d([+celsiusInput.value], [1, 1])).dataSync()[0];

  const timeLeft = document.createTextNode(`The training took ${(after - before) / 1000}s`);
  main.appendChild(timeLeft);
  fahrenheitInput.value = value;
  convertButton.innerText = oldText;
  convertButton.disabled = false;
};

const onNumberButtonPress = value => {
  const celsiusInput = document.getElementById("celsiusInput");
  celsiusInput.value = value
};