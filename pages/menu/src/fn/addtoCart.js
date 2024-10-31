// for_variant section
function var_convert(x) {
    if(x % 2 === 0){
        return 1 + x;
    } else {
        return x - 1;
    }
}

function pressbtn(v_index){
    const varNode = document.querySelectorAll('.itemSelect_orderbtn');
    console.log('I was here');

    let decide = true;

    if(v_index !== null){
        let tempVar = varNode[v_index];
        let y = var_convert(v_index);
// debug
        console.log("tempVar: ", tempVar);
        console.log("x: ", v_index, " y: ", y);
//debug
        if(varNode[y].classList.contains('itemSelect_btnActive')){
            varNode[y].classList.remove('itemSelect_btnActive');
            varNode[y].classList.add('itemSelect_btnInactive');
        }

        if(tempVar.classList.contains('itemSelect_btnInactive')){
            tempVar.classList.remove('itemSelect_btnInactive');
            tempVar.classList.add('itemSelect_btnActive');
        } else {
            tempVar.classList.remove('itemSelect_btnActive');
            tempVar.classList.add('itemSelect_btnInactive');
            decide = false;
        }
    } else {
        varNode.forEach(varbtn => {
            if(varbtn.classList.contains('itemSelect_btnActive')){
                varbtn.classList.remove('itemSelect_btnActive');
                varbtn.classList.add('itemSelect_btnInactive');
            }
        });
        decide = false;
    }

    return decide;
    
}

function var_translate(v) {
    let box;
    switch(v){
        case 0:
           box = 'Hot';
           break;
        case 1:
            box = 'Iced';
            break;
        case 2:
            box = '16oz';
            break;
        case 3:
            box = '22oz';
    }

    return box;
}


const for_variant = () => {
    const varbtnNode = document.querySelectorAll('.itemSelect_orderbtn');
    let itemCard;

    varbtnNode.forEach((btn, v_index) => {
        btn.addEventListener('click', () => {
                itemCard = document.querySelector('.itemSelect__item.itemSelect__display');
            if(pressbtn(v_index)){
                itemCard.dataset.variant = var_translate(v_index);
            } else {
                itemCard.dataset.variant = '';
            }                    
        });
    });
};

function retrieve_forVariant(var_retr){
    let value;
    if(var_retr){
        if(var_retr === 'Hot'){
            value = pressbtn(0);
            return;
        }
    
        if(var_retr === 'Iced'){
            value = pressbtn(1);
            return;
        }
    
        if(var_retr === '16oz'){
            value = pressbtn(2);
            return;
        }
    
        if(var_retr === '22oz'){
            value = pressbtn(3);
            return;
        }   
    } else {
        pressbtn(null);
    }
    
}

// for_variant section



// for-quantity

function clickparsr(q){
    if(q === 1){
        return true;
    } else {
        return false;
    }
}

function displayQty(qty) {
    const qtyDisplay = document.querySelector('.itemSelect__qtyValue');

    qtyDisplay.textContent = qty;
}


const for_quantity = () => {

    const addsub = document.querySelectorAll('.itemSelect__addminus');
    let itemqty;
    let currentqty;

    addsub.forEach((qty, q_index) => {
        qty.addEventListener('click', () => {
            itemqty = document.querySelector('.itemSelect__item.itemSelect__display');
            currentqty = itemqty.dataset.qty;

            if(clickparsr(q_index)){
                if(currentqty <= 19){
                    currentqty++;
                }
            } else {
                if(currentqty > 1){
                    currentqty--;
                }
            }

            console.log(currentqty);
            displayQty(currentqty);
            itemqty.dataset.qty = currentqty;
        });
    });

};


function retrieve_forQuantity(Qty_retr) {
    displayQty(Qty_retr);
}

//for-quantity end

//core retrieval start



const main_method = () => {
    const productNode = document.querySelectorAll('.productCard');
    const itemNode = document.querySelectorAll('.itemSelect__item');

    productNode.forEach((product, p_index) => {
        product.addEventListener('click', () => {

            let forV = itemNode[p_index].dataset.variant;
            let forQ = itemNode[p_index].dataset.qty;
            retrieve_forVariant(forV);
            retrieve_forQuantity(forQ);
            // console.log(pressbtn(null))
        });
    });
};
//core retrieval end


//cart functions below
function indexIdentifier() {
    const itemNode = document.querySelectorAll('.itemSelect__item');
    let store;

    itemNode.forEach((item, index) => {
        if(item.classList.contains('itemSelect__display')){
            store = index;
        }
    });

    return store;
}

function pricevariantIdentify(item) {
    let vary = item.dataset.variant;
    let price;

    if(vary){
        if(vary === '16oz'){
            price = item.dataset.priceS;
        } else {
            price = item.dataset.priceL;
        }
    } else {
        price = item.dataset.priceS;
        //default;
    }

    return price;
}

function priceIdentifier(item, index, qty) {
    let tempvalue;

    if(index > 7 && index < 13){
        tempvalue = pricevariantIdentify(item);
    } else {
        tempvalue = item.dataset.price;
    }

    tempvalue = tempvalue * qty;
    return tempvalue;
}

function variantIdentifier(item, index){
    if(index > 12) {
        return 'none';
    }

    let store = item.dataset.variant;

    if(store){
        return store;
    } else {
        if(index > 7) {
            store = '16oz';
        } else {
            store = 'Hot';
        }
    }

    return store;   
}


function checkCart(currCart, currLngth, index, variant){
    let getindex = null;

    for(let i = 0; i < currLngth; i++){
        if(currCart[i].ind === index){
            if(currCart[i].variant === variant){
                getindex = i;
            }
        }

        if(getindex !== null){
            break;
        }
    }

    return getindex;
}



const tothe_Cart = () => {
    const toCart = document.querySelector('.itemSelect__addtoCart');
    let itemCard;
    let index;
    let quantity;
    let variantClk;
    let priceClk;
    let totalprice;
    let storeonClick;
    let store;
    let cart;

    let retrieveCart;
    let Cartlength;
    let hasSimilarkey;

    toCart.addEventListener('click', () => {
        retrieveCart = localStorage.getItem('cart');
        let totalPriceStore = localStorage.getItem('totalPrice');
        console.log(retrieveCart);

        itemCard = document.querySelector('.itemSelect__item.itemSelect__display');
        index = indexIdentifier();
        quantity = itemCard.dataset.qty;
        variantClk = variantIdentifier(itemCard, index);
        totalprice = priceIdentifier(itemCard, index, quantity);
        priceClk = totalprice / quantity;

        storeonClick = [{ind: index, variant: variantClk, details: {price: priceClk, qty: quantity, total:totalprice}}];
        store = {ind: index, variant: variantClk, details: {price: priceClk, qty: quantity, total:totalprice}};

        let newTotal = totalprice;
        console.log("start-click: ", newTotal);
        
        if(retrieveCart !== null){
            retrieveCart = JSON.parse(retrieveCart);
            Cartlength = retrieveCart.length;
            hasSimilarkey = checkCart(retrieveCart, Cartlength, index, variantClk);

            if(hasSimilarkey !== null){
                totalPriceStore = Number(totalPriceStore) - retrieveCart[hasSimilarkey].details.total;
                retrieveCart[hasSimilarkey] = store;
                cart = JSON.stringify(retrieveCart);

            } else {
                retrieveCart.unshift(store);
                cart = JSON.stringify(retrieveCart);
            }

            newTotal += Number(totalPriceStore);
        } else {
            cart = JSON.stringify(storeonClick);
        }


        const pricedisplay = document.querySelector('.totalPrice');  
        pricedisplay.textContent = newTotal;
        localStorage.setItem('totalPrice', newTotal);
        
        
        localStorage.setItem('cart', cart);

        // console.log(cart);
        toCart.textContent = "Added to Cart";
        setTimeout(() => {
            toCart.textContent = "Add to Cart";
        }, 1800);
    });
};

//cart functions above



export default main_method;
export {for_variant, for_quantity, tothe_Cart};
