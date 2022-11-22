const productDOM=document.querySelector('.products-center')
const cartItems=document.querySelector('.cart-items')
const cartTotal=document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
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
}


document.addEventListener('DOMContentLoaded',() => {
    const view=new View()
    const product= new Product()
    product.getProducts().then((data)=>{
        view.displayProducts(data)
        Storage.saveProducts(data)

    })
    .then(()=>{
        view.getCartButtons()
    })
    
})