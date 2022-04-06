AFRAME.registerComponent('button', {
    init: function () {
        var button1 = document.createElement('button')
        button1.innerHTML='Rate Us'
        button1.setAttribute('id','rating_button')
        button1.setAttribute('class','btn btn-warning')
        
        var button2 = document.createElement('button')
        button2.innerHTML='Order Now'
        button2.setAttribute('id','rating_button')
        button2.setAttribute('class','btn btn-warning')

        var buttonDiv=document.getElementById('buttondiv')
        buttonDiv.appendChild(button1)
        buttonDiv.appendChild(button2)
    }
})