<%@page import="com.Product" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>GadgetBadget Online Platform</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/product.js"></script>
</head>
<body>
<div class="container"><div class="row"><div class="col-6">
	<h1>Product Insert</h1>
		
		<form id="formProduct" name="formProduct">
			
		 			 Product ID:
		 		<input id="Product_code" name="Product_code" type="text"class="form-control form-control-sm">
		 		<br> Product Name:
		 		<input id="Product_name" name="Product_name" type="text"class="form-control form-control-sm">
		 		<br> Price:
		 		<input id="Price" name="Price" type="text"class="form-control form-control-sm">
		 		<br> Description:
		 		<input id="Description" name="Description" type="text"class="form-control form-control-sm">
		 		<br>
				<input id="btnSave" name="btnSave" type="button" value="Save"class="btn btn-primary">
		 		<input type="hidden" id="hidProduct_idSave"name="hidProduct_idSave" value="">
				
		</form>
		
		<div id="alertSuccess" class="alert alert-success"></div>
		<div id="alertError" class="alert alert-danger"></div>
		
	<br>
			<div id="divProductGrid">
				 <%
				 	Product productObj = new Product(); 
				 	out.print(productObj.readProduct()); 
				 %>		
			</div>
		</div>	
	</div>
</div>
</body>
</html>