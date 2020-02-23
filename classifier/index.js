let net;
const webcamElement = document.getElementById('webcam');

const classifier = knnClassifier.create();

async function app() {
	console.log('Loading mobilenet..');

	// Load the model.
	net = await mobilenet.load();
	console.log('Successfully loaded model');

	const webcam = await tf.data.webcam(webcamElement);

	// Reads an image from the webcam and associates it with a specific class
	//   // index.
	const addExample = async classId => {
		// Capture an image from the web camera.
		const img = await webcam.capture();
		// Get the intermediate activation of MobileNet 'conv_preds' and pass that
		// to the KNN classifier.
		const activation = net.infer(img, 'conv_preds');
		// Pass the intermediate activation to the classifier.
		classifier.addExample(activation, classId);
		// Dispose the tensor to release the memory.
		img.dispose();
	};

	// When clicking a button, add an example for that class.
	document.getElementById('class-a').addEventListener('click', () => addExample(0));
	document.getElementById('class-b').addEventListener('click', () => addExample(1));
	document.getElementById('class-c').addEventListener('click', () => addExample(2));
	
	
	
	while (true) {
		if (classifier.getNumClasses() > 0) {
			const img = await webcam.capture();
			const activation = net.infer(img, 'conv_preds');
			const result = await classifier.predictClass(activation);

			const classes = ['A', 'B', 'C'];

		
			document.getElementById('console').innerText = `
				prediction: ${classes[result.label]}\n
				probability: ${result.confidences[result.label]}
			`;

		img.dispose();
		}
		await tf.nextFrame();
	}
}
app();
