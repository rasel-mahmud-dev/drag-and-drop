import { useRef, useState } from "react";
import "./style.css";

function App() {
    const dragItem = useRef();
    const [items, setItems] = useState([
        { id: 1, title: "item 1" },
        { id: 2, title: "item 2" },
        { id: 3, title: "item 3" },
        { id: 4, title: "item 4" },
        { id: 5, title: "item 5" },
        { id: 6, title: "item 6" },
        { id: 7, title: "item 7" },
        { id: 8, title: "item 8" }
    ]);
    const [dragging, setDragging] = useState(null); // Added dragging state

    function handleDragStart(e, id) {
        dragItem.current = id;
        setDragging(id); // Set the currently dragging item
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
        setDragging(null); // Reset the currently dragging item after dropping
    }

    return (
        <div>
            <div className="gallery">
                {items.map((item) => (
                    <div key={item.id} className="box-root">
                        <div key={item.id} className="box-root">
                            <div
                                onDragStart={(e) => handleDragStart(e, item.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, item.id)}
                                draggable={true}
                                className={`box box-${item.id} ${dragging === item.id ? "dragging" : ""}`}
                            >
                                {item.title}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
