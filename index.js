let cartBtns = document.querySelectorAll(".add-cart");
let cartTitle = document.querySelector(".cart-title");
let cartItemsList = document.querySelector(".cart-items-list");
let totalItems = 0;
let confirmOrder = document.getElementById('confirmorder');
let Total = document.querySelector('.total');
let totalprice = 0;
let again = `🛒Add to Cart`;

window.onload = function() {
    toggleConfirmOrderButton(); 
};

function calculateTotalItems() {
    totalItems = Array.from(cartItemsList.querySelectorAll('.item-quantity'))
        .reduce((sum, qtyElement) => sum + parseInt(qtyElement.innerText), 0);
    updateCartTitle();
}




function updateCartTitle(){
    cartTitle.innerHTML = `Your Cart(${totalItems})`;
}

 
function toggleConfirmOrderButton() {
    if (totalItems < 1) {
        confirmOrder.style.display = 'none'; 
        Total.style.display = 'none';
    } else {
        confirmOrder.style.display = 'block';  
        Total.style.display = 'block';
    }
}


function updateTotal(){
    Total.innerHTML = `Total = $${totalprice.toFixed(2)}`;
}





function updateCartList(itemName, qty, pricePerItem) {
    let existingItem = cartItemsList.querySelector(`[data-item="${itemName}"]`);
    let totalItemPrice = qty * pricePerItem;
    
    if (qty === 0) {
        if (existingItem) {
           
            let priceToRemove = parseFloat(existingItem.querySelector('.item-total-price').innerText.replace('$', ''));
            totalprice -= priceToRemove;
            existingItem.remove();
           
 
            updateTotal();
            calculateTotalItems(); 
            updateCartTitle();
            toggleConfirmOrderButton();
        }
    } else {
        if (existingItem) {
            
            let previousQty = parseInt(existingItem.querySelector('.item-quantity').innerText);
            totalprice += (qty - previousQty) * pricePerItem;
            existingItem.querySelector('.item-quantity').innerText = `${qty}x`;
            existingItem.querySelector('.item-total-price').innerText = `$${totalItemPrice.toFixed(2)}`;
            updateTotal();
            calculateTotalItems();
        } else {
            
            let newItem = document.createElement('li');
            newItem.setAttribute('data-item', itemName);
            newItem.innerHTML = `
                <span class="item-name">${itemName}</span><br>
                <span class="item-quantity">${qty}x</span> 
                <span class="priceper">@ $${pricePerItem.toFixed(2)}</span>
                <span class="item-total-price">$${totalItemPrice.toFixed(2)}</span>
                <button class="delete-item">✖</button> 
            `;
            cartItemsList.appendChild(newItem); 
            totalprice += qty * pricePerItem;
            updateTotal();
            calculateTotalItems();
            updateCartTitle();
            
            
            let deleteBtn = newItem.querySelector(".delete-item");
            deleteBtn.addEventListener('click', function () {
                let priceToRemove = parseFloat(newItem.querySelector('.item-total-price').innerText.replace('$', ''));
                totalprice -= priceToRemove;

                newItem.remove();    
                updateTotal();
                calculateTotalItems();
                toggleConfirmOrderButton();

                let correspondingButton = Array.from(cartBtns).find(btn => 
                    btn.nextElementSibling.innerHTML === itemName 
                );
                if(correspondingButton){
                    correspondingButton.classList.remove('active');
                     correspondingButton.innerHTML = `<button class = "rendr"> 🛒Add to Cart</button>`;
                    if (!correspondingButton.classList.contains('active')){
                        updateCartBtn();
                         
                    }
                
                        
                }
              
                

                
            });
        }
    }
    toggleConfirmOrderButton();
}

function updateCartBtn(){

cartBtns.forEach(function(cartBtn) {
        cartBtn.addEventListener('click', function some() {
        let qty = 0;
        qty++;
        
        let itemName = cartBtn.nextElementSibling.innerHTML; 
        let priceElement = cartBtn.nextElementSibling.nextElementSibling.nextElementSibling; 
        let pricePerItem = parseFloat(priceElement.innerText.replace('$', ''));
        updateCartList(itemName, qty, pricePerItem);
        updateTotal();
       
       
        cartBtn.classList.add('active');
        cartBtn.innerHTML = `<span id="decre">-</span> <span id="qty">1</span> <span id="incre">+</span>`;
        updateCartList(itemName, qty, pricePerItem);

        let qtyElement = cartBtn.querySelector('#qty');

        
        cartBtn.querySelector('#decre').addEventListener('click', function () {
            if (qty > 0) {
                qty--;
                qtyElement.innerHTML = qty;
                calculateTotalItems();
                updateTotal();
                updateCartList(itemName, qty, pricePerItem);
            }
            if (qty < 1) {
                cartBtn.classList.remove('active')
               
                cartBtn.innerHTML = `<button class = "rendr"> 🛒Add to Cart</button>`;
                cartBtn.querySelector('.rendr').addEventListener('click',some);
                
                    
            }
            toggleConfirmOrderButton();
        });

        
        cartBtn.querySelector('#incre').addEventListener('click', function () {
            qty++;
            qtyElement.innerText = qty;
            calculateTotalItems();
            updateTotal();            
            updateCartList(itemName, qty, pricePerItem);
            toggleConfirmOrderButton();
        });

       cartBtn.removeEventListener('click', arguments.callee);  
    });


});

}
updateCartBtn();




let modal = document.querySelector(".modal");
let modalList = document.querySelector(".modal-list");
let modalTotal = document.querySelector(".modal-total");
let startNewOrderBtn = document.querySelector(".modal-button");
let textTotal = 'Order Total';

confirmOrder.addEventListener('click', function() {
    
    modalList.innerHTML = '';

    
    let cartItems = document.querySelectorAll('.cart-items-list li');
    cartItems.forEach(item => {
        let itemName = item.querySelector('.item-name').innerText;
        let itemQty = item.querySelector('.item-quantity').innerText;
        let itemPrice = item.querySelector('.item-total-price').innerText;
        
        let modalpriceper = document.querySelector('.price').innerText;
        let totalPrice = `${totalprice.toFixed(2)}`
       
        modalTotal.innerHTML = ` <span class='texttotal'>${textTotal}</span>$${totalPrice}`;
        let listItem = document.createElement('li');
        listItem.innerHTML = `<span class='modalitemname'>${itemName}</span><br><span class='modalitemqty'> ${itemQty}</span> <span class ='modalpriceper'>@ ${modalpriceper}</span><span class='modalitemprice'> ${itemPrice}</span>`;
        modalList.appendChild(listItem);
    });

    
    
    

   
    modal.style.display = "block";
});


startNewOrderBtn.addEventListener('click', function() {
    location.reload(); 
});



