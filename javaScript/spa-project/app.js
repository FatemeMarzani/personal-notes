const router=()=>{
    const routes=[
        {path:'/',view:()=>{console.log("/")}},
        {path:'/last-videos',view:()=>{console.log("/last-videos")}},
        {path:'/last-posts',view:()=>{console.log("/last-posts")}}
    ]
    const matchRoutes=routes.map((item)=>{
        return{
            route : item,
            isMatch: location.pathname === item.path
        }
    })

    console.log(matchRoutes)
}


document.addEventListener('DOMContentLoaded',()=>{
    router()
})