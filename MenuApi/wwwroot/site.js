const uri = "api/item";
let items = null;
function getCount(data) {
 const el = $("#counter");
 let name = "to-do";
 if (data) {
 if (data > 1) {
 name = "items";
 }
 el.text(data + " " + name);
 } else {
 el.text("No " + name);
 }
}
$(document).ready(function() {
 getData();
});
function getData() {
 $.ajax({
 type: "GET",
 url: uri,
 cache: false,
 success: function(data) {
 const tBody = $("#items");
 $(tBody).empty();
 getCount(data.length);
 $.each(data, function(key, item) {
 const tr = $("<tr></tr>")
 .append($("<td></td>").text(item.name))
 .append($("<td></td>").text(item.price))
 .append(
 $("<td></td>").append(
 $("<button class='btn btn-success'>Edit</button>").on("click", function() {
 editItem(item.id);
 })
 )
 )
 .append(
 $("<td></td>").append(
 $("<button class='btn btn-danger'>Delete</button>").on("click", function() {
 deleteItem(item.id);
 })
 )
 );
 tr.appendTo(tBody);
 });
 items = data;
 }
 });
}
function addItem() {
 const item = {
 name: $("#add-name").val(),
 price: $("#add-price").val()
 };
 $.ajax({
 type: "POST",
 accepts: "application/json",
 url: uri,
 contentType: "application/json",
 data: JSON.stringify(item),
 error: function(jqXHR, textStatus, errorThrown) {
 alert("Something went wrong!");
 },
 success: function(result) {
 getData();
 $("#add-name").val("");
 $("#add-price").val("");
 }
 });
}
function deleteItem(id) {
 $.ajax({
 url: uri + "/" + id,
 type: "DELETE",
 success: function(result) {
 getData();
 }
 });
}
function editItem(id) {
 $.each(items, function(key, item) {
 if (item.id === id) {
 $("#edit-name").val(item.name);
 $("#edit-id").val(item.id);
 $("#edit-price").val(item.price);
 }
 });
 $("#spoiler").css({ display: "block" });
}
$(".my-form").on("submit", function() {
 const item = {
 name: $("#edit-name").val(),
 price: $("#edit-price").val(),
 id: $("#edit-id").val()
 };
 $.ajax({
 url: uri + "/" + $("#edit-id").val(),
 type: "PUT",
 accepts: "application/json",
 contentType: "application/json",
 data: JSON.stringify(item),
 success: function(result) {
 getData();
 }
 });
 closeInput();
 return false;
});
function closeInput() {
 $("#spoiler").css({ display: "none" });
}