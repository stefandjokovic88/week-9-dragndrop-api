document.addEventListener("DOMContentLoaded", () => {

//add another list
const addAnotherList = document.querySelector(".add-another-list");

function addList() {
    const lists = document.querySelector(".lists");
    var listCont = document.createElement("div");
    listCont.classList.add("list-and-button");
    listCont.innerHTML = `
    <div class="list">
        <div class="list-name">
            <p class="list-title">List name</p>
            <div class="icons">
                <img src="images/close-icon.png" alt="close-icon" class="close-icon">
            </div>
        </div>
    </div>
    <button class="add-card-template">+ Add a card</button>`;
    lists.appendChild(listCont);

//call show card template
    let addCardTemplate = document.querySelectorAll(".add-card-template");

    addCardTemplate.forEach(button => {
        button.addEventListener('click', showCardTemplate);
     });

//call edit list function
    let listTitles = document.querySelectorAll(".list-title");
    let saveBtn = document.querySelector(".save");
    let modal = document.getElementById("modal");
    let modalInput = document.querySelector(".modal-input");

        listTitles.forEach(listTitle => {
            listTitle.addEventListener("click", () => {
                modal.style.display = "flex";
                saveBtn.onclick = () => {
                    listTitle.innerHTML = modalInput.value;
                    modal.style.display = "none"; 
                    modalInput.value = "";
                }
               
            });
        }) 

//call delete list function
const removeIcons = document.querySelectorAll(".close-icon");
const listAndButtons = document.querySelectorAll(".list-and-button");

listAndButtons.forEach(listAndButton => {
    listAndButton.addEventListener("click", () => {
        removeIcons.forEach(removeIcon => {
            removeIcon.onclick = () => {
                listAndButton.style.display = "none";
            }
            
        })
    });
});

}
addAnotherList.addEventListener("click", addList);


//show card template
    const addCardTemplate = document.querySelectorAll(".add-card-template");
    const cardTemplate = document.querySelector(".card-template");
    addCardTemplate.forEach(button => {
        button.addEventListener('click', showCardTemplate);
     });

     function showCardTemplate(event) {
        
            if (cardTemplate.style.display == "flex") {
                cardTemplate.style.display = "none";
            }
            else {
                const listContainer = event.target.parentElement;
                cardTemplate.style.display = "flex";
                listContainer.appendChild(cardTemplate);
            }
     }

//close card template
    const close = document.querySelector(".close");
    function closeCardTemplate() {
        cardTemplate.style.display = "none";
    }

    close.addEventListener("click", closeCardTemplate);

//add card
    const addCard = document.querySelectorAll(".add-card");
     addCard.forEach(button => {
        button.addEventListener('click', addingCards); 
    });

    const input = document.getElementById("card-template-input");
    function addingCards(event) {
        const listContainer = event.target.parentElement.parentElement.parentElement.childNodes[1];
    
        

        if (input.value == "") {
            alert("Enter card name!");
        }
            else {
            //create div card
                const newDiv = document.createElement("div");
                newDiv.classList.add("card");
                newDiv.draggable = "true";
                newDiv.classList.add("card-class");
            //create card content in card
                const newDivP = document.createElement("p");
                newDivP.classList.add("card-content");
                newDivP.style.cursor = "pointer";
                newDiv.appendChild(newDivP);
                newDivP.innerHTML = input.value;
            //create close icon in card
                const newDivImg = document.createElement("img");
                newDivImg.src = "images/close-icon.png";
                newDivImg.classList.add("close-icon");
                newDivImg.classList.add("close-icon-card");
                newDiv.appendChild(newDivImg);

                listContainer.appendChild(newDiv);
                cardTemplate.style.display = "none";
                input.value = "";
            }
    
        moveCard();
    }


//edit list
        const listTitles = document.querySelectorAll(".list-title");
        const saveBtn = document.querySelector(".save");
        const modal = document.getElementById("modal");
        const modalInput = document.querySelector(".modal-input");

        listTitles.forEach(listTitle => {
            listTitle.addEventListener("click", () => {
                modal.style.display = "flex";
                saveBtn.onclick = () => {
                    if (modalInput.value == "") {
                        alert("Enter list name!");
                    }
                    else {
                        listTitle.innerHTML = modalInput.value;
                        modal.style.display = "none"; 
                        modalInput.value = "";
                    }
                    
                }
               
            });
        }) 


//delete list
        const removeIcons = document.querySelectorAll(".close-icon");
        const listAndButtons = document.querySelectorAll(".list-and-button");

        listAndButtons.forEach(listAndButton => {
            listAndButton.addEventListener("click", () => {
                removeIcons.forEach(removeIcon => {
                    removeIcon.onclick = () => {
                        listAndButton.style.display = "none";
                    }
                    
                })
            });
        });

//close list modal
    let iconCloseModal = document.querySelector(".close-modal");

    function closeModal() {
        modal.style.display = "none";
    }
    iconCloseModal.addEventListener("click", closeModal);

//close list modal on outside click
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        } 
    }


//move card + modal

//move card
    function moveCard() {

        let cards = document.querySelectorAll('.card');
        let lists = document.querySelectorAll('.list');


        cards.forEach((card)=>{
            registerEventsOnCard(card);
        });

        lists.forEach((list)=>{
            list.addEventListener('dragover', (e)=>{
                e.preventDefault();
                let draggingCard = document.querySelector('.dragging');
                let cardAfterDraggingCard = getCardAfterDraggingCard(list, e.clientY);
                if(cardAfterDraggingCard){
                    cardAfterDraggingCard.parentNode.insertBefore(draggingCard, cardAfterDraggingCard);
                } else {
                    list.appendChild(draggingCard);
                }
                
            });
        });

    function getCardAfterDraggingCard(list, yDraggingCard){

        let listCards = [...list.querySelectorAll('.card:not(.dragging)')];

        return listCards.reduce((closestCard, nextCard)=>{
            let nextCardRect = nextCard.getBoundingClientRect();
            let offset = yDraggingCard - nextCardRect.top - nextCardRect.height /2;

            if(offset < 0 && offset > closestCard.offset){
                return {offset, element: nextCard}
            } else {
                return closestCard;
            }
        
        }, {offset: Number.NEGATIVE_INFINITY}).element;

    }

    function registerEventsOnCard(card){
        card.addEventListener('dragstart', (e)=>{
            card.classList.add('dragging');
        });


        card.addEventListener('dragend', (e)=>{
            card.classList.remove('dragging');
        });
    }
        
    
//edit card
    let modal = document.getElementById("modal");
    let modalInput = document.querySelector(".modal-input");
    let saveBtn = document.querySelector(".save");
    let cardContents = document.querySelectorAll(".card-content");

    cardContents.forEach(cardContent => {
        cardContent.addEventListener("click", () => {
            modal.style.display = "flex";
            saveBtn.onclick = () => {
                if (modalInput.value == "") {
                    alert("Enter card name!");
                }
                else { 
                    cardContent.innerHTML = modalInput.value;
                    modal.style.display = "none"; 
                    modalInput.value = "";
                }
                
            }
        });
    }) 

//delete card
    const removeCards = document.querySelectorAll(".close-icon-card");

    removeCards.forEach(removeCard => {
        removeCard.addEventListener("click", () => {
            cards.forEach(card => {
                card.onclick = () => {
                    card.style.display = "none";
                }
                
            })
        });
    });

//close card modal
    const iconCloseModal = document.querySelector(".close-modal");

    function closeModal() {
        modal.style.display = "none";
    }
    iconCloseModal.addEventListener("click", closeModal);

//close card modal on outside click
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        } 
    }
}

//local storage
// const data = [];
// function dataForLocalStorage() {
//     data.length = 0;
//     const all_column = document.querySelectorAll(".list");

//     all_column.forEach((column, index) => {
//         const title = column.querySelector(".list-title").textContent;
//         const cardItems = column.querySelectorAll(".card");
//         const cardItemsContent = [];

//         cardItems.forEach((item) => {
//             return cardItemsContent.push(item.textContent);
//         });
//         data.push({ index: index, title: title, items: cardItemsContent });
//     });
//     localStorage.setItem("data", JSON.stringify(data));
// }

// window.addEventListener("load", function () {
//     const dataFromStorage = localStorage.getItem("data");
//     console.log(dataFromStorage);
//     const parsedData = JSON.parse(dataFromStorage);
//     const columns = document.querySelectorAll(".list");

//     parsedData.forEach((column, index) => {
//         const currAddACard = columns.item(index).querySelector(".add-card-template");
//         column.items.forEach(item => {
//             const itemDiv = document.createElement("div");
//             itemDiv.innerHTML = `<div class="card card-class" draggable="true"><p class="card-content" style="cursor: pointer;">${item}</p><img src="images/close-icon.png" class="close-icon close-icon-card"></div>`;
//             columns.item(index).insertBefore(itemDiv, currAddACard);
//         })
        

        // const removeCards = document.querySelectorAll(".close-icon-card");
        // let cards = document.querySelectorAll(".card");
        // removeCards.forEach(removeCard => {
        //     removeCard.addEventListener("click", () => {
        //         cards.forEach(card => {
        //             card.onclick = () => {
        //                 card.style.display = "none";
        //             }
                    
        //         })
        //     });
        // });


//     })
    
// })
});
