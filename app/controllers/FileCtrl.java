package controllers;

import java.io.File;

import com.fasterxml.jackson.databind.JsonNode;

import play.*;
import play.mvc.*;

public class FileCtrl extends Controller {

	public static Result getFileUpload() {
		JsonNode fileObject = request().body().asJson();
		File file = request().body().asRaw().asFile();
		
		System.out.println(file.toString() + "" + fileObject.toString());
		
		return ok();
	}

}
