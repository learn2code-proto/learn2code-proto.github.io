console.info('... pre script loaded');

function copyText(element) {
    window.navigator.clipboard.writeText(element.innerText);
}

function saveText(element) {
    const zip = new JSZip();

    // Add the code to a file named main.py
    zip.file('main.py', element.innerText);

    // Compress the code and download it
    zip.generateAsync({ type: "base64" })
        .then((encoding) => {
            const dummyLink = document.createElement('a');
            dummyLink.download = 'proto.zip';
            dummyLink.href = 'data:application/zip;base64,' + encoding;
            dummyLink.dispatchEvent(new MouseEvent('click'));
        });
}

function switchEditor() {
    document.getElementById('line-editor').toggleAttribute('data-closed');
    document.getElementById('block-editor').toggleAttribute('data-closed');
}
