document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const fileList = document.getElementById("fileList");
    const dropZone = document.getElementById("dropZone");
    const contextMenu = document.getElementById("contextMenu");
    const uploadBtn = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("fileInput");
    let selectedFile = null;

    // Load stored files
    loadStoredFiles();

    // Toggle Dark Mode
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // File Upload - Click Button
    uploadBtn.addEventListener("click", () => {
        fileInput.click();
    });

    // Handle File Input Selection
    fileInput.addEventListener("change", (e) => {
        handleFiles(e.target.files);
    });

    // Drag & Drop Upload
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.style.background = "#dfe6e9";
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.style.background = "";
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.style.background = "";
        handleFiles(e.dataTransfer.files);
    });

    // Handle Files Upload
    function handleFiles(files) {
        Array.from(files).forEach(file => {
            addFileToList(file.name);
            storeFile(file.name);
        });
    }

    // Add File to List
    function addFileToList(fileName) {
        const li = document.createElement("li");
        li.textContent = fileName;
        li.dataset.filename = fileName;
        li.setAttribute("tabindex", "0");

        // Right-click event (Context Menu)
        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            selectedFile = li;
            showContextMenu(e.pageX, e.pageY);
        });

        fileList.appendChild(li);
    }

    // Show Context Menu
    function showContextMenu(x, y) {
        contextMenu.style.display = "block";
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
    }

    // Hide Context Menu on click elsewhere
    document.addEventListener("click", () => {
        contextMenu.style.display = "none";
    });

    // Rename File
    document.getElementById("renameFile").addEventListener("click", () => {
        if (selectedFile) {
            const newName = prompt("Enter new file name:", selectedFile.dataset.filename);
            if (newName) {
                updateStoredFile(selectedFile.dataset.filename, newName);
                selectedFile.textContent = newName;
                selectedFile.dataset.filename = newName;
            }
        }
    });

    // Delete File
    document.getElementById("deleteFile").addEventListener("click", () => {
        if (selectedFile) {
            removeStoredFile(selectedFile.dataset.filename);
            selectedFile.remove();
        }
    });

    // Download File (Dummy)
    document.getElementById("downloadFile").addEventListener("click", () => {
        if (selectedFile) {
            alert(`Downloading ${selectedFile.dataset.filename} (Feature coming soon)`);
        }
    });

    // Local Storage Functions
    function storeFile(fileName) {
        let files = JSON.parse(localStorage.getItem("files")) || [];
        if (!files.includes(fileName)) {
            files.push(fileName);
            localStorage.setItem("files", JSON.stringify(files));
        }
    }

    function loadStoredFiles() {
        let files = JSON.parse(localStorage.getItem("files")) || [];
        files.forEach(fileName => addFileToList(fileName));
    }

    function removeStoredFile(fileName) {
        let files = JSON.parse(localStorage.getItem("files")) || [];
        files = files.filter(f => f !== fileName);
        localStorage.setItem("files", JSON.stringify(files));
    }

    function updateStoredFile(oldName, newName) {
        let files = JSON.parse(localStorage.getItem("files")) || [];
        let index = files.indexOf(oldName);
        if (index !== -1) {
            files[index] = newName;
            localStorage.setItem("files", JSON.stringify(files));
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const fileList = document.getElementById("fileList");
    const srAnnouncer = document.getElementById("sr-announcer");

    // Function to announce text for screen readers
    function announce(text) {
        srAnnouncer.textContent = text;
    }

    // Add File to List with Accessibility
    function addFileToList(fileName) {
        const li = document.createElement("li");
        li.textContent = fileName;
        li.dataset.filename = fileName;
        li.setAttribute("tabindex", "0");  // Make files focusable
        li.setAttribute("role", "listitem");
        li.setAttribute("aria-label", `File: ${fileName}`);

        // Keyboard Accessibility (Enter Key)
        li.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                announce(`Selected file ${fileName}`);
            }
        });

        // Add to List
        fileList.appendChild(li);
        announce(`File ${fileName} added`);
    }

    // Call this function in file upload event
});
document.addEventListener("DOMContentLoaded", async function () {
    const langSelect = document.getElementById("languageSelect");

    // Load language data
    let languages = {};
    async function loadLanguages() {
        const response = await fetch("languages.json");
        languages = await response.json();
    }

    // Function to update UI language
    function updateLanguage(lang) {
        document.querySelector("h1").textContent = languages[lang].title;
        document.getElementById("uploadBtn").textContent = languages[lang].uploadFile;
        document.getElementById("dropZone").textContent = languages[lang].dropZone;
        document.getElementById("fileList").setAttribute("aria-label", languages[lang].uploadedFiles);
        document.getElementById("renameFile").textContent = languages[lang].rename;
        document.getElementById("deleteFile").textContent = languages[lang].delete;
        document.getElementById("downloadFile").textContent = languages[lang].download;
        document.getElementById("themeToggle").textContent = languages[lang].themeToggle;
    }

    // Load languages and set default language
    await loadLanguages();
    updateLanguage("en");

    // Change language on selection
    langSelect.addEventListener("change", function () {
        updateLanguage(langSelect.value);
    });
});

document.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('click', () => {
        const filename = item.getAttribute('data-filename');
        document.getElementById('modalTitle').innerText = filename;
        document.getElementById('fileContent').value = "Loading...";
        
        setTimeout(() => {
            document.getElementById('fileContent').value = `// Mock content for ${filename}`;
        }, 500);
        
        document.getElementById('fileModal').classList.remove('hidden');
    });
});

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('fileModal').classList.add('hidden');
});

document.getElementById('saveFile').addEventListener('click', () => {
    alert('File saved successfully!');
});
