const tabs = document.querySelector('.catalog-tabs');
const tabs_control = tabs.querySelector('.nav-tabs');

const infoBlocks = {
    "contact-tab" : tabs.querySelector('#reviev'),
    spec : tabs.querySelector('#technic'),
    "profile-tab" : tabs.querySelector('#options'),
    "material-tab" : tabs.querySelector('#material'),
}

let activeSpace = infoBlocks["contact-tab"];
const showClasses = ['active', 'show'];

tabs_control.addEventListener('click', (e) => {
    if(e.target.matches('.nav-link')) {
    //     console.log('work')
        if(activeSpace) activeSpace.classList.remove(...showClasses);

        const id = e.target.id;
        activeSpace = infoBlocks[id];
        activeSpace.classList.add(...showClasses);
    }
})