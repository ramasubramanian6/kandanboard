const plus = document.querySelector(".add");
const notes = document.querySelector(".window");
let flag = true;
let ticket_color_selector = "green";
let tickets = localStorage.getItem("Ticket") ? JSON.parse(localStorage.getItem("Ticket")) : [];

plus.addEventListener('click', function () {
    if (flag) {
        plus.style.color = "blue";
        notes.style.display = "flex";
        flag = false;
    } else {
        plus.style.color = "black";
        notes.style.display = "none";
        flag = true;
    }
});

const body1 = document.querySelector(".stick");
const textarea1 = document.querySelector("#textarea");

function new_notes(ticket_color, user_text, taskid, yesadd) {
    const ticket = document.createElement("div");
    ticket.setAttribute("class", "note1");
    ticket.innerHTML = `
        <div class="notes">
            <div class="pad">
                <div class="ncolor" style="background-color: ${ticket_color};"></div>
                <div class="no">TaskId - ${taskid}</div>
                <div class="text">${user_text} </div>
                <div class="lock">
                    <i class="fa-solid fa-lock"></i>
                </div> 
            </div>
        </div>`;

    removal(ticket, taskid);
    handlelock(ticket, taskid);
    body1.appendChild(ticket);
    handleColor(ticket, taskid);
    if (yesadd) {
        tickets.push({ ticket_color, user_text, taskid });
        localStorage.setItem("Ticket", JSON.stringify(tickets));
    }
}

if (localStorage.getItem("Ticket")) {
    const data = JSON.parse(localStorage.getItem("Ticket"));
    data.forEach((t) => {
        if (t.ticket_color) new_notes(t.ticket_color, t.user_text, t.taskid, false);
    });
}

notes.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const user_input = textarea1.value;
        const taskid = shortid();
        new_notes(ticket_color_selector, user_input, taskid, true);
        textarea1.value = "";
        notes.style.display = "none";
        plus.style.color = "black"; 
        flag = true;
    }
});

const allcolor = document.querySelectorAll(".color");

allcolor.forEach((colorElement) => {
    colorElement.addEventListener("click", () => {
        allcolor.forEach((c) => {
            c.classList.remove("active");
            c.style.borderColor = 'black';
            c.style.borderWidth = '0.1px';
        });

        colorElement.classList.add("active");
        colorElement.style.borderColor = 'blue';
        colorElement.style.borderWidth = '2.7px';
        ticket_color_selector = colorElement.classList[0];
    });
});

const delbut = document.querySelector(".remove-btn");
let flag1 = true;
delbut.addEventListener("click", () => {
    if (flag1) {
        delbut.style.color = 'red';
        flag1 = false;
    } else {
        delbut.style.color = "black";
        flag1 = true;
    }
});

function removal(ticket, taskid) {
    ticket.addEventListener('click', () => {
        if (flag1 == false) {
            ticket.remove();
            tickets = tickets.filter((t) => t.taskid !== taskid);
            localStorage.setItem("Ticket", JSON.stringify(tickets));
        }
    });
}

function handlelock(ticket, taskid) {
    const lock = ticket.querySelector(".lock");
    const lockicon = lock.children[0];
    const textarea2 = ticket.querySelector(".text");

    lockicon.addEventListener("click", () => {
        if (lockicon.classList.contains("fa-lock")) {
            lockicon.classList.remove("fa-lock");
            lockicon.classList.add("fa-lock-open");
            textarea2.setAttribute("contenteditable", "true");
        } else {
            lockicon.classList.remove("fa-lock-open");
            lockicon.classList.add("fa-lock");
            textarea2.setAttribute("contenteditable", "false");
            const sel_ticket = tickets.find((t) => t.taskid === taskid);
            const text = textarea2.innerText;
            sel_ticket.user_text = text;

            const db = JSON.parse(localStorage.getItem("Ticket"));
            db.forEach((t) => {
                if (t.taskid === sel_ticket.taskid) {
                    t.user_text = text;
                }
            });
            localStorage.setItem("Ticket", JSON.stringify(db));
        }
    });
}

const colorList = ["rgb(0, 128, 0)", "rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(0, 0, 0)"];

function handleColor(ticket, taskid) {
    const sel_col = ticket.querySelector(".ncolor");

    sel_col.addEventListener('click', () => {
        const computedStyle = getComputedStyle(sel_col);
        let currentColor = computedStyle.backgroundColor;
        let index = colorList.findIndex((color) => color === currentColor);
        let new_index = (index + 1) % colorList.length;
        sel_col.style.backgroundColor = colorList[new_index];
        const sel_ticket = tickets.find(t => t.taskid === taskid);
        if (sel_ticket) {
            sel_ticket.ticket_color = colorList[new_index];
            const db = JSON.parse(localStorage.getItem("Ticket"));
            db.forEach((t) => {
                if (t.taskid === sel_ticket.taskid) {
                    t.ticket_color = colorList[new_index];
                }
            });
            localStorage.setItem("Ticket", JSON.stringify(db));
        }
    });
}

const Allcolors = document.querySelectorAll("body > header > nav > div > div.function > div.color");

Allcolors.forEach((e) => {
    e.addEventListener('click', function () {
        const sel_color = e.classList[0];
        const filter_tickets = tickets.filter((t) => t.ticket_color === sel_color);
        body1.innerHTML = "";
        filter_tickets.forEach((ticket) => new_notes(ticket.ticket_color, ticket.user_text, ticket.taskid, false));
    });
});

Allcolors.forEach((e) => {
    e.addEventListener('dblclick', function () {
        body1.innerHTML = "";
        tickets.forEach((ticket) => {
            new_notes(ticket.ticket_color, ticket.user_text, ticket.taskid, false);
        });
    });
});
