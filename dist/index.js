const menuBtn = document.getElementById('menu-btn');
const navOptions = document.querySelector('.nav-options');
const welcomeText = document.querySelector('.welcome');

const fetchTextData = async () => {
    const responce = await fetch('http://127.0.0.1:3000/main-text');
    const textData = await responce.json()
    console.log(textData)
    const headerText = document.createElement('h1');
    headerText.innerHTML = textData[0].header
    welcomeText.appendChild(headerText)

    const mainText = document.createElement('p');
    mainText.innerHTML = textData[1].text;
    welcomeText.appendChild(mainText)
}
fetchTextData()


menuBtn.addEventListener('click', () => {
    navOptions.classList.toggle('show-menu-drop')
})

