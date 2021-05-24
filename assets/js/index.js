if(window.location.pathname == "/update-user") {
    document.querySelector("#updation-form button").addEventListener("click",function(event) {
        event.preventDefault();
        let values = $("#updation-form").serializeArray(); // array of objects - each object has name and value of inputs in form
        let data = {};
        values.map((obj) => {
            data[obj.name] = obj.value;
        });
        const id = data.id;
        const putMethod = {
            method: 'PUT', // Method itself
            headers: {
            'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(data) // We send data in JSON format
        }
        fetch("http://localhost:3000/api/users/" + String(id),putMethod)
        .then(res => {
            alert("Updated successfully.");
        })
        .catch(err => {
            console.log(err);
        })
    })
}

if(window.location.pathname == "/") {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click",function(event) {
            if(confirm("Do you really want to delete this record?")) {
                let id = btn.dataset.id;
                const deleteMethod = {
                    method: 'DELETE'
                };
                fetch("http://localhost:3000/api/users/" + id,deleteMethod)
                .then(res => {
                    window.location.reload();
                    alert("Deleted successfully.");
                })
                .catch(err => {
                    console.log(err);
                })
            }
        })
    })
}