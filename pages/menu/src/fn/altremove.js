
function addPlaceholder() {
    const noOrder = document.querySelector('.noOrder');

    noOrder.classList.remove('cart_hide');
    noOrder.classList.add('display_default');
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

                if(length === 0) {
                    addPlaceholder();
                }
            });
        });
    });
    
}



export default remove_alt;

