
//checks if the user entered the page by clicking one of the bestseller items

import { openItemcard, openSelectitem, openItemvariant} from './utility.js';

const checkEntry = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const value = localStorage.getItem('tempValue');
        localStorage.removeItem('tempValue');
        console.log(value);

        if(value !== null){
            const itemcard = document.querySelector('#itemCard');
            const product = document.querySelectorAll('.itemSelect__item');
            const itemvariant = document.querySelectorAll('.itemSelect__varbtn');

            openItemcard(itemcard);
            openSelectitem(product, value);
            openItemvariant(itemvariant, value);
        }
    });
};

export default checkEntry;