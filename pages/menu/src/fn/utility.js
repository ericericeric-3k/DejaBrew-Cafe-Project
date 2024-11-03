// By John Erick M. Camota
// BSIT-2A

//monitors if the foodnav buttons were clicked then apply and unapply certain classes correspondingly
const clickedButton = () => {
    const button  = document.querySelectorAll('#toggle');
    let exists;

    const node_value = [
        document.querySelector('.coffee'),
        document.querySelector('.milktea'),
        document.querySelector('.frappe'),
        document.querySelector('.bakedgoods'), 
        document.querySelector('.lightmeal'), 
        document.querySelector('.healthyOp'),
        document.querySelector('.snacks')
    ]; 

    const node_map = new Map();
    button.forEach((select, index) => {
        if(node_value[index]){
            node_map.set(select, node_value[index]);
        }
    });

    let clicked_node;
    let display_node;


    button.forEach(foodOpt => {

        foodOpt.addEventListener('click', () => {

            display_node = node_map.get(foodOpt);

            button.forEach(food => {
                if(food.classList.contains('clicked')){
                    exists = food;
                    clicked_node = node_map.get(food);
                }
            })

            clicked_node.style.display = 'none';
            display_node.style.display = 'flex';
            exists.classList.remove('clicked');
            exists.classList.add('toggle');
            foodOpt.classList.add('clicked');
            foodOpt.classList.remove('toggle');
        });
    });
};


// Makes the container where all the product information is stored visible
const openItemcard = (itemcard) => {
    let isCardOpen = itemcard.classList.contains('itemSelect__display');

    if(!isCardOpen){
        itemcard.classList.remove('itemSelect__hide');
        itemcard.classList.add('itemSelect__display');
    }
}

//Displays the information specific to the product that was clicked
const openSelectitem = (items, index) => {

    if(items[index].classList.contains('itemSelect__display')){
        return;
    }

    items.forEach(openitem => {
        if(openitem.classList.contains('itemSelect__display')) {
            openitem.classList.remove('itemSelect__display');
            openitem.classList.add('itemSelect__hide');
        }
    });

    items[index].classList.remove('itemSelect__hide');
    items[index].classList.add('itemSelect__display');
    // product_index = index;

};

// shorthand functions for remove and add
const removedisplay = (select) => {
    select.classList.remove('itemSelect__display');
    select.classList.add('itemSelect__hide');
};

const addisplay = (select) => {
    select.classList.remove('itemSelect__hide');
    select.classList.add('itemSelect__display');
};
// shorthand functions for remove and add


// Displays the options for a specific array of products
const openItemvariant = (itemvariant, index) => {
    let v1 = itemvariant[0].classList.contains('itemSelect__display');
    let v2 = itemvariant[1].classList.contains('itemSelect__display');

    if(index > 12){
        if(v1){
            removedisplay(itemvariant[0]);
        }
        if(v2){
            removedisplay(itemvariant[1]);
        }
        return;
    }

    if(index > 7 && index < 13){
        if(v1){
            removedisplay(itemvariant[0]);
        }
        if(!v2){
            addisplay(itemvariant[1]);
        }
        return;
    }

    if(v2){
        removedisplay(itemvariant[1]);
    }
    if(!v1){
        addisplay(itemvariant[0]);
    }

};

//serves as the main method for displaying product information
const openDisplay = () => {
    const itemcard = document.querySelector('#itemCard');
    const productcard = document.querySelectorAll('.productCard');
    const items = document.querySelectorAll('.itemSelect__item');
    const itemvariant = document.querySelectorAll('.itemSelect__varbtn');
    const orderpost = document.querySelector('#order-start');
    

    productcard.forEach((pcard, index) => {
        pcard.addEventListener('click', () => {
            if(orderpost.classList.contains('itemSelect__display')){
                orderpost.classList.remove('itemSelect__display');
                orderpost.classList.add('itemSelect__hide');
            }
            
            // console.log(index);
            openItemcard(itemcard);
            openSelectitem(items, index);
            openItemvariant(itemvariant, index);

        });
    });

};

export default clickedButton;
export{openItemcard, openSelectitem, openItemvariant, openDisplay};
