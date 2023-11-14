const selectEl = (el) => document.querySelector(el);
const selectAllEl = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  let pizzaItem = selectEl('.models .pizza-item').cloneNode(true);

  //preenche as informações em pizzaItem

  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  //Chama o modal
  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();

    selectEl('.pizzaWindowArea').style.opacity = 0;
    selectEl('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      selectEl('.pizzaWindowArea').style.opacity = 1;
    }, 200);
  });

  selectEl('.pizza-area').append(pizzaItem);
})