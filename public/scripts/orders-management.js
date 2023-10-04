const orderUpdateForms = document.querySelectorAll(".orders form");

async function updateOrderStatus(event) {
  event.preventDefault();

  const form = event.target;
  const newForm = new FormData(form);
  const newStatus = newForm.get("status");
  const orderId = newForm.get("orderid");
  const csrftoken = newForm.get("csrf");

  
  // console.log(csrftoken);

  let result;

  try {
    result = await fetch(`/admin/update/${orderId}`, {
        method: "PATCH",
        body: JSON.stringify({
          newStatus: newStatus,
          _csrf: csrftoken
        }),
        headers: { 
          "content-type": "application/json" 
        }
      });
  } catch (error) {
    alert('Sorry, something went wrong!');
    return;
  }

  

  if(!result.ok){
    alert('Sorry, something went wrong!');
    return;
  }

  const responseData = await result.json();

  // console.log(responseData);
  

  const orderContainer = form.parentElement.parentElement.parentElement;

  const statusElement = orderContainer.querySelector(".product-state p");

  statusElement.textContent = newStatus;
}

orderUpdateForms.forEach((orderUpdateForm) => {
  orderUpdateForm.addEventListener("submit", updateOrderStatus);
});
