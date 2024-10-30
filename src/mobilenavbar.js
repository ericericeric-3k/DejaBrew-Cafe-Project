let mobilenavIsopen = false;

const bodyevent = () => {
    const mobilenavbar = document.querySelector('#navbar-icon');
    const mobilenavcontent = document.querySelector('.mobilenav_container');
    const bodyfilter = document.querySelector('#filter');


    mobilenavbar.addEventListener('click', () => {
        console.log('early');
        return;
    });
    
        document.addEventListener('click', () => {
            console.log("Debugging");
    
            if(mobilenavIsopen){
                mobilenavIsopen = !mobilenavIsopen;
                mobilenavcontent.style.display = 'none';
                bodyfilter.classList.remove('active-filter');
                document.body.style.overflowY = 'auto';
            }
        });

    
};

const mobilenav = () => {
    const mobilenavbar = document.querySelector('#navbar-icon');
    const mobilenavcontent = document.querySelector('.mobilenav_container');
    const bodyfilter = document.querySelector('.body-filter');

    mobilenavbar.addEventListener('click', (event) => {
        mobilenavIsopen = !mobilenavIsopen;
        console.log(mobilenavIsopen);

        event.stopPropagation();

        if(mobilenavIsopen){
            mobilenavcontent.style.display = 'flex';
            bodyfilter.classList.add('active-filter');
            document.body.style.overflowY = 'hidden';
            bodyevent();         
        } else {
            mobilenavcontent.style.display = 'none';
            bodyfilter.classList.remove('active-filter');
            document.body.style.overflowY = 'auto';
        }

        
       
    }); 
};






export default mobilenav;
// export {bodyevent};
