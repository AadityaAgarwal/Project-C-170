AFRAME.registerComponent('createmarkers',{
    init:async function(){
        var mainScene=document.querySelector('#main-scene')
        var toys=await this.getAllToys()
        toys.map(toy=>{
            var marker=document.createElement('a-marker')
            marker.setAttribute('id',toy.id)
            marker.setAttribute('type','pattern')
            marker.setAttribute('url',toy.marker_pattern_url)
            marker.setAttribute('cursor',{rayOrigin:'mouse'})
            marker.setAttribute('markerhandler',{})
            mainScene.appendChild(marker)

            var model=document.createElement('a-entity')
            model.setAttribute('id',`model-${toy.id}`)
            model.setAttribute('position',toy.model_geometry.position)
            model.setAttribute('rotation',toy.model_geometry.rotation)
            model.setAttribute('scale',toy.model_geometry.scale)
            model.setAttribute('gltf-model',`url(${toy.model_url})`)
            model.setAttribute('gesture-handler',{})
            model.setAttribute('animation-mixer',{})
            marker.appendChild(model)

            var main_plane= document.createElement('a-plane')
            var title_plane= document.createElement('a-plane')

            main_plane.setAttribute("id",`main_plane_${toy.id}`)
            main_plane.setAttribute('position',{x:0,y:0,z:0})
            main_plane.setAttribute('rotation',{x:-90,y:0,z:0})
            main_plane.setAttribute('width','1.5')
            main_plane.setAttribute('height','2')

            marker.setAttribute(main_plane)

            title_plane.setAttribute("id",`title_plane_${toy.id}`)
            title_plane.setAttribute('position',{x:0,y:1,z:0.05})
            title_plane.setAttribute('rotation',{x:-90,y:0,z:0})
            title_plane.setAttribute('width','1.5')
            title_plane.setAttribute('height','1')

            marker.setAttribute(title_plane)

            var age_group_toy=document.createElement('a-entity')

            age_group_toy.setAttribute('id',`age_group_toy_${toy.id}`)
            age_group_toy.setAttribute('position',{x:0,y:1,z:0.1})
            age_group_toy.setAttribute('rotation',{x:0,y:0,z:0})
            age_group_toy.setAttribute('text',{color:'black',font:'monoid', value:`AGE GROUP: ${toy.age_group}`, width:'2', height:'1',align:'center'})

            title_plane.appendChild(age_group_toy)

            var toy_description=document.createElement('a-entity')
            toy_description.setAttribute('id',`ingredient_${toy.id}`)
            toy_description.setAttribute('position',{x:0.3,y:0,z:0.1})
            toy_description.setAttribute('rotation',{x:0,y:0,z:0})
            toy_description.setAttribute('text',{color:'black',font:'monoid', value:`Description: ${toy.description}`, width:'2', height:'1',align:'center'})
            main_plane.appendChild(toy_description)
        })
    },

    getAllToys:async function(){
        return await firebase
            .firestore()
            .collection("toys")
            .get()
            .then(snap => { return snap.docs.map(doc =>  doc.data() ) })
    },
})