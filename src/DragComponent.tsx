import React, { useEffect } from "react";

const DragComponent = () => {
    useEffect(() => {
        const handleDragStart = (e) => {
            const hideDragImage = e.target.cloneNode(true);
            hideDragImage.id = "hideDragImage-hide";

            const dragImage = e.target.cloneNode(true);
            dragImage.id = "draggeimage";
            dragImage.style.position = "absolute";

            hideDragImage.style.opacity = 0;
            document.body.appendChild(hideDragImage);
            document.body.appendChild(dragImage);
            e.dataTransfer.setDragImage(hideDragImage, 0, 0);
        };

        const handleDragEnd = () => {
            const hideDragImage = document.getElementById("hideDragImage-hide");
            const dragImage = document.getElementById("draggeimage");

            if (hideDragImage) hideDragImage.remove();
            if (dragImage) dragImage.remove();
        };

        const handleDrag = (event) => {
            const dragImage = document.getElementById("draggeimage");
            if (dragImage) {
                dragImage.style.left = event.pageX + "px";
                dragImage.style.top = event.pageY + "px";
            }
        };

        const dragster = document.getElementById("dragster");

        if (dragster) {
            dragster.addEventListener("dragstart", handleDragStart, false);
            dragster.addEventListener("dragend", handleDragEnd, false);
            dragster.addEventListener("drag", handleDrag);
        }

        return () => {
            if (dragster) {
                dragster.removeEventListener("dragstart", handleDragStart);
                dragster.removeEventListener("dragend", handleDragEnd);
                dragster.removeEventListener("drag", handleDrag);
            }
        };
    }, []);

    return (
        <div>
            <div
                id="dragster"
                className="dragdemo"
                draggable="true"
            >
                draggable task
            </div>
        </div>
    );
};

export default DragComponent;