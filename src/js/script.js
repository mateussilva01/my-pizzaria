const selectEl = (el) => document.querySelector(el);
const selectAllEl = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  let pizzaItem = selectEl('.models .pizza-item').cloneNode(true);

  //preenche as informações em pizzaItem

  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  selectEl('.pizza-area').append(pizzaItem);
})