package controllers;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import com.fasterxml.jackson.databind.JsonNode;

import play.*;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;

public class FileCtrl extends Controller {

	public static Result getFileUpload() throws FileNotFoundException, IOException {
		MultipartFormData body = request().body().asMultipartFormData();
		FilePart picture = body.getFile("file");
		
		  if (picture != null) {
			    String fileName = picture.getFilename();
			    String contentType = picture.getContentType(); 
			    File file = picture.getFile();
			    
			    new OfficeReader().readPowerPoint(file);
			    
			    return ok("File uploaded");
			  } else {
			    flash("error", "Missing file");
			    return badRequest("error");    
			  }
	}
}
