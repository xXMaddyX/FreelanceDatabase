const dataBase = document.querySelector('.database');

const menuBtn = document.getElementById('menu-btn');
const navOptions = document.querySelector('.nav-options');

const bowBtn = document.getElementById('bow-btn');
const bowOptions = document.querySelector('.bow-options');

let isFetching = false;

//-----------------Event Listener Buttons Dropdowns--------------------->
menuBtn.addEventListener('click', () => {
    navOptions.classList.toggle('show-menu-drop');
});
bowBtn.addEventListener('click', () => {
    bowOptions.classList.toggle('show-bow-options');
});

//------------------------Data Routing Links---------------------------->
const manufacturerDataRoutes = {
    bearArchery: "compoundbeararchery",
    pse: "compoundpse"
};

//-----------------------Helper Functions------------------------------->
const createDataParagraph = (text) => {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    return paragraph;
};

const createDataContainer = (dataItem) => {
    const container = document.createElement('div');
    container.classList.add("data-container");

    const headingData = `<div class="heading-data">
                            <h2>${dataItem.Manufacturer}</h2>
                            <h3>${dataItem.Model}</h3>
                         </div>`;

    const textData = document.createElement('div');
    textData.classList.add('text-container');
    
    const skipObjects = ["_id", "Manufacturer", "Model"]
    for (const key in dataItem) {
        if (!skipObjects.includes(key)) {
            textData.appendChild(createDataParagraph(`| ${key}: ${dataItem[key]} |`));
        };
    };
    
    container.innerHTML = headingData;
    container.appendChild(textData);

    return container;
};

//------------------------Fetch Database------------------------------->
const fetchCompoundData = async (bowRoute) => {
    if (isFetching === true) {
        console.log("Data Loading");
        return;
    }

    isFetching = true;

    try {
        const response = await fetch(`http://127.0.0.1:3000/get-db/${bowRoute}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data)
        if (data.length === 0) {
            console.log('No data found');
            isFetching = false;
            return;
        }

        let itemProcessed = 0;

        data.forEach((item, index) => {
            setTimeout(() => {
                const dataContainer = createDataContainer(item);
                dataBase.appendChild(dataContainer);
                itemProcessed++;
                if (itemProcessed === data.length) {
                    isFetching = false;
                }
            },100 * index)
        });
    } catch (err) {
        console.error("Error loading data: ", err);
        isFetching = false;
    }
};

const resetDbContainer = () => {
    dataBase.innerHTML = "";
}

//-----------------------DB Load Buttons------------------------------->
document.querySelector('.bow-manufacturer').addEventListener('click', (event) => {
    const targetElement = event.target;

    if (targetElement.classList.contains('bow-drop-text')) {
        resetDbContainer();
        switch (targetElement.id) {
            case 'bear-archery':
                fetchCompoundData(manufacturerDataRoutes.bearArchery);
                break;
            case 'pse':
                fetchCompoundData(manufacturerDataRoutes.pse);
                break;
            //To Do --- Other Manufacturers
        }
        bowOptions.classList.toggle('show-bow-options');
    }
});