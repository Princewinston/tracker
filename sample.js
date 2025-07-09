// sample.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addForm");
  const tableBody = document.querySelector("table tbody");
  const searchInput = document.querySelector(".search input");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const pname = document.getElementById("pname").value.trim();
    const pid = document.getElementById("pid").value.trim().toUpperCase();
    const pstock = parseInt(document.getElementById("pstock").value);
    const preorder = parseInt(document.getElementById("preorder").value);

    if (!pname || !pid || isNaN(pstock) || isNaN(preorder)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const status =
      pstock === 0
        ? "Out of Stock"
        : pstock < preorder
        ? "Low Stock"
        : "Sufficient";

    const statusClass =
      status === "Out of Stock"
        ? "status-out"
        : status === "Low Stock"
        ? "status-low"
        : "status-sufficient";

    const now = new Date();
    const formattedTime = now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${pname}</td>
      <td>${pid}</td>
      <td>${pstock}</td>
      <td>${preorder}</td>
      <td class="${statusClass}">${status}</td>
      <td>${formattedTime}</td>
      <td class="actions">
        <button class="add-btn">➕ Add</button>
        ${pstock > 0 ? '<button class="remove-btn">➖ Remove</button>' : ''}
      </td>
    `;

    tableBody.appendChild(newRow);
    form.reset();
  });

  // Dynamic Add/Remove
  tableBody.addEventListener("click", function (e) {
    const row = e.target.closest("tr");
    const stockCell = row.children[2];
    const reorderCell = row.children[3];
    const statusCell = row.children[4];
    const lastUpdatedCell = row.children[5];

    if (!stockCell || !statusCell) return;

    let stock = parseInt(stockCell.textContent);
    const reorder = parseInt(reorderCell.textContent);

    if (e.target.classList.contains("add-btn")) {
      stock++;
    } else if (e.target.classList.contains("remove-btn")) {
      if (stock > 0) stock--;
    } else return;

    stockCell.textContent = stock;

    const newStatus =
      stock === 0
        ? ["Out of Stock", "status-out"]
        : stock < reorder
        ? ["Low Stock", "status-low"]
        : ["Sufficient", "status-sufficient"];

    statusCell.textContent = newStatus[0];
    statusCell.className = newStatus[1];

    const now = new Date();
    lastUpdatedCell.textContent = now.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // If row had no remove-btn and stock > 0, add it
    if (stock === 1 && !row.querySelector(".remove-btn")) {
      const actions = row.querySelector(".actions");
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "➖ Remove";
      removeBtn.className = "remove-btn";
      actions.appendChild(removeBtn);
    }

    // If stock drops to 0, remove remove-btn
    if (stock === 0) {
      const removeBtn = row.querySelector(".remove-btn");
      if (removeBtn) removeBtn.remove();
    }
  });

  // Search Filter
  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach((row) => {
      const pname = row.children[0].textContent.toLowerCase();
      const pid = row.children[1].textContent.toLowerCase();
      row.style.display = pname.includes(keyword) || pid.includes(keyword) ? "" : "none";
    });
  });
});

// Logout handler
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}
