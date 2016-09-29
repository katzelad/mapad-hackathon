package controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFPictureData;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import matcher.Matcher;
import matcher.MatcherResult;
import play.*;
import play.libs.Json;
import play.mvc.*;
import play.mvc.Http.MultipartFormData;
import play.mvc.Http.MultipartFormData.FilePart;

public class FileCtrl extends Controller {

	public static double xToLon(int x) {
		return 0.0000435930 * x + 34.7983948843;
	}

	public static double yToLat(int y) {
		return -0.0000373798 * y + 32.0919240718;
	}

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
				int nSlides = getPPTXSlidesNumber(file);
				ArrayNode ret = Json.newObject().arrayNode();
				for (int i = 1; i <= nSlides; i++) {
					MatcherResult matchRes = Matcher.match("files/rg.png", "public/PowerPointSlidesData/pic" + i + ".png");
					ObjectNode node = Json.newObject();
					node.put("left", xToLon(matchRes.getLeft()));
					node.put("top", yToLat(matchRes.getTop()));
					node.put("right", xToLon(matchRes.getRight()));
					node.put("bottom", yToLat(matchRes.getBottom()));
					node.put("scale", matchRes.getScale());
					node.put("imagePath", "/assets/PowerPointSlidesData/pic" + i + ".png");
					try (Scanner input = new Scanner(new File("public/PowerPointSlidesData/title" + i + ".txt"))) {
						node.put("title", input.nextLine());
					}
					ret.add(node);
				}
				return ok(ret);
			}
			else
			{
				return badRequest("error: could not read power point file");				
			}
		}
		return badRequest("user didn't choose pptx file");
	}
	
	private static int getPPTXSlidesNumber(File file)
	{
		try
		{
			XMLSlideShow ppt = new XMLSlideShow(new FileInputStream(file));
			return (ppt.getSlides().length);
		}
		catch(IOException ex)
		{
			return (0);
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
