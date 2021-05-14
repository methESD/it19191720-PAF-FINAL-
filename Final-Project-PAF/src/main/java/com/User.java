package com;

public class User {

public String login(String un, String pw)
{ 
	 String output = ""; 
	if (!un.equals("meththani"))//Hard coded test value 
	 { 
		output = "Invalid username"; 
	 } 
	else if (un.equals("meththani"))//Hard coded test value 
	 { 
	 if (!pw.equals("meththani"))//Hard coded test value 
	 { 
		 output = "Invalid password"; 
	 } 
	 else if (pw.equals("meththani"))//Hard coded test value 
	 { 
		 output = "success"; 
	 } 
	 
	 } 
	return output; 
	
}

}