package com;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class Product {
	
		private Connection connect() 
	 { 
			Connection con = null; 
	 try
	 { 
		 Class.forName("com.mysql.jdbc.Driver");
			
			con = DriverManager.getConnection("jdbc:mysql://localhost:3306/product-paf", "root", "");
		 										
	 } 
	 catch (Exception e) 
	 { 
		 e.printStackTrace(); 
	 } 
	 return con; 
	 } 
		
//read items
public String readProduct() 
	 { 
		String output = ""; 
	 try
	 { 
		 Connection con = connect(); 
	 if (con == null) 
	 { 
	 return "Error while connecting to the database for reading."; 
	 } 
	 // Prepare the html table to be displayed
		 output = "<table border='1'><tr><th>Product_code</th> <th>Product_name</th><th>Price</th>" + "<th>Description</th> <th>Update</th><th>Remove</th></tr>"; 
		 String query = "select * from products"; 
		 Statement stmt = con.createStatement(); 
		 ResultSet rs = stmt.executeQuery(query); 
	 // iterate through the rows in the result set
	 while (rs.next()) 
	 { 
		 String Product_id = Integer.toString(rs.getInt("Product_id")); 
		 String Product_code = rs.getString("Product_code"); 
		 String Product_name = rs.getString("Product_name");
		 String Price =  rs.getString("Price");
		 String Description = rs.getString("Description"); 
	 // Add into the html table
		 output += "<tr><td><input id='hidProduct_idupdate' name='hidProduct_idupdate' type='hidden' value='" + Product_id
				 + "'>" + Product_code + "</td>"; 
		 output += "<td>" + Product_name + "</td>"; 
		 output += "<td>" + Price + "</td>"; 
		 output += "<td>" + Description + "</td>"; 
	//buttons
		 output += "<td><input name='btnUpdate' type='button' value='Update' "+"class='btnUpdate btn btn-secondary' data-pid='" + Product_id + "'></td>"

			 + "<td><input name='btnRemove' type='button' value='Remove'class='btnRemove btn btn-danger' data-pid='" + Product_id + "'>" +"</td>"; 
	 } 
	 con.close(); 
	 // Complete the html table
	 	output += "</table>"; 
	 } 
	 catch (Exception e) 
	 { 
		 output = "Error while reading the products."; 
	 System.err.println(e.getMessage()); 
	 } 
	 	return output; 
	 } 
	
//insert items
public String insertProduct(String Product_code, String Product_name,String Price, String Description) 
	 { 
	 String output = ""; 
	 try
	 { 
	 Connection con = connect(); 
	 if (con == null) 
	 { 
	 return "Error while connecting to the database for inserting."; 
	 } 
	 // create a prepared statement
	 String query = " INSERT into products(`Product_id`,`Product_code`,`Product_name`,`Price`,`Description`)"
	 + " values (?, ?, ?, ?, ?)";
	PreparedStatement preparedStmt = con.prepareStatement(query); 
		 // binding values
	preparedStmt.setInt(1, 0); 
	preparedStmt.setString(2, Product_code); 
	preparedStmt.setString(3, Product_name); 
	preparedStmt.setString(4, Price);
	preparedStmt.setString(5, Description); 
		 // execute the statement
	preparedStmt.execute(); 
	con.close(); 
	String newProducts = readProduct(); 
   output = "{\"status\":\"success\", \"data\": \"" +  newProducts + "\"}"; 
		 } 
	catch (Exception e) 
		 { 
	output = "{\"status\":\"error\", \"data\": \"Error while inserting the product.\"}"; 
		System.err.println(e.getMessage()); 
	} 
	return output; 
} 


//update items
public String updateProduct(String Product_id, String Product_code, String Product_name,String Price, String Description) 
	{ 
		 String output = ""; 
	try
	{ 
		 Connection con = connect(); 
	if (con == null) 
	 { 
		 return "Error while connecting to the database for updating."; 
	 } 
		 // create a prepared statement
	String query = "UPDATE products SET Product_code=?,Product_name=?,Price=?,Description=? WHERE Product_id=?"; 
	PreparedStatement preparedStmt = con.prepareStatement(query); 
		 // binding values
		 preparedStmt.setString(1, Product_code); 
		 preparedStmt.setString(2, Product_name); 
		 preparedStmt.setString(3, Price); 
		 preparedStmt.setString(4, Description); 
		 preparedStmt.setInt(5, Integer.parseInt(Product_id));
		// execute the statement
		 preparedStmt.execute(); 
		 con.close(); 
	String newProducts = readProduct(); 
		 output = "{\"status\":\"success\", \"data\": \"" + newProducts + "\"}"; 
	} 
	catch (Exception e) 
	{ 
		 output = "{\"status\":\"error\", \"data\": \"Error while updating the product.\"}"; 
		 System.err.println(e.getMessage()); 
	} 
		return output; 
	} 


//delete items
public String deleteProduct (String product_id) 
	{ 
		 String output = ""; 
	try
	{ 
		 Connection con = connect(); 
	if (con == null) 
	{ 
		 return "Error while connectingto the database for deleting."; 
	} 
		 // create a prepared statement
	String query = "DELETE from products where Product_id= ?"; 
	PreparedStatement preparedStmt = con.prepareStatement(query); 
		 // binding values
	preparedStmt.setInt(1, Integer.parseInt(product_id)); 
		 // execute the statement
	preparedStmt.execute(); 
	con.close(); 
	String newProducts = readProduct(); 
	output = "{\"status\":\"success\", \"data\": \"" + newProducts + "\"}"; 
	} 
		 catch (Exception e) 
	{ 
		 output = "{\"status\":\"error\", \"data\": \"Error while deleting the products.\"}"; 
		 System.err.println(e.getMessage()); 
	} 
		 return output; 
		 
	} 
}
