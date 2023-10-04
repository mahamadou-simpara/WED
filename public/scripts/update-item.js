const updateItemElementBtn = document.querySelectorAll('.item-action .btn');
const badgeElement = document.querySelector('.items-list .badge');
const totalPriceElement = document.querySelector('#total-cart p span')

// console.log(badgeElement);
// console.log(totalPriceElement);

async function updateItemQuantity(event) {
   
    const btnElement = event.target;
    const productId = btnElement.dataset.productid;
    const csrf = btnElement.dataset.csrftoken
    const btnParentElement = btnElement.parentElement;
    const inputElement = btnParentElement.firstElementChild;
    const newQuantity = inputElement.value;
    const itemTotalPrices = btnParentElement.parentElement.firstElementChild.children[1].children[0];

    // console.log(productId);
    // console.log(newQuantity);
    console.log(csrf)

    const result = fetch('/cart/item', {
        method: 'PATCH',
        body: JSON.stringify({
            productId: productId,
            newQuantity: newQuantity,
            _csrf: csrf
        }), 
        headers : {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await result;

    const data = await responseData.json();

    console.log(data);

    badgeElement.textContent = data.totalQuantity;
    totalPriceElement.textContent = data.itemsTotalPrice.toFixed(2);
    itemTotalPrices.textContent = data.updatedItemPrice.toFixed(2);

    if(newQuantity <= 0){
        btnParentElement.parentElement.parentElement.remove();
        return;
    };
}

updateItemElementBtn.forEach((updateBtn) => {
    updateBtn.addEventListener('click', updateItemQuantity);
});

