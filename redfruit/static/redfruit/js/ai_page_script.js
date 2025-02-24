
const fileDropZone = document.getElementById("fileDropZone");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const submitBtn = document.getElementById('submit-btn');

let uploadedFile = null;

// Open file dialog when clicking the drop zone
fileDropZone.addEventListener("click", () => fileInput.click());

// Handle file selection via file input
fileInput.addEventListener("change", (event) => {
    uploadedFile = event.target.files[0];
    handleFile(uploadedFile); // ✅ Call function and pass selected file
    updateSubmitButton(uploadedFile);
});


// Drag & Drop Events
fileDropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    fileDropZone.classList.add("dragover");
});

fileDropZone.addEventListener("dragleave", () => {
    fileDropZone.classList.remove("dragover");
});

fileDropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    fileDropZone.classList.remove("dragover");

    console.log("Dropped files:", event.dataTransfer.files); // Debugging

    if (event.dataTransfer.files.length > 0) {
        uploadedFile = event.dataTransfer.files[0]; // ✅ Assign file correctly
        console.log("Uploaded File:", uploadedFile); // Debugging
        handleFile(uploadedFile);
        updateSubmitButton(uploadedFile);
    } else {
        console.error("No files detected in drop event.");
    }
});



// Function to process a single file
function handleFile(file) {
    file_item.innerHTML = ""; // Clear previous file display

    if (file) {
        const listItem = document.createElement("div");
        listItem.textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        file_item.appendChild(listItem);
    }
}


function updateSubmitButton(uploadedFile) {
    if (uploadedFile) {
        submitBtn.style.visibility = "visible";
    } else {
        submitBtn.style.visibility = "hidden";
    }
}


submitBtn.addEventListener('click', (e) => {

e.preventDefault(); // Prevent default form submission
console.log('Form submission intercepted');

if (uploadedFile != null) {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', uploadedFile); // 'file' is the key expected by the backend
    const imageURL = URL.createObjectURL(uploadedFile); // Convert file to a temporary URL

    // Use Promises with .then() and .catch()
    fetch('/upload/', { // Replace '/upload/' with your Django endpoint
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error(response.statusText); // Throw an error for non-OK responses
        }
      }).then(result => {
        console.log('Server Response:', result); // Log the server's response
        // Dynamically update the HTML with the server response
        if (result.status === 'success') {
            const filename_tag = document.getElementById('filename');
            const prediction_tag = document.getElementById('prediction');
            const confidence_tag = document.getElementById('confidence');

            filename_tag.textContent = result.filename;
            prediction_tag.textContent = result.prediction;
            confidence_tag.textContent = result.confidence;

            const image = document.querySelector(".uploadedImage");
            image.src = imageURL;
            }
          })
  } else {
    console.error('No file selected.');
  }

      blurOverlay.style.display = 'flex'; // Show the blur overlay
    });

    closeModal.addEventListener('click', () => {
      blurOverlay.style.display = 'none'; // Hide the blur overlay
    });