
// XEM VÀ LÀM LẠI THEO QUY TRÌNH TỪ CÁC HÀM LẦN LƯỢT: addTodo() -> checkDoneTodos() -> editTodos() -> deleteTodos()

// truy xuất DOM các thành phầm cần thiết

var ul = document.querySelector(".listTodo")
var button = document.querySelector(".buttonAdd")
var input = document.querySelector("input")

// tính năng thêm công việc 

function addTodos() {


    // Tạo thẻ <li> mới để thêm công việc vào danh sách
    var li = document.createElement("li")

    // Thêm nội dung công việc từ input vào trong thẻ <p> và chèn vào thẻ <li>
    li.innerHTML = `<p>${input.value}</p>`

    // Thêm các icon (hoàn thành, chỉnh sửa, xóa) vào trong thẻ <li>
    li.innerHTML += `<div class="icon">
        <i class="fa-solid fa-check"></i>  <!-- Icon check để đánh dấu công việc đã hoàn thành -->
        <i class="fa-solid fa-pen"></i>    <!-- Icon pen để chỉnh sửa công việc -->
        <i class="fa-solid fa-trash"></i>  <!-- Icon thùng rác để xóa công việc -->
      </div>`

    /* Lấy tất cả các công việc hiện có trong danh sách (lấy tất cả thẻ <li> trong <ul>) 
    chuyển về dữ liệu arr để còn sử dụng các phương thức */
    var arrTodoList = [...ul.children];

    // Tạo một mảng chứa toàn bộ nội dung công việc (lấy text từ thẻ <p> của mỗi công việc)
    var textTodos = arrTodoList.map(function (todo) {
        return todo.querySelector('p').innerText;  // Lấy nội dung văn bản từ thẻ <p> của từng công việc
    });

    // Kiểm tra xem công việc nhập vào có trùng với công việc nào đã có trong danh sách hay không
    var check = textTodos.every(function (todo) {
        return input.value != todo  // Nếu không trùng, trả về true. Nếu trùng, trả về false.
    })

    // Nếu công việc không trùng, thêm công việc mới vào danh sách và reset ô input
    if (check) {
        ul.appendChild(li);  // Thêm thẻ <li> mới vào danh sách công việc (<ul>)
        input.value = "";  // Xóa nội dung trong ô input sau khi thêm công việc
    } else {
        // Nếu công việc trùng, hiển thị thông báo và reset ô input
        alert("Công việc này đã tồn tại, nhập công việc khác");
        input.value = "";  // Xóa nội dung trong ô input
    }

    function checkDoneTodos() {
        // Lấy tất cả các icon "check" (được đánh dấu là hoàn thành) từ danh sách todo
        var buttonCheck = document.querySelectorAll(".fa-check");

        // Chuyển đổi NodeList của các icon "check" thành một mảng để dễ thao tác
        var newArrrButtonCheck = [...buttonCheck];

        // Duyệt qua tất cả các icon "check" để thêm sự kiện 'click' cho mỗi icon
        for (var i = 0; i < newArrrButtonCheck.length; i++) {
            newArrrButtonCheck[i].addEventListener("click", function (e) {
                // Khi nhấn vào icon "check", thêm hoặc gỡ bỏ class "checkDone" cho phần tử công việc (thẻ <p>)
                e.target.parentNode.parentNode.childNodes[0].classList.toggle("checkDone");

                // Thay đổi icon "check" thành "rotate-right" để biểu thị rằng công việc đã được hoàn thành
                e.target.classList.toggle("fa-check");
                e.target.classList.toggle("fa-rotate-right");
            });
        }
    }

    // Edit todos
    function editTodos() {
        // Lấy tất cả các icon "pen" từ danh sách todo (dùng để chỉnh sửa)
        var editButtons = document.querySelectorAll(".fa-pen");

        // Duyệt qua từng icon "pen" để thêm sự kiện 'click' cho mỗi icon
        editButtons.forEach((editButton) => {
            editButton.addEventListener("click", function (e) {
                // Lấy phần tử công việc hiện tại mà người dùng muốn chỉnh sửa (todoItem)
                var todoItem = e.target.parentNode.parentNode;

                // Lấy nội dung công việc hiện tại (từ thẻ <p>)
                var todoText = todoItem.querySelector("p");
                var currentText = todoText.innerText;

                // Tạo một input mới với giá trị ban đầu là nội dung công việc hiện tại
                var inputEdit = document.createElement("input");
                inputEdit.type = "text";
                inputEdit.value = currentText;

                // Thay thế thẻ <p> hiện tại bằng input mới (để người dùng có thể chỉnh sửa)
                todoItem.replaceChild(inputEdit, todoText);

                // Thay đổi icon "pen" thành icon "save" để lưu lại công việc sau khi chỉnh sửa
                e.target.classList.remove("fa-pen");
                e.target.classList.add("fa-save");

                // Sau khi người dùng chỉnh sửa xong và nhấn "save", thực hiện lưu thay đổi
                e.target.addEventListener("click", function () {
                    // Lấy nội dung mới từ input
                    var newText = inputEdit.value;

                    // Tạo lại thẻ <p> với nội dung mới
                    var newTodoText = document.createElement("p");
                    newTodoText.innerText = newText;

                    // Thay thế input bằng thẻ <p> mới
                    todoItem.replaceChild(newTodoText, inputEdit);

                    // Chuyển icon "save" trở lại thành icon "pen" sau khi lưu xong
                    e.target.classList.remove("fa-save");
                    e.target.classList.add("fa-pen");
                });
            });
        });
    }

    // Delete todos
    function deleteTodos() {
        // Lấy tất cả các icon "trash" (dùng để xóa) từ danh sách todo
        var deleteButtons = document.querySelectorAll(".fa-trash");

        // Duyệt qua tất cả các icon "trash" để thêm sự kiện 'click' cho mỗi icon
        deleteButtons.forEach((deleteButton) => {
            deleteButton.addEventListener("click", function (e) {
                // Lấy phần tử công việc hiện tại mà người dùng muốn xóa (todoItem)
                var todoItem = e.target.parentNode.parentNode;

                // Xóa phần tử công việc khỏi danh sách (ul)
                ul.removeChild(todoItem);
            });
        });
    }
    editTodos();
    deleteTodos();
    checkDoneTodos()

}

button.addEventListener("click", addTodos)







