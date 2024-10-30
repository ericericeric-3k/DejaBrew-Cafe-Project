const storelocal = () => {
    const allcards = document.querySelectorAll('.bestseller__altcard');

    allcards.forEach(card => {
        card.addEventListener('click', () => {
            let value = card.dataset.product;
            let link = card.dataset.link;

            localStorage.setItem('tempValue', value);
            console.log(value);
            window.location.href = link;
        });
    });
};

export default storelocal;