import {useRef, useState} from "react";
import "./style.css";

function App() {
    const dragItem = useRef();
    const dragItemFull = useRef({});
    const [items, setItems] = useState([
        {id: 1, title: "item 1", image: "/images/image-1.webp"},
        {id: 2, title: "item 2", image: "/images/image-2.webp"},
        {id: 3, title: "item 3", image: "/images/image-3.webp"},
        {id: 4, title: "item 4", image: "/images/image-4.webp"},
        {id: 5, title: "item 5", image: "/images/image-5.webp"},
        {id: 6, title: "item 6", image: "/images/image-6.webp"},
        {id: 7, title: "item 7", image: "/images/image-7.webp"},
        {id: 8, title: "item 8", image: "/images/image-8.webp"},
        {id: 9, title: "item 9", image: "/images/image-9.webp"},
        {id: 10, title: "item 10", image: "/images/image-10.jpeg"},
        {id: 11, title: "item 11", image: "/images/image-11.jpeg"},
    ]);

    const [draggedItem, setDraggedItem] = useState(null);
    const [dropItem, setDropItem] = useState(null);

    function handleDrag(e) {
        const dragImage = document.getElementById("draggeimage");
        if (dragImage) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            dragImage.style.left = `${mouseX}px`;
            dragImage.style.top = `${mouseY}px`;
        }
    }

    function handleDragStart(e, id, item) {
        dragItem.current = id;
        dragItemFull.current = item;
        setDraggedItem(id);
        e.dataTransfer.effectAllowed = "move";

        const parentDiv = e.target.closest('.box');

        const hideDragImage = parentDiv.cloneNode(true);
        hideDragImage.id = "hideDragImage-hide";

        const dragImage = parentDiv.cloneNode(true);
        dragImage.id = "draggeimage";
        dragImage.classList.add("floating-image");
        dragImage.style.position = "absolute";

        hideDragImage.style.opacity = 0;
        document.body.appendChild(hideDragImage);
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(hideDragImage, 0, 0);
        // setItems(prev=> prev.map((item) => item.id !== id))
    }

    function handleDragEnd() {
        const hideDragImage = document.getElementById("hideDragImage-hide");
        const dragImage = document.getElementById("draggeimage");

        if (hideDragImage) hideDragImage.remove();
        if (dragImage) dragImage.remove();

        setDraggedItem(null);
        setDropItem(null)
    }

    function handleDragOver(e, ele) {
        setDropItem(ele.id)
        if (ele.id !== dragItem.current) {

            const dragItemId = dragItem.current;
            const updatedItems = [...items];

            const draggedItemIndex = updatedItems.findIndex((item) => item.id === dragItemId);
            const dropTargetIndex = updatedItems.findIndex((item) => item.id === ele.id);

            const draggedItem = updatedItems[draggedItemIndex];
            updatedItems.splice(draggedItemIndex, 1);
            updatedItems.splice(dropTargetIndex, 0, draggedItem);

            setItems(updatedItems);
        }
    }

    function handleDrop(e, id) {
        e.preventDefault();

        const dragItemId = dragItem.current;
        const updatedItems = [...items];

        const draggedItemIndex = updatedItems.findIndex((item) => item.id === dragItemId);
        const dropTargetIndex = updatedItems.findIndex((item) => item.id === id);

        const draggedItem = updatedItems[draggedItemIndex];
        updatedItems.splice(draggedItemIndex, 1);
        updatedItems.splice(dropTargetIndex, 0, draggedItem);

        setItems(updatedItems);
        handleDragEnd();


    }

    return (
        <div>
            <div className="gallery">
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        onDrag={handleDrag}
                        onDragStart={(e) => handleDragStart(e, item.id, item)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleDragOver(e, item)}
                        onDrop={(e) => handleDrop(e, item.id)}
                        draggable={true}
                        className={`box box-${item.id} ${draggedItem === item.id ? "dragging" : ""}  ${item.id === dropItem ? "dropping" : ""}`}

                    >
                        <div>
                            <img src={item.image} alt={item.title}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
