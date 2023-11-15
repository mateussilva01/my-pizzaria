const selectEl = (el) => document.querySelector(el);
const selectAllEl = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  let pizzaItem = selectEl('.models .pizza-item').cloneNode(true);

  //preenche as informações em pizzaItem
  pizzaItem.setAttribute('data-key', index);
  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  //Chama o modal
  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();

    //Preenche o modal com as informações do item clicado
    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    selectEl('.pizzaBig img').src = pizzaJson[key].img;
    selectEl('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    selectEl('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    selectEl('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    selectAllEl('.pizzaInfo--size').forEach((size, sizeIndex) => {
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    selectEl('.pizzaWindowArea').style.opacity = 0;
    selectEl('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      selectEl('.pizzaWindowArea').style.opacity = 1;
    }, 200);
  });

  selectEl('.pizza-area').append(pizzaItem);
})