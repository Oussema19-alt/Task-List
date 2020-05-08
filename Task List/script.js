//Form Display

(() => {
    const addBtn = document.querySelector('button.add-btn');
    const form = document.querySelector('div.form');
    addBtn.addEventListener('click', () => {
        form.style.display = (form.style.display == "none" || form.style.display == "") ? "block" : "none";
    });
})();

//Input placeholder

(() => {
    const input = document.querySelector('input.add-task');
    input.addEventListener('focus', () => {
        input.placeholder = "";
    });
    input.addEventListener('focusout', () => {
        input.placeholder = "You Are Your Only Limits";
    });
})();

//ADD ROW

(() => {
    document.querySelector('button.confirm-btn').addEventListener('click',
        () => {
            let input = document.querySelector('input[type="text"]');
            if (input.value == "") {
                return
            } else {
                let eventsTable = document.querySelector('table');
                let newRow = eventsTable.insertRow(eventsTable.rows.length);
                let cell0 = newRow.insertCell(0);
                let cell1 = newRow.insertCell(1);
                let cell2 = newRow.insertCell(2);
                cell0 =
                    "<td><span class='active'>" + input.value + "</span></td>";
                cell1 = "<td><button class='delete-btn' onclick='deleteTask(this,this.parentNode.parentNode)'>Delete</button></td>";
                cell2 = "<td><button class='change-btn' onclick='changeTask(this,this.parentNode.parentNode.firstChild.firstChild)'>Change</button></td>";
                input.value = "";
                newRow.innerHTML = cell0 + cell1 + cell2;
                showSpan(newRow);
            }
        });
})();

//Delete Task
deleteTask = (btn, tr) => {
    let task = btn.parentElement.previousSibling.firstChild;
    task.classList.replace("active", "deleted-span");
    setTimeout(() => {
        tr.remove();
    }, 1300);
};

//Change Task
changeTask = (btn, span) => {
    btn.blur();
    if (btn.classList == "change-btn") {
        var input = document.createElement('INPUT');
        input.setAttribute("type", "text");
        input.setAttribute("class", "change-input");
        input.setAttribute("value", "");
        input.autofocus = 1 == 1;
        btn.innerText = "Submit";
        span.appendChild(input);
        btn.classList.replace("change-btn", "submit-btn");
        span.onmouseover = () => {
            span.style.background = "none";
        }

    } else {
        span.onmouseover = () => {
            span.style.background = "rgba(65, 45, 45, 0.2)";
        }
        span.onmouseout = () => {
            span.style.background = "none";
        }
        let text = span.lastChild.value;
        span.lastChild.remove();
        span.innerText = (text === "") ? span.innerText : text;
        btn.classList.replace("submit-btn", "change-btn");
        btn.innerText = "Change";
    }
};

//animations
gsap.from('*', { opacity: 0, duration: 1, y: -30, ease: "ease" });
showSpan = tr => {
    gsap.from(tr, { opacity: 0, duration: .5, y: 30, ease: "ease" });
};