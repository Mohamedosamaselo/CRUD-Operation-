
let productName = document.getElementById('productName');
let productPrice = document.getElementById('productPrice');
let productCategory = document.getElementById('productCategory');
let productDescription = document.getElementById('productDescription');
let tableBody = document.getElementById('tableBody')
let addBtn = document.getElementById('addBtn');
let updateBtn = document.getElementById('updateBtn');
console.log(addBtn, updateBtn);

//handel refresh
var productContainer = [];
var currentIndex;

//Check on localStorage and handling Error 
if (localStorage.getItem('products') !== null)//zbon adiemmmm
{
  productContainer = JSON.parse(localStorage.getItem('products'));
  display(productContainer)
}



//addProducts
function AddProduct() {
  if (productNameValidation() == true & productPriceValidation() == true) {

    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDescription.value,
    }
    productContainer.push(product);
    localStorage.setItem('products', JSON.stringify(productContainer))
    display(productContainer)
    clear()
  }
}
// display products
function display(Array) {
  var cartona = ``
  for (var i = 0; i < Array.length; i++) {
    cartona += `
<tr>
      <td>${Array[i].name}</td>
      <td>${Array[i].price}</td>
      <td>${Array[i].category}</td>
      <td>${Array[i].description}</td>
      <td><button onclick="setformForUpdate(${i})" class="btn btn-info">update</button></td>
      <td><button class="btn btn-info" onclick='deleteProduct(${i})'>Delete</button></td>
</tr>
`
  }
  document.getElementById('tableBody').innerHTML = cartona
}
//////////////////////////////// clear Method 
function clear() {
  productName.value = ""
  productPrice.value = ""
  productCategory.value = ""
  productDescription.value = ""
};
////////////////////////////////  Delete Method
function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);//Splice(Start  , Delete Count ? ,  )
  localStorage.setItem('products', JSON.stringify(productContainer));//Overriding on LocalStorage 
  display(productContainer);
}
//////////////////////////////// Search  Method
function search(word) {
  var matchedProducts = []
  for (var i = 0; i < productContainer.length; i++) {
    //Check on the SearchTerm Value in ProductContainer 
    if (productContainer[i].name.toLowerCase().includes(word.toLowerCase()) === true) {
      matchedProducts.push(productContainer[i])
    }
  }
  display(matchedProducts)
}
//////////////////////////////// update Method 

//stepOne =>  setformForUpdate
function setformForUpdate(i) {
  var CurrentProduct = productContainer[i]
  //1. set data in the form  
  productName.value = productContainer[i].name
  productPrice.value = productContainer[i].price
  productCategory.value = productContainer[i].category
  productDescription.value = productContainer[i].description
  //2. save current index in global variavle 

  currentIndex = i
  //3. d-none for addBtn & d-block for  updateBtn
  addBtn.classList.replace('d-block', 'd-none');
  updateBtn.classList.replace('d-none', 'd-block');
}

//stepTwo => update
function updateProduct() {
  var product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    description: productDescription.value,
  }
  productContainer.splice(currentIndex, 1, product);// To Delete the Current Data of Product and Add New Data 
  localStorage.setItem('products', JSON.stringify(productContainer))// Override on the Value of LocalStorage 
  display(productContainer)
  clear()
  updateBtn.classList.replace('d-block', 'd-none');
  addBtn.classList.replace('d-none', 'd-block');
}

////////////////////////////////////////////////   validation 

//name validation
function productNameValidation() {
  var pNameAlert = document.getElementById('pNameMssg')
  var regexName = /^[A-Z][a-z]{3,}$/
  var pNamevalue = productName.value
  if (regexName.test(pNamevalue) == true) 
  { // InputData Is vaild
    productName.classList.add('is-valid')
    productName.classList.remove('is-invalid')
    pNameAlert.classList.add('d-none')
    addBtn.classList.remove('disabled')
    return true
  } else 
  {//InputData is Invalid
    productName.classList.add('is-invalid')
    productName.classList.remove('is-valid')
    pNameAlert.classList.remove('d-none')
    addBtn.classList.add('disabled')

    return false

  }
}

//price validation

function productPriceValidation() {
  var pPriceAlert = document.getElementById('pNameMssg')// localScope 
  var regexPrice = /^[1-9]{3,}$/
  var pPricevalue = productPrice.value
  if (regexPrice.test(pPricevalue) == true)// Test Method Check On the Value , It Return True if the value Valid and Viseverse. 
   { //InputData Is Valid 
    productPrice.classList.add('is-valid');
    productPrice.classList.remove('is-invalid');
    pPriceMssg.classList.add('d-none');
    addBtn.classList.remove('disabled');

    return true;
  }
   else
    {// InputData Is InValid
    productPrice.classList.add('is-invalid');
    productPrice.classList.remove('is-valid');
    pPriceMssg.classList.remove('d-none');
    addBtn.classList.add('disabled');

    return false;

  }
}


//
