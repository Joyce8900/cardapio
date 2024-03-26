const menu = document.getElementById("menu");
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer= document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const adress = document.getElementById("adress")
const adressWarn = document.getElementById("adress-warn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCount = document.getElementById("cart-count")
const cartBtn = document.getElementById("cart-btn")
const checkoutBtn = document.getElementById("checkout-btn")

var cart = []

//Abrir modal
cartBtn.addEventListener("click", ()=>{
    updateCartMordal();
    cartModal.style.display = "flex"
    
})
//Fechar modal
cartModal.addEventListener("click",(event)=>{
    if(event.target === cartModal){
        cartModal.style.display = "none"
    }
})

//Fechar modal através de click no botão fechar

closeModalBtn.addEventListener("click", ()=>{
    cartModal.style.display="none"
})

menu.addEventListener("click", (event)=>{
    let paretButton = event.target.closest(".add-to-cart-btn")
    //pegar os atributos nome e preço ao clicar em adicionar
    if(paretButton){
        const name = paretButton.getAttribute("data-name")
        const price = parseFloat(paretButton.getAttribute("data-price"))
        addToCart(name, price)


    }

})

//Função para adicionar no carrinho
const addToCart = (name, price)=>{
    const existingItem = cart.find(item => item.name === name)
    if(existingItem){
        //se o item já existir, aumente a quantidade +1
        existingItem.quantity +=1 
    }
    else{
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCartMordal()
   
}

//atualizar o carrinho

const updateCartMordal = ()=>{
    cartItemsContainer.innerHTML = "";
    let total = 0;


    cart.forEach(item =>{
        const cartElement = document.createElement("div");
        cartElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        cartElement.innerHTML = `
        <div class= "flex items-center justify-between">
            <div>
                <p class= "font-medium">${item.name} </p>
                <p>Quant: ${item.quantity} </p>
                <p class= "font-medium mt-2">R$ ${item.price.toFixed(2)} </p>
            </div>
            
                <button class="remover-from-cart" data-name="${item.name}">
                    Remover
                </button>
            
        </div>
        `

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartElement)
    })
    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });
    cartCount.innerHTML = cart.length;
}

//função para remover item do carrinho
cartItemsContainer.addEventListener("click",()=>{
    if (event.target.classList.contains("remover-from-cart")){
        const name = event.target.getAttribute("data-name")
        console.log(name)
        removerItemCart(name)
    }
})
const removerItemCart= (name)=>{
    const index = cart.findIndex(item => item.name === name)
    
    if(index !== -1){
        const item = cart[index]
        

        if (item.quantity > 1){
            item.quantity -= 1;
            updateCartMordal()
            }
        else{
            cart.splice(index, 1);
            updateCartMordal()
        }
    
        updateCartMordal()
    
    }

   
}
adress.addEventListener("input", (event)=>{
    let inputValue = event.target.value;

    if(inputValue !== ""){
        adress.classList.remove("border-red-500")
        adressWarn.classList.add("hidden")
    }
})

checkoutBtn.addEventListener("click", ()=>{
    // const isOpen = checkRestaurantOpen();
    // if (!isOpen){
    //     alert("RESTAURANTE FECHADO NO MOMENTO")
    //     return;
    // }

    // if(cart.length === 0)return;
    if(adress.value=== ""){
        adressWarn.classList.remove("hidden")
        adress.classList.add("border-red-500")
        return
    }
    
    //Enviar o pedido para a api whats
    const cartItens = cart.map((item)=>{
        return(
            `${item.name}- Quantidade: (${item.quantity}) | Preço: R$${item.price} | `
        )
    }).join("")
    const message = encodeURIComponent(cartItens)
    const phone = "5584999271376"
    window.open(`https://wa.me/${phone}?text=${message} Endereço ${adress.value}`, "_blank")
})

//verificar a hora e manipular o card horario
const checkRestaurantOpen = () => {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}
