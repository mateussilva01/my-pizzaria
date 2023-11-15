let cart = [];
let modalQt = 1;
let modalKey = 0;

const selectEl = (el) => document.querySelector(el);
const selectAllEl = (el) => document.querySelectorAll(el);

//Listagem das pizzas
pizzaJson.map((item, index) => {
  let pizzaItem = selectEl('.models .pizza-item').cloneNode(true);

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
    modalQt = 1;
    modalKey = key;

    selectEl('.pizzaBig img').src = pizzaJson[key].img;
    selectEl('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    selectEl('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    selectEl('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
    selectEl('.pizzaInfo--size.selected').classList.remove('selected');
    selectAllEl('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if (sizeIndex === 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    selectEl('.pizzaInfo--qt').innerHTML = modalQt;

    selectEl('.pizzaWindowArea').style.opacity = 0;
    selectEl('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
      selectEl('.pizzaWindowArea').style.opacity = 1;
    }, 200);
  });

  selectEl('.pizza-area').append(pizzaItem);
})

//Eventos do modal
const closeModal = () => {
  selectEl('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    selectEl('.pizzaWindowArea').style.display = 'none';
  }, 500)
}

selectAllEl('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal);
});

//Evento para selecionar a quantidade de itens
selectEl('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if (modalQt > 1) {
    modalQt--;
    selectEl('.pizzaInfo--qt').innerHTML = modalQt;
  }
});

selectEl('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalQt++;
  selectEl('.pizzaInfo--qt').innerHTML = modalQt;
});

//Evento para selecionar uma das opções de tamanho do item
selectAllEl('.pizzaInfo--size').forEach((size) => {
  size.addEventListener('click', (e) => {
    selectEl('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
  });
});

//Evento para obter as informações do item que será salvo no carrinho
selectEl('.pizzaInfo--addButton').addEventListener('click', () => {
  //Obtem o tamanho da pizza pela sua data-key
  let size = parseInt(selectEl('.pizzaInfo--size.selected').getAttribute('data-key'));

  let identifier = pizzaJson[modalKey].id+'@'+size;

  let key = cart.findIndex((item) => item.identifier == identifier);

  if (key > -1) {
    cart[key].qt += modalQt;
  } else {
    cart.push({
      identifier,
      id:pizzaJson[modalKey].id,
      size,
      qt: modalQt
    });
  }
  closeModal();
});