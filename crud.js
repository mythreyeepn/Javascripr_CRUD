var selectedRow = null
// var formData;
document.getElementById("addForm").style.display = "none";
var sampleDate = [
    { fullName: "Ashley", age: "22", occupation: "Teacher", sin: "222-777-888" },
    { fullName: "Jack", age: "24", occupation: "Captain", sin: "333-777-555" },
    { fullName: "Sparrow", age: "26", occupation: "Marine", sin: "666-111-678" },
    { fullName: "Mini", age: "25", occupation: "Developer", sin: "232-767-654" },
    { fullName: "Genie", age: "30", occupation: "Magician", sin: "452-436-435" }
];
function onPageLoad() {
    for (var i = 0; i < sampleDate.length; i++) {
        insertNewRecord(sampleDate[i]);
    }
}
onPageLoad();

function onFormSubmit() {
    if (validate() && (document.getElementById("AgeValidationError").classList.contains("hide")) && (document.getElementById("SINValidationError").classList.contains("hide"))) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}


function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["age"] = document.getElementById("age").value;
    formData["occupation"] = document.getElementById("occupation").value;
    formData["sin"] = document.getElementById("sin").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.age;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.occupation;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.sin;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick = "onEdit(this)">Edit</a>
                        <a onClick = "onDelete(this)">Delete</a>`;
    ListDisplay()
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("occupation").value = "";
    document.getElementById("age").value = "";
    document.getElementById("sin").value = "";
    selectedRow = null;
}

function onEdit(td) {
    addFunc();
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("age").value = selectedRow.cells[1].innerHTML;
    document.getElementById("occupation").value = selectedRow.cells[2].innerHTML;
    document.getElementById("sin").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.age;
    selectedRow.cells[2].innerHTML = formData.occupation;
    selectedRow.cells[3].innerHTML = formData.sin;
    ListDisplay()
}

function onDelete(td) {
    if (confirm('Are you sure you wa nt to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    }
    else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

function checkLength() {
    isnumValid = true;
    if (document.getElementById("fullName").age == "") {
        isnumValid = false;
        document.getElementById("AgeValidationError").classList.remove("hide");
    }
    else {
        if (document.getElementById("age").value < 1 || document.getElementById("age").value > 101) {
            isnumValid = false;
            document.getElementById("AgeValidationError").classList.remove("hide");
        }
        else {
            isnumValid = true;
            if (!document.getElementById("AgeValidationError").classList.contains("hide"))
                document.getElementById("AgeValidationError").classList.add("hide");
        }
    }
    return isnumValid;


}

function checkSsn() {
    var RE_SSN = /^[0-9]{3}[\- ]?[0-9]{3}[\- ]?[0-9]{3}$/;
    var ssn = document.getElementById("sin").value;
    if (ssn) {
        if (RE_SSN.test(ssn)) {
            if (!document.getElementById("SINValidationError").classList.contains("hide")) {
                document.getElementById("SINValidationError").classList.add("hide");
            }
            return true;
        } else {
            document.getElementById("SINValidationError").classList.remove("hide");
            return false;
        }
    } else {
        return false;
    }

}

function addFunc() {
    document.getElementById("tabel_id").style.display = "none";
    document.getElementById("add_btn").style.display = "none";
    document.getElementById("addForm").style.display = "block";
}
function ListDisplay() {
    document.getElementById("tabel_id").style.display = "block";
    document.getElementById("add_btn").style.display = "block";
    document.getElementById("addForm").style.display = "none";
}

function sorttable(n) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}