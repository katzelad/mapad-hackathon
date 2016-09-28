package controllers;

import java.io.File;

import play.*;
import play.mvc.*;

public class FileCtrl extends Controller {

	public static Result getFileUpload() {
		String fileObject = request().body().asText();
		File file = request().body().asRaw().asFile();
		
		System.out.println(file.toString() + "" + fileObject.toString());
		
		return ok();
	}

}
