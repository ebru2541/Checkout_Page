const tax = 0.18;
const control = document.querySelector(".top");
const icon = new Audio("./audio/buton1.mp3");
const buton = new Audio("./audio/icon.mp3");

control.addEventListener("click", (e) => {
  console.log(e.target);
  //* artırma
  if (e.target.className === "fa-solid fa-plus") {
    e.target.parentElement.parentElement
      .querySelector(".product-total")
      .classList.remove("hidden");
    e.target.previousElementSibling.innerText++;
    productTotal(e.target);
    bottom();
    icon.play();
  }
  //*azaltma
  else if (e.target.className == "fa-solid fa-minus") {
    if (e.target.nextElementSibling.innerText > 0) {
      e.target.nextElementSibling.innerText--;
      productTotal(e.target);
      bottom();
      icon.play();
    }
    if (e.target.nextElementSibling.innerText == 0) {
      e.target.parentElement.parentElement
        .querySelector(".product-total")
        .classList.add("hidden");

      // productTotal(e.target);
      bottom();
      icon.play();
     } 
  }

  //* remove
  else if (e.target.classList.contains("remove")) {
    e.target.closest(".box").remove();
    bottom();
    buton.play();
  }
  // audio.currentTime = 0;
});

//*product total hesaplanması
const productTotal = (eleman) => {
  const quantity = eleman.parentElement.querySelector(".quantity").innerText;
  const price =
    eleman.parentElement.parentElement.querySelector("strong").innerText;
  const pTotal = (quantity * price).toFixed(2);
  eleman.parentElement.parentElement.querySelector(".product-span").innerText =
    pTotal;
};

//*bottom kısmının hesaplanması
const bottom = () => {
  const productsTotal = document.querySelectorAll(".product-span");
  //*subtotal
  const subTotalvalue = [...productsTotal].reduce(
    (acc, eleman) => acc + Number(eleman.innerText),
    0
  );
  const subTotalKey = (document.querySelector(
    "#subtotal"
  ).lastElementChild.innerText = "$" + subTotalvalue.toFixed(2));

  //*tax
  const taxvalue = subTotalvalue * tax;
  const taxKey = (document.querySelector("#tax").lastElementChild.innerText =
    "$" + taxvalue.toFixed(2));

  //* shipping
  const shippingvalue = subTotalvalue > 300 || subTotalvalue == 0 ? 0 : 15;

  const shippingkey = (document.querySelector(
    "#shipping"
  ).lastElementChild.innerText = "$" + shippingvalue.toFixed(2));

  //* total
  const totalvalue = subTotalvalue + taxvalue + shippingvalue;
  const totalkey = (document.querySelector(
    "#total"
  ).lastElementChild.innerText = "$" + totalvalue.toFixed(2));
};
