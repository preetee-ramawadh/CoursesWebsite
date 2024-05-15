"use strict";

window.onload = init;

function init(){

    let tableData = document.getElementById("coursesDetailsData");

    fetch("http://localhost:8081/api/courses")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let row = tableData.insertRow(-1);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);

            cell1.innerHTML = data[i].dept;
            cell2.innerHTML = data[i].courseNum;
            cell3.innerHTML = data[i].courseName;
        }
    });


}