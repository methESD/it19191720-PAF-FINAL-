/**
 * 
 */

//btn login
 
$(document).on("click", "#btnLogin", function(event)
{ 
// Clear alerts---------------------

 $("#alertError").text(""); 
 $("#alertError").hide(); 
 
// Form validation-------------------

var status = validateLoginForm(); 
if (status != true) 
 { 
 $("#alertError").text(status); 
 $("#alertError").show(); 
 return; 
 } 
 
 
// If valid------------------------

 $.ajax( 
 { 
 url : "LoginAPI", 
 type : "POST", 
 data : $("#formLogin").serialize(), 
 dataType : "text", 
 complete : function(response, status) 
 { 
 	onLoginComplete(response.responseText, status); 
 } 
 }); 
}); 


//login function

function onLoginComplete(response, status)
{ 
	if (status == "success") 
		 { 
		 var resultSet = JSON.parse(response);
		  
		 if (resultSet.status.trim() == "success") 
		 { 
		 
			 // Redirect the valid user-----------------
			 document.location = "items.jsp";
			 
		 } 
		 else if (resultSet.status.trim() == "error") 
		 { 
		 
			 $("#alertError").text(resultSet.data); 
			 $("#alertError").show(); 
		 
		 } 
 } else if (status == "error") 
 { 
	 $("#alertError").text("Error while login."); 
	 $("#alertError").show(); 
 } else
 { 
	 $("#alertError").text("Unknown error while login."); 
	 $("#alertError").show(); 
 } 
	 $("#hidProduct_idSave").val(""); 
	 $("#formProduct")[0].reset(); 
}


//validate login

function validateLoginForm()
{ 
	// USERNAME
	if ($("#txtUsername").val().trim() == "") 
	 { 
	 	return "Insert Username."; 
	 } 
	// PASSWORD
	if ($("#txtPassword").val().trim() == "") 
	 { 
	 	return "Insert Password."; 
	 } 
	return true; 
}

//btn logout
$(document).on("click", "#btnLogout", function(event)
{ 
	 $.ajax( 
	 { 
		 url : "LoginAPI", 
		 type : "DELETE", 
		 data : "", 
		 dataType : "text", 
		 complete : function(response, status) 
	 { 
	 	onLogoutComplete(response.responseText, status);
	 } 
	 }); 
	}); 
	
	
//logout function
	
function onLogoutComplete(response, status) 
	{ 
	if (status == "success") 
	 { 
		 if (response.trim() == "success") 
		 { 
		 //Redirect to index------------------
		 	document.location = "index.jsp"; 
		 } 
	 } 
}
