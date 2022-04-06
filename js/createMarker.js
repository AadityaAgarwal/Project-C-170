AFRAME.registerComponent("createmarker", {

    init: async function() {

        var mainScene = document.querySelector("#main-scene");

        //get the dishes collection from firestore database
        var dishes = await this.getDishes();

        dishes.map(dish => {
            var marker = document.createElement("a-marker");
            marker.setAttribute("id", dish.id);
            console.log("dishid: ", dish.id)
            marker.setAttribute("type", "pattern");
            marker.setAttribute("url", dish.marker_pattern_url);
            console.log("url: ", dish.marker_pattern_url)
            marker.setAttribute("cursor", {
                rayOrigin: "mouse"
            });

            //set the markerhandler component
            marker.setAttribute("markerhandler", {});
            mainScene.appendChild(marker);

            // Adding 3D model to scene
            var model = document.createElement("a-entity");

            model.setAttribute("id", `model-${dish.id}`);
            console.log("position: ", dish.model_geometry.position)
            console.log("position: ", dish.model_geometry.scale)
            model.setAttribute("position", dish.model_geometry.position);
            model.setAttribute("rotation", dish.model_geometry.rotation);
            model.setAttribute("scale", dish.model_geometry.scale);
            model.setAttribute("gltf-model", `url(${dish.model_url})`);
            model.setAttribute("gesture-handler", {});
            marker.appendChild(model);

            // Ingredients Container
            var mainPlane = document.createElement("a-plane");
            mainPlane.setAttribute("id", `main-plane-${dish.id}`);
            console.log("mainplaneid", dish.id)
            mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
            mainPlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            mainPlane.setAttribute("width", 1.7);
            mainPlane.setAttribute("height", 1.5);
            marker.appendChild(mainPlane);

            // Dish title background plane
            var titlePlane = document.createElement("a-plane");
            titlePlane.setAttribute("id", `title-plane-${dish.id}`);
            titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
            titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            titlePlane.setAttribute("width", 1.69);
            titlePlane.setAttribute("height", 0.3);
            titlePlane.setAttribute("material", { color: "black" });
            mainPlane.appendChild(titlePlane);

            // Dish title
            var dishTitle = document.createElement("a-entity");
            dishTitle.setAttribute("id", `dish-title-${dish.id}`);
            dishTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
            dishTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            dishTitle.setAttribute("text", {
                font: "monoid",
                color: "white",
                width: 1.8,
                height: 1,
                align: "center",
                value: dish.dish_name
            });
            console.log("dish name", dish.dish_name)
            titlePlane.appendChild(dishTitle);

            // Ingredients List
            var ingredients = document.createElement("a-entity");
            ingredients.setAttribute("id", `ingredients-${dish.id}`);
            ingredients.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
            ingredients.setAttribute("rotation", { x: 0, y: 0, z: 0 });
            ingredients.setAttribute("text", {
                font: "monoid",
                color: "black",
                width: 2,
                align: "left",
                value: `${dish.ingredients }`
            });
            mainPlane.appendChild(ingredients);
        });
    },
    //function to get the dishes collection from firestore database
    getDishes: async function() {
        return await firebase
            .firestore()
            .collection("dishes")
            .get()
            .then(snap => {
                return snap.docs.map(doc => doc.data());
            });
    }
});