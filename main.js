const navSLide = () => {
    const menu = document.querySelector("#hamburger");
    const nav = document.querySelector(".nav-links");


    //get the hamburger image element
    const hamburgerImage = document.querySelector("#hamburgerImage");

    //add an onclick event to the hamburger button
    menu.addEventListener("click", () => {
        nav.classList.toggle("nav-active");

        //toggle hamburger image element when the nav is active
        nav.classList.contains("nav-active") ?
            (hamburgerImage.src = "assets/images/close.svg") :
            (hamburgerImage.src = "assets/images/open.svg");


    });
};

navSLide();