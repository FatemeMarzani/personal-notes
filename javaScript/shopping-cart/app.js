let cart=[]

class Product {
    async getProduct(){
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

class View {}

class Storage {}


document.addEventListener('DOMContentLoaded',() => {
    const view=new View()
    const product= new Product()
    product.getProduct().then((data)=>console.log(data))
})