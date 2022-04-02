AFRAME.registerComponent('markerhandler',{
    init:async function(){
        this.el.addEventListener('markerFound',()=>{
            console.log("marker is found")
            this.handleMarkerFound()
        })
        this.el.addEventListener('markerLost',()=>{
            console.log("marker is lost")
            this.handleMarkerLost()
        })
    },

    handleMarkerFound:function(){
        var button_div=document.getElementById('button-div')
        button_div.style.display='flex'

        rating_button=document.getElementById('rating-button')
        rating_button.addEventListener('click',function(){
            swal({
                title:'Rate The toy',
                icon:'warning',
                text:"Work in progress...",
            })
        },)

        order_button=document.getElementById('order-button')
        order_button.addEventListener('click',function(){
            swal({
                title:'Thank You for ordering!!',
                icon:'success',
                text:"Your toy will be delivered shortly!",
            })
        },)
    },
    handleMarkerLost:function(){
        var button_div=document.getElementById('button-div')
        button_div.style.display='none'
    },
})