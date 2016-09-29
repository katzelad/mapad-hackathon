package controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFPictureData;
import org.apache.poi.xslf.usermodel.XSLFSlide;

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
			boolean isSucceed = readPPTXFile(file);
			    
			if (isSucceed)
			{
				return ok("File uploaded");
			}
			else
			{
				return badRequest("error: could not read power point file");				
			}
		  } else {
			  flash("error", "Missing file");
			  return badRequest("error");    
		  }
	}
	
	private static boolean readPPTXFile(File file)
	{
		try
		{
			XMLSlideShow ppt = new XMLSlideShow(new FileInputStream(file));
			XSLFSlide[] slides = ppt.getSlides();
			List<XSLFPictureData> pptPictures = ppt.getAllPictures();
				
			for(int i = 1; i <= pptPictures.size(); i++)
			{
				FileOutputStream out = new FileOutputStream("public/PowerPointSlidesData/pic" + i + ".png");
				out.write(pptPictures.get(i - 1).getData());
				out.close();
			}
				
			for(int i = 1; i <= slides.length; i++)
			{
				FileOutputStream out = new FileOutputStream("public/PowerPointSlidesData/title" + i + ".txt");
				String title = slides[i - 1].getCommonSlideData().getText().get(0).getText().toString();
				out.write(title.getBytes());
				out.close();
			}
			
			return (true);
		}
		catch(IOException ex)
		{
			ex.printStackTrace();
			
			return (false);
		}
	}
}
