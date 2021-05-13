/**
 * 
 */
$(document).ready(function()
{ 
 $("#alertSuccess").hide(); 
 $("#alertError").hide(); 
}); 



// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{ 
	
// Clear alerts---------------------
 $("#alertSuccess").text(""); 
 $("#alertSuccess").hide(); 
 $("#alertError").text(""); 
 $("#alertError").hide(); 

// Form validation-------------------
var status = validateProductForm(); 
if (status != true) 
 { 
 $("#alertError").text(status); 
 $("#alertError").show(); 
 return; 
 } 

// If valid------------------------
var type = ($("#hidProduct_idSave").val() == "") ? "POST" : "PUT"; 
 $.ajax( 
 { 
	 url : "ProductsAPI", 
	 type : type, 
	 data : $("#formProduct").serialize(), 
	 dataType : "text", 
	 complete : function(response, status) 
 { 
		 onProductSaveComplete(response.responseText, status); 
 } 
 });
 
});


//Product save

function onProductSaveComplete(response, status)
{ 
if (status == "success") 
 { 
 	var resultSet = JSON.parse(response); 

	 if (resultSet.status.trim() == "success") 
	 { 
		 $("#alertSuccess").text("Successfully saved."); 
		 $("#alertSuccess").show(); 
	
		 $("#divProductGrid").html(resultSet.data); 
	 } else if (resultSet.status.trim() == "error") 
	 { 
		 $("#alertError").text(resultSet.data); 
		 $("#alertError").show(); 
	 } 
	 } else if (status == "error") 
	 { 
		 $("#alertError").text("Error while saving."); 
		 $("#alertError").show(); 
	 } else
	 { 
		 $("#alertError").text("Unknown error while saving.."); 
		 $("#alertError").show(); 
	 }
		 $("#hidProduct_idSave").val(""); 
		 $("#formProduct")[0].reset(); 
}
 


function validateProductForm()
{
// CODE
if ($("#Product_code").val().trim() == "")
 {
 return "Insert Product Code.";
 }
// NAME
if ($("#Product_name").val().trim() == "")
 {
 return "Insert Product Name.";
 }
// PRICE-------------------------------
if ($("#Price").val().trim() == "")
 {
 return "Insert Product Price.";
 }
// is numerical value
var tmpPrice = $("#Price").val().trim();
if (!$.isNumeric(tmpPrice))
 {
 	return "Insert a numerical value for Product Price.";
 }
// convert to decimal price
 $("#Price").val(parseFloat(tmpPrice).toFixed(2));
// DESCRIPTION------------------------
if ($("#Description").val().trim() == "")
 {
 	return "Insert Product Description.";
 }
return true;
} 



//update
$(document).on("click", ".btnUpdate", function(event)
{
$("#hidProduct_idSave").val($(this).data("Product_id"));
$("#Produc_code").val($(this).closest("tr").find('td:eq(0)').text());
$("#Product_name").val($(this).closest("tr").find('td:eq(1)').text());
$("#Price").val($(this).closest("tr").find('td:eq(2)').text());
$("#Description").val($(this).closest("tr").find('td:eq(3)').text());
});

//remove
$(document).on("click", ".btnRemove", function(event)
{
 $.ajax(
 {
 url : "ProductsAPI",
 type : "DELETE",
 data : "Product_id=" + $(this).data("Product_id"),
 dataType : "text",
 complete : function(response, status)
 {
 	onProductDeleteComplete(response.responseText, status);
 }
 });
});

// delete

function onProductDeleteComplete(response, status)
{
if (status == "success")
 {
 var resultSet = JSON.parse(response);
 if (resultSet.status.trim() == "success")
 {
 $("#alertSuccess").text("Successfully deleted.");
 $("#alertSuccess").show();
 $("#divProductGrid").html(resultSet.data);
 } else if (resultSet.status.trim() == "error")
 {
 $("#alertError").text(resultSet.data);
 $("#alertError").show();
 }
 } else if (status == "error")
 {
 $("#alertError").text("Error while deleting.");
 $("#alertError").show();
 } else
 {
 $("#alertError").text("Unknown error while deleting..");
 $("#alertError").show();
 }
}

