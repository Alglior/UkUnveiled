// Clear file input on page load
window.addEventListener('load', function() {
    document.getElementById('imageInput').value = '';
});

let compressionQuality = 0.5; // Default compression quality
let filesToProcess = []; // Store the selected files

// Function to display processing message
function showProcessingMessage() {
    const downloadContainer = document.getElementById('downloadZipBtnContainer');
    downloadContainer.innerHTML = '<p style="color: white;">Processing images, please wait...</p>';
}

// Function to hide processing message
function hideProcessingMessage() {
    const downloadContainer = document.getElementById('downloadZipBtnContainer');
    downloadContainer.innerHTML = '';
}

// Function to display image previews with current compression quality
function displayImagePreviews(files) {
    const previewContainer = document.getElementById('imagePreviewContainer');
    previewContainer.innerHTML = ''; // Clear existing previews

    files.forEach(file => {
        if (!file.type.startsWith('image/')) { return; }

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Convert canvas to image for preview
                canvas.toBlob(function(blob) {
                    const previewImg = new Image();
                    previewImg.src = URL.createObjectURL(blob);
                    previewImg.style.maxWidth = '500px';
                    previewImg.style.margin = '10px';
                    previewContainer.appendChild(previewImg);
                }, 'image/jpeg', compressionQuality);
            };
        };
        reader.readAsDataURL(file);
    });
}

// Event listener for file input
document.getElementById('imageInput').addEventListener('change', function(event) {
    filesToProcess = Array.from(event.target.files);
    removeExistingDownloadLink(); // Remove existing download link
    displayImagePreviews(filesToProcess); // Display image previews
    processImages(); // Process images with default quality
});

// Event listeners for quality buttons
document.querySelectorAll('.quality-btn').forEach(button => {
    button.addEventListener('click', function() {
        compressionQuality = parseFloat(this.getAttribute('data-quality'));
        removeExistingDownloadLink();
        displayImagePreviews(filesToProcess); // Update previews with new quality
        processImages(); // Process images with the selected quality
    });
});

// Function to process and compress images
function processImages() {
    if (filesToProcess.length === 0) {
        return; // No files to process
    }

    showProcessingMessage(); // Show processing message

    const zip = new JSZip();
    let count = 0;

    filesToProcess.forEach((file, i) => {
        if (!file.type.startsWith('image/')) { return; }

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(function(blob) {
                    zip.file("compressed-image-" + i + ".jpg", blob);
                    count++;
                    if (count === filesToProcess.length) {
                        zip.generateAsync({type:"blob"}).then(function(content) {
                            displayDownloadLink(content);
                        });
                    }
                }, 'image/jpeg', compressionQuality);
            };
        };
        reader.readAsDataURL(file);
    });
}

// Function to create and display the download link
function displayDownloadLink(content) {
    hideProcessingMessage(); // Hide processing message

    const downloadContainer = document.getElementById('downloadZipBtnContainer');
    downloadContainer.innerHTML = ''; // Clear previous content

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(content);
    downloadLink.download = 'compressed-images.zip';
    downloadLink.innerText = 'Download ZIP';
    // Apply styles to downloadLink...

    downloadContainer.appendChild(downloadLink);
}

// Function to remove existing download link
function removeExistingDownloadLink() {
    const existingDownloadContainer = document.getElementById('downloadZipBtnContainer');
    if (existingDownloadContainer) {
        existingDownloadContainer.innerHTML = '';
    }
}
