import homePage from "./pages/homePage.js"
import lastPosts from "./pages/lastPosts.js"
import lastVideos from "./pages/lastVideos.js"

const navTo=(url)=>{
    history.pushState(null,null,url)
    router()
}
const router=()=>{
    const routes=[
        {path:'/',view:homePage},
        {path:'/last-videos',view:lastVideos},
        {path:'/last-posts',view:lastPosts}
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
    document.querySelector('#app').innerHTML=match.route.view()
}
window.addEventListener('popstate',router)

document.addEventListener('DOMContentLoaded',()=>{
    document.body.addEventListener('click',(event)=>{
        if(event.target.matches('[data-link]')){
            event.preventDefault()
            navTo(event.target.href)
        }
    })
    router()
})