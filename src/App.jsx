import { useRef, useState } from "react";
import "./style.css";

function App() {
    const dragItem = useRef();
    const [items, setItems] = useState([
        { id: 1, title: "item 1", image: "/images/image-1.webp" },
        { id: 2, title: "item 2", image: "/images/image-2.webp" },
        { id: 3, title: "item 3", image: "/images/image-3.webp" },
        { id: 4, title: "item 4", image: "/images/image-4.webp" },
        { id: 5, title: "item 5", image: "/images/image-5.webp" },
        { id: 6, title: "item 6", image: "/images/image-6.webp" },
        { id: 7, title: "item 7", image: "/images/image-7.webp" },
        { id: 8, title: "item 8", image: "/images/image-8.webp" },
        { id: 9, title: "item 9", image: "/images/image-9.webp" },
        { id: 10, title: "item 10", image: "/images/image-10.jpeg" },
        { id: 11, title: "item 11", image: "/images/image-11.jpeg" },
    ]);

    const [draggedItem, setDraggedItem] = useState(null);

    function handleDragStart(e, id) {
        dragItem.current = id;
        setDraggedItem(id);
        e.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(e) {
        e.preventDefault();
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
        setDraggedItem(null);
    }

    return (
        <div>
            <div className="gallery">
                {items.map((item) => (
                    <div key={item.id} className="box-root">
                        <div
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, item.id)}
                            draggable={true}
                            className={`box box-${item.id} ${draggedItem === item.id ? "dragging" : ""}`}
                        >
                            <img src={item.image} alt=""/>
                        </div>
                        {draggedItem === item.id && (
                            <div className="dragged-placeholder">
                                <div className={`box box-${draggedItem} dragged`}>
                                    {item.title}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}

export default App;
