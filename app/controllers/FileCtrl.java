package controllers;

import java.io.File;

import com.fasterxml.jackson.databind.JsonNode;

import play.*;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;

public class FileCtrl extends Controller {

	public static Result getFileUpload() {
		matcher.Matcher.main(null);
		MultipartFormData body = request().body().asMultipartFormData();
		FilePart picture = body.getFile("file");

		if (picture != null) {
			String fileName = picture.getFilename();
			String contentType = picture.getContentType();
			File file = picture.getFile();
			return ok("File uploaded");
		} else {
			flash("error", "Missing file");
			return badRequest("error");
		}
	}
}
