const orderUpdateForms = document.querySelectorAll(".orders form");

async function updateOrderStatus(event) {
  event.preventDefault();

  const form = event.target;
  const newForm = new FormData(form);
  const status = newForm.get("status");
  const orderId = newForm.get("order-id");
  const csrf = newForm.get("_csrf");


//   let result;

//   try {
//     result = await fetch(`admin/update/${orderId}`, {
//         method: "PATCH",
//         body: {
//           _csrf: csrf,
//           status: status,
//         },
//         headers: { "content-type": "application/json" },
//       });
//   } catch (error) {
//     alert('Sorry, something went wrong!');
//     return;
//   }

//   if(!result.ok){
//     alert('Sorry, something went wrong!');
//     return;
//   }

  

  const orderContainer = form.parentElement.parentElement.parentElement;

  const statusElement = orderContainer.querySelector(".product-state p");

  statusElement.textContent = status;
}

orderUpdateForms.forEach((orderUpdateForm) => {
  orderUpdateForm.addEventListener("submit", updateOrderStatus);
});
