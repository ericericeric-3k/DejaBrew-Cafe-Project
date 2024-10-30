// By John Erick M. Camota
// BSIT-2A

// runs only once when the dom content is loaded and once the user scrolls down
const loadcontainer = () => {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const lazycontainer = document.querySelectorAll('.lazycontainer');
            const obsrv = new IntersectionObserver((entries, obsrv) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting){
                        let seen = entry.target;
                        console.log(seen);
                        seen.classList.remove('loading');
                        seen.classList.add('loaded');
                        obsrv.unobserve(seen);
                    } 
                });
            }, {
                threshold: 0.5
            });

            lazycontainer.forEach(container => {
                obsrv.observe(container);
            });
        }, 100);
        
    });
};

//food observer 

const loadproduct = () => {
    const containers = document.querySelectorAll('.productCard');
    const buttonclk = document.querySelectorAll('#toggle');
    
    const obsrvfood = new IntersectionObserver((entries, obsrvfood) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                let product = entry.target;
                product.classList.remove('loading');
                product.classList.add('loaded');
                obsrvfood.unobserve(product);
            }
        });
    },{
        threshold:0.3
    });

    buttonclk.forEach(button => {
        button.addEventListener('click', () => {   
            containers.forEach(contain => {
                if(contain.classList.contains('loaded')){
                    contain.classList.remove('loaded');
                    contain.classList.add('loading');
                }
                obsrvfood.observe(contain);
            });
        });
    });   
};

const loadItemcard = () => {
    const item = document.querySelector('#itemCard');
    const cart = document.querySelector('.cart_container');
    const mobilenav = document.querySelector('.mobilenav_container');
    const obsrvItem = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            let card = entry.target;
            if(entry.isIntersecting){
                card.classList.remove('loading');
                card.classList.add('loaded');
            } else {
                if(card.classList.contains('loaded')){
                    card.classList.remove('loaded');
                    card.classList.add('loading');
                }
            }
        });
    }, {threshold:0.5});

    obsrvItem.observe(item);
    obsrvItem.observe(cart);
    obsrvItem.observe(mobilenav);
};

export {loadcontainer, loadproduct, loadItemcard};