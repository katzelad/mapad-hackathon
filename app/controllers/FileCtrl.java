package controllers;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
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

			File file = picture.getFile();
			int nSlides = OfficeReader.readPowerPoint(file);
			ArrayNode ret = Json.newObject().arrayNode();
			for (int i = 1; i <= nSlides; i++) {
				MatcherResult matchRes = Matcher.match("files/rg.png", "public/PowerPointSlidesData/pic" + i + ".png");
				ObjectNode node = Json.newObject();
				node.put("left", xToLon(matchRes.getLeft()));
				node.put("top", yToLat(matchRes.getTop()));
				node.put("right", xToLon(matchRes.getRight()));
				node.put("bottom", yToLat(matchRes.getBottom()));
				node.put("scale", matchRes.getScale());
				node.put("imagePath", "assets/PowerPointSlidesData/pic" + i + ".png");
				try (Scanner input = new Scanner(new File("public/PowerPointSlidesData/title" + i + ".txt"))) {
					node.put("title", input.nextLine());
				}
				ret.add(node);
			}
			return ok(ret);

		} else {

			flash("error", "Missing file");
			return badRequest("error");

		}
	}
}
