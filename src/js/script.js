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
  updateCart();
  closeModal();
});

//Versão mobile: Evento que chama o carrinho se tiver item adicionado
selectEl('.menu-openner').addEventListener('click', () => {
  if (cart.length > 0) {
    selectEl('aside').style.left = '0';
  }
});

selectEl('.menu-closer').addEventListener('click', () => {
  selectEl('aside').style.left = '100vw';
});

//Evento para exibir o carrinho de compra com algum item adicionado e ocultar quando estiver vazio
const updateCart = () => {
  selectEl('.menu-openner span').innerHTML = cart.length;

  if (cart.length > 0) {
    selectEl('aside').classList.add('show');
    selectEl('.cart').innerHTML = '';

    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    for(let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      let cartItem = selectEl('.models .cart--item').cloneNode(true);
      subtotal += pizzaItem.price * cart[i].qt;

      let pizzaSizeName;
      switch(cart[i].size) {
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;
      }

      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
        if(cart[i].qt > 1) {
          cart[i].qt--;
        } else {
          cart.splice(i, 1);
        }
        updateCart();
      });
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
        cart[i].qt++;
        updateCart();
      });

      selectEl('.cart').append(cartItem);
    }

    desconto = subtotal * 0.1;
    total = subtotal - desconto;

    selectEl('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
    selectEl('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
    selectEl('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

  } else {
    selectEl('aside').classList.remove('show');
    selectEl('aside').style.left = '100vw';
  }
}