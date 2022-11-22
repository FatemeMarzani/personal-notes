let cart=[]

class Product {
    async getProduct(){
        try {
            const result=await fetch('products.json')
            const data=await result.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }
}

class View {}

class Storage {}


document.addEventListener('DOMContentLoaded',() => {
    const view=new View()
    const product= new Product()
    product.getProduct().then((data)=>console.log(data))
})