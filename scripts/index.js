"use strict";

window.onload = init;

function init() {

    let tableData = document.getElementById("coursesDetailsData");

    fetch("http://localhost:8081/api/courses")
        .then(response => response.json())
        .then(courses => {
            for (let i = 0; i < courses.length; i++) {
                let row = tableData.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                cell1.innerHTML = courses[i].dept;
                cell2.innerHTML = courses[i].courseNum;
                cell3.innerHTML = courses[i].courseName;

                const detailsCell = row.insertCell(3);
                let anchor = document.createElement("a");
                anchor.href = `details.html?cid=${courses[i].id}`;
                anchor.text = "See details";
                detailsCell.appendChild(anchor);
                
            }
        });






}