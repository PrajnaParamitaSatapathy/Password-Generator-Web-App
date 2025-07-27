let inputSlider= document.querySelector('[data-lengthSlider]');
const lengthDisplay = document.querySelector("[data-length]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password=""; //because password is initially empty
let passwordLength=10; //because by default count is 10
let checkCount=0;
setIndicator("#ccc");
function handleSlider()
{
  inputSlider.value=passwordLength; //Because initially slider 10 pe hai
  lengthDisplay.textContent=passwordLength; //Because initial value 10 par hai
   const min = inputSlider.min;
  const max = inputSlider.max;
  const percent = ((passwordLength - min) * 100) / (max - min);
  
  inputSlider.style.background = `linear-gradient(to right, var(--vb-violet) ${percent}%, var(--lt-violet) ${percent}%)`;
}
handleSlider();

function setIndicator(color)
{
  indicator.style.backgroundColor=color;
  indicator.style.boxShadow = `0 0 5px 2px ${color}`;

}
function getRndInteger(max,min)
{
  return Math.floor(Math.random()*(max-min))+min;
}
function generateRandomNumber()
{
  return getRndInteger(0,9);
}
function generateLowerCase()
{
  return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase()
{
  return String.fromCharCode(getRndInteger(60,91));
}
function generateSymbol()
{
  let v=getRndInteger(0,symbols.length);
  return symbols.charAt(v);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){
  try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText='copied';
  }
  catch(e)
  {
    copyMsg.innerText='failed';
  }
  copyMsg.classList.add("active");
  setTimeout(()=> {
      copyMsg.classList.remove("active");

  },2000);
}

inputSlider.addEventListener('input',(e)=> {
passwordLength=e.target.value;
handleSlider();
});

copyBtn.addEventListener('click',()=>{
  if(passwordDisplay.value)
    copyContent();
})
function fun()
{
  checkCount=0;
  allCheckBox.forEach((checkbox)=>
  {
    if(checkbox.checked)
      checkCount++;
    
  });
  if(passwordLength<checkCount)
  {
    passwordLength=checkCount;
    handleSlider();
  }
}
allCheckBox.forEach((check)=>{
  check.addEventListener('change',fun);
}
)

generateBtn.addEventListener('click',()=>{
  if(checkCount==0)
    return;
  if(passwordLength<checkCount)
  {
    passwordLength=checkCount;
    handleSlider();
  }
  password="";//purane password ko khali kardiya
  /*
  if(uppercaseCheck.checked)
    password+=generateUpperCase();

  if(lowercaseCheck.checked)
    password+=generateLowerCase();

  if(numbersCheck.checked)
    password+=generateRandomNumber();

  if(symbolsCheck.checked)
    password+=generateSymbol();
  */
 let funArray=[];
 if(uppercaseCheck.checked)
    funArray.push(generateUpperCase);
 if(lowercaseCheck.checked)
    funArray.push(generateLowerCase);
  if(numbersCheck.checked)
    funArray.push(generateRandomNumber);
  if(symbolsCheck.checked)
    funArray.push(generateSymbol);
  function shuffle(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}
for(let i=0;i<funArray.length;i++)
{
  password+=funArray[i]();
}

for(let i=0;i<passwordLength-funArray.length;i++)
{
  let rndi=getRndInteger(0,funArray.length);
  password+=funArray[rndi]();
}
password=shuffle(Array.from(password));
passwordDisplay.value=password;
calcStrength();
})
