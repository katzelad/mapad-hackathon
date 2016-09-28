package controllers;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.poi.xslf.usermodel.XMLSlideShow;
import org.apache.poi.xslf.usermodel.XSLFPictureData;
import org.apache.poi.xslf.usermodel.XSLFShape;
import org.apache.poi.xslf.usermodel.XSLFSlide;
import org.apache.poi.xslf.usermodel.XSLFSlideLayout;
import org.apache.poi.xslf.usermodel.XSLFSlideMaster;

import com.sun.prism.paint.Color;

public class OfficeReader {
	public static void readPowerPoint(File file) throws FileNotFoundException, IOException
	{
		XMLSlideShow ppt = new XMLSlideShow(new FileInputStream(file));
		XSLFSlide[] slides = ppt.getSlides();
		List<XSLFPictureData> pptPictures = ppt.getAllPictures();
//		new BufferedImage(pptPictures.get(0).getData()

//		ppt.getSlides()[0]
			
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
			
//			BufferedImage img = new BufferedImage(pgsize.width, pgsize.height,BufferedImage.TYPE_INT_RGB);
//			Graphics2D graphics = img.createGraphics();
//			  
//			//clear the drawing area
//			graphics.setPaint(Color.WHITE);
//			graphics.fill(new Rectangle2D.Float(0, 0, pgsize.width, pgsize.height));
//			  
//			//render
//			slide[i].draw(graphics);
//			  
//			//creating an image file as output
//			FileOutputStream out = new FileOutputStream("ppt_image.png");
//			javax.imageio.ImageIO.write(img, "png", out);
//			ppt.write(out);
//			System.out.println("Image successfully created");
//			out.close();	
			
			
			
			
			
			
			
			for(int i = 0; i < slides.length; i++)
			{
				XSLFShape[] shapes = slides[i].getShapes();
			}

	}
}
