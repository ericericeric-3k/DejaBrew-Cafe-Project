function retrieveCart() {
    return localStorage.getItem('cart');
}

function nameRetrieve(ind) {
    const itemNode = document.querySelectorAll('.itemSelect__item');
    let item = itemNode[ind];

    return item.dataset.name;
}

function variantReturn(variant) {
    if(variant === "none"){
        return null;
    }
    return variant;
}

function elemCreate(cart_item, u_list, index){
    console.log(cart_item.ind);
    console.log(cart_item.variant);
    console.log(cart_item.details);
    
    let itemName = nameRetrieve(cart_item.ind);
    let variant = variantReturn(cart_item.variant);
    let qty = cart_item.details.qty;
    let price = cart_item.details.price;
    let total = cart_item.details.total;

    const li_item = document.createElement("li");
    const div_name_var = document.createElement("div");
    const div_details = document.createElement("div");
    const p_qty = document.createElement("p");
    const p_price = document.createElement("p");
    const p_total = document.createElement("p");
    const str_total =document.createElement("strong");
    const p_name = document.createElement("p");
    const p_variant = document.createElement("p");
    const str_name = document.createElement("strong");

    const btn_remove = document.createElement("button");

    btn_remove.textContent = "remove";
    btn_remove.classList.add('removeItem');

    //Productname & Variant
    str_name.textContent = itemName;
    p_name.appendChild(str_name);
    p_variant.textContent = variant;

    div_name_var.appendChild(p_name);
    div_name_var.appendChild(p_variant);
    //Productname & Variant

    p_qty.textContent = "Item qty: ";
    p_qty.textContent += qty;

    p_price.textContent = "Price: Php ";
    p_price.textContent += price;

    p_total.textContent = "Total: Php ";
    str_total.textContent = total;
    p_total.appendChild(str_total);

    div_details.appendChild(p_qty);
    div_details.appendChild(p_price);
    div_details.appendChild(p_total);
    div_details.appendChild(btn_remove);

    div_name_var.classList.add('listappend_item_L');
    div_details.classList.add('listappend_item_R');
    li_item.classList.add('cart_item');
    li_item.classList.add('listappend');
    li_item.classList.add('cart_display');
    li_item.classList.add('upwards'); //This---------------------------------add

    li_item.appendChild(div_name_var);
    li_item.appendChild(div_details);

    li_item.dataset.index = index;

    li_item.dataset.ind = cart_item.ind;
    li_item.dataset.variant = cart_item.variant;
    li_item.dataset.qty = cart_item.details.qty;
    li_item.dataset.price = cart_item.details.price;
    li_item.dataset.total = cart_item.details.total;

    u_list.appendChild(li_item);
}

function alterCart(cart) {
    let length = cart.length;
    const cart_ul = document.querySelector('.cart_list');

    console.log('at least im here');
    for(let i = 0; i < length; i++){
        elemCreate(cart[i], cart_ul, i);
    }
}

function openCart_container() {
    const cartdisplay = document.querySelector('.cart_container');

    cartdisplay.classList.remove('cart_hide');
    cartdisplay.classList.add('cart_display');
}

function removePlaceholder() {
    const noOrder = document.querySelector('.noOrder');

    noOrder.classList.remove('display_default');
    noOrder.classList.add('cart_hide');
}

function staticbg(mode) {
    const bodyfilter = document.querySelector('#filter');
    bodyfilter.classList.toggle('active-filter-cart');
    document.body.style.overflowY = mode;
}

function total_pr(cart) {
    let tp = document.querySelector('.totalPrice');

    if(cart){
        let price = 0;
        let txt = 'Php '
        for(let i = 0; i < cart.length; i++){
            price = price + Number(cart[i].details.total);
        }
        txt += price;
        tp.textContent = txt;
        
    } else {
        return tp.textContent = 'Php 0';
    }

}

function clicksubmit(event) {
    const cartsubmit = document.querySelector('.cart_submitbtn')

    cartsubmit.textContent = "Your Order was Submitted";
}

//core 
const openCart = () => {
    const cartIcon = document.querySelector('.itemSelect__cartbtn');
    const cartsubmit = document.querySelector('.cart_submitbtn');
    let retrieved;
    let cart;

    cartIcon.addEventListener('click', () => {
        cartsubmit.textContent = "Submit Order";
        retrieved = retrieveCart();
        cartsubmit.addEventListener('click', clicksubmit);
        if(retrieved !== null){
            cart = JSON.parse(retrieved);
            alterCart(cart);
            total_pr(cart);
            removePlaceholder();
        } else {
            total_pr(null);
        }
        staticbg('hidden');
        openCart_container();
    });
};
//core end

function addPlaceholder() {
    const noOrder = document.querySelector('.noOrder');
    
    if(noOrder.classList.contains('cart_hide')){
        noOrder.classList.remove('cart_hide');
        noOrder.classList.add('display_default');
    }
}

function removeAppendedElem() {
    const cartitem = document.querySelectorAll('.upwards');

    if(cartitem) {
        cartitem.forEach(item => {
            item.remove();
        })
    }
}


function xpress() {
    let store = document.querySelectorAll('.listappend');
    let cart = [];

    if(store.length !== 0){
        localStorage.removeItem('cart');
        let variable;

        let index;
        let vary;
        let quantity;
        let prc;
        let totalprc;

        store.forEach(item => {
            index = item.dataset.ind;
            vary = item.dataset.variant;
            quantity = item.dataset.qty;
            prc = item.dataset.price;
            totalprc = item.dataset.total;

            variable = {ind: index, variant: vary, details: {price: prc, qty: quantity, total:totalprc}};
            cart.push(variable);
        });

        let jsonCart = JSON.stringify(cart);
        localStorage.setItem('cart', jsonCart);
    } else {
        localStorage.removeItem('cart');
    }
    
};


//core-2
const exitCart = () => {
    const exitIcon = document.querySelector('.cart_exit');
    const cartIcon = document.querySelector('.cart_container');

    exitIcon.addEventListener('click', () => {
        cartIcon.classList.remove('cart_display');
        cartIcon.classList.add('cart_hide');
        staticbg('auto');
        let flag = document.querySelectorAll('.upwards');

        if(flag.length > 0){
            xpress();
            addPlaceholder();
            removeAppendedElem();
        }      

    });
};
//core-2 end



export default openCart;
export {exitCart};