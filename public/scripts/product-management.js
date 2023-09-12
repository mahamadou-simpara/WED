const formSubmissionBtns = document.querySelectorAll('.products button');


async function deleteProduct(event) {
    
    const deletebtn = event.target;

    const productId = deletebtn.dataset.productid;
    const csrfToken = deletebtn.dataset.crsf;
   

    const result = await fetch('/admin/product-delete/' + productId + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });

    if(!result.ok){
        alert('Something went wrong!')
        return;
    };

    deletebtn.parentElement.parentElement.parentElement.parentElement.remove();
}
for(const formSubmissionBtn of formSubmissionBtns){
    formSubmissionBtn.addEventListener('click', deleteProduct)
}
