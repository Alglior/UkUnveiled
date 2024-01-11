const containers = document.querySelectorAll(".container-top, .container-bottom");
    const categoryContents = document.querySelectorAll(".category");

    containers.forEach(container => {
        const categoryButtons = container.querySelectorAll("button");
        categoryContents[0].style.display = "block"; // Show the first category initially

        // Hide the other categories initially
        for (let i = 1; i < categoryContents.length; i++) {
            categoryContents[i].style.display = "none";
        }

        categoryButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                // Hide all category contents
                categoryContents.forEach(content => {
                    content.style.display = "none";
                });

                // Show the selected category content
                categoryContents[index].style.display = "block";
            });
        });
    });