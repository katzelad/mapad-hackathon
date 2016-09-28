package matcher;

import org.opencv.core.Core;
import org.opencv.core.Core.MinMaxLocResult;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.highgui.Highgui;
import org.opencv.imgproc.Imgproc;

public class Matcher {

	public static void main(String[] args) {

		MatcherResult res = match("../image-to-loc/res/rg.png", "../image-to-loc/res/rg_pattern5.png");
		System.out.printf("location: (%d, %d)\n", res.x, res.y);
		System.out.printf("scale: %f\n", res.scale);
		System.out.printf("score: %f\n", res.score);

	}

	public static MatcherResult match(String imageFileName, String patternFileName) {

		System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

		Mat image = Highgui.imread(imageFileName);
		Mat pattern = Highgui.imread(patternFileName);

		MatcherResult res = new MatcherResult();
		res.score = 0;
		for (double scale = 1; scale > 0.2; scale *= 0.98) {
			Mat scaledPattern = new Mat();
			Imgproc.resize(pattern, scaledPattern, new Size(), scale, scale, Imgproc.INTER_LINEAR);
			Mat matchResult = new Mat();
			Imgproc.matchTemplate(image, scaledPattern, matchResult, Imgproc.TM_CCOEFF);
			MinMaxLocResult mmlr = Core.minMaxLoc(matchResult);
			if (mmlr.maxVal > res.score) {
				res.score = mmlr.maxVal;
				res.scale = scale;
				res.x = (int) mmlr.maxLoc.x;
				res.y = (int) mmlr.maxLoc.y;
			}
		}

		return res;

	}

}
