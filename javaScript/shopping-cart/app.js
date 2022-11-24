const productDOM=document.querySelector('.products-center')
const cartItems=document.querySelector('.cart-items')
const cartTotal=document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartBtn=document.querySelector('.cart-btn')
const closeCartBtn=document.querySelector('.close-cart')
const clearCartBtn=document.querySelector('.clear-cart')

let cart=[]

class Product {
    async getProducts(){
        try {
            const result=await fetch('products.json')
            const data=await result.json()
            let products=data.items
            products=products.map((item)=>{
                const {title,price}=item.fields
                const {id}=item.sys
                const image=item.fields.image.fields.file.url
                return {title,price,id,image}
            })
            return products
        } catch (error) {
            console.log(error)
        }
    }
}

class View {
    displayProducts(products){
       let result=``
       products.forEach(item => {
        result+=`
            <article class="product">
            <div class="img-container">
                <img
                    src=${item.image}
                    alt=${item.title}
                    class="product-img"
                />
                <button class="bag-btn" data-id=${item.id}>افزودن به سبد خرید</button>
            </div>
            <h3>${item.title}</h3>
            <h4>${item.price}﷼</h4>
            </article>`
       });
       productDOM.innerHTML=result
    }
    getCartButtons(){
        const buttons=[...document.querySelectorAll('.bag-btn')]
        buttons.forEach((item)=>{
            let id=item.dataset.id
            item.addEventListener('click',(event)=>{
                let cartItem={...Storage.getProduct(id), amount: 1}
                cart=[...cart,cartItem]
                Storage.saveCart(cart)

                this.setCartValues(cart)

                this.addCartItem(cartItem)

                this.showCart()
            })

        })
    }
    setCartValues(cart){
        let totalPrice=0
        let totalItem=0
        cart.map((item)=>{
            totalPrice=totalPrice+((item.price)*(item.amount))
            totalItem=totalItem+item.amount
        })
        cartTotal.innerHTML=totalPrice
        cartItems.innerHTML=totalItem
        console.log(totalPrice)
        console.log(totalItem)
    }
    addCartItem(item) {
        const div = document.createElement('div')
        div.classList.add('cart-item')
    
        div.innerHTML = `
        <img src=${item.image} alt=${item.title} />
        <div>
          <h4>${item.title}</h4>
          <h5>${item.price}</h5>
          <span class="remove-item" data-id=${item.id}>حذف</span>
        </div>
        <div>
          <i class="fas fa-chevron-up" data-id=${item.id}></i>
          <p class="item-amount">${item.amount}</p>
          <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>
        `
        cartContent.appendChild(div)
    }

    showCart() {
        cartOverlay.classList.add('transparentBcg')
        cartDOM.classList.add('showCart')
    }

    hideCart() {
        cartOverlay.classList.remove('transparentBcg')
        cartDOM.classList.remove('showCart')
    }

    initApp(){
        cart=Storage.getCart()
        this.setCartValues(cart)
        this.populate(cart)

        cartBtn.addEventListener('click',this.showCart)
        closeCartBtn.addEventListener('click',this.hideCart)
    }

    populate(cart){
        cart.forEach((item)=>{
            return this.addCartItem(item)
        })
    }
    cartProcess(){
        clearCartBtn.addEventListener('click',()=>{
            return this.clearCart()
        })

        cartContent.addEventListener('click',(event)=>{
            if(event.target.classList.contains('remove-item')){
                let removeItem=event.target
                let id=removeItem.dataset.id
                
                cartContent.removeChild(removeItem.parentElement.parentElement)
                this.removeProduct(id)
            }
            if(event.target.classList.contains('fa-chevron-up')){
                let addAmount=event.target
                let id=addAmount.dataset.id
                
                let product=cart.find((item)=>{
                    return item.id===id
                })

                product.amount=product.amount+1

                this.setCartValues(cart)
                Storage.saveCart(cart)

                addAmount.nextElementSibling.innerText=product.amount

            }
        })
    }
    clearCart(){
        let cartItems=cart.map((item)=>{
            return item.id
        })
        cartItems.forEach((item)=>{
            this.removeProduct(item)
        })

        while(cartContent.children.length>0){
            cartContent.removeChild(cartContent.children[0])
        }
    }

    removeProduct(productId){
        cart=cart.filter((item)=>{
            return item.id !== productId
        })
        this.setCartValues(cart)
        Storage.saveCart(cart)

    } 
}

class Storage {
    static saveProducts(products){
        localStorage.setItem('products',JSON.stringify(products))
    }
    static getProduct(id){
        let products=JSON.parse(localStorage.getItem('products'))
         return products.find((item)=> item.id===id)
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart))
    }
    static getCart(){
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
}


document.addEventListener('DOMContentLoaded',() => {
    const view=new View()
    const product= new Product()

    view.initApp()
    product.getProducts().then((data)=>{
        view.displayProducts(data)
        Storage.saveProducts(data)

    })
    .then(()=>{
        view.getCartButtons()
        view.cartProcess()
    })
    
})