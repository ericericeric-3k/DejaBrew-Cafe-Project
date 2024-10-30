import { loadcontainer, loadproduct, loadItemcard} from '../../../src/fancy.js';
import clickedButton, {openItemcard, openSelectitem, openItemvariant, openDisplay} from './fn/utility.js';
import mobilenav from '../../../src/mobilenavbar.js';
import checkEntry from './fn/checkvalue.js';
import main_method, {for_variant, for_quantity, tothe_Cart} from './fn/addtoCart.js';
import openCart, {exitCart} from './fn/openCart.js';
import remove_alt from './fn/altremove.js';

loadcontainer();
loadItemcard();
loadproduct();
checkEntry();
mobilenav();
clickedButton();

openDisplay();

main_method();
for_variant();
for_quantity();
tothe_Cart();

openCart();
remove_alt();
exitCart();

