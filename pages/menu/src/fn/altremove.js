
function addPlaceholder() {
    const noOrder = document.querySelector('.noOrder');

    noOrder.classList.remove('cart_hide');
    noOrder.classList.add('display_default');
}


function minusTotal(item){
    const storedPrice = Number(localStorage.getItem('totalPrice'));
    const pricetotal = document.querySelector('.totalPrice');
    let newtotal = storedPrice - Number(item.dataset.total);

    localStorage.setItem('totalPrice', newtotal);
    pricetotal.textContent = newtotal;

}


const remove_alt = ()=> {
    const cartIcon = document.querySelector('.itemSelect__cartbtn');

    cartIcon.addEventListener('click', () => {
        const removeIcon = document.querySelectorAll('.removeItem');
        const itemsNode = document.querySelectorAll('.listappend');
        let length = itemsNode.length;

        removeIcon.forEach((icon, index) => {
            console.log('lenght-left: ', length);
            icon.addEventListener('click', () => {
                itemsNode[index].classList.remove('listappend');
                itemsNode[index].classList.add('itemdelete');
                length--;
                console.log('lenght-left: ', length);
                minusTotal(itemsNode[index]);

                if(length === 0) {
                    addPlaceholder();
                    localStorage.setItem('totalPrice', 0);
                }
            });
        });
    });
    
}



export default remove_alt;

