const addItemToCartBtn = document.querySelector("#product-detail .btn");
const badgeElement = document.querySelector('.items-list .badge');

// console.log(badgeElement);
async function addItem() {
  const productId = addItemToCartBtn.dataset.productid;
  const csrf = addItemToCartBtn.dataset.csrf;
  let response;
try {
    response = await fetch("/cart/items", {
        method: "POST",
        body: JSON.stringify({
          productId: productId,
          _csrf: csrf,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
} catch (error) {
    alert('Something went wrong!')
    return;
};

if(!response.ok){
    alert('Something went wrong!')
    return;
};
  
const responseData = await response.json();

console.log(responseData);

// badgeElement.textContent = data.totalQuantity;
// totalPriceElement.textContent = data.itemsTotalPrice.toFixed(2);
// itemTotalPrices.textContent = data.itemsTotalPrice.toFixed(2);

const newTotalItems = responseData.newTotalItems;

badgeElement.textContent = newTotalItems;
};

addItemToCartBtn.addEventListener("click", addItem);
