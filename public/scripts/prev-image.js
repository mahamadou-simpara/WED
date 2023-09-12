const inputEl = document.getElementById('image');
const img = document.getElementById('img');


function displayImagePreview() {

    const files = inputEl.files;

    if(!files || files.length === 0){
        img.style.display = 'none';
        return;
    }

    const pickedFile = files[0];
    const url = URL.createObjectURL(pickedFile);
    img.style.display = 'inline';
    img.src = url;

}

inputEl.addEventListener('change', displayImagePreview);