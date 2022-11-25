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

    let match=matchRoutes.find((item)=>{
        return item.isMatch
    })
    if(!match){
        match={route:routes[0], isMatch:true} 
    }



    console.log(match.route.view())
}


document.addEventListener('DOMContentLoaded',()=>{
    router()
})