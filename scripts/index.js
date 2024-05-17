"use strict";

window.onload = init;

function init() {

    getListOfCourses();

    const urlParams = new URLSearchParams(location.search);
    // location.search returns the query string part of the URL
    let cid = -1;
    if (urlParams.has("cid") === true) {
        cid = urlParams.get("cid")
        // call a method that fetches this course
        getCourse(cid);
    }

}

function getListOfCourses() {
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

function getCourse(cid) {

    fetch('http://localhost:8081/api/courses/' + cid)
        .then(response => response.json())
        .then(course => {
            // this returns a single course!
            const container = document.getElementById("courseContainerDiv");
            // display one course property in a <p>
            const deptP = document.createElement('p');
            deptP.textContent = `Name: ${course.dept}`;
            container.appendChild(deptP);

            const courseNumP = document.createElement('p');
            courseNumP.textContent = `Course Num: ${course.courseNum}`;
            container.appendChild(courseNumP);

            const courseNameP = document.createElement('p');
            courseNameP.textContent = `Course Name: ${course.courseName}`;
            container.appendChild(courseNameP);

            const instructorP = document.createElement('p');
            instructorP.textContent = `Instructor: ${course.instructor}`;
            container.appendChild(instructorP);

            const startDateP = document.createElement('p');
            startDateP.textContent = `Start Date: ${course.startDate}`;
            container.appendChild(startDateP);

            const numDaysP = document.createElement('p');
            numDaysP.textContent = `Number of Days: ${course.numDays}`;
            container.appendChild(numDaysP);
        })
        .catch(error => {
            // handle errors that occurred during the fetch request
            console.log("error occurred");
        });
}

function btnNewCourseClicked() {

    location.replace("newcourse.html");

}

function btnAddClicked() {

    // Create JSON object to include in the request body
    let bodyData = {
        dept: document.getElementById("dept").value,
        courseNum: document.getElementById("courseNum").value,
        courseName: document.getElementById("courseName").value,
        instructor: document.getElementById("instructor").value,
        startDate: document.getElementById("startDate").value,
        numDays: document.getElementById("noOfDays").value
    }

    // Send the request
    fetch("http://localhost:8081/api/courses", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => {
            // If the POST finishes successfully, display a message with the newly assigned id
            let message = "Course " + json.id + " added";
            let confirmationMessage = document.getElementById("confirmationMessage");
            confirmationMessage.innerHTML = message;

            location.replace("index.html");
        })
        .catch(err => {
            // If the POST returns an error, display a message
            let confirmationMessage = document.getElementById("confirmationMessage");
            confirmationMessage.innerHTML = "Unexpected error";
        });

}