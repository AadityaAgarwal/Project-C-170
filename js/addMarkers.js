AFRAME.registerComponent("create-markers", {

    init: async function() {

        var mainScene = document.querySelector("#main-scene");

        //get the toys collection from firestore database
        var toys = await this.gettoys();

        toys.map(toy => {
            var marker = document.createElement("a-marker");
            marker.setAttribute("id", toy.id);
            console.log("toyid: ", toy.id)
            marker.setAttribute("type", "pattern");
            marker.setAttribute("url", toy.marker_pattern_url);
            console.log("url: ", toy.marker_pattern_url)
            marker.setAttribute("cursor", {
                rayOrigin: "mouse"
            });

            //set the markerhandler component
            marker.setAttribute("markerhandler", {});
            mainScene.appendChild(marker);

            // Adding 3D model to scene
            var model = document.createElement("a-entity");

            model.setAttribute("id", `model-${toy.id}`);
            console.log("position: ", toy.model_geometry.position)
            console.log("position: ", toy.model_geometry.scale)
            model.setAttribute("position", toy.model_geometry.position);
            model.setAttribute("rotation", toy.model_geometry.rotation);
            model.setAttribute("scale", toy.model_geometry.scale);
            model.setAttribute("gltf-model", `url(${toy.model_url})`);
            model.setAttribute("gesture-handler", {});
            marker.appendChild(model);

            // description Container
            var mainPlane = document.createElement("a-plane");
            mainPlane.setAttribute("id", `main-plane-${toy.id}`);
            console.log("mainplaneid", toy.id)
            mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
            mainPlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            mainPlane.setAttribute("width", 1.7);
            mainPlane.setAttribute("height", 1.5);
            marker.appendChild(mainPlane);

            // toy title background plane
            var titlePlane = document.createElement("a-plane");
            titlePlane.setAttribute("id", `title-plane-${toy.id}`);
            titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
            titlePlane.setAttribute("rotation", { x: 90, y: 0, z: 0 });
            titlePlane.setAttribute("width", 1.69);
            titlePlane.setAttribute("height", 0.3);
            titlePlane.setAttribute("material", { color: "black" });
            mainPlane.appendChild(titlePlane);

            // toy title
            var toyTitle = document.createElement("a-entity");
            toyTitle.setAttribute("id", `toy-title-${toy.id}`);
            toyTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
            toyTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            toyTitle.setAttribute("text", {
                font: "monoid",
                color: "white",
                width: 1.8,
                height: 1,
                align: "center",
                value: toy.toy_name
            });
            console.log("toy name", toy.toy_name)
            titlePlane.appendChild(toyTitle);

            // Description List
            var description = document.createElement("a-entity");
            description.setAttribute("id", `description-${toy.id}`);
            description.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
            description.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            description.setAttribute("text", {
                font: "monoid",
                color: "black",
                width: 2,
                align: "left",
                value: `${toy.description}`
            });
            mainPlane.appendChild(description);
        });
    },
    //function to get the toys collection from firestore database
    gettoys: async function() {
        return await firebase
            .firestore()
            .collection("toys")
            .get()
            .then(snap => {
                return snap.docs.map(doc => doc.data());
            });
    }
});