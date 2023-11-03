import {useRef, useState} from "react"
import "./style.css"

function App() {

    const dragItem = useRef()

    const [items, setItems] = useState([
        {id: 1, title: "sdf"},
        {id: 2, title: "sdf"},
        {id: 3, title: "sdf"},
        {id: 4, title: "sdf"},
        {id: 5, title: "sdf"},
        {id: 6, title: "sdf"},
        {id: 7, title: "sdf"},
        {id: 8, title: "sdf"}
    ])

    function handleDragStart(e) {
        dragItem.current = e.target
        e.target.classList.add("drag-item")
    }

    function handleDragOver(e) {
        console.log("over", e.target)
    }


    function handleDragEnd(e) {
        console.log("end", e.target)
        e.target.classList.remove("drag-item")
    }


    return (
        <div>
            <div className="gellery">
                {items.map(item => (
                   <div className="box-root">
                       <div
                           onDragEnd={handleDragEnd}
                           onDragOver={handleDragOver}
                           onDragStart={handleDragStart}
                           draggable={true}
                           className={`box box-${item.id}`}>
                           {item.id}
                       </div>
                   </div>
                ))}
            </div>
        </div>
    )
}

export default App
